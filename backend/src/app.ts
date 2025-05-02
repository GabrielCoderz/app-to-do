import express, { Router } from "express";
import cors from "cors";
import { router } from './routes';
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(errorHandler);

const PORT = 3333

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});