import express from 'express';
import mongoose from 'mongoose';

import WorkerMessage from '../models/worker.js';

const router = express.Router();

export const getWorkers = async (req, res) => { 
    try {
        const workerMessages = await WorkerMessage.find();
                
        res.status(200).json(workerMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createWorker = async (req, res) => {

    const worker = req.body;

    const newWorkerMessage = new WorkerMessage ({...worker})

    try{
        await newWorkerMessage.save();

        res.status(201).json(newWorkerMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

    // const { name, lname, fname, sex, paw, exp, wtime, pay } = req.body;

    // const newWorkerMessage = new WorkerMessage ({ name, lname, fname, sex, paw, exp, wtime, pay })

    // try {
    //     await newWorkerMessage.save();

    //     rex.status(201).json(newWorkerMessage);
    // } catch (error) {
    //     res.status(409).json({message: error.message})
    // }
}

export const updateWorker = async (req, res) => {
    const { id: _id } = req.params;

    const worker = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No worker with id: ${_id}`);

    const updatedWorker = await WorkerMessage.findByIdAndUpdate(_id, worker, {new: true});

    res.json(updatedWorker);
}

export const deleteWorker = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No worker with id: ${id}`);

    await WorkerMessage.findByIdAndRemove(id);

    res.json({ message: "Worker deleted successfully." });
}

export default router;