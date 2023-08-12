const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const validateQuery = [
    check("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be greater than or equal to 1"),
    check("size")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Size must be greater than or equal to 1"),
    check("maxLat")
        .optional()
        .isNumeric()
        .isInt({ min: -1000, max: 1000 })
        .withMessage("Maximum latitude is invalid"),
    check("minLat")
        .optional()
        .isNumeric()
        .isInt({ min: -1000, max: 1000 })
        .withMessage("Minimum latitude is invalid"),
    check("maxLng")
        .optional()
        .isNumeric()
        .isInt({ min: -2000, max: 2000 })
        .withMessage("Maximum longitude is invalid"),
    check("minLat")
        .optional()
        .isNumeric()
        .isInt({ min: -2000, max: 2000 })
        .withMessage("Minimum longitude is invalid"),
    check("minPrice")
        .optional()
        .isInt({ min: 0 })
        .isNumeric()
        .withMessage("Minimum price must be greater than or equal to 0"),
    check("maxPrice")
        .optional()
        .isInt({ min: 0 })
        .isNumeric()
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors,
];


//Get all spots -----------------------------------------------------------------------------
router.get('/', validateQuery, async (req, res) => {

    //get spots query filters

    let { page, size } = req.query;
    page = parseInt(page)
    size = parseInt(size)

    if (!page || isNaN(page) || page > 10) page = 1
    if (!size || isNaN(size) || size > 20) size = 20

    let pagination = {
        limit: size,
        offset: size * (page - 1)
    }

    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ], ...pagination
    });

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
    const validateObj = {
        Spots: spotsList,
        page: page,
        size: size
    };

    res.json(validateObj)
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

// Get all bookings for a spot based on the spots id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    let spotId = req.params.spotId;
    let spot = await Spot.findOne({
        where: { id: spotId }
    });

    if (spot) {
        if (spotId === spot.ownerId) {
            const bookingOwner = await Booking.findAll({
                where: {
                    spotId: spot.id,
                },
                include: [
                    {
                        model: User,
                        attributes: ["id", "firstName", "lastName"]
                    }],
            });
            res.json({ Bookings: bookingOwner })
        } else {
            const notOwnerBookings = await Booking.findAll({
                where: {
                    spotId: spot.id,
                },
                attributes: ["spotId", "startDate", "endDate"],
            });

            res.json({ Bookings: notOwnerBookings });
        }
    } else {
        res.status(404);
        res.json({ message: "Spot couldn't be found" });
    }
});

// Create a booking from a spot based on the spots id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Booking.findByPk(req.params.spotId)
    const { startDate, endDate } = req.body;

    if (spot) {
        const createdBooking = await Booking.findOne({
            where: {
                userId: req.user.id,
                spotId: spot.id
            }
        })
        if (!createdBooking) {
            const createBooking = await Booking.create({
                spotId: spot.id,
                userId: req.user.id,
                startDate,
                endDate
            })
            res.status(200);
            return res.json(createBooking)
        } else {
            res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
    } else {
        res.status(404).json({ message: "Spot couldn't be found " })
    }
})





module.exports = router;
