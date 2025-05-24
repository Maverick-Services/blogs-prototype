import mongoose from 'mongoose';

const subServiceSchema = new mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    requiredDocuments: [{
        label: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
    }],
    requiredDetails: [{
        label: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
    }],
    actualPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discountedPrice: {
        type: Number,
        min: 0,
        validate: {
            validator: function (v) {
                return v === undefined || v < this.actualPrice;
            },
            message: props => `Discounted price (${props.value}) must be less than actual price`
        }
    },
    status: { // active or inactive
        type: Boolean,
        default: true
    },
});

subServiceSchema.index({ serviceId: 1, status: 1 });

const SubService = mongoose.models.SubService || mongoose.model('SubService', subServiceSchema);

export default SubService;
