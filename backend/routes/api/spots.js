const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');


const { requireAuth } = require('../../utils/auth');


//Get all spots -----------------------------------------------------------------------------
router.get('/', async (req, res) => {
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

//Create a spot
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

//Create an image for a spot
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

// Get all spots owned by the current users
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
            { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
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


//Edit a spot
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
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
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
        }
    } else {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
        });
    }

    res.json({ message: "Successfully deleted" });
});

// Get all reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);

    if (spot) {
        let reviews = await Review.findAll({
            where: {
                spotId: spot.id,
            },
            include: [
                { model: User, attributes: ["id", "firstName", "lastName"] },
                { model: ReviewImage, attributes: ["id", "url"] },
            ],
        });

        res.json({ Reviews: reviews });
    } else {
        res.status(404);
        res.json({ message: "Spot couldn't be found" });
    }
});

// Create a booking based on spot's id


module.exports = router;
