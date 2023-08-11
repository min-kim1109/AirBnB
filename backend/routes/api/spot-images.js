const express = require("express");
const router = express.Router();
const { SpotImage } = require("../../db/models");

const { requireAuth } = require('../../utils/auth');

//Delete an image for a spot
router.delete("/:imageId", requireAuth, async (req, res) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId);

    if (!spotImage) {
        res.status(404)
        res.json({
            message: "Review Image couldn't be found",
        })
    }

    else {
        await spotImage.destroy();

        res.status(200);
        res.json({ "message": "Successfully deleted" })
    }
})

module.exports = router;
