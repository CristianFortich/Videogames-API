const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genreRouter = require('./genreRouter');
const videogameRouter = require('./videogameRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', videogameRouter);
router.use('/', genreRouter);

module.exports = router;
