const express = require('express');
const RecursoService = require('../services/recurso.service');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const recursoservice = new RecursoService();
const upload = multer({ dest: 'uploads/' });

router.get('/mostrarrecursos',
    async (req, res, next) => {
        try {
            const result = await recursoservice.mostrarRecursos();
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/mostrarasignaturasbyrecurso/:recurso_id',
    async (req, res, next) => {
        const { recurso_id } = req.params;
        try {
            const result = await recursoservice.mostrarAsignaturasByRecurso(recurso_id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/guardarRecurso/',
    async (req, res, next) => {
        const recurso = req.body;
        try {
            const result = await recursoservice.guardarRecurso(recurso);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/editarRecurso/',
    async (req, res, next) => {
        const recurso = req.body;
        try {
            const result = await recursoservice.editarRecurso(recurso);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/obtenerLicencias/:recurso_id',
    async (req, res, next) => {
        const recurso_id = req.params.recurso_id;
        try {
            const result = await recursoservice.obtenerLicencias(recurso_id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/nuevaLicencia',
    async (req, res, next) => {
        const licencia = req.body;
        try {
            const result = await recursoservice.nuevaLicencia(licencia);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/obtenerasignaturas',
    async (req, res, next) => {
        try {
            const result = await recursoservice.obtenerAsignaturas();
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/obtenerasignaturasbyasignatura',
    async (req, res, next) => {
        const asignatura = req.body;
        try {
            const result = await recursoservice.obtenerasignaturasbyasignatura(asignatura);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/subircsvcredenciales/:recurso_id', upload.single('file'), async (req, res, next) => {
    const recurso_id = req.params.recurso_id;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No se ha proporcionado ningún archivo CSV' });
    }

    try {
        const data = fs.readFileSync(file.path, 'utf8');
        const lines = data.split(/\r?\n/);
        const results = [];
        const errors = [];

        // Verificar si la primera línea es un encabezado
        const header = lines[0].split(/\s*[;,]\s*/);
        const hasHeader = header.includes('Usuario') && header.includes('Contrasena') && header.includes('Estado') && header.includes('Tipo');

        // Si tiene encabezado, omitir la primera línea
        const startIndex = hasHeader ? 1 : 0;

        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i];
            const [usuario, clave, estado, tipo] = line.split(/\s*[;,]\s*/);

            if (usuario !== undefined && clave !== undefined) {
                try {
                    const result = await recursoservice.nuevaLicencia({ recurso_id, credencial_usuario: usuario, credencial_contrasena: clave, credenciales_estado: estado, credencial_tipo: tipo });

                    if (result.success) {
                        results.push({ Usuario: usuario, Contrasena: clave, Estado: estado, Tipo: tipo });
                    } else {
                        errors.push({ Usuario: usuario, error: result.message });
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    errors.push({ Usuario: usuario, error: error.message });
                }
            }
        }

        res.status(200).json({ results, errors });
    } catch (err) {
        console.error('Error al leer el archivo CSV:', err);
        res.status(500).json({ error: 'Error al leer el archivo CSV' });
    } finally {
        // Eliminar el archivo temporal después de procesarlo
        fs.unlink(file.path, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo temporal:', err);
            }
        });
    }
});

router.post('/nuevocurso',
    async (req, res, next) => {
        const objeto = req.body;
        try {
            const result = await recursoservice.nuevoCurso(objeto);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/asignarlicencias',
    async (req, res, next) => {
        const asignaciones = req.body;
        try {
            const result = await recursoservice.asignarLicencias(asignaciones);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/editarLicencia', async (req, res, next) => {
    const licencia = req.body;
    try {
        const result = await recursoservice.editarLicencia(licencia);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;