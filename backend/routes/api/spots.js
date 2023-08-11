const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');


const { requireAuth } = require('../../utils/auth');


//GET ALL SPOTS
router.get('/', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    })

    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })

    spotsList.forEach(spot => {
        spot.avgRating = 0
        spot.Reviews.forEach(review => {
            spot.avgRating += review.stars
        })
        spot.avgRating = spot.avgRating / spot.Reviews.length
        delete spot.Reviews
    })

    spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {

                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'no preview image found'
        }
        delete spot.SpotImages
    })

    res.json(spotsList)
})

//CREATE A SPOT
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.create(
        {
            ownerId:
                req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    res.json(spot);
})

//CREATE AN IMAGE FOR A SPOT
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    }

    const spotImage = await SpotImage.create({
        spotId: parseInt(req.params.spotId),
        url: url,
        preview: true
    })

    res.json(spotImage)
})

// GET ALL SPOTS OF CURRENT USERS
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    const spots = await Spot.findAll({
        where: {
            ownerId: userId
        },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    })
    let Spots = [];
    spots.forEach(spot => {
        Spots.push(spot.toJSON())
    })
    Spots.forEach(spot => {
        spot.avgRating = 0
        spot.Reviews.forEach(review => {
            spot.avgRating += review.stars
        })
        spot.avgRating = spot.avgRating / spot.Reviews.length
        delete spot.Reviews
    })

    Spots.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {

                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'no preview image found'
        }
        delete spot.SpotImages
    })

    res.json({ Spots })
})

// Get Details of a Spot by Id
router.get("/:spotId", async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: Review },
            { model: SpotImage, attributes: ["id", "url", "preview"] },
            { model: User, attributes: ["id", "firstName", "lastName"] },
        ],
    });

    if (spot) {
        let reviewcounter = 0;
        let totalStars = 0;

        spot.Reviews.forEach((review) => {
            reviewcounter++;
            totalStars += review.stars;
        });

        spot.dataValues.numReviews = reviewcounter;
        spot.dataValues.avgRating = totalStars / reviewcounter;

        delete spot.dataValues.Reviews;

        res.json(spot);
    } else {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
        });
    }
});


//EDIT A SPOT
router.put("/:spotId", requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewImage
    } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    }

    const editedSpot = await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewImage
    });
    res.json(editedSpot)
})

// Create a Review for a Spot based on the Spot's id
router.post(
    "/:spotId/reviews",
    requireAuth,
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        const { review, stars } = req.body;

        if (spot) {
            const reviewCheck = await Review.findOne({
                where: {
                    userId: req.user.id,
                    spotId: spot.id,
                },
            });

            if (!reviewCheck) {
                const newReview = await Review.create({
                    userId: req.user.id,
                    spotId: spot.id,
                    review,
                    stars,
                });

                res.status(201);
                return res.json(newReview);
            } else {
                res.status(500);
                res.json({ message: "User already has a review for this spot" });
            }
        } else {
            res.status(404);
            res.json({ message: "Spot couldn't be found" });
        }
    }
);

// Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    let userId = req.user.id;

    if (spot) {
        if (spot.ownerId === userId) {
            await spot.destroy();
        } else {
            res.status(403);
            res.json({
                message: "Spot must belong to the current user",
            });
        }
    } else {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
        });
    }

    res.json({ message: "Successfully deleted" });
});



module.exports = router;
