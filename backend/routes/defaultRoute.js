const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/customPage(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'customPage.html'))
});

module.exports = router