import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, role, password, firstName, lastName, cart } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "Такой пользователь уже существует" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, role, password: hashedPassword, name: `${firstName} ${lastName}`, cart });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Что-то не так" });
    
    console.log(error);
  }
};

export const getUsers = async (req, res) => { 
  try {
      const sendUsers = await UserModal.find();
              
      res.status(200).json(sendUsers);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const deleteUser = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  await UserModal.findByIdAndRemove(id);

  res.json({ message: "User deleted successfully." });
}