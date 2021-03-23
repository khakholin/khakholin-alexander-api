import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    password: String,
});
