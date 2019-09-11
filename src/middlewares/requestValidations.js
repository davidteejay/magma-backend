import Responses from '../utils/Responses';
import models from '../database/models';
import Helper from '../utils/Helper';

/**
   * @function
   * @description Validates request body
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {object} next
   * @returns {object} JSON response
   */
const validateTripRequest = (req, res, next) => {
  const userId = req.user.id;
  let { departureDate } = req.body;
  departureDate = new Date(departureDate).toISOString();
  models.Request.findAll({ where: { userId } }).then(data => {
    const conflicts = Helper.checkTrip(data, departureDate);
    return conflicts;
  }).then(messages => {
    if (messages && messages.length > 0) {
      Responses.setError(409, 'you already have a trip booked around this pe'
        + 'riod, you may choose to cancel and make a multi-city request');
      return Responses.send(res);
    }
    next();
  }).catch(() => {
    Responses.setError(500, 'database error');
    return Responses.send(res);
  });
};

/**
   * @function
   * @description Validates trip dates
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {object} next
   * @returns {object} JSON response
   */
const validateTrip = (req, res, next) => {
  let { departureDate, returnDate } = req.body;
  departureDate = new Date(departureDate).toISOString();
  returnDate = returnDate ? returnDate.trim() : undefined;
  if (returnDate) {
    Responses.setError(400, 'you cannot have returnDate for a one-way trip');
    return Responses.send(res);
  }
  let now = new Date();
  now.setHours(0, 0, 0, 0);
  now = now.toISOString();
  if (departureDate < now) {
    Responses.setError(400, 'you cannot go back in time');
    return Responses.send(res);
  }
  next();
};

export default { validateTripRequest, validateTrip };
