import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, MapPin, Sparkles, AlertCircle, Phone } from 'lucide-react';
import { api } from '../services/api';
import { DetailSkeleton } from '../components/LoadingSkeleton';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getProjectById(id);
        if (res.success && res.data) {
          setProject(res.data);
          // Fetch related projects in same category
          const relatedRes = await api.getProjects({ category: res.data.category });
          if (relatedRes.success) {
            const filtered = relatedRes.data.filter(
              (p) => (p._id || p.id) !== (res.data._id || res.data.id)
            );
            setRelatedProjects(filtered.slice(0, 3));
          }
        } else {
          setError(res.message || 'Project not found.');
        }
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-36 pb-24 max-w-4xl mx-auto px-6 text-center text-studio-soft">
        <h1 className="text-4xl font-editorial text-white mb-4">Project Not Found</h1>
        <p className="text-studio-medium text-sm mb-8">
          The requested project record does not exist or may have been updated.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 bg-studio-gold text-studio-black text-xs uppercase tracking-widest font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Portfolio</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-studio-black text-studio-soft pt-32 pb-24 selection:bg-studio-gold selection:text-studio-black">
      {/* Top Breadcrumb / Return */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-studio-medium hover:text-studio-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Archives</span>
        </Link>
      </div>

      {/* Project Hero Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-studio-gold">
            {project.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-studio-medium" />
          <span className="text-xs font-mono text-studio-medium flex items-center gap-1">
            <MapPin className="w-3 h-3 text-studio-gold" />
            {project.location || 'Lahore, Pakistan'}
          </span>
          {project.isSample && (
            <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-studio-dark text-studio-gold border border-studio-borderSubtle">
              Sample / Demonstration Project
            </span>
          )}
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal text-white tracking-tight leading-tight max-w-4xl">
          {project.title}
        </h1>
      </div>

      {/* Large Featured Project Visual Hero */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-studio-borderSubtle bg-studio-charcoal">
          <img
            src={project.images[activeImageIndex] || project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover grayscale contrast-110"
          />
        </div>

        {/* Thumbnail Selector if Multiple Images */}
        {project.images.length > 1 && (
          <div className="flex items-center gap-4 mt-4 overflow-x-auto pb-2">
            {project.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-16 shrink-0 overflow-hidden border transition-all ${
                  activeImageIndex === idx
                    ? 'border-studio-gold scale-105'
                    : 'border-studio-borderSubtle opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover grayscale" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Project Narrative & Architectural Specifications */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Description & Design Concept */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-studio-gold block mb-3">
                SPATIAL INTENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial text-white mb-4">
                Design Concept
              </h2>
              <p className="text-studio-light/80 text-base sm:text-lg font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Design Highlights */}
            <div className="pt-8 border-t border-studio-borderSubtle space-y-4">
              <h3 className="text-xl font-editorial text-white">Spatial Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-studio-deep border border-studio-borderSubtle">
                  <p className="text-xs font-mono text-studio-gold uppercase mb-1">Atmosphere</p>
                  <p className="text-sm text-studio-medium font-light">
                    Calibrated indirect perimeter lighting creating intimate dark luxury ambiance.
                  </p>
                </div>
                <div className="p-4 bg-studio-deep border border-studio-borderSubtle">
                  <p className="text-xs font-mono text-studio-gold uppercase mb-1">Joinery</p>
                  <p className="text-sm text-studio-medium font-light">
                    Full-height concealed cabinetry eliminating visual clutter and maximizing storage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Specifications */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 bg-studio-charcoal/30 border border-studio-borderSubtle space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white pb-3 border-b border-studio-borderSubtle">
                Project Information
              </h3>

              <div>
                <p className="text-[11px] font-mono uppercase text-studio-medium">Discipline</p>
                <p className="text-sm text-white font-medium mt-0.5">{project.category} Interior</p>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase text-studio-medium">Design Style</p>
                <p className="text-sm text-white font-medium mt-0.5">{project.designStyle || 'Contemporary Luxury'}</p>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase text-studio-medium">Location</p>
                <p className="text-sm text-white font-medium mt-0.5">{project.location || 'Lahore, Pakistan'}</p>
              </div>

              {/* Material Palette */}
              {project.materials && project.materials.length > 0 && (
                <div className="pt-4 border-t border-studio-borderSubtle">
                  <p className="text-[11px] font-mono uppercase text-studio-gold mb-3">
                    Material Specification
                  </p>
                  <ul className="space-y-2">
                    {project.materials.map((mat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-studio-light">
                        <span className="w-1.5 h-1.5 bg-studio-gold shrink-0" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quick Action Box */}
            <div className="p-6 border border-studio-gold/40 bg-studio-deep space-y-4">
              <h4 className="text-base font-editorial text-white">Inquire About Similar Designs</h4>
              <p className="text-xs text-studio-medium font-light leading-relaxed">
                Interested in implementing this architectural design language for your home or commercial space in Lahore?
              </p>
              <Link
                to={`/contact?service=${encodeURIComponent(project.category)}&ref=${encodeURIComponent(project.title)}`}
                className="w-full py-3 bg-studio-gold text-studio-black font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 border-t border-studio-borderSubtle">
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-2xl font-editorial text-white">Related Studies in {project.category}</h3>
            <Link
              to="/portfolio"
              className="text-xs font-mono uppercase tracking-widest text-studio-gold hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <Link
                key={rel._id || rel.id}
                to={`/portfolio/${rel._id || rel.id}`}
                className="group block border border-studio-borderSubtle bg-studio-deep/40 p-3"
              >
                <div className="aspect-[4/3] overflow-hidden bg-studio-charcoal">
                  <img
                    src={rel.images[0]}
                    alt={rel.title}
                    className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-studio-gold block">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-editorial text-white group-hover:text-studio-gold transition-colors mt-0.5 line-clamp-1">
                    {rel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
