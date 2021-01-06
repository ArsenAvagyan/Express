import { Schema, model, Document } from 'mongoose';

interface HistoryProps extends Document {
    userId: string,
    lastLogin: string
}

const HistorySchema = new Schema(
    {
        userId: { type: String, required: false },
        lastLogin: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

export const History = model<HistoryProps>('History', HistorySchema);
