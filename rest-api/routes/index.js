import express from 'express';
import articleRoutes from "./article"
import contactRoutes from "./contact"
import userRoutes from "./user"

const app = express();

app.use('/article', articleRoutes);
app.use('/contact', contactRoutes);
app.use('/user', userRoutes);

export default app;