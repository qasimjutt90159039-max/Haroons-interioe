import bcrypt from 'bcryptjs';
import { userRepository, projectRepository, contactRepository } from './services/repository.js';

export const initialProjects = [
  {
    title: 'The Noir Residence — Spatial Living Pavilion',
    category: 'Residential',
    description: 'A comprehensive residential interior concept prioritizing spatial fluidity, dark monolithic stone surfaces, and natural daylight modulation. Custom built-in millwork conceals storage, framing deliberate architectural sightlines across the lounge and dining areas.',
    location: 'DHA Phase 6, Lahore',
    designStyle: 'Architectural Minimalism & Dark Luxury',
    materials: [
      'Nero Marquina Honed Marble',
      'Smoked Black Ash Veneer',
      'Charcoal Acoustic Wall Slats',
      'Linear LED Recessed Channels',
      'Raw Belgian Linen Upholstery'
    ],
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: true,
    isSample: true,
  },
  {
    title: 'Aethel Executive Studio & Boardroom Suite',
    category: 'Commercial',
    description: 'Designed for high-focus creative and commercial operations. The space integrates acoustic wall panels, micro-cement floor treatments, bespoke blackened steel partitions, and warm indirect ambient luminaires.',
    location: 'Gulberg III, Lahore',
    designStyle: 'Monolithic Editorial Workspace',
    materials: [
      'Blackened Steel Partitions',
      'Textured Dark Microcement',
      'Fluted Acoustical Oak Felt',
      'Brushed Champagne Brass Trim'
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: true,
    isSample: true,
  },
  {
    title: 'The Obsidian Master Chamber',
    category: 'Bedroom',
    description: 'A nocturnal sanctuary centered around textured fabric headboards, full-height dark acoustic louvers, concealed cove lighting, and a walk-in wardrobe with smoked glass vitrines.',
    location: 'Cantt, Lahore',
    designStyle: 'Sophisticated Dark Intimacy',
    materials: [
      'Custom Headboard Bouclé',
      'Smoked Bronze Glass Wardrobes',
      'Charcoal Micro-Suede Wall Wrap',
      'Integrated Dimmable Coves'
    ],
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: true,
    isSample: true,
  },
  {
    title: 'Monolith Living & Hearth Gallery',
    category: 'Living',
    description: 'An open-concept living suite featuring an elongated custom fireplace clad in flamed basalt granite, low-slung architectural seating, and floor-to-ceiling drapery creating balanced warmth against crisp dark surfaces.',
    location: 'Model Town, Lahore',
    designStyle: 'Textural Modernism',
    materials: [
      'Flamed Basalt Granite',
      'Oiled Walnut Joinery',
      'Warm Neutral Wool Rug',
      'Matte Black Aluminum Profiles'
    ],
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: true,
    isSample: true,
  },
  {
    title: 'Kanso Minimalist Penthouse',
    category: 'Modern',
    description: 'Rooted in reductive aesthetics where unnecessary ornamentation is stripped away. Clean continuous lines, negative space, and disciplined material choices evoke serenity above the vibrant city.',
    location: 'Ferozpur Road Corridor, Lahore',
    designStyle: 'Restrained Japanese Modernism',
    materials: [
      'Light Travertine Infills',
      'Matte Anthracite Cabinetry',
      'Shadow-Gap Baseboards',
      'Architectural Downlighting'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: true,
    isSample: true,
  },
  {
    title: 'Tactile Geometric Wall & Fluted Surface Treatment',
    category: 'Decorative',
    description: 'An exploration of sculptural vertical surfaces. Custom milled charcoal panels, indirect wash lighting, and raw brass revealed joints transform structural walls into tactile artistic statements.',
    location: 'Ichhra & Gulberg Vicinity, Lahore',
    designStyle: 'Architectural Surface Sculpting',
    materials: [
      'CNC Milled MDF Slats',
      'Lime Wash Mineral Paint',
      'Satin Brass Inlay Strips',
      'Concealed Grazing Luminaires'
    ],
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: false,
    isSample: true,
  },
  {
    title: 'Verona Executive Lounge & Library',
    category: 'Commercial',
    description: 'A bespoke meeting lounge blending dark stained oak book stacks, floor-to-ceiling perimeter glazing, and sculptural modular seating tailored for discreet executive discussions.',
    location: 'Main Boulevard, Lahore',
    designStyle: 'Executive Architectural Comfort',
    materials: [
      'Dark Stained European Oak',
      'Nero Granite Credenza',
      'Full Grain Leather Furniture',
      'Bronze Wire Mesh Screens'
    ],
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: false,
    isSample: true,
  },
  {
    title: 'The Alabaster & Charcoal Private Villa Suite',
    category: 'Bedroom',
    description: 'A layered master sanctuary contrasting warm soft alabaster bouclé with razor-sharp charcoal geometric portals, recessed reading niches, and integrated acoustic drapery.',
    location: 'Bahria Town, Lahore',
    designStyle: 'Contrast Monolith Luxury',
    materials: [
      'Alabaster Plaster Finish',
      'Deep Charcoal Ash Paneling',
      'Satin Gold Sconces',
      'Custom Deep-Pile Carpet'
    ],
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1600&q=80'
    ],
    featured: false,
    isSample: true,
  }
];

export const seedInitialData = async () => {
  try {
    // 1. Seed Admin User if not existing
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@haroonsinteriors.com';
    const existingUser = await userRepository.findByEmail(adminEmail);

    if (!existingUser) {
      const rawPassword = process.env.ADMIN_PASSWORD || 'Haroon@Admin2026!';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(rawPassword, salt);

      await userRepository.create({
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`[Seed] Created default admin user: ${adminEmail}`);
    }

    // 2. Seed Projects if none exist
    const projectCount = await projectRepository.count();
    if (projectCount === 0) {
      for (const p of initialProjects) {
        await projectRepository.create(p);
      }
      console.log(`[Seed] Inserted ${initialProjects.length} curated architectural projects.`);
    }

    // 3. Seed Initial Demo Lead Inquiries if none exist
    const initialContacts = await contactRepository.findAll();
    if (initialContacts.length === 0) {
      await contactRepository.create({
        name: 'Bilal Farooq',
        phone: '+92 300 4829104',
        email: 'bilal.farooq@example.com',
        service: 'Residential Interiors',
        projectType: 'Full Villa Renovation',
        budget: 'PKR 15M - 25M',
        message: 'Looking for a comprehensive dark luxury architectural design for our 1-kanal home in DHA Lahore.',
        status: 'new',
      });

      await contactRepository.create({
        name: 'Amina Rehman',
        phone: '+92 321 9901428',
        email: 'amina.design@corporate.pk',
        service: 'Commercial Interiors',
        projectType: 'Executive Office Design',
        budget: 'PKR 8M - 12M',
        message: 'Need modern space planning and acoustic wall panelling for our corporate floor in Gulberg.',
        status: 'contacted',
      });
      console.log('[Seed] Inserted demonstration lead inquiries for admin testing.');
    }
  } catch (error) {
    console.error('[Seed Error]', error);
  }
};

// Direct script execution
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  (async () => {
    const { connectDB } = await import('./config/db.js');
    await connectDB();
    await seedInitialData();
    console.log('[Seed] Done executing seed script.');
    process.exit(0);
  })();
}
