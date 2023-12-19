import { Router } from "express";
import getPosts from "./get-posts";
import loginUser from "./login-user";
import signupUser from "./signup-user"
import getPost from "./get-post";
import storePost from "./storePost";
import deletePost from "./deletePost";
import catchAll from "./catch-all";

const router = Router() 

router.get("/posts", getPosts)
router.route("/post/:postId?").get(getPost).post(storePost).delete(deletePost)
router.post("/login", loginUser)
router.post("/signup", signupUser)
router.use(catchAll)

export default router