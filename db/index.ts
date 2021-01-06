import mongoose from 'mongoose';
import { mongoHostSecret, mongoPortSecret, mongoNameSecret } from "../helpers/secrets"

export const connectMongo = async () => {
    try {
        await mongoose.connect(
            `mongodb://${mongoHostSecret}:${mongoPortSecret}/${mongoNameSecret}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (err) {
        console.error(err);
    }
};
