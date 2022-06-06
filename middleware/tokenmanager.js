import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TIME = process.env.REFRESH_TIME;

export function authenticateAccessToken (request, response, next) {

    try {
        const auth = request.headers.authorization;
        const accessToken = auth.split(' ')[1];

        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, result) => {
            if (error) response.status(401).json({ error });
            else {
                request.acceptedUser = result;
                next();
            }
        });
    } catch (error) {
        response.status(404).json({ error });
    }
}

export function authenticateRefreshToken (request, response, next) {
    try {
        const auth = request.headers.authorization;
        const refreshToken = auth.split(' ')[1];
    
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, result) => {
            if (error) response.status(401).json({ error });
            else {
                request.acceptedUser = result;
                next();
            }
        });
    } catch (error) {
        response.status(404).json({ error });
    }
}

export const generateAccessToken = (user) => jwt.sign({ username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: REFRESH_TIME });

export const generateRefreshToken = (user) => jwt.sign({ username: user.username }, REFRESH_TOKEN_SECRET);