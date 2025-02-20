import express, { Request, Response, NextFunction } from 'express';
const cors = require("cors")
import userRoutes from "./routes/users"


const app = express();
app.use(express.json());
app.use(cors({

origin:"*"}))

app.use("/api/users", userRoutes)

// Lancer le serveur
app.listen(5000, () => console.log('🚀 Serveur démarré sur http://localhost:5000'));
