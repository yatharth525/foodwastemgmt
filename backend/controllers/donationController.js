const Donation = require('../models/Donation');
const User = require('../models/User');

const createDonation = async (req, res) => {
  const { title, description, quantity, category, pickupTime } = req.body;
  if (req.user.role !== 'donor') {
    return res.status(403).json({ message: 'Only donors can create a donation' });
  }
  try {
    const donation = new Donation({
      donor: req.user.id,
      title,
      description,
      quantity,
      category,
      pickupTime,
    });
    const createdDonation = await donation.save();
    res.status(201).json(createdDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'available' }).populate('donor', 'name');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDonationsByDonor = async (req, res) => {
  if (req.user.role !== 'donor') {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const donations = await Donation.find({ donor: req.user.id });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteDonation = async (req, res) => {
  const donationId = req.params.id;
  
  try {
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Check if the logged-in user is the original donor
    // Convert ObjectId to string for comparison
    if (donation.donor.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this donation' });
    }

    await Donation.deleteOne({ _id: donationId });
    res.json({ message: 'Donation removed successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createDonation,
  getDonations,
  getDonationsByDonor,
  deleteDonation
};