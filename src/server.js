require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./database/db");
const orderRoutes = require("./routes/orderRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = 3000;

// Conectar ao banco
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Arquivos estáticos (HTML de teste)
app.use(express.static(path.join(__dirname, "../public")));

// Rota de teste
app.get("/", (req, res) => {
    res.status(200).json({
        message: "API Orders funcionando 🚀"
    });
});

// Rotas da API
app.use("/", orderRoutes);

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de erro para rotas inexistentes
app.use((req, res) => {
    res.status(404).json({
        error: "Rota não encontrada"
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});