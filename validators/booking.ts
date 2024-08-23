import Joi from "joi";

const bookingSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    orderDate: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
    checkInDate: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
    checkOutDate: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
    specialRequest: Joi.string().min(4).max(255),
    roomType: Joi.number().valid(1, 2, 3, 4).required(),
    status: Joi.string().valid('Check-In', 'Check-Out'),
    roomId: Joi.number()
})

export default bookingSchema;