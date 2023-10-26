const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { Review } = require('../../db/models');
const { User } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { Booking } = require('../../db/models');


const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isNumeric()
        .isFloat({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

const validateQuery = [
    check('page')
        .isFloat({ min: 1 })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .isFloat({ min: 1 })
        .withMessage('Page must be greater than or equal to 1'),
    handleValidationErrors
]

// get all spots
router.get('/',
    async (req, res) => {
        // PAGINATION
        let { page, size } = req.query;

        if (page <= 0) {
            res.status(400);
            return res.json({
                "message": "Bad Request",
                "errors": {
                    "page": "Page must be greater than or equal to 1",
                }
            })
        };

        if (size <= 0) {
            res.status(400);
            return res.json({
                "message": "Bad Request",
                "errors": {
                    "size": "Size must be greater than or equal to 1",
                }
            })
        };

        if (!page || isNaN(parseInt(page)) || parseInt(page) > 10) page = 1;
        if (!size || isNaN(parseInt(size)) || parseInt(size) > 20) size = 20;

        let pagination = {};
        pagination.limit = size;
        pagination.offset = size * (page - 1);


        const spots = await Spot.findAll({
            include: [{ model: SpotImage }, { model: Review }],
            ...pagination
        });


        let allSpots = [];
        spots.forEach(spot => {
            allSpots.push(spot.toJSON())
        });

        // get average stars
        allSpots.forEach(spot => {
            spot.avgRating = 0;
            spot.Reviews.forEach(review => {
                spot.avgRating += review.stars;
            })
            spot.avgRating = spot.avgRating / spot.Reviews.length
            delete spot.Reviews;
        });

        // get preview Image
        allSpots.forEach(spot => {
            spot.SpotImages.forEach(image => {
                if (image.preview) {
                    spot.previewImage = image.url
                }
            })
            if (!spot.previewImage) {
                spot.preview = 'No preview image.'
            }
            delete spot.SpotImages;
        })

        res.status(200);
        return res.json({ Spots: allSpots, page: parseInt(page), size: parseInt(size) })
    });

// get all spots owned by current user
router.get('/current',
    requireAuth,
    async (req, res) => {
        const { user } = req;

        const spots = await Spot.findAll({
            where: {
                ownerId: user.id
            },
            include: [SpotImage, Review]
        });

        let allSpots = [];
        spots.forEach(spot => {
            allSpots.push(spot.toJSON())
        });

        // get average stars
        allSpots.forEach(spot => {
            spot.avgRating = 0;
            spot.Reviews.forEach(review => {
                spot.avgRating += review.stars;
            })
            spot.avgRating = spot.avgRating / spot.Reviews.length
            delete spot.Reviews;
        });

        // get preview Image
        allSpots.forEach(spot => {
            spot.SpotImages.forEach(image => {
                if (image.preview) {
                    spot.previewImage = image.url
                }
            })
            if (!spot.previewImage) {
                spot.previewImage = 'No preview image.'
            }
            delete spot.SpotImages;
        })

        return res.json({ Spots: allSpots })
    });

// get all bookings for a spot based on spot id
router.get('/:spotId/bookings',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const spot = await Spot.findByPk(req.params.spotId);

        if (!spot) {
            res.status(404);
            res.json({ message: 'Spot couldn\'t be found' })
        }

        if (user.id !== spot.ownerId) {
            const bookings = await Booking.findAll({ where: { spotId: req.params.spotId }, attributes: ['spotId', 'startDate', 'endDate'] });

            let userBookings = [];
            bookings.forEach(booking => userBookings.push(booking.toJSON()));

            userBookings.forEach(booking => {
                let startDate = JSON.stringify(booking.startDate);
                booking.startDate = startDate.slice(1, 11);

                let endDate = JSON.stringify(booking.endDate);
                booking.endDate = endDate.slice(1, 11);
            })

            res.status(200);
            return res.json({ Bookings: userBookings })
        };

        if (user.id === spot.ownerId) {
            const bookings = await Booking.findAll({
                where: { spotId: req.params.spotId }, include: {
                    model: User, attributes: ['id', 'firstName', 'lastName']
                }
            });

            let ownerBookings = [];
            bookings.forEach(booking => {
                ownerBookings.push(booking.toJSON())
            });

            ownerBookings.forEach(booking => {
                let startDate = JSON.stringify(booking.startDate);
                booking.startDate = startDate.slice(1, 11);

                let endDate = JSON.stringify(booking.endDate);
                booking.endDate = endDate.slice(1, 11);

                let createdAt = JSON.stringify(booking.createdAt);
                createdAt = createdAt.slice(1, 20);
                booking.createdAt = createdAt.split("T").join(" ");

                let updatedAt = JSON.stringify(booking.updatedAt);
                updatedAt = updatedAt.slice(1, 20);
                booking.updatedAt = updatedAt.split("T").join(" ");
            })

            res.status(200);
            res.json({ Bookings: ownerBookings })
        };
    });

// get all reviews based on a spot id
router.get('/:spotId/reviews', async (req, res) => {
    const reviews = await Review.findAll({
        where: { spotId: req.params.spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({ "message": "Spot couldn't be found" })
    }

    res.status(200);
    return res.json({ Reviews: reviews })
});

// create a review for a spot based on spot id
router.post('/:spotId/reviews',
    requireAuth,
    validateReview,
    async (req, res) => {
        const { user } = req;
        const { review, stars } = req.body;

        let spot = await Spot.findByPk(req.params.spotId);

        if (!spot) {
            res.status(404);
            return res.json({ "message": "Spot couldn't be found" })
        }

        const checkReview = await Review.findAll({ where: { spotId: req.params.spotId } });
        let checkReviewJSON = [];
        checkReview.forEach(review => {
            checkReviewJSON.push(review.toJSON())
        });

        let reviewed = false;
        checkReviewJSON.forEach(review => {
            if (review.userId === user.id) {
                reviewed = true
            }
        })

        if (reviewed) {
            res.status(500);
            return res.json({ "message": "User already has a review for this spot" })
        }
        else {
            let newReview = await spot.createReview({
                userId: user.id,
                review,
                stars
            });

            res.status(201);
            return res.json(newReview)
        }
    })

//get details of a spot from an id
router.get('/:spotId', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404);
        return res.json({ message: 'Spot couldn\'t be found.' })
    }
    spot = spot.toJSON();

    let reviews = await Review.findAll({ where: { spotId: req.params.spotId } });

    let reviewJSON = [];
    reviews.forEach(review => {
        reviewJSON.push(review.toJSON())
    });

    let numReviews = reviews.length;
    let sum = 0;
    reviewJSON.forEach(review => {
        sum += review.stars
    });
    let avgStars = sum / numReviews;

    spot.numReviews = numReviews;
    spot.avgStarRating = avgStars;

    let images = await SpotImage.findAll({ where: { spotId: req.params.spotId }, attributes: ['id', 'url', 'preview'] });
    spot.SpotImages = images;

    let owner = await User.findByPk(spot.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    });
    spot.Owner = owner;

    return res.json(spot)
});

// create a spot
router.post('/',
    requireAuth,
    validateSpot,
    async (req, res) => {
        const { user } = req;
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        if (user) {
            const createSpot = await Spot.create({
                ownerId: user.id,
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            });
            res.status(201);
            return res.json(createSpot)
        } else {
            res.status(404);
            return res.json({ user: null })
        }
    });

// create a booking for a spot based on spot id
router.post('/:spotId/bookings',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const { startDate, endDate } = req.body;
        const spot = await Spot.findByPk(req.params.spotId);

        if (!spot) {
            res.status(404);
            return res.json({ message: "Spot couldn't be found" })
        };

        if (spot.ownerId === user.id) {
            res.status(403);
            return res.json({ message: "Forbidden: spot belongs to current user." })
        };

        const userStart = new Date(startDate);
        const userEnd = new Date(endDate);

        let numStart = userStart.getTime();
        let numEnd = userEnd.getTime();

        if (numStart >= numEnd) {
            res.status(400);
            return res.json({
                message: "Bad Request",
                errors: {
                    endDate: "endDate cannot be on or before startDate"
                }
            })
        };

        const bookings = await Booking.findAll({ where: { spotId: req.params.spotId } });
        let conflict = false;

        let checkStart = [];
        let checkEnd = [];

        bookings.forEach(booking => {
            let formatStart = JSON.stringify(booking.startDate);
            formatStart = formatStart.slice(1, 11);
            let bookedStart = new Date(formatStart);

            let formatEnd = JSON.stringify(booking.endDate);
            formatEnd = formatEnd.slice(1, 11);
            let bookedEnd = new Date(formatEnd);

            bookedStart = bookedStart.getTime();
            bookedEnd = bookedEnd.getTime();

            if (bookedStart <= numStart && numStart <= bookedEnd) conflict = true;
            if (numStart <= bookedStart && bookedStart <= numEnd && numEnd <= bookedStart) conflict = true;
            if (numStart <= bookedStart && numEnd >= bookedStart) conflict = true;
        });


        if (conflict) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

        let createBooking = await spot.createBooking({
            spotId: parseInt(req.params.spotId),
            userId: parseInt(user.id),
            startDate,
            endDate
        });

        res.status(200);
        return res.json(createBooking)
    });

// create an image to a spot based on spot id
router.post('/:spotId/images',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const { url, preview } = req.body;
        let spot = await Spot.findByPk(req.params.spotId);

        if (!spot) {
            res.status(404);
            return res.json({ message: "Spot couldn't be found" })
        };

        if (user.id !== spot.ownerId) {
            res.status(403);
            return res.json({ message: 'Forbidden: Spot does not belong to current user' })
        };

        if (user.id === spot.ownerId) {
            const image = await spot.createSpotImage({
                url: url,
                preview: preview
            });

            await image.save();

            let response = {};
            response.id = image.id;
            response.url = image.url;
            response.preview = image.preview;

            return res.json(response);
        }
    });

// edit a spot
router.put('/:spotId',
    requireAuth,
    validateSpot,
    async (req, res) => {
        let spot = await Spot.findByPk(req.params.spotId);

        const { user } = req;

        if (!user) {
            return res.json({ user: null })
        }

        if (!spot) {
            res.status(404);
            return res.json({ message: 'Spot couldn\'t be found' })
        };

        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        if (user) {
            if (user.id === spot.ownerId) {
                spot.address = address,
                    spot.city = city,
                    spot.state = state,
                    spot.country = country,
                    spot.lat = lat,
                    spot.lng = lng,
                    spot.name = name,
                    spot.description = description,
                    spot.price = price,

                    await spot.save();

                res.status(200);
                res.json(spot)
            } else if (user.id !== spot.ownerId) {
                res.status(403);
                return res.json({ message: 'Forbidden: User not authorized to make edit.' })
            }
        }
    });

// delete a spot
router.delete('/:spotId',
    requireAuth,
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        const { user } = req;

        if (!user) {
            return res.json({ user: null })
        };

        if (!spot) {
            res.status(404);
            return res.json({ message: 'Spot couldn\'t be found.' })
        };

        if (user) {
            if (user.id === spot.ownerId) {
                await spot.destroy();

                res.status(200);
                return res.json({ message: 'Successfully deleted' })
            } else if (user.id !== spot.ownerId) {
                res.status(403);
                return res.json({ message: 'Forbidden: Only the owner can delete this spot.' })
            }
        }
    })

module.exports = router;
