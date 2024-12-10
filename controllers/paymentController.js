const Stripe = require("stripe");
const Booking = require("../models/bookingModel");
const Notification = require("../models/notificationModel");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // تأكد من وضع مفتاح Stripe في المتغيرات البيئية
// بعد تحديث حالة الدفع
// if (paymentIntent.status === 'succeeded') {
//   await new Notification({
//     user: booking.user,
//     type: 'payment',
//     message: `Your payment of $${amount} was successful.`,
//   }).save();
// }

// إنشاء عملية دفع
const createPayment = async (req, res) => {
  const { bookingId, amount, currency = "usd" } = req.body;

  try {
    // تحقق من وجود الحجز
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // إنشاء Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe يستخدم السنتات
      currency,
      metadata: { bookingId },
    });

    // تحديث معلومات الدفع في الحجز
    booking.payment = {
      status: "pending",
      amount,
      paymentIntentId: paymentIntent.id,
    };
    await booking.save();

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating payment", error });
  }
};

// تحديث حالة الدفع
const updatePaymentStatus = async (req, res) => {
  const { paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // تحديث حالة الدفع بناءً على Stripe
    const booking = await Booking.findOne({
      "payment.paymentIntentId": paymentIntentId,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.payment.status =
      paymentIntent.status === "succeeded" ? "completed" : "failed";

    await booking.save();

    res.json({
      message: "Payment status updated",
      status: booking.payment.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment status", error });
  }
};

module.exports = { createPayment, updatePaymentStatus };
