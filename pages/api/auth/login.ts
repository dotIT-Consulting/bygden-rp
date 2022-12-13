import passport from '@utils/libs/Passport';
import router from '@utils/libs/Router';

interface AuthLoginResponse extends Response {
	redirect: (path: string) => any;
}

const path = "/api/auth/login";

export default router
	.use(path, passport.authenticate("steam", { failureRedirect: "/auth"}))
	.get(path, (_, res: AuthLoginResponse) => res.redirect("/dashboard"));