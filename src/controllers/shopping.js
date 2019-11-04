/* eslint-disable camelcase */
const knex = require('../../db/knex');
const { cards } = require('../utils/cards');

async function rejectTransaction(produto_id, qtde_comprada, valor_unitario) {
  await knex('transacoes').insert({
    produto_id,
    valor_venda: qtde_comprada * valor_unitario,
    data_venda: knex.fn.now(),
    estado: 'REJEITADO',
  });
}

module.exports = {
  async sale(req, res) {
    try {
      const { produto_id, qtde_comprada, cartao } = req.body;

      const product = await knex
        .select('*')
        .from('produtos')
        .where('id', produto_id)
        .first();

      if (!cartao.numero.match(cards[cartao.bandeira])) {
        rejectTransaction(produto_id, qtde_comprada, product.valor_unitario);
        throw new Error('INVALID_CARD');
      }

      if (product.qtde_estoque < qtde_comprada) {
        rejectTransaction(produto_id, qtde_comprada, product.valor_unitario);
        throw new Error('PRODUCT_NOT_IN_STOCK');
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
      if (error.message === 'INVALID_CARD' || error.message === 'PRODUCT_NOT_IN_STOCK') {
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
