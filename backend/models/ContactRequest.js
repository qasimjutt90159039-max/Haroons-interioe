import mongoose from 'mongoose';

const ContactRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client full name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Contact phone number is required'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  service: {
    type: String,
    required: [true, 'Service required is mandatory'],
  },
  projectType: {
    type: String,
    default: 'Residential Renovation',
  },
  budget: {
    type: String,
    default: 'Flexible / To Be Discussed',
  },
  message: {
    type: String,
    required: [true, 'Project message/details are required'],
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in_progress', 'completed'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ContactRequestModel =
  mongoose.models.ContactRequest || mongoose.model('ContactRequest', ContactRequestSchema);
export default ContactRequestModel;
