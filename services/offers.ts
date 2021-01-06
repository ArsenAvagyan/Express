import Joi from 'joi';
import createError from 'http-errors';
import { Offer } from '../models/offers';

type CreateOffer = {
    title: string,
    condition: string,
    productType: string,
    price: { value: number, currency: string },
    description?: string
};

type Filter = {
    condition?: string,
    minPrice?: number,
    maxPrice?: number
};

export async function createOffer (offer: CreateOffer, userId: string) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        condition: Joi.string().valid('NEW', 'USED').required(),
        productType: Joi.string().min(3).max(30).required(),
        price: Joi.object({
            value: Joi.number().integer().min(1).required(),
            currency: Joi.string().valid('AMD', 'USD', 'EUR').required(),
        }),
        description: Joi.string().min(10).max(50).allow(null, ''),
    });

    const { error } = schema.validate(offer);
    if (error) return createError(400, error.details[0].message);

    const createdOffer = await Offer.create({ ...offer, userId });
    const { title, price, productType, condition, description } = createdOffer;
    return { title, price, productType, condition, description };
}

export async function getOffers (args: Filter) {
    const schema = Joi.object({
        condition: Joi.string().valid('NEW', 'USED'),
        minPrice: Joi.number().integer().min(1),
        maxPrice: Joi.number().integer().min(1),
    });

    const { error } = schema.validate(args);
    if (error) return createError(400, error.details[0].message);

    const { condition, minPrice, maxPrice } = args;

    const filter = {};
    if (condition) Object.assign(filter, { condition: condition });

    if (minPrice && maxPrice)
    { Object.assign(filter, {
        'price.value': { $gte: minPrice, $lte: maxPrice },
    }); }
    else if (minPrice)
        Object.assign(filter, { 'price.value': { $gte: minPrice } });
    else if (maxPrice)
        Object.assign(filter, { 'price.value': { $lte: maxPrice } });

    const offers = await Offer.find(filter);
    return offers.map((value) => {
        const { title, price, productType, condition, description } = value;
        return { title, price, productType, condition, description };
    });
}
