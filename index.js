const express = require("express");
require("dotenv").config();
require("./config/db.config")();

const app = express();
app.use(express.json());

const reservationRoute = require("./routes/reservation")
app.use("/reservations", reservationRoute)

app.listen(Number(process.env.PORT), () => {
  "Server up an running."
});
