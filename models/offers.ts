import { Schema, model, Document } from 'mongoose';

interface OfferProps extends Document {
    userId: string,
    title: string,
    productType: string,
    price: { value: number, currency: string },
    condition: string,
    description?: string
}

const OfferSchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    productType: { type: String, required: true },
    price: { 
        value: { type: Number, required: true }, 
        currency: { type: String, required: true } 
    },
    condition: { type: String, required: true },
    description: { type: String }
}, {
    timestamps: true,
}
);

export const Offer = model<OfferProps>('Offer', OfferSchema);