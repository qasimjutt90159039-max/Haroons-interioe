import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Filter, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { CardSkeleton } from '../components/LoadingSkeleton';

const categories = [
  'ALL',
  'RESIDENTIAL',
  'COMMERCIAL',
  'BEDROOM',
  'LIVING',
  'MODERN',
  'DECORATIVE',
];

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category')?.toUpperCase() || 'ALL';
  const [activeCategory, setActiveCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : 'ALL'
  );
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (activeCategory !== 'ALL') {
          params.category = activeCategory;
        }
        const res = await api.getProjects(params);
        if (res.success) {
          setProjects(res.data);
        } else {
          setError(res.message || 'Failed to fetch projects.');
        }
      } catch (err) {
        console.error('Error in Portfolio page:', err);
        setError('Unable to connect to the portfolio server. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [activeCategory]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'ALL') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat.toLowerCase() });
    }
  };

  return (
    <div className="bg-studio-black text-studio-soft pt-32 pb-24 selection:bg-studio-gold selection:text-studio-black">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-studio-gold" />
          <span className="text-xs uppercase tracking-widestEditorial text-studio-gold font-mono">
            ARCHITECTURAL ARCHIVES
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-studio-borderSubtle">
          <div>
            <h1 className="text-5xl sm:text-7xl font-editorial font-normal text-white tracking-tight leading-tight">
              Selected Works & <br />
              <span className="italic font-light text-studio-gold">Spatial Studies.</span>
            </h1>
          </div>
          <div className="text-xs font-mono text-studio-medium uppercase tracking-widest">
            <span>Showing: {projects.length} Entries</span>
          </div>
        </div>

        {/* Notice of Demonstration Works */}
        <div className="mt-6 p-4 bg-studio-charcoal/40 border border-studio-borderSubtle flex items-start gap-3 text-xs text-studio-medium">
          <AlertCircle className="w-4 h-4 text-studio-gold shrink-0 mt-0.5" />
          <p>
            <strong className="text-studio-soft">Portfolio Transparency Notice:</strong> Projects displayed represent demonstration concepts, spatial case studies, and conceptual specifications curated for Haroon's Interiors aesthetic standards in Lahore.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-studio-borderSubtle">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                  isSelected
                    ? 'bg-studio-gold text-studio-black font-semibold shadow-lg'
                    : 'bg-studio-charcoal/40 text-studio-light/70 hover:text-white hover:bg-studio-dark'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetrical Masonry-Style Gallery */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : error ? (
          <div className="text-center py-24 border border-studio-borderSubtle bg-studio-charcoal/20">
            <p className="text-studio-gold text-sm font-mono mb-4">{error}</p>
            <button
              onClick={() => setActiveCategory('ALL')}
              className="px-6 py-2 border border-white/20 text-xs uppercase tracking-widest text-white hover:border-studio-gold hover:text-studio-gold"
            >
              Reset Filters
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 border border-studio-borderSubtle bg-studio-charcoal/20">
            <p className="text-studio-light text-lg font-editorial mb-2">No projects found in this category.</p>
            <p className="text-xs text-studio-medium mb-6">Select "ALL" to view the complete collection.</p>
            <button
              onClick={() => handleCategoryChange('ALL')}
              className="px-6 py-2.5 bg-studio-gold text-studio-black text-xs uppercase tracking-widest font-semibold"
            >
              View All Works
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {projects.map((project, idx) => {
              // Asymmetric layout logic: Alternate card spans for architectural magazine layout
              const isLarge = idx % 5 === 0;
              const isWide = idx % 5 === 3;
              const colSpan = isLarge ? 'md:col-span-8' : isWide ? 'md:col-span-7' : 'md:col-span-4';
              const aspectRatio = isLarge ? 'aspect-[16/10]' : isWide ? 'aspect-[16/9]' : 'aspect-[4/3]';

              return (
                <div key={project._id || project.id} className={`${colSpan} group`}>
                  <Link
                    to={`/portfolio/${project._id || project.id}`}
                    className="block overflow-hidden"
                  >
                    <div className={`relative ${aspectRatio} overflow-hidden border border-studio-borderSubtle bg-studio-charcoal`}>
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-studio-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="bg-studio-black/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-studio-gold border border-white/10">
                          {project.isSample ? 'Sample Project' : 'Studio Project'}
                        </span>
                        <span className="bg-studio-black/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-studio-light border border-white/10">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-studio-medium">
                          {project.location || 'Lahore, Pakistan'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-studio-gold opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <span>View Project</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-editorial text-white group-hover:text-studio-gold transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-studio-medium font-light line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-24">
        <div className="p-12 border border-studio-borderSubtle bg-studio-deep flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-editorial text-white mb-2">
              Commission a Custom Interior Design
            </h2>
            <p className="text-xs sm:text-sm text-studio-medium font-light">
              Speak directly with Haroon's Interiors regarding spatial planning, residential renovations, and custom finishes in Lahore.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-white text-studio-black font-semibold text-xs uppercase tracking-widest hover:bg-studio-gold transition-colors shrink-0"
          >
            Initiate Project Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
