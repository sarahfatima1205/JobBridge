import express from 'express';
import upload from '../middlewares/upload.js';
import { resumeMatcher } from '../controllers/matcher.controller.js';

const router = express.Router();

router.post("/match", upload.single("resume"), resumeMatcher);

export default router;
