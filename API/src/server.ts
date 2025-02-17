import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';


const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware JSON activé");
    next();
});

app.post('/test', (req: Request, res: Response) => {
    console.log("Content-Type reçu :", req.headers["content-type"]);
    console.log("Corps de la requête reçu :", req.body);
    res.json({ body: req.body });
});


// Route pour récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// Route pour créer un utilisateur
app.post('/users', async (req, res) => {
    console.log("Headers reçus :", req.headers);
    console.log("Corps de la requête reçu :", req.body);

    const { name , email } = req.body;

    try {
        const user = await prisma.user.create({
            data: { name, email }
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Email déjà utilisé' });
    }
});


// Lancer le serveur
app.listen(5000, () => console.log('🚀 Serveur démarré sur http://localhost:5000'));
