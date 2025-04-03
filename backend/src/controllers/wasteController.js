const Waste = require('../models/Waste');

// Create new waste entry
exports.createWaste = async (req, res) => {
  try {
    const waste = new Waste(req.body);
    await waste.save();
    res.status(201).json(waste);
  } catch (error) {
    console.error('Error creating waste entry:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get recent waste entries (history)
exports.getRecentWaste = async (req, res) => {
  try {
    const wasteEntries = await Waste.find()
      .sort({ date: -1 })
      .limit(5);
    res.status(200).json(wasteEntries);
  } catch (error) {
    console.error('Error fetching waste history:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all waste entries
exports.getAllWaste = async (req, res) => {
  try {
    const wasteEntries = await Waste.find().sort({ date: -1 });
    res.status(200).json(wasteEntries);
  } catch (error) {
    console.error('Error fetching all waste entries:', error);
    res.status(500).json({ message: error.message });
  }
}; 