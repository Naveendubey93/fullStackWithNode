import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

const GoogleStrategy = Strategy
import *  as mongoose from 'mongoose';
import { keys } from '../config/keys.js';
import { User } from '../models/User.js';
// const User = mongoose.model('users');
// import { User } from '../models/User';
const googleStrategyOptions = {
	clientID: keys.googleClientId,
	clientSecret: keys.googleClientSecret,
	callbackURL: `${keys.serverApiUrl}/auth/google/callback`
}

passport.serializeUser((user, done) => {
	done(null, user.id)
});
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user)
	})
});

passport.use(new GoogleStrategy(
	googleStrategyOptions, (accessToken, refreshToken, profile, done) => {
		User.findOne({googleId: profile.id}).then(existingUser => {
			if (existingUser) {
				//We already have a record  given profile id
				done(null, existingUser);
			} else {
				new User({googleId: profile.id}).save()
					.then(user=> {
					done(null, user);
				});
			}
		})
		console.log(accessToken, refreshToken, profile );
	})
)
export {passport};