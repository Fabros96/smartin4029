import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';

// Carga el .env manualmente
dotenv.config();

export default defineConfig({
    seed: 'node prisma/seed.js',
});
