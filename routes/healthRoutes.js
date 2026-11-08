
const express = require('express');
const getHealth = require('../controllers/getHealth');

const router = express.Router();

router.get('/', getHealth);

module.exports = router;
