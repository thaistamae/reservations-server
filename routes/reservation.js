const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const ReservationModel = require("../model/Reservation.model");

router.post("/create", async (req, res) => {
  try {
    const { checkInDate, checkOutDate } = req.body;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkIn < checkOut) {
      const reservation = await ReservationModel.create(req.body);
      return res.status(200).json(reservation);
    } else {
      return res.status(500).json("CheckOut need to be greater than CheckIn.");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const allReservations = await ReservationModel.find();
    return res.status(200).json(allReservations);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = await ReservationModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json(updatedReservation);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReservation = await ReservationModel.deleteOne({ _id: id });
    return res.status(200).json(deletedReservation);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/filtered-reservations", async (req, res) => {
  try {
    const { checkin, checkout } = req.query;
    console.log(checkin, checkout);
    const filteredReservations = await ReservationModel.find({
      $and: [
        { checkInDate: { $gte: new Date(checkin) } },
        { checkOutDate: { $lte: new Date(checkout) } },
      ],
    });
    return res.status(200).json(filteredReservations);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
