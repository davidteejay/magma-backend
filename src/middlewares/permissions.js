import jwt from 'jsonwebtoken';

/**
 * @param  {string} role permitted role
 * @returns {object} - next
 */

const permitUser = role => async (req, res, next) => {
try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.SECRET);
    const isPermitted = decoded.role;

    if (isPermitted !== role) {
        console.log(role);
        console.log(isPermitted);
      return res.status(403).send({
        error: 'You are not permitted to access this route',
      });
    }
    return next();
  } catch (error) {
      console.log(error)
    return res.status(401).send({
      error: 'Invalid or No token provided',
    });
  }

};

export default permitUser;
