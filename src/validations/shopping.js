const { Joi, celebrate } = require('celebrate');

module.exports = {
  sale() {
    return celebrate({
      body: Joi.object().keys({
        produto_id: Joi.number().required(),
        qtde_comprada: Joi.number().min(1).required(),
        cartao: Joi.object().required().keys({
          titular: Joi.string().required(),
          numero: Joi.string().required(),
          data_expiracao: Joi.string().required(),
          bandeira: Joi.string().required(),
          cvv: Joi.string().required(),
        }),
      }),
    });
  },
};
