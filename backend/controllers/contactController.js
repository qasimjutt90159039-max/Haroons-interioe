import { contactRepository } from '../services/repository.js';

export const submitContact = async (req, res) => {
  try {
    const { name, phone, email, service, projectType, budget, message } = req.body;

    // Strict validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Full Name is required.',
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Phone Number is required.',
      });
    }

    if (!service || !service.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please select a required interior design service.',
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please describe your project requirements.',
      });
    }

    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.',
        });
      }
    }

    const contactData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim().toLowerCase() : '',
      service: service.trim(),
      projectType: projectType ? projectType.trim() : 'General Inquiry',
      budget: budget ? budget.trim() : 'To Be Discussed',
      message: message.trim(),
      status: 'new',
    };

    const newInquiry = await contactRepository.create(contactData);

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting Haroon\'s Interiors. Your project inquiry has been received. We will get in touch shortly.',
      data: newInquiry,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry due to server error. Please try again or call us directly.',
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await contactRepository.findAll();
    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact inquiries.',
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving inquiry.',
    });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updated = await contactRepository.updateStatus(id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    res.json({
      success: true,
      message: `Inquiry status updated to ${status}.`,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating status.',
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await contactRepository.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    res.json({
      success: true,
      message: 'Inquiry deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting contact inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting inquiry.',
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await contactRepository.getStats();
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error calculating dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to calculate stats.',
    });
  }
};
