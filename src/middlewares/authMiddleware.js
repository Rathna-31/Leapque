const { auth } = require('../config/firebase-admin');

const authMiddleware = async (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return res.sendStatus(401);
  }
  const token = req.headers.authorization.split(' ')[1];

  if (token == null || token == undefined) {
    return res.sendStatus(401);
  }
  try {
    const decodeToken = await auth.verifyIdToken(token);
    if (decodeToken) {
      req.authUid = decodeToken.uid;
      return next();
    }
    console.log("reached point");
    return res.status(401).json({
      message: 'Error 404 Unauthorized',
    });
  } catch (e) {
    if (e.errorInfo.code === 'auth/id-token-expired') {
      return res.status(401).json({
        message: 'Error 401 Token Expired',
      });
    }
    if (e.errorInfo.code === 'auth/argument-error') {
      return res.status(401).json({
        message: e.errorInfo.message,
      });
    }
    return res.status(401).json({
      error: e.errorInfo,
    });
  }
};

module.exports = authMiddleware;