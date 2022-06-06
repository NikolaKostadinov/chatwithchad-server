import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        unique: false
    },
    refreshToken: {
        type: String,
        trim: false,
        required: true,
        unique: false
    },
    createdAt: {
        type: Date,
        default: new Date(),
        trim: false,
        required: false,
        unique: false
    }
});

export default mongoose.model('users', userSchema);