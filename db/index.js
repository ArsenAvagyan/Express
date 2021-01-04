import mongoose from 'mongoose';

export const connectMongo = async () => {
    try {
        await mongoose.connect(
            `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (err) {
        console.error(err);
    }
};
