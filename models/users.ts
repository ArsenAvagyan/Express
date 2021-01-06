import { Schema, model, Document } from 'mongoose';

interface UserProps extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    age?: number,
    userId: string,
    isVerified: boolean,
    secretNumber: string | number
}

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, unique: true },
        password: { type: String, required: true },
        age: { type: Number },
        userId: { type: String, required: true },
        isVerified: { type: Boolean },
        secretNumber: { type: String },
    },
    {
        timestamps: true,
    }
);

export const User = model<UserProps>('User', UserSchema);
