import User from "../model/userModel.js";
import mongoose from "mongoose";

export const create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const {email} = newUser;

        const userExists = await User.findOne({email});

        if(userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAll = async (req, res) => {
    try {
        const users = await User.find();

        if(!users || users.length === 0) {
            return res.status(404).json({message: "No users found"});
        }

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getById = async (req, res) => {
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: "Id is required"});
        }

        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: "Id is required"});
        }

        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        await User.findByIdAndUpdate(id, req.body, {new: true});

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: "Id is required"});
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid id"});
        }

        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
