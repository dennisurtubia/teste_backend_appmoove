const request = require('supertest');
const app = require('../app');
const knex = require('../../db/knex');

let productId;

beforeEach(async () => {
  productId = await knex('produtos').insert({
    nome: 'Produto para teste',
    valor_unitario: 1235.1,
    qtde_estoque: 1,
    data_criacao: knex.fn.now(),
    data_atualizacao: knex.fn.now(),
  });
});

afterEach(async () => {
  await knex('transacoes').where('produto_id', productId).del();
  await knex('produtos').where('id', productId).del();
});

describe('Teste para rota POST /api/compras', () => {
  test('Testa o caso de sucesso para a rota', async () => {
    const res = await request(app).post('/api/compras').send(
      {
        produto_id: Number(productId),
        qtde_comprada: 1,
        cartao: {
          titular: 'John Doe',
          numero: '4024007150554664',
          data_expiracao: '12/2018',
          bandeira: 'Visa',
          cvv: '123',
        },
      },
    );

    expect(res.status).toBe(201);
    expect(res.body.message).toMatch('Venda realizada com sucesso');
  });

  test('Testa o caso de erro para a rota quando o número do cartão é inválido', async () => {
    const res = await request(app).post('/api/compras').send({
      produto_id: productId,
      qtde_comprada: 1,
      cartao: {
        titular: 'John Doe',
        numero: '44854963349287', // Número para cartão Visa inválido
        data_expiracao: '12/2018',
        bandeira: 'Visa',
        cvv: '123',
      },
    });

    expect(res.status).toBe(412);
    expect(res.body.message).toMatch('Os valores informados não são válidos.');
  });

  test('Testa o caso de erro para a rota quando o a quantidade comprada for <= 0', async () => {
    const res = await request(app).post('/api/compras').send({
      produto_id: productId,
      qtde_comprada: 0,
      cartao: {
        titular: 'John Doe',
        numero: '4024007150554664',
        data_expiracao: '12/2018',
        bandeira: 'Visa',
        cvv: '123',
      },
    });

    expect(res.status).toBe(412);
    expect(res.body.message).toMatch('Os valores informados não são válidos.');
  });
});
