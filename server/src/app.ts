import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.routes.js";
import { customError } from "./common/errors/customError.js";
import { logger } from "./common/utils/loggers.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is running with ES Modules');
});

app.use('/api', router);


app.use(customError);

app.listen(port, () => {
  logger.info(`Server is running ⚡️ at http://localhost:${port}`);
});