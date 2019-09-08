import { Role } from '../database/models/role';

/**
 * @param  {string} role permitted role
 * @returns {object} - next
 */

const permitUser = role => async (req, res, next) => {
const value = await Role.findOne({ where: {id: req.decoded.roleId} });
const ispermitted = role.map(userRole => value.dataValues.type === userRole).find(isRole => isRole === true);

if(!isPermitted) {
    res.status(403).json({'error' : 'You are not permitted to access this route'});
}

next();

};

export default permitUser;
