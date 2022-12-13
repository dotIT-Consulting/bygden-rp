import passport from "@utils/libs/Passport";
import router from "@utils/libs/Router";

interface AuthReturnResponse extends Response {
	redirect: (path: string) => any;
}

const path = "/api/auth/return";

export default router
	.use(path, passport.authenticate("steam", { failureRedirect: "/auth" }))
	.get(path, (_, res: AuthReturnResponse) => { res.redirect("/dashboard") });