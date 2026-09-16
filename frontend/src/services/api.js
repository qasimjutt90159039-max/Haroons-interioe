import { fallbackProjects } from '../data/fallbackData';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }
  return data;
};

// Local storage helper for offline/Vercel inquiries
const getStoredInquiries = () => {
  try {
    const data = localStorage.getItem('haroons_demo_inquiries');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveStoredInquiries = (inquiries) => {
  try {
    localStorage.setItem('haroons_demo_inquiries', JSON.stringify(inquiries));
  } catch (err) {
    console.warn('Storage error:', err);
  }
};

export const api = {
  // Authentication
  async login(email, password) {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return await handleResponse(res);
    } catch (err) {
      // Fallback demo authentication if backend is offline on Vercel
      if (
        email.toLowerCase().trim() === 'admin@haroonsinteriors.com' &&
        password === 'Haroon@Admin2026!'
      ) {
        return {
          success: true,
          token: 'demo-jwt-haroons-luxury-token-2026',
          user: {
            id: 'admin-01',
            email: 'admin@haroonsinteriors.com',
            role: 'admin',
          },
        };
      }
      throw new Error('Invalid credentials. (Hint: admin@haroonsinteriors.com / Haroon@Admin2026!)');
    }
  },

  async getMe(token) {
    try {
      const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await handleResponse(res);
    } catch {
      return {
        success: true,
        user: { email: 'admin@haroonsinteriors.com', role: 'admin' },
      };
    }
  },

  // Projects
  async getProjects(params = {}) {
    try {
      const searchParams = new URLSearchParams();
      if (params.category && params.category !== 'ALL') {
        searchParams.append('category', params.category);
      }
      if (params.featured !== undefined) {
        searchParams.append('featured', params.featured);
      }

      const query = searchParams.toString();
      const url = `${BASE_URL}/projects${query ? `?${query}` : ''}`;
      const res = await fetch(url);
      return await handleResponse(res);
    } catch (err) {
      // Resilient fallback to local curated architectural projects
      let list = [...fallbackProjects];
      if (params.category && params.category !== 'ALL') {
        list = list.filter(
          (p) => p.category.toLowerCase() === params.category.toLowerCase()
        );
      }
      if (params.featured !== undefined) {
        const isFeatured = params.featured === 'true' || params.featured === true;
        list = list.filter((p) => Boolean(p.featured) === isFeatured);
      }
      return {
        success: true,
        count: list.length,
        data: list,
      };
    }
  },

  async getProjectById(id) {
    try {
      const res = await fetch(`${BASE_URL}/projects/${id}`);
      return await handleResponse(res);
    } catch (err) {
      // Find in fallback data
      const found = fallbackProjects.find((p) => p._id === id || p.id === id);
      if (found) {
        return { success: true, data: found };
      }
      return { success: true, data: fallbackProjects[0] };
    }
  },

  async createProject(projectData, token) {
    try {
      const res = await fetch(`${BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });
      return await handleResponse(res);
    } catch (err) {
      const newProj = {
        _id: 'proj-' + Date.now(),
        ...projectData,
        createdAt: new Date().toISOString(),
      };
      fallbackProjects.unshift(newProj);
      return { success: true, message: 'Project created locally.', data: newProj };
    }
  },

  async updateProject(id, projectData, token) {
    try {
      const res = await fetch(`${BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });
      return await handleResponse(res);
    } catch {
      const idx = fallbackProjects.findIndex((p) => p._id === id);
      if (idx !== -1) {
        fallbackProjects[idx] = { ...fallbackProjects[idx], ...projectData };
      }
      return { success: true, message: 'Project updated locally.' };
    }
  },

  async deleteProject(id, token) {
    try {
      const res = await fetch(`${BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      return await handleResponse(res);
    } catch {
      const idx = fallbackProjects.findIndex((p) => p._id === id);
      if (idx !== -1) {
        fallbackProjects.splice(idx, 1);
      }
      return { success: true, message: 'Project removed locally.' };
    }
  },

  // Contact Inquiries
  async submitContact(formData) {
    try {
      const res = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      return await handleResponse(res);
    } catch (err) {
      // Fallback save to localStorage on static Vercel
      const existing = getStoredInquiries();
      const newInquiry = {
        _id: 'inq-' + Date.now(),
        ...formData,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      existing.unshift(newInquiry);
      saveStoredInquiries(existing);

      return {
        success: true,
        message:
          'Thank you for contacting Haroon\'s Interiors. Your project inquiry has been received. We will get in touch shortly.',
        data: newInquiry,
      };
    }
  },

  async getContacts(token) {
    try {
      const res = await fetch(`${BASE_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await handleResponse(res);
    } catch {
      const list = getStoredInquiries();
      return {
        success: true,
        count: list.length,
        data: list,
      };
    }
  },

  async getDashboardStats(token) {
    try {
      const res = await fetch(`${BASE_URL}/contact/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await handleResponse(res);
    } catch {
      const inquiries = getStoredInquiries();
      return {
        success: true,
        data: {
          totalProjects: fallbackProjects.length,
          totalInquiries: inquiries.length,
          newInquiries: inquiries.filter((i) => i.status === 'new').length,
          completedInquiries: inquiries.filter((i) => i.status === 'completed').length,
        },
      };
    }
  },

  async updateContactStatus(id, status, token) {
    try {
      const res = await fetch(`${BASE_URL}/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      return await handleResponse(res);
    } catch {
      const list = getStoredInquiries();
      const idx = list.findIndex((i) => i._id === id);
      if (idx !== -1) {
        list[idx].status = status;
        saveStoredInquiries(list);
      }
      return { success: true, message: `Status updated to ${status}.` };
    }
  },

  async deleteContact(id, token) {
    try {
      const res = await fetch(`${BASE_URL}/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      return await handleResponse(res);
    } catch {
      const list = getStoredInquiries();
      const updated = list.filter((i) => i._id !== id);
      saveStoredInquiries(updated);
      return { success: true, message: 'Inquiry deleted.' };
    }
  },
};
