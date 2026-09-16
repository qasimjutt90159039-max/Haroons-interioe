import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FolderKanban,
  Inbox,
  Plus,
  Trash2,
  Edit3,
  Star,
  CheckCircle,
  Clock,
  LogOut,
  ExternalLink,
  Search,
  Eye,
  X,
  AlertTriangle,
  RefreshCw,
  Layers,
} from 'lucide-react';
import { api } from '../services/api';
import { TableRowSkeleton } from '../components/LoadingSkeleton';

const categoriesList = [
  'Residential',
  'Commercial',
  'Bedroom',
  'Living',
  'Modern',
  'Decorative',
];

const statusOptions = ['new', 'contacted', 'in_progress', 'completed'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('haroons_admin_token');

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'inquiries'
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalInquiries: 0,
    newInquiries: 0,
    completedInquiries: 0,
  });

  // Projects State
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Residential',
    description: '',
    location: 'Lahore, Pakistan',
    designStyle: 'Contemporary Luxury',
    materials: '',
    images: '',
    featured: false,
    isSample: true,
  });

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquirySearch, setInquirySearch] = useState('');

  // Notification Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Auth Guard
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  // Load Data
  const loadDashboardData = async () => {
    if (!token) return;

    // Load Stats
    try {
      const statsRes = await api.getDashboardStats(token);
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error('Stats error:', err);
    }

    // Load Projects
    setLoadingProjects(true);
    try {
      const pRes = await api.getProjects();
      if (pRes.success) {
        setProjects(pRes.data);
      }
    } catch (err) {
      console.error('Projects fetch error:', err);
    } finally {
      setLoadingProjects(false);
    }

    // Load Inquiries
    setLoadingInquiries(true);
    try {
      const inqRes = await api.getContacts(token);
      if (inqRes.success) {
        setInquiries(inqRes.data);
      }
    } catch (err) {
      console.error('Inquiries fetch error:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('haroons_admin_token');
    localStorage.removeItem('haroons_admin_user');
    navigate('/admin/login');
  };

  // --- Project CRUD ---
  const handleOpenCreateModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: 'Residential',
      description: '',
      location: 'Lahore, Pakistan',
      designStyle: 'Contemporary Luxury',
      materials: 'Smoked Oak, Honed Nero Marble, Brushed Brass',
      images: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      featured: false,
      isSample: true,
    });
    setProjectModalOpen(true);
  };

  const handleOpenEditModal = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title || '',
      category: proj.category || 'Residential',
      description: proj.description || '',
      location: proj.location || 'Lahore, Pakistan',
      designStyle: proj.designStyle || 'Contemporary Luxury',
      materials: Array.isArray(proj.materials) ? proj.materials.join(', ') : '',
      images: Array.isArray(proj.images) ? proj.images.join('\n') : '',
      featured: Boolean(proj.featured),
      isSample: proj.isSample !== undefined ? Boolean(proj.isSample) : true,
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      showToast('Title and description are required.', 'error');
      return;
    }

    const materialsArray = projectForm.materials
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const imagesArray = projectForm.images
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s.startsWith('http'));

    if (imagesArray.length === 0) {
      showToast('Please provide at least one valid image URL.', 'error');
      return;
    }

    const payload = {
      title: projectForm.title,
      category: projectForm.category,
      description: projectForm.description,
      location: projectForm.location,
      designStyle: projectForm.designStyle,
      materials: materialsArray,
      images: imagesArray,
      featured: projectForm.featured,
      isSample: projectForm.isSample,
    };

    try {
      if (editingProject) {
        const res = await api.updateProject(editingProject._id || editingProject.id, payload, token);
        if (res.success) {
          showToast('Project updated successfully.');
          setProjectModalOpen(false);
          loadDashboardData();
        }
      } else {
        const res = await api.createProject(payload, token);
        if (res.success) {
          showToast('New project created successfully.');
          setProjectModalOpen(false);
          loadDashboardData();
        }
      }
    } catch (err) {
      showToast(err.message || 'Error saving project.', 'error');
    }
  };

  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await api.deleteProject(id, token);
      if (res.success) {
        showToast('Project deleted successfully.');
        loadDashboardData();
      }
    } catch (err) {
      showToast('Failed to delete project.', 'error');
    }
  };

  const handleToggleFeatured = async (proj) => {
    try {
      const id = proj._id || proj.id;
      const res = await api.updateProject(id, { featured: !proj.featured }, token);
      if (res.success) {
        showToast(`Project ${!proj.featured ? 'marked as featured' : 'unmarked from featured'}.`);
        loadDashboardData();
      }
    } catch (err) {
      showToast('Failed to update featured flag.', 'error');
    }
  };

  // --- Inquiries Operations ---
  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      const res = await api.updateContactStatus(inquiryId, newStatus, token);
      if (res.success) {
        showToast(`Status updated to "${newStatus}".`);
        setInquiries((prev) =>
          prev.map((i) =>
            (i._id || i.id) === inquiryId ? { ...i, status: newStatus } : i
          )
        );
        // Refresh stats
        const statsRes = await api.getDashboardStats(token);
        if (statsRes.success) setStats(statsRes.data);
      }
    } catch (err) {
      showToast('Failed to update status.', 'error');
    }
  };

  const handleDeleteInquiry = async (inquiryId, name) => {
    if (!window.confirm(`Delete inquiry from "${name}"?`)) return;

    try {
      const res = await api.deleteContact(inquiryId, token);
      if (res.success) {
        showToast('Inquiry deleted successfully.');
        if (selectedInquiry && (selectedInquiry._id || selectedInquiry.id) === inquiryId) {
          setSelectedInquiry(null);
        }
        loadDashboardData();
      }
    } catch (err) {
      showToast('Failed to delete inquiry.', 'error');
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const term = inquirySearch.toLowerCase();
    return (
      inq.name.toLowerCase().includes(term) ||
      inq.phone.toLowerCase().includes(term) ||
      inq.service.toLowerCase().includes(term) ||
      inq.status.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-studio-black text-studio-soft pt-28 pb-20 selection:bg-studio-gold selection:text-studio-black">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-24 right-8 z-50 px-5 py-3 border text-xs font-mono uppercase tracking-wider shadow-2xl flex items-center gap-2 ${
            toast.type === 'error'
              ? 'bg-rose-950 border-rose-500 text-rose-200'
              : 'bg-emerald-950 border-emerald-500 text-emerald-200'
          }`}
        >
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Admin Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-studio-borderSubtle gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-studio-gold" />
              <span className="text-[10px] font-mono tracking-widest text-studio-gold uppercase">
                STUDIO BACKOFFICE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-editorial text-white">
              Haroon's Interiors Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="text-xs font-mono uppercase tracking-widest text-studio-light hover:text-white inline-flex items-center gap-1.5 px-3 py-2 border border-studio-borderSubtle bg-studio-deep"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-mono uppercase tracking-widest text-rose-400 hover:text-rose-300 inline-flex items-center gap-1.5 px-3 py-2 border border-rose-900/40 bg-rose-950/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 border border-studio-borderSubtle bg-studio-deep">
            <span className="text-[11px] font-mono text-studio-medium uppercase tracking-wider block mb-1">
              Total Projects
            </span>
            <p className="text-3xl font-editorial text-white">{stats.totalProjects || projects.length}</p>
          </div>

          <div className="p-5 border border-studio-borderSubtle bg-studio-deep">
            <span className="text-[11px] font-mono text-studio-medium uppercase tracking-wider block mb-1">
              Total Inquiries
            </span>
            <p className="text-3xl font-editorial text-white">{stats.totalInquiries || inquiries.length}</p>
          </div>

          <div className="p-5 border border-studio-gold/30 bg-studio-deep">
            <span className="text-[11px] font-mono text-studio-gold uppercase tracking-wider block mb-1">
              New Inquiries
            </span>
            <p className="text-3xl font-editorial text-studio-gold font-bold">
              {stats.newInquiries || inquiries.filter((i) => i.status === 'new').length}
            </p>
          </div>

          <div className="p-5 border border-studio-borderSubtle bg-studio-deep">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
              Completed Projects
            </span>
            <p className="text-3xl font-editorial text-white">
              {inquiries.filter((i) => i.status === 'completed').length}
            </p>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8">
        <div className="flex items-center justify-between border-b border-studio-borderSubtle">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-4 text-xs font-mono tracking-widest uppercase transition-colors relative ${
                activeTab === 'projects'
                  ? 'text-studio-gold font-semibold'
                  : 'text-studio-medium hover:text-white'
              }`}
            >
              <span>Project Management ({projects.length})</span>
              {activeTab === 'projects' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-studio-gold" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`pb-4 text-xs font-mono tracking-widest uppercase transition-colors relative ${
                activeTab === 'inquiries'
                  ? 'text-studio-gold font-semibold'
                  : 'text-studio-medium hover:text-white'
              }`}
            >
              <span>Inquiry Leads ({inquiries.length})</span>
              {activeTab === 'inquiries' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-studio-gold" />
              )}
            </button>
          </div>

          {activeTab === 'projects' && (
            <button
              onClick={handleOpenCreateModal}
              className="mb-3 px-4 py-2 bg-studio-gold text-studio-black text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="border border-studio-borderSubtle bg-studio-deep overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-studio-charcoal border-b border-studio-borderSubtle text-studio-medium font-mono uppercase">
                <tr>
                  <th className="p-4">Visual</th>
                  <th className="p-4">Project Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Type</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-studio-borderSubtle/60 font-light">
                {loadingProjects ? (
                  <>
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                  </>
                ) : projects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-studio-medium">
                      No project records found in database.
                    </td>
                  </tr>
                ) : (
                  projects.map((proj) => (
                    <tr key={proj._id || proj.id} className="hover:bg-studio-charcoal/30 transition-colors">
                      <td className="p-4">
                        <div className="w-16 h-12 bg-studio-charcoal border border-studio-borderSubtle overflow-hidden">
                          <img
                            src={proj.images?.[0]}
                            alt=""
                            className="w-full h-full object-cover grayscale"
                          />
                        </div>
                      </td>
                      <td className="p-4 font-medium text-white max-w-xs truncate">
                        {proj.title}
                        <div className="text-[10px] text-studio-medium font-mono truncate">
                          {proj.location || 'Lahore'}
                        </div>
                      </td>
                      <td className="p-4 text-studio-light font-mono">{proj.category}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleFeatured(proj)}
                          title="Toggle featured status on home page"
                          className={`p-1.5 rounded transition-colors ${
                            proj.featured
                              ? 'text-studio-gold hover:text-white'
                              : 'text-studio-medium hover:text-studio-gold'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${proj.featured ? 'fill-studio-gold' : ''}`} />
                        </button>
                      </td>
                      <td className="p-4 font-mono text-[10px]">
                        <span className="px-2 py-0.5 border border-studio-borderSubtle bg-studio-black text-studio-medium">
                          {proj.isSample ? 'Sample' : 'Actual'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link
                          to={`/portfolio/${proj._id || proj.id}`}
                          target="_blank"
                          title="View on site"
                          className="inline-block p-1.5 text-studio-medium hover:text-studio-gold transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEditModal(proj)}
                          title="Edit Project"
                          className="p-1.5 text-studio-medium hover:text-white transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj._id || proj.id, proj.title)}
                          title="Delete Project"
                          className="p-1.5 text-studio-medium hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INQUIRIES MANAGEMENT */}
      {activeTab === 'inquiries' && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Search Bar */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-studio-medium absolute left-3 top-3" />
              <input
                type="text"
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                placeholder="Search by client, phone, or service..."
                className="w-full pl-9 pr-4 py-2 bg-studio-deep border border-studio-borderSubtle text-xs text-white focus:outline-none focus:border-studio-gold"
              />
            </div>
            <button
              onClick={loadDashboardData}
              className="p-2 border border-studio-borderSubtle bg-studio-deep text-studio-medium hover:text-white"
              title="Refresh Inquiries"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="border border-studio-borderSubtle bg-studio-deep overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-studio-charcoal border-b border-studio-borderSubtle text-studio-medium font-mono uppercase">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Phone / Email</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-studio-borderSubtle/60 font-light">
                {loadingInquiries ? (
                  <>
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                  </>
                ) : filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-studio-medium">
                      No customer inquiries match the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq) => {
                    const id = inq._id || inq.id;
                    const dateStr = inq.createdAt
                      ? new Date(inq.createdAt).toLocaleDateString()
                      : 'Recent';

                    return (
                      <tr key={id} className="hover:bg-studio-charcoal/30 transition-colors">
                        <td className="p-4 font-mono text-studio-medium text-[11px] whitespace-nowrap">
                          {dateStr}
                        </td>
                        <td className="p-4 font-medium text-white">{inq.name}</td>
                        <td className="p-4 font-mono text-studio-light">
                          <a href={`tel:${inq.phone}`} className="hover:text-studio-gold">
                            {inq.phone}
                          </a>
                          {inq.email && (
                            <div className="text-[10px] text-studio-medium truncate">{inq.email}</div>
                          )}
                        </td>
                        <td className="p-4 text-studio-light">{inq.service}</td>
                        <td className="p-4">
                          <select
                            value={inq.status || 'new'}
                            onChange={(e) => handleStatusChange(id, e.target.value)}
                            className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider border rounded-none bg-studio-black focus:outline-none ${
                              inq.status === 'new'
                                ? 'border-amber-500/60 text-amber-300'
                                : inq.status === 'contacted'
                                ? 'border-sky-500/60 text-sky-300'
                                : inq.status === 'in_progress'
                                ? 'border-purple-500/60 text-purple-300'
                                : 'border-emerald-500/60 text-emerald-300'
                            }`}
                          >
                            {statusOptions.map((st) => (
                              <option key={st} value={st}>
                                {st.replace('_', ' ')}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            title="View Full Scope"
                            className="p-1.5 text-studio-medium hover:text-studio-gold transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(id, inq.name)}
                            title="Delete Inquiry"
                            className="p-1.5 text-studio-medium hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: VIEW INQUIRY DETAILS */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-studio-deep border border-studio-borderSubtle max-w-lg w-full p-6 sm:p-8 space-y-6 relative">
            <div className="flex items-center justify-between border-b border-studio-borderSubtle pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-studio-gold block">
                  INQUIRY DOSSIER
                </span>
                <h3 className="text-xl font-editorial text-white">{selectedInquiry.name}</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-studio-medium hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-studio-medium uppercase text-[10px]">Contact Phone</p>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="font-medium text-studio-gold hover:underline text-sm"
                  >
                    {selectedInquiry.phone}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-studio-medium uppercase text-[10px]">Email Address</p>
                  <p className="font-medium text-white">{selectedInquiry.email || 'Not provided'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-studio-medium uppercase text-[10px]">Service Requested</p>
                  <p className="text-white font-medium">{selectedInquiry.service}</p>
                </div>
                <div>
                  <p className="font-mono text-studio-medium uppercase text-[10px]">Project Budget</p>
                  <p className="text-white font-medium">{selectedInquiry.budget || 'Flexible'}</p>
                </div>
              </div>

              <div>
                <p className="font-mono text-studio-medium uppercase text-[10px]">Project Type</p>
                <p className="text-white font-medium">{selectedInquiry.projectType || 'General'}</p>
              </div>

              <div>
                <p className="font-mono text-studio-medium uppercase text-[10px] mb-1">
                  Client Message / Spatial Requirements
                </p>
                <div className="p-4 bg-studio-black border border-studio-borderSubtle text-studio-light leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-studio-borderSubtle flex items-center justify-between">
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-mono uppercase tracking-wider font-medium inline-flex items-center gap-1.5"
              >
                <span>WhatsApp Client</span>
              </a>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 border border-white/20 text-xs uppercase tracking-wider text-studio-light hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT PROJECT */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-studio-deep border border-studio-borderSubtle max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-studio-borderSubtle pb-4">
              <h3 className="text-xl font-editorial text-white">
                {editingProject ? 'Edit Architectural Project' : 'Add New Portfolio Project'}
              </h3>
              <button
                onClick={() => setProjectModalOpen(false)}
                className="p-1 text-studio-medium hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase text-studio-medium mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. The Noir Residence — Spatial Living"
                    className="w-full p-2.5 bg-studio-black border border-studio-borderSubtle text-white focus:outline-none focus:border-studio-gold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-studio-medium mb-1">
                    Category *
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full p-2.5 bg-studio-black border border-studio-borderSubtle text-white focus:outline-none focus:border-studio-gold"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase text-studio-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="DHA Phase 6, Lahore"
                    className="w-full p-2.5 bg-studio-black border border-studio-borderSubtle text-white focus:outline-none focus:border-studio-gold"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-studio-medium mb-1">
                    Design Style
                  </label>
                  <input
                    type="text"
                    value={projectForm.designStyle}
                    onChange={(e) => setProjectForm({ ...projectForm, designStyle: e.target.value })}
                    placeholder="Contemporary Luxury"
                    className="w-full p-2.5 bg-studio-black border border-studio-borderSubtle text-white focus:outline-none focus:border-studio-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-studio-medium mb-1">
                  Description & Spatial Intent *
                </label>
                <textarea
                  rows={4}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Architectural design narrative, spatial layout, lighting concept..."
                  className="w-full p-2.5 bg-studio-black border border-studio-borderSubtle text-white focus:outline-none focus:border-studio-gold"
                  required
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-studio-medium mb-1">
                  Materials (comma separated)
                </label>
                <input
                  type="text"
                  value={projectForm.materials}
                  onChange={(e) => setProjectForm({ ...projectForm, materials: e.target.value })}
                  placeholder="Nero Marquina Marble, Smoked Oak, Brushed Brass, Textured Linen"
                  className="w-full p-2.5 bg-studio-black border border-studio-borderSubtle text-white focus:outline-none focus:border-studio-gold"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-studio-medium mb-1">
                  Project Image URLs (one per line or comma separated) *
                </label>
                <textarea
                  rows={3}
                  value={projectForm.images}
                  onChange={(e) => setProjectForm({ ...projectForm, images: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full p-2.5 bg-studio-black border border-studio-borderSubtle text-white focus:outline-none focus:border-studio-gold font-mono text-[11px]"
                  required
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-4 h-4 accent-studio-gold"
                  />
                  <span className="font-mono text-studio-light">Featured on Home Page</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={projectForm.isSample}
                    onChange={(e) => setProjectForm({ ...projectForm, isSample: e.target.checked })}
                    className="w-4 h-4 accent-studio-gold"
                  />
                  <span className="font-mono text-studio-light">Label as Demonstration / Sample</span>
                </label>
              </div>

              <div className="pt-4 border-t border-studio-borderSubtle flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-5 py-2.5 border border-white/20 text-studio-medium hover:text-white font-mono uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-studio-gold text-studio-black font-mono uppercase font-semibold hover:bg-white transition-colors"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
