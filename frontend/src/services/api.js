const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }
  return data;
};

export const api = {
  // Authentication
  async login(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  async getMe(token) {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(res);
  },

  // Projects
  async getProjects(params = {}) {
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
    return handleResponse(res);
  },

  async getProjectById(id) {
    const res = await fetch(`${BASE_URL}/projects/${id}`);
    return handleResponse(res);
  },

  async createProject(projectData, token) {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });
    return handleResponse(res);
  },

  async updateProject(id, projectData, token) {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });
    return handleResponse(res);
  },

  async deleteProject(id, token) {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(res);
  },

  // Contact Inquiries
  async submitContact(formData) {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return handleResponse(res);
  },

  async getContacts(token) {
    const res = await fetch(`${BASE_URL}/contact`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(res);
  },

  async getDashboardStats(token) {
    const res = await fetch(`${BASE_URL}/contact/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(res);
  },

  async updateContactStatus(id, status, token) {
    const res = await fetch(`${BASE_URL}/contact/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },

  async deleteContact(id, token) {
    const res = await fetch(`${BASE_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(res);
  },
};
