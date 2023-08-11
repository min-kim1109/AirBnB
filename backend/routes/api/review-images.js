const express = require('express');

const { Spot, SpotImage, User, ReviewImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const review = require('../../db/models/review');

const router = express.Router();

// Delete reviewImages
router.delete("/:imageId", requireAuth, async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);


    if (!reviewImage) {
        res.status(404)
        res.json({
            message: "Review Image couldn't be found",
        })
    }

    else {
        await reviewImage.destroy();

        res.status(200);
        res.json({ "message": "Successfully deleted" })
    }
})



module.exports = router;
