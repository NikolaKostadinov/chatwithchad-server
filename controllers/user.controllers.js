import bcrypt from 'bcryptjs';

import { generateAccessToken, generateRefreshToken } from '../middleware/tokenmanager.js';
import userModel from '../models/user.model.js';

export const loginUser = async (request, response) => {
    try {

        const user = request.body.user;
        const [ userInDB ] = await userModel.find({ username: user.username });

        if (!bcrypt.compareSync(user.password, userInDB.password)) {

            const accessToken = generateAccessToken(user);

            user.password = 'HIDDEN';
            response.status(201).json({ user: userInDB, accessToken, action: 'LOGGED' });

        } else response.status(401).json({ error: 'passwords does not match' })

    } catch (error) {
        response.status(404).json({ error });
    }
}

export const registerUser = async (request, response) => {
    try {
        
        const accessToken = generateAccessToken(request.body.user);
        const refreshToken = generateRefreshToken(request.body.user);
        const user = new userModel({ ...request.body.user, refreshToken });

        await user.save();

        user.password = 'HIDDEN';
        response.status(201).json({ user, accessToken, action: 'LOGGED' });

    } catch (error) {
        response.status(404).json({ error });
    }
}

export const refreshUserAccessToken = (request, response) => {
    try {

        const accessToken = generateAccessToken(request.acceptedUser);

        response.status(200).json({ accessToken, action: 'REFRESHED' });

    } catch (error) {
        response.status(404).json({ error });
    }
}