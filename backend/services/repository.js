import { isMongoActive } from '../config/db.js';
import UserModel from '../models/User.js';
import ProjectModel from '../models/Project.js';
import ContactRequestModel from '../models/ContactRequest.js';
import { getStoreData, saveStoreData } from '../config/store.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const generateId = () => crypto.randomBytes(12).toString('hex');

// ================= USER REPOSITORY =================
export const userRepository = {
  async findByEmail(email) {
    if (isMongoActive()) {
      return await UserModel.findOne({ email: email.toLowerCase().trim() });
    }
    const store = getStoreData();
    return store.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  },

  async create(userData) {
    if (isMongoActive()) {
      return await UserModel.create(userData);
    }
    const store = getStoreData();
    const newUser = {
      _id: generateId(),
      ...userData,
      email: userData.email.toLowerCase().trim(),
      createdAt: new Date().toISOString(),
    };
    store.users.push(newUser);
    saveStoreData(store);
    return newUser;
  },

  async count() {
    if (isMongoActive()) {
      return await UserModel.countDocuments();
    }
    return getStoreData().users.length;
  },
};

// ================= PROJECT REPOSITORY =================
export const projectRepository = {
  async findAll(filter = {}) {
    if (isMongoActive()) {
      const query = {};
      if (filter.category && filter.category !== 'ALL') {
        query.category = { $regex: new RegExp(`^${filter.category}$`, 'i') };
      }
      if (filter.featured !== undefined) {
        query.featured = filter.featured === 'true' || filter.featured === true;
      }
      return await ProjectModel.find(query).sort({ createdAt: -1 });
    }

    const store = getStoreData();
    let projects = [...store.projects];

    if (filter.category && filter.category !== 'ALL') {
      projects = projects.filter(
        (p) => p.category.toLowerCase() === filter.category.toLowerCase()
      );
    }
    if (filter.featured !== undefined) {
      const isFeatured = filter.featured === 'true' || filter.featured === true;
      projects = projects.filter((p) => Boolean(p.featured) === isFeatured);
    }

    return projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async findById(id) {
    if (isMongoActive()) {
      try {
        return await ProjectModel.findById(id);
      } catch {
        return null;
      }
    }
    const store = getStoreData();
    return store.projects.find((p) => p._id === id || p.id === id) || null;
  },

  async create(projectData) {
    if (isMongoActive()) {
      return await ProjectModel.create(projectData);
    }
    const store = getStoreData();
    const newProject = {
      _id: generateId(),
      ...projectData,
      isSample: projectData.isSample !== undefined ? projectData.isSample : true,
      createdAt: new Date().toISOString(),
    };
    store.projects.unshift(newProject);
    saveStoreData(store);
    return newProject;
  },

  async update(id, updateData) {
    if (isMongoActive()) {
      try {
        return await ProjectModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      } catch {
        return null;
      }
    }
    const store = getStoreData();
    const idx = store.projects.findIndex((p) => p._id === id || p.id === id);
    if (idx === -1) return null;
    store.projects[idx] = { ...store.projects[idx], ...updateData };
    saveStoreData(store);
    return store.projects[idx];
  },

  async delete(id) {
    if (isMongoActive()) {
      try {
        return await ProjectModel.findByIdAndDelete(id);
      } catch {
        return null;
      }
    }
    const store = getStoreData();
    const idx = store.projects.findIndex((p) => p._id === id || p.id === id);
    if (idx === -1) return null;
    const removed = store.projects.splice(idx, 1)[0];
    saveStoreData(store);
    return removed;
  },

  async count() {
    if (isMongoActive()) {
      return await ProjectModel.countDocuments();
    }
    return getStoreData().projects.length;
  },
};

// ================= CONTACT REPOSITORY =================
export const contactRepository = {
  async findAll() {
    if (isMongoActive()) {
      return await ContactRequestModel.find().sort({ createdAt: -1 });
    }
    const store = getStoreData();
    return [...store.contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async findById(id) {
    if (isMongoActive()) {
      try {
        return await ContactRequestModel.findById(id);
      } catch {
        return null;
      }
    }
    const store = getStoreData();
    return store.contacts.find((c) => c._id === id || c.id === id) || null;
  },

  async create(contactData) {
    if (isMongoActive()) {
      return await ContactRequestModel.create(contactData);
    }
    const store = getStoreData();
    const newContact = {
      _id: generateId(),
      ...contactData,
      status: contactData.status || 'new',
      createdAt: new Date().toISOString(),
    };
    store.contacts.unshift(newContact);
    saveStoreData(store);
    return newContact;
  },

  async updateStatus(id, status) {
    if (isMongoActive()) {
      try {
        return await ContactRequestModel.findByIdAndUpdate(id, { status }, { new: true });
      } catch {
        return null;
      }
    }
    const store = getStoreData();
    const idx = store.contacts.findIndex((c) => c._id === id || c.id === id);
    if (idx === -1) return null;
    store.contacts[idx].status = status;
    saveStoreData(store);
    return store.contacts[idx];
  },

  async delete(id) {
    if (isMongoActive()) {
      try {
        return await ContactRequestModel.findByIdAndDelete(id);
      } catch {
        return null;
      }
    }
    const store = getStoreData();
    const idx = store.contacts.findIndex((c) => c._id === id || c.id === id);
    if (idx === -1) return null;
    const removed = store.contacts.splice(idx, 1)[0];
    saveStoreData(store);
    return removed;
  },

  async getStats() {
    let contacts = [];
    let totalProjects = 0;

    if (isMongoActive()) {
      totalProjects = await ProjectModel.countDocuments();
      contacts = await ContactRequestModel.find();
    } else {
      const store = getStoreData();
      totalProjects = store.projects.length;
      contacts = store.contacts;
    }

    const totalInquiries = contacts.length;
    const newInquiries = contacts.filter((c) => c.status === 'new').length;
    const inProgressInquiries = contacts.filter((c) => c.status === 'in_progress').length;
    const completedInquiries = contacts.filter((c) => c.status === 'completed').length;

    return {
      totalProjects,
      totalInquiries,
      newInquiries,
      inProgressInquiries,
      completedInquiries,
      recentRequests: contacts.slice(0, 5),
    };
  },
};
