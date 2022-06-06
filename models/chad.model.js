import mongoose from 'mongoose';
import fs from 'fs';

const bitmap = fs.readFileSync('./images/defaultchad.png');
const defaultImage = 'data:image/jpeg;charset=utf-8;base64,' + new Buffer(bitmap).toString('base64');

const chadSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: false
    },
    description: {
        type: String,
        default: '',
        trim: false,
        required: false,
        unique: false
    },
    image: {
        type: String,
        default: defaultImage,
        trim: false,
        required: false,
        unique: false
    },
    likedBy: {
        type: [String],
        default: [],
        trim: false,
        required: false,
        unique: false
    },
    createdBy: {
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

export default mongoose.model('chads', chadSchema);