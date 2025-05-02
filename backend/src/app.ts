import express, { Router } from "express";
import cors from "cors";
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3333

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});