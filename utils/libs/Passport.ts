//@ts-nocheck
import passport from "passport";
import SteamStrategy from "passport-steam";
import { ToHex } from "./ToHex";

const SITE_URL = process.env.NODE_ENV === 'production' ? process.env.SITE_URL : 'http://localhost:3000/'

const fetchLicense = async(steamId: string) => {
	let unformated = 'N/A'
	let formated = 'N/A'

	try {
		const raw = await fetch(`${SITE_URL}api/auth/fetch-license?steam=${steamId}`)
		const data = await raw.json();

		unformated = data.unformated
		formated = data.formated

	} catch (error) {
		console.log(error)
	}

	return {
		unformated,
		formated
	}
}

const fetchIsStaff = async (steamId: string) => {
	try {
		const raw = await fetch(`${SITE_URL}api/auth/fetch-admin?steam=${steamId}`)
		const data = await raw.json();

		return data
		
	} catch (error) {
		console.log(error)
	}

	return {
		staff: false,
		role: 'user'
	}
}

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
}, async (_, profile, done) => {
	let steam_profile = profile;

	const hexId = ToHex(profile.id);
	const steamId = `steam:${hexId}`

	const { formated, unformated } = await fetchLicense(steamId)
	const { allowed, role } = await fetchIsStaff(steamId)

	steam_profile['hexId'] = hexId
	steam_profile['hexIdFormat'] = steamId
	steam_profile['fivemLicense'] = unformated
	steam_profile['fivemLicenseFormat'] = formated

	if (allowed) {
		steam_profile['staff'] = {
			allowed,
			role
		}
	}

	return done(null, steam_profile);
}));

export default passport;