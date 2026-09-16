import express from 'express';
import {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getDashboardStats,
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', protect, getContacts);
router.get('/stats', protect, getDashboardStats);

router.route('/:id')
  .get(protect, getContactById)
  .put(protect, updateContactStatus)
  .delete(protect, deleteContact);

export default router;
