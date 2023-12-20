import { Router } from "express";
import getPosts from "./get-posts";
import loginUser from "./login-user";
import signupUser from "./signup-user"
import getPost from "./get-post";
import storePost from "./storePost";
import deletePost from "./deletePost";
import catchAll from "./catch-all";
import protectApi from "../../utils/protectApi";

const router = Router() 

router.get("/posts", getPosts)
router.route("/post/:postId?").get(getPost).post(protectApi, storePost).delete(protectApi, deletePost)
router.post("/login", loginUser)
router.post("/signup", signupUser)
router.use(catchAll)

export default router