import express from 'express';
import './services/passport.js';
// import mongoose from 'mongoose';
import { keys } from './config/keys.js'  //'../config/keys'; 
// import * as authRoutes from './routes/authRoutes.js';
import { apps} from './routes/authRoutes.js';
import  session  from 'cookie-session';
// const {cookieSession} = pkg;
import passport from 'passport';
import * as mongoose from 'mongoose';
mongoose.set('strictQuery', true);
mongoose.connect(keys.mongoURI,{
   useNewUrlParser: true,
   // useFindAndMoclsdify: false,
   useUnifiedTopology: true
}).then(() => {
	console.log("connected successfully with mongodb");
}).catch(e => {
	console.log("error = = == = = =>", e);
})

const app = express();
app.use(
	session({
		maxAge: 30 *24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
)
app.use(passport.initialize());

app.use(passport.session());

apps(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//https://snyk.io/advisor/npm-package/passport/functions/passport.initialize