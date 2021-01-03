import { Schema, model } from "mongoose";

const OfferSchema = new Schema({
    userId: { type: String, required: true},
    title: { type: String, required: true},
    productType: { type: String, required: true },
    price: { 
        value: { type: Number, required: true}, 
        currency: { type: String, required: true } 
    },
    condition: { type: String, required: true },
    description: { type: String }
    }, {
    timestamps: true,
  }
);

export const Offer = model("Offer", OfferSchema);