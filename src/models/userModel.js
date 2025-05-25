import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
    view: { type: Boolean, default: false },
    add: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    role: {
        type: String,
        enum: ['admin', 'sub-admin', 'user'],
        default: 'user'
    },

    permissions: {
        dashboard: { type: permissionSchema, default: () => ({ view: true }) },
        services: { type: permissionSchema, default: () => ({}) },
        categories: { type: permissionSchema, default: () => ({}) },
        tags: { type: permissionSchema, default: () => ({}) },
        media: { type: permissionSchema, default: () => ({}) }
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });


export default mongoose.models.User || mongoose.model('User', userSchema);
