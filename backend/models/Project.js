import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    enum: ['Residential', 'Commercial', 'Bedroom', 'Living', 'Modern', 'Decorative'],
    default: 'Residential',
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
  },
  location: {
    type: String,
    default: 'Lahore, Pakistan',
  },
  designStyle: {
    type: String,
    default: 'Contemporary Luxury',
  },
  materials: {
    type: [String],
    default: ['Smoked Oak', 'Brushed Brass', 'Fluted Glass', 'Nero Marquina Marble'],
  },
  images: {
    type: [String],
    required: [true, 'At least one image URL is required'],
    validate: [val => val.length > 0, 'Must have at least one project image'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  isSample: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export default ProjectModel;
