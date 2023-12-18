import { Router } from "express";
//import { usersModel } from "../dao/models/user.model.js";
import {createHash} from "../utils.js"
import { SessionController } from "../controllers/sessions.controller.js";
import { uploaderProfile } from "../utils.js";



const router = Router();

router.post("/signup",SessionController.renderRegister);
router.post("/login",SessionController.renderLogin);
router.get("/fail-signup",SessionController.renderFailSignup);
router.get("/fail-login",SessionController.renderFailLogin)
router.post("/logout",SessionController.renderLogout)

router.post("/cambiarContraseña",SessionController.renderChangePassword)
router.post("/forgot-password",SessionController.forgotPassword)
router.post("/reset-password",SessionController.resetPassword)

router.get("/loginGitHub",SessionController.renderLoginGithub)
router.get("/github-callback",SessionController.renderLoginGithubCallback)
router.get("/logout",SessionController.renderLogout);

export { router as sessionsRouter}