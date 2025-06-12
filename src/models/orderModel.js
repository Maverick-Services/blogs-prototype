import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
});

const refundSchema = new mongoose.Schema({
    refundId: { type: String },
    amount: { type: Number },
    date: { type: Date }
});

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
        subService: { type: mongoose.Schema.Types.ObjectId, ref: 'SubService', required: true },
        details: { type: Object, required: true },
        documents: [
            {
                fieldName: String,
                url: String
            }
        ],
        amount: { type: Number, required: true },
        paymentStatus: { type: String, enum: ['paid', 'pending', 'failed'], default: 'paid' },
        status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
        refund: refundSchema,
        messages: [messageSchema]
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
