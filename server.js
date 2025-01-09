import express, { json } from 'express';
import oracledb from 'oracledb';
import cors from 'cors'; // Importando o pacote

const app = express();
const PORT = 3000;

// Habilitando CORS para todas as origens
app.use(cors());

// Permite que o Express processe JSON no corpo da requisição
app.use(json());

// Configuração de conexão do Oracle
const dbConfig = {
    user: 'system',
    password: 'NovaSenha',
    connectString: '127.0.0.1:1521/MEUBANCO'
};


// Serve arquivos estáticos, como HTML, CSS, JS
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

// Rota para obter as transações
app.get('/transacoes', async (req, res) => {
    try {
      console.log('Tentando conectar ao banco de dados...');
  
      // Conectando ao banco de dados
      const connection = await oracledb.getConnection(dbConfig);
      console.log('Conexão bem-sucedida!');
  
      // Consultando a tabela
      console.log('Executando a consulta: SELECT * FROM transacoes');
      const result = await connection.execute('SELECT * FROM transacoes');
  
      // Retornando os dados
      console.log('Consulta realizada com sucesso:', result.rows);
      res.json(result.rows);
  
      // Fechando a conexão
      await connection.close();
      console.log('Conexão fechada.');
    } catch (err) {
      console.error('Erro ao obter transações:', err);
      res.status(500).send('Erro ao obter transações.');
    }
  });
  

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
