const express = require("express");
const router = express.Router();

const { User, Review, Spot, SpotImage, ReviewImage, } = require("../../db/models");

const { requireAuth } = require("../../utils/auth");


// Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
    let user = await User.findByPk(req.user.id);
    let reviews = await Review.findAll({
        where: {
            userId: user.id,
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,
                attributes: [
                    "id",
                    "ownerId",
                    "address",
                    "city",
                    "state",
                    "country",
                    "lat",
                    "lng",
                    "name",
                    "price",
                ],
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            },
        ],
    });

    let reviewsList = [];
    reviews.forEach((review) => {
        reviewsList.push(review.toJSON());
    });

    reviewsList.forEach((review) => {
        review.Spot.SpotImages.forEach((image) => {
            if (image.preview === true) {
                review.Spot.previewImage = image.url;
            }
        });
        delete review.Spot.SpotImages;
    });

    res.json({ Reviews: reviewsList });
});



module.exports = router;
