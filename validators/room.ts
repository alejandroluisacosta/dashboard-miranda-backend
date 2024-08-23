import Joi from "joi";

const roomSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    roomType: Joi.number().valid(1, 2, 3, 4).required(),
    rate: Joi.number().min(0).required(),
    amenities: Joi.string().min(4).max(255).allow('').required(),
    offer: Joi.string().valid('Yes', 'No').required(),
    discount: Joi.number().min(0).max(100),
    description: Joi.string().max(255),
    status: Joi.string().valid('Available', 'Booked').required(),
    cancellationPolicies: Joi.string().max(255),
    images: Joi.array().items(Joi.string())
});

export default roomSchema;