const mongoose=require("mongoose")
const PaymentSchema = new mongoose.Schema({
    userId: String,
    paymentMethod: String,
    cardDetails: {
        cardNumber: String,
        expiry: String,
        cvv: String,
    },
    upiId: String,
    wallet: String,
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Payment', PaymentSchema);
