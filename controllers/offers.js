import { createOffer, getOffers } from "../services/offers";

export async function createOfferController(req, res) {
  const offer = await createOffer(req.body, req.user.userId);
  return res.send(offer);
}

export async function getOffersController(req, res) {
  const offer = await getOffers(req.body);
  return res.send(offer);
}
