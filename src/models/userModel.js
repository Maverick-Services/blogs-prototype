import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
    view: { type: Boolean, default: false },
    add: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
}, 2);

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
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
    },
    password: {
        type: String,
        select: false,
        required: function () {
            return this.provider === 'credentials';
        }
    },
    role: {
        type: String,
        enum: ['admin', 'sub-admin', 'user'],
        default: 'user'
    },
    provider: {
        type: String,
        enum: ['google', 'credentials'],
        default: 'credentials'
    },
    permissions: {
        type: Map,
        of: permissionSchema,
        default: () => new Map()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User