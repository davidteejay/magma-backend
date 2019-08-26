/**
 * @class Responses
 * @description An utility class to handle responses
 * @exports Responses
 */
export default class Responses {
  /**
   * @method constructor
   */
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  /**
   * @method setSuccess
   * @description Set success responses
   * @static
   * @param {object} statusCode
<<<<<<< HEAD
   * @param {object} message
   * @param {object} data
   * @returns {undefined}
   * @memberof Responses
   */
  static setSuccess(statusCode, message, data = undefined) {
=======
   * @param {object} data
   * @param {object} message
   * @returns {undefined}
   * @memberof Responses
   */
  static setSuccess(statusCode, data, message) {
>>>>>>> feat(signup-api): implement user signup endpoint
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.type = 'success';
  }

  /**
   * @method setError
   * @description Set error responses
   * @static
   * @param {object} statusCode
   * @param {object} message
   * @returns {undefined}
   * @memberof Responses
   */
  static setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  /**
   * @method send
   * @description Sends response messages
   * @static
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof Responses
   */
  static send(res) {
<<<<<<< HEAD
    const result = { status: this.type, data: this.data, message: this.message };
    const output = res.status(this.statusCode);
    const response = this.type === 'success' ? output.json(result)
      : output.json({ status: this.type, message: this.message, });
    return response;
=======
    const result = {
      status: this.type,
      data: this.data,
      message: this.message
    };

    if (this.type === 'success') {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message,
    });
>>>>>>> feat(signup-api): implement user signup endpoint
  }
}
