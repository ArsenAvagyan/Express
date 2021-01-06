import { createOffer, getOffers } from '../services/offers';
import { Request, Response } from 'express';

export async function createOfferController (req: Request, res: Response) {
    const offer = await createOffer(req.body, req.user.userId);
    return res.send(offer);
}

export async function getOffersController (req: Request, res: Response) {
    const offer = await getOffers(req.body);
    return res.send(offer);
}
