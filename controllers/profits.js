import express from 'express';
import mongoose from 'mongoose';

import ProfitMessage from '../models/profitMessage.js';

const router = express.Router();

export const getProfit = async (req, res) => { 
    const { id } = req.params;

    try {
        const profit = await ProfitMessage.findById(id);
        
        res.status(200).json(profit);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProfits = async (req, res) => { 
    try {
        const profitMessages = await ProfitMessage.find();
                
        res.status(200).json(profitMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProfit = async (req, res) => {

    const profit = req.body;

    const newProfitMessage = new ProfitMessage ({...profit})

    try{
        await newProfitMessage.save();

        res.status(201).json(newProfitMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateProfit = async (req, res) => {
    // const { id } = req.params;
    // const { year, quarter, spend, income, rent, payday, misc, value } = req.body;

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // const updatedProfit = { year, quarter, spend, income, rent, payday, misc, value, _id: id };

    // await ProfitMessage.findByIdAndUpdate(id, updatedProfit, { new: true });

    // res.json(updatedProfit);

    const { id: _id } = req.params;

    const profit = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No profit with id: ${_id}`);

    const updatedProfit = await ProfitMessage.findByIdAndUpdate(_id, profit, {new: true});

    res.json(updatedProfit);
}

export const deleteProfit = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No profit with id: ${id}`);

    await ProfitMessage.findByIdAndRemove(id);

    res.json({ message: "Profit deleted successfully." });
}

export default router;