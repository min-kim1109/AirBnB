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
router.put('/:bookingsId', requireAuth, async (req, res) => {
    let bookingEdit = await Booking.findByPk(req.params.bookingsId);
    let user = await User.findByPk(req.user.id);

    if (bookingEdit) {
        if (bookingEdit.userId === user.id) {
            const { startDate, endDate } = req.body

            await bookingEdit.update({
                startDate,
                endDate
            })
        } else {
            res.status(404).json({ message: "Booking couldn't be found" })
        }
    }
    res.json(bookingEdit)
});

//Delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId
    let booking = await Booking.findByPk(bookingId)

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" })
    }

    await booking.destroy()
    return res.status(200).json({ message: "Successfully deleted" })
})

module.exports = router;
