const express = require('express');
const router = express.Router();
const bountyController = require('../../controllers/bounty.controller');

// /api/bounty/create
router.post('/create', bountyController.createBounty);

// /api/bounty/:id
router.get('/:id', bountyController.getBountyById);
router.delete('/:id', bountyController.deleteBountyById);

module.exports = router;