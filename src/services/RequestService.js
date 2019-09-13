import models from '../database/models';
import Helper from '../utils/Helper';

const { Request, User } = models;

/**
 * @class
 * @description A class containing all Request services
 * @exports UserService
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
   * @method deleteTrip
   * @description Medium between the database and travelRequest Controller
   * @static
   * @param {object} userDetails - data object
   * @returns {object} JSON response
   * @memberof RequestService
   */
  
    static async deleteTrip(req, res) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await Helper.verifyToken(token);
      const userId = decoded.id;
      const id = req.params.requestId
    const getRequest = await Request.findOne({ 
      where: { 
        id: Number(id) 
      }, 
      include: [{
        model: User,
        as: 'requester',
      }]
    });
    
    
    if (!getRequest) error('Request does not exist');

    if (getRequest.dataValues.userId !== userId) error('You are not the owner of this request!');

    await Request.destroy({ where: { id: Number(id) } });

    return 'Request successfully cancelled!';
  }
}
