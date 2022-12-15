import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import passport from "@utils/libs/Passport";
import session from "cookie-session";

const router = nextConnect<NextApiRequest, NextApiResponse>();

router.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
}));

// Passport
router.use(passport.initialize());
router.use(passport.session());

export default router;