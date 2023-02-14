import *  as mongoose from 'mongoose';
const { Schema } = mongoose;
const  userSchema = new Schema({
  googleId: String
});

export const User = mongoose.model('users', userSchema);

// module.exports = mongoose.model('User', userSchema);
