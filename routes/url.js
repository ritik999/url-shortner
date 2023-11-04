import express from "express";
import { handlerGenerateShortId, handlerGetShortUrl, handlerLoggedUserShortUrl, handlerVisitHistoryAnalysis } from "../controllers/url.js";
import { restrictToLogginUserOnly } from "../middleware/auth.js";

const router=express.Router();

router.post('/',restrictToLogginUserOnly,handlerGenerateShortId);

router.get('/urls',restrictToLogginUserOnly,handlerLoggedUserShortUrl);

router.get('/:id',handlerGetShortUrl);

router.get('/history/:id',handlerVisitHistoryAnalysis);

export {router as urlRouter};