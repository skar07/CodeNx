import { Router } from "express";
import { register, login } from "../controllers/authentication";

export const router = Router()
router.post('/register', register)
router.post('./login', login)

