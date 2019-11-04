const request = require('supertest');
const app = require('../app');
const knex = require('../../db/knex');

describe('Teste para uma rota que não existe na API', () => {
  test('Retorno de erro', async () => {
    const res = await request(app).get('/api/products');

    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});

describe('Teste para rota GET: /api/produtos', () => {
  test('Testa o caso de sucesso para esta rota', async () => {
    const res = await request(app).get('/api/produtos');

    expect(res.status).toBe(200);
    expect(res.body.data).not.toBeNull();
  });
});

describe('Teste para rota POST: /api/produtos', () => {
  test('Testa o caso de sucesso para esta rota', async () => {
    const res = await request(app).post('/api/produtos').send(
      {
        nome: 'Produto teste',
        valor_unitario: 1234.0,
        qtde_estoque: 1,
      },
    );

    expect(res.status).toBe(201);
    expect(res.body.data).not.toBeNull();
  });

  test('Tesa o caso de erro de validação de campos para esta rota', async () => {
    const res = await request(app).post('/api/produtos').send(
      {
        noAme: 'Produto teste',
        valor_unitario: 1234.0,
        qtde_estoque: 1,
      },
    );

    expect(res.status).toBe(412);
    expect(res.body.data).toBeUndefined();
    expect(res.body.message).toMatch('Os valores informados não são válidos.');
  });
});

describe('Teste para rota DELETE: /api/produtos/productId', () => {
  test('Testa o caso de sucesso para esta rota', async () => {
    const productId = await knex('produtos').insert({
      nome: 'test',
      valor_unitario: 1235.1,
      qtde_estoque: 1,
      data_criacao: knex.fn.now(),
      data_atualizacao: knex.fn.now(),
    });

    const res = await request(app).delete(`/api/produtos/${productId}`);

    expect(res.status).toBe(204);
  });
  test('Testa o caso de erro para esta rota quando o ID do produto fornecido não é valido', async () => {
    const res = await request(app).delete('/api/produtos/12312312312312');

    expect(res.status).toBe(400);
  });
});
