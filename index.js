const express = require('express')
const cors = require('cors')
const app = express()
const conn = require('./db/conn')

app.use(express.json())

const allowedOrigins = [process.env.FRONTEND_URL, 'https://juliafullstack.site'];
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.static('public'))

//rotas
const UserRoutes = require('./routes/UserRoutes')
const TarefaRoutes = require('./routes/TarefaRoutes')
const DepartamentoRoutes = require('./routes/DepartamentoRoutes')
const ComentariosRoutes = require('./routes/ComentariosRoutes')
const ArquiveRoutes = require('./routes/ArquiveRoutes')
app.use('/users', UserRoutes)
app.use('/tarefa', TarefaRoutes)
app.use('/departamento', DepartamentoRoutes)
app.use('/comentario', ComentariosRoutes)
app.use('/arquive', ArquiveRoutes)

const PORT = process.env.PORT || 3000;  // Definindo a variável PORT

conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => console.log(err));