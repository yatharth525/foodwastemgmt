const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createDonation,
  getDonations,
  getDonationsByDonor,
  deleteDonation, 
} = require('../controllers/donationController');

const router = express.Router();

router.post('/', protect, createDonation);
router.get('/', protect, getDonations);    
router.get('/my', protect, getDonationsByDonor);
router.delete('/:id', protect, deleteDonation); 

module.exports = router;