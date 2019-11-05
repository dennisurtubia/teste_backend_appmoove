/* eslint-disable camelcase */
const knex = require('../../db/knex');

module.exports = {
  async getAll(req, res) {
    try {
      const products = await knex
        .select('nome', 'valor_unitario', 'qtde_estoque')
        .from('produtos')
        .where('qtde_estoque', '>', 0);

      res.status(200).json({
        data: products,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Ocorreu um erro desconhecido',
      });
    }
  },

  async getById(req, res) {
    try {
      const { produtoId } = req.params;

      let product = await knex
        .select('id', 'nome', 'valor_unitario', 'qtde_estoque')
        .from('produtos')
        .where('id', produtoId)
        .first();

      product = Object.assign(product, { data_venda: null, valor_venda: null });

      const lastSale = await knex
        .select('valor_venda', 'data_venda')
        .from('transacoes')
        .where({
          estado: 'APROVADO',
          produto_id: produtoId,
        })
        .orderBy('data_venda', 'desc')
        .first();

      if (lastSale) {
        product.data_venda = lastSale.data_venda;
        product.valor_venda = lastSale.valor_venda;
      }

      res.status(200).json({
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Ocorreu um erro desconhecido',
      });
    }
  },

  async add(req, res) {
    try {
      const { nome, valor_unitario, qtde_estoque } = req.body;

      const productId = await knex('produtos')
        .insert({
          nome,
          valor_unitario,
          qtde_estoque,
          data_criacao: knex.fn.now(),
          data_atualizacao: knex.fn.now(),
        });

      const product = await knex
        .select('*')
        .from('produtos')
        .where('id', productId)
        .first();

      res.status(201).json({
        product,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Ocorreu um erro desconhecido',
      });
    }
  },

  async delete(req, res) {
    try {
      const { productId } = req.params;

      await knex('produtos')
        .where('id', productId)
        .update({ data_exclusao: knex.fn.now(), qtde_estoque: 0 });

      res.status(204).json({
        message: 'Produto excluído com sucesso',
      });
    } catch (error) {
      res.status(400).json({
        message: 'Ocorreu um erro desconhecido',
      });
    }
  },
};
