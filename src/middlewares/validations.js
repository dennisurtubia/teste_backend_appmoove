const { isCelebrate } = require('celebrate');

module.exports = {
  validation(err, req, res, next) {
    if (!res.headersSent) {
      if (isCelebrate(err)) {
        return res.status(412).json({
          message: 'Os valores informados não são válidos.',
        });
      }
    }
  },
};
