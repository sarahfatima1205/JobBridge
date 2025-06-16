import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {
  applyJob,
  getApplicants,
  getApplicationsByJobId,
  updateStatus
} from '../controllers/application.controller.js';

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getApplicationsByJobId);
router.route("/:jobId/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id").post(isAuthenticated, updateStatus);

export default router;
