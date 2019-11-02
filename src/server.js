const app = require('./app');

const hostname = '127.0.0.1';
const port = 8080;

app.listen(port, hostname, () => {
  console.log(`Servidor executando na porta ${port}`);
});
