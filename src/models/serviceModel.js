import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true,
        maxlength: 160
    },
    imageURL: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/.test(v);
            },
            message: props => `${props.value} is not a valid image URL`
        }
    },
    pageHeading: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    serviceTypeDetails: {
        type: [{
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        }],
        validate: [arrayLimit(10), 'Exceeds maximum of 10 service type details']
    },
    serviceBigDescription: [{
        name: { type: String, maxlength: 20, required: true, },
        title: { type: String, maxlength: 50, required: true, },
        content: { type: String, maxlength: 500, required: true, }
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    status: { // active or inactive
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

// Array limit validator
function arrayLimit(max) {
    return function (v) {
        return v.length <= max;
    };
}

serviceSchema.index({ name: 1 }, { unique: true });
serviceSchema.index({ status: 1 });
serviceSchema.index({ featured: 1 });
serviceSchema.index({ categories: 1, status: 1 });
serviceSchema.index({ slug: 1, status: 1 });
serviceSchema.index({ featured: 1, status: 1 });
serviceSchema.index({ tags: 1, status: 1 });

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export default Service;