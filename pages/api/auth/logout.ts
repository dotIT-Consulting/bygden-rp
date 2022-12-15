import router from "@utils/libs/Router";

interface AuthLogoutRequest extends Request {
    logout: () => any;
}

interface AuthLogoutResponse extends Response {
    redirect: (path: string) => any;
}

const path = "/api/auth/logout";

export default router
    .get(path, (req: AuthLogoutRequest, res: AuthLogoutResponse) => { req.logout(); res.redirect("/auth") });