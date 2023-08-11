const express = require("express");
const router = express.Router();
const { User, Booking, Spot, SpotImage } = require("../../db/models");

const { requireAuth } = require('../../utils/auth');

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    let user = await User.findByPk(req.user.id)
    const bookings = await Booking.findAll({
        where: { userId: user.id },
        include: [
            {
                model: Spot,
                include: [{ model: SpotImage }],
                attributes: [
                    'id',
                    'ownerId',
                    'address',
                    'city',
                    'state',
                    'country',
                    'lat',
                    'lng',
                    'name',
                    'price'
                ],
            }
        ]
    })
    let bookingsList = [];
    bookings.forEach((booking) => {
        bookingsList.push(booking.toJSON())
    })
    bookingsList.forEach((booking) => {
        booking.Spot.SpotImages.forEach((image) => {
            if (image.preview === true) {

                booking.Spot.previewImage = image.url
            }
        })
        delete booking.Spot.SpotImages

    })
    res.json({ Bookings: bookingsList })
});



//Edit a booking

//Delete a booking

module.exports = router;
