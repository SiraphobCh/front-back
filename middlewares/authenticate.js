const customError = require('../utils/customError');
const jwt = require('jsonwebtoken');
const prisma = require('../models');

module.exports = async (req, res, next) => {
  try {
    // check req.headers -- have Authorization Key
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw customError('UnAuthorized', 401);
    }
    // if (!authorization.startsWith('Bearer ')) {
    if (!/^Bearer /.test(authorization)) {
      throw customError('UnAuthorized', 401);
    }
    // check token
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);
    // use payload find user in prisma.user
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });
    delete user.password;
    // console.log(user);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
