import Post from "../models/Post.js";
import User from "../models/User.js";
//create
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.bodyt;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        });

        await newPost.save();
        const post = await Post.find();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}


//Read
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//update
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        if (!post.likes.get(userId)) {
            post.likes.set(userId, true);
        } else {
            post.likes.delete(userId);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}