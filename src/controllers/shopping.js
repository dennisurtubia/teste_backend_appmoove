/* eslint-disable camelcase */
const knex = require('../../db/knex');

module.exports = {
  async sale(req, res) {
    try {
      const cards = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})/,
        Mastercard: /^5[1-5][0-9]{14}/,
        Amex: /^3[47][0-9]{13}/,
        DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
        Discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
        JCB: /^(?:2131|1800|35\d{3})\d{11}/
      };

      const { produto_id, qtde_comprada, cartao } = req.body;

      const product = await knex
        .select('*')
        .from('produtos')
        .where('id', produto_id)
        .first();

      if (product.qtde_estoque === 0) throw new Error('PRODUCT_NOT_IN_STOCK');

      if (!cartao.numero.match(cards[cartao.bandeira])) {
        await knex('transacoes').insert({
          produto_id,
          valor_venda: qtde_comprada * product.valor_unitario,
          data_venda: knex.fn.now(),
          estado: 'REJEITADO',
        });
        throw new Error('INVALID_CARD');
      }

      await knex('transacoes').insert({
        produto_id,
        valor_venda: qtde_comprada * product.valor_unitario,
        data_venda: knex.fn.now(),
        estado: 'APROVADO',
      });

      await knex('produtos')
        .where('id', produto_id)
        .update({ qtde_estoque: product.qtde_estoque - 1 });

      res.status(201).json({
        message: 'Venda realizada com sucesso',
      });
    } catch (error) {
      if (error.message === 'INVALID_CARD') {
        res.status(412).json({
          message: 'Os valores informados não são válidos.',
        });
      } else {
        res.status(400).json({
          message: 'Ocorreu um erro desconhecido',
          data: null,
        });
      }
    }
  },
};
