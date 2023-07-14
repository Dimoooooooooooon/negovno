import express from 'express';

import { getWorkers, createWorker, updateWorker, deleteWorker } from '../controllers/workers.js';

const router = express.Router();

router.get('/', getWorkers);
router.post('/', createWorker);
router.patch('/:id', updateWorker);
router.delete('/:id', deleteWorker);


export default router;