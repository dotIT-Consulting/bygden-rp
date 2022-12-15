//@ts-nocheck
import passport from "passport";
import SteamStrategy from "passport-steam";

const SITE_URL = process.env.NODE_ENV === 'production' ? process.env.SITE_URL : 'http://localhost:3000/'

passport.serializeUser((user, done) => {
	done(null, user);
});
  
passport.deserializeUser((obj, done) => {
	done(null, obj);
});

passport.use(new SteamStrategy({
  returnURL: `${SITE_URL}api/auth/return`,
  realm: SITE_URL,
  apiKey: process.env.STEAM_API_KEY
}, (_, profile, done) => {
	// Fetch any more information to populate
	return done(null, profile);
}));

export default passport;