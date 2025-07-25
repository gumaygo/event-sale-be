import express from "express";
const router = express.Router();
import dummyController from "../controllers/dummy.controller.ts";


router.get("/dummy",dummyController.getDummy);

export default router;