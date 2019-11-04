const { Joi, celebrate } = require('celebrate');

module.exports = {
  add() {
    return celebrate({
      body: Joi.object().keys({
        nome: Joi.string().required(),
        qtde_estoque: Joi.number().min(1).required(),
        valor_unitario: Joi.number().required(),
      }),
    });
  },
};
