//@ts-nocheck
import passport from "passport";
import SteamStrategy from "passport-steam";

passport.serializeUser(function(user, done) {
	done(null, user);
});
  
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new SteamStrategy({
  returnURL: `http://localhost:3000/api/auth/return`,
  realm: 'http://localhost:3000',
  apiKey: 'F941F61503D2F7B047FB99DF1F5AE1F2'
}, (_, profile, done) => {
	// Fetch any more information to populate
	return done(null, profile);
}));

export default passport;