const KVK = require('../models/KVK');
const connectDB = require('../config/db');

function requireDB(res) {
    if (!connectDB.isConnected()) {
        res.status(503).json({
            message: 'Database is not connected.'
        });

        return false;
    }

    return true;
}


// GET /api/kvks
function getAllKVKs(req, res) {
    if (!requireDB(res)) return;

    KVK.find()
        .sort({ state: 1, district: 1 })
        .then(kvks => {
            res.json(kvks);
        })
        .catch(error => {
            console.error('KVK fetch error:', error);

            res.status(500).json({
                message: 'Unable to fetch agricultural experts'
            });
        });
}


// GET /api/kvks?state=Uttar Pradesh
function getKVKsByState(req, res) {
    if (!requireDB(res)) return;

    const { state } = req.query;

    if (!state) {
        return res.status(400).json({
            message: 'State is required'
        });
    }

    KVK.find({
        state: {
            $regex: `^${state}$`,
            $options: 'i'
        }
    })
        .sort({ district: 1 })
        .then(kvks => {
            res.json(kvks);
        })
        .catch(error => {
            console.error('KVK state search error:', error);

            res.status(500).json({
                message: 'Unable to fetch agricultural experts'
            });
        });
}


// GET /api/kvks/:id
function getKVKById(req, res) {
    if (!requireDB(res)) return;

    KVK.findById(req.params.id)
        .then(kvk => {

            if (!kvk) {
                return res.status(404).json({
                    message: 'Agricultural expert center not found'
                });
            }

            res.json(kvk);
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            });
        });
}


module.exports = {
    getAllKVKs,
    getKVKsByState,
    getKVKById
};
