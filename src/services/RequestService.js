import models from '../database/models';

const { Request } = models;

/**
 * @class
 * @description A class containing all Request services
 * @exports RequestService
 */
export default class RequestService {
  /**
   * @method bookTrip
   * @description Medium between the database and travelRequest Controller
   * @static
   * @param {object} requestDetails - data object
   * @returns {object} JSON response
   * @memberof RequestService
   */
  static bookTrip(requestDetails) {
    return Request.create(requestDetails);
  }

  /**
   * @method requests
   * @description Medium between the database and travelRequest Controller
   * @static
   * @param {object} requestDetails - data object
   * @returns {object} JSON response
   * @memberof RequestService
   */
  static userTripRequests(requestDetails) {
    return Request.findAll({ where: { userId:requestDetails } });
  }

  /**
   * @method requests
   * @description Medium between the database and travelRequest Controller
   * @static
   * @param {object} requestDetails - data object
   * @returns {object} JSON response
   * @memberof RequestService
   */
  static managerAvailRequests(requestDetails) {
    return Request.findAll({ where: { managerId:requestDetails.id, status:'open' } });
  }
}
