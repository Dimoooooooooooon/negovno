import express from 'express';

import { getProfits, getProfit, createProfit, updateProfit, deleteProfit } from '../controllers/profits.js';

const router = express.Router();

router.get('/:id', getProfit);
router.get('/', getProfits);

router.post('/', createProfit);

router.patch('/:id', updateProfit);

router.delete('/:id', deleteProfit);

export default router;