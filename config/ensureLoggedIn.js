module.exports = function(req, res, next) {
    // 401 = Unauthorized
    if (!req.user) return res.status(401).json('Unauthorized');
    next();
  };
  