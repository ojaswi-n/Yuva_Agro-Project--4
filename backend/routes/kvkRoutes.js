const express = require('express');

const {
    getAllKVKs,
    getKVKsByState,
    getKVKById
} = require('../controllers/kvkController');

const router = express.Router();


router.get('/', (req, res) => {

    if (req.query.state) {
        return getKVKsByState(req, res);
    }

    return getAllKVKs(req, res);
});

router.get('/:id', getKVKById);

module.exports = router;
