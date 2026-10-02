const Farmer = require('../models/Farmer');
const connectDB = require('../config/db');

// Guard: without this, Mongoose silently buffers queries for 10s and the page
// just hangs. This returns an honest error straight away instead.
function requireDB(res) {
    if (!connectDB.isConnected()) {
        res.status(503).json({
            message: 'Database is not connected. Start MongoDB and restart the server.'
        });
        return false;
    }
    return true;
}

// GET /api/farmers
function getFarmers(req, res) {
    if (!requireDB(res)) return;

    Farmer.find()
        .then(farmers => {
            res.json(farmers);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
}

// GET /api/farmers/:id
function getFarmer(req, res) {
    if (!requireDB(res)) return;

    Farmer.findById(req.params.id)
        .then(farmer => {
            if (!farmer) {
                return res.status(404).json({
                    message: "Farmer not found"
                });
            }

            res.json(farmer);
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            });
        });
}

// POST /api/farmers
function registerFarmer(req, res) {
    if (!requireDB(res)) return;

    const { name, village, crop, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).json({
            message: "Name and phone are required"
        });
    }

    Farmer.findOne({ phone })
        .then(existingFarmer => {

            if (existingFarmer) {
                return res.status(409).json({
                    message: "Phone number already registered"
                });
            }

            const farmer = new Farmer({
                name,
                village,
                crop,
                phone
            });

            return farmer.save();
        })
        .then(newFarmer => {

            if (newFarmer) {
                res.status(201).json({
                    message: "Farmer registered successfully"
                });
            }

        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            });
        });
}

module.exports = {
    getFarmers,
    getFarmer,
    registerFarmer
};