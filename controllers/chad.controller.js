import chadModel from '../models/chad.model.js';

export const getChads = async (request, response) => {
    try {

        const chads = await chadModel.find({ });
        const acceptedUser = request.acceptedUser;

        response.status(200).json({ chads, acceptedUser });

    } catch (error) {
        response.status(404).json({ error });
    }
}

export const postChad = async (request, response) => {
    try {
        
        const chad = new chadModel({ ...request.body.chad, createdBy: request.acceptedUser.username });
        
        await chad.save();

        response.status(201).json({ chad, action: 'POSTED' });

    } catch (error) {
        response.status(404).json({ error });
    }
}

export const patchChad = async (request, response) => {
    try {

        const chad = request.body.chad;

        const patchedChad = await chadModel.findOneAndUpdate({ name: chad.name }, chad);

        response.status(200).json({ chad: patchedChad, action: 'PATCHED' });

    } catch (error) {
        response.status(404).json({ error });
    }
}

export const deleteChad = async (request, response) => {
    if (request.body.chad) {
        try {
            const [ chad ] = await chadModel.find(request.body.chad);
            const acceptedUser = request.acceptedUser;
    
            if (chad.createdBy === acceptedUser.username) {
    
                await chadModel.deleteOne(chad);
                response.status(200).json({ chad, action: 'DELETED' });
                
            } else response.status(403).json({ error: 'Requested user is not creator of the post' });
    
        } catch (error) {
            response.status(404).json({ error });
        }
    }
}

export const likeChad = async (request, response) => {
    try {
        
        const acceptedUser = request.acceptedUser;
        const { username } = acceptedUser;
        
        let [ chad ] = await chadModel.find(request.body.chad);

        let likedBy = new Set(chad.likedBy);

        likedBy.add(username);
        likedBy = Array.from(likedBy);

        chad = await chadModel.updateOne(chad, { likedBy });
        [ chad ] = await chadModel.find({ name: request.body.chad.name });
        chad.image = '';

        response.status(200).json({ chad, action: 'LIKED' });

    } catch (error) {
        response.status(404).json({ error });
    }
}

export const dislikeChad = async (request, response) => {
    try {
        
        const acceptedUser = request.acceptedUser;
        const { username } = acceptedUser;
        
        let [ chad ] = await chadModel.find(request.body.chad);

        let likedBy = new Set(chad.likedBy);

        likedBy.delete(username);
        likedBy = Array.from(likedBy);

        chad = await chadModel.updateOne(chad, { likedBy });
        [ chad ] = await chadModel.find({ name: request.body.chad.name });
        chad.image = '';

        response.status(200).json({ chad, action: 'DISLIKED' });

    } catch (error) {
        response.status(404).json({ error });
    }
}