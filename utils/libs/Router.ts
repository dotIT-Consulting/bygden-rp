import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import passport from "@utils/libs/Passport";
import session from "cookie-session";

const SECRET = process.env.SECRET_SESSION_KEY ?? ''

const router = nextConnect<NextApiRequest, NextApiResponse>();

router.use(session({
    secret: SECRET,
    keys: [
        SECRET
    ],
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
}));

// Passport
router.use(passport.initialize());
router.use(passport.session());

export default router;