const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')

const Database = require('better-sqlite3')
const db = new Database('control_expedientes')

app.use(cors())

app.post('/agregarPendiente', (pendiente) => {
    const query = `
        INSERT INTO pendientes(
            titulo,
            descripcion,
            fecha,
            hecho
        ) VALUES (?, ?, ?, ?)
    `;

    db.prepare(query).run(
        pendiente.titulo,
        pendiente.descripcion,
        pendiente.fecha,
        pendiente.hecho
    )
})

app.get('/leerPendientes', (req, res) => {
    const query = "SELECT * FROM pendientes"

    const pendientes = db.prepare(query).all();
    res.json({ pendientes })
})

app.get('/leerExpedientes', (req, res) =>{
    const query = `
        SELECT * FROM expediente
    `;
    const expedientes = db.prepare(query).all()
    res.json({ expedientes })
})

app.get('/leerVictimasDirectas', (req, res) => {
    const query = 'SELECT * FROM victima_directa'
    const victimasDirectas = db.prepare(query).all()
    res.json({ victimasDirectas })
})

app.get('/leerVictimasDirectasPorExpediente', (req, res) => {
    const idExpedienteInterno = req.query.idExpedienteInterno;
    const query = 'SELECT * FROM victima_directa WHERE id_expediente_interno = ?';
    const victimasDirectas = db.prepare(query).all(idExpedienteInterno);
    res.json({ victimasDirectas })
})

app.get('/leerVictimasIndirectas', (req, res) => {
    const query = 'SELECT * FROM victima_indirecta'
    const victimasIndirectas = db.prepare(query).all()
    res.json({ victimasIndirectas })
})

app.listen(port, () => {
    console.log(`App escuchando a través del puerto: ${port}`)
})

/*
const queryCrearTablaVictimaDirecta = 
        `CREATE TABLE IF NOT EXISTS victima_directa(
            id_victima_directa TEXT PRIMARY KEY,
            id_expediente_interno TEXT,
            nombre TEXT,
            apellidos TEXT,
            sexo TEXT,
            menor INTEGER,
            domicilio TEXT,
            codigo_postal TEXT,
            curp TEXT,
            fecha_nacimiento TEXT,
            lugar_nacimiento TEXT,
            conyugue TEXT,
            apoyos_recibidos TEXT,
            calidad_victima INTEGER,
            fud INTEGER
        )
    `;

    const queryCrearTablaVictimaIndirecta = 
        `CREATE TABLE IF NOT EXISTS victima_indirecta(
            id_victima_indirecta TEXT PRIMARY KEY,
            id_expediente_interno TEXT,
            nombre TEXT,
            apellidos TEXT,
            sexo TEXT,
            menor INTEGER,
            domicilio TEXT,
            codigo_postal TEXT,
            curp TEXT,
            fecha_nacimiento TEXT,
            lugar_nacimiento TEXT,
            telefono TEXT,
            apoyos_recibidos TEXT,
            calidad_victima INTEGER,
            fud INTEGER
        )
    `;

    const queryCrearTablaExpediente = 
        `CREATE TABLE IF NOT EXISTS expediente(
            id_expediente_interno TEXT PRIMARY KEY,
            causa_penal TEXT,
            menores_victimas INTEGER,
            delito TEXT,
            fecha_hecho_victimizante TEXT,
            fecha_entrega TEXT,
            mp_responsable TEXT,
            distrito_judicial TEXT,
            apoyos_recibidos TEXT,
            calidad_victima INTEGER,
            fud INTEGER
        )
    `;

    db.exec(queryCrearTablaExpediente)
    db.exec(queryCrearTablaVictimaDirecta)
    db.exec(queryCrearTablaVictimaIndirecta)

const queryCrearTablaPendientes = 
    `
    CREATE TABLE IF NOT EXISTS pendientes(
        titulo TEXT,
        descripcion TEXT,
        fecha TEXT,
        hecho number
    )
    `;

    db.exec(queryCrearTablaPendientes);
*/
/*
const agregarPendiente = (pendiente) => {
    const query = `
        INSERT INTO pendientes(
            titulo,
            descripcion,
            fecha,
            hecho
        ) VALUES (?, ?, ?, ?)
    `

    const stmt = db.prepare(query);
    stmt.run(
        pendiente.titulo,
        pendiente.descripcion,
        pendiente.fecha,
        pendiente.hecho
    )
}

exports.leerPendientes = () => {
    const query = "SELECT * FROM pendientes"

    const pendientes = db.prepare(query).all();
    return pendientes;
}
*/
const agregarVictimaDirecta = (victimaDirecta) =>{
        
        const query = `
            INSERT INTO victima_directa (
                id_victima_directa,
                id_expediente_interno,
                nombre,
                apellidos,
                sexo,
                menor,
                domicilio,
                codigo_postal,
                curp,
                fecha_nacimiento,
                lugar_nacimiento,
                conyugue,
                apoyos_recibidos,
                calidad_victima,
                fud
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const stmt = db.prepare(query);
        stmt.run(
            victimaDirecta.idVictimaDirecta,
            victimaDirecta.idExpedienteInterno,
            victimaDirecta.nombre,
            victimaDirecta.apellidos,
            victimaDirecta.sexo,
            victimaDirecta.menor,
            victimaDirecta.domicilio,
            victimaDirecta.codigoPostal,
            victimaDirecta.curp,
            victimaDirecta.fechaNacimiento,
            victimaDirecta.lugarNacimiento,
            victimaDirecta.conyugue,
            victimaDirecta.apoyosRecibidos,
            victimaDirecta.calidadVictima,
            victimaDirecta.fud
        )
    }

const editarVictimaDirecta = (victimaDirecta) => {
        const query = `
            UPDATE victima_directa SET
                id_expediente_interno = ?,
                nombre = ?,
                apellidos = ?,
                sexo = ?,
                menor = ?,
                domicilio = ?,
                codigo_postal = ?,
                curp = ?,
                fecha_nacimiento = ?,
                lugar_nacimiento = ?,
                conyugue = ?,
                apoyos_recibidos = ?,
                calidad_victima = ?,
                fud = ?
            WHERE id_victima_directa = ?
        `;
        const stmt = db.prepare(query);
        stmt.run(
            victimaDirecta.idExpedienteInterno,
            victimaDirecta.nombre,
            victimaDirecta.apellidos,
            victimaDirecta.sexo,
            victimaDirecta.menor,
            victimaDirecta.domicilio,
            victimaDirecta.codigoPostal,
            victimaDirecta.curp,
            victimaDirecta.fechaNacimiento,
            victimaDirecta.lugarNacimiento,
            victimaDirecta.conyugue,
            victimaDirecta.apoyosRecibidos,
            victimaDirecta.calidadVictima,
            victimaDirecta.fud
        );
    }

const eliminarVictimaDirecta = (idVictimaDirecta) => {
        const query = `
            DELETE FROM victima_directa
            WHERE id_victima_directa = ?
        `;

        const stmt = db.prepare(query);
        stmt.run(idVictimaDirecta);
    }

const agregarVictimaIndirecta = (victimaIndirecta) => {
    const query = `
        INSERT INTO victima_indirecta (
            id_victima_indirecta,
            id_expediente_interno,
            nombre,
            apellidos,
            sexo,
            menor,
            domicilio,
            codigo_postal,
            curp,
            fecha_nacimiento,
            lugar_nacimiento,
            telefono,
            apoyos_recibidos,
            calidad_victima,
            fud
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const stmt = db.prepare(query);
    stmt.run(
        victimaIndirecta.idVictimaIndirecta,
        victimaIndirecta.idExpedienteInterno,
        victimaIndirecta.nombre,
        victimaIndirecta.apellidos,
        victimaIndirecta.sexo,
        victimaIndirecta.menor,
        victimaIndirecta.domicilio,
        victimaIndirecta.codigoPostal,
        victimaIndirecta.curp,
        victimaIndirecta.fechaNacimiento,
        victimaIndirecta.lugarNacimiento,
        victimaIndirecta.telefono,
        victimaIndirecta.apoyosRecibidos,
        victimaIndirecta.calidadVictima,
        victimaIndirecta.fud
    );
}

const editarVictimaIndirecta = (victimaIndirecta) => {
        const query = `
            UPDATE victima_indirecta SET
                id_expediente_interno = ?,
                nombre = ?,
                apellidos = ?,
                sexo = ?,
                menor = ?,
                domicilio = ?,
                codigo_postal = ?,
                curp = ?,
                fecha_nacimiento = ?,
                lugar_nacimiento = ?,
                telefono = ?,
                apoyos_recibidos = ?,
                calidad_victima = ?,
                fud = ?
            WHERE id_victima_directa = ?
        `

        const stmt = db.prepare(query);
        stmt.run(
            victimaIndirecta.idVictimaIndirecta,
            victimaIndirecta.idExpedienteInterno,
            victimaIndirecta.nombre,
            victimaIndirecta.apellidos,
            victimaIndirecta.sexo,
            victimaIndirecta.menor,
            victimaIndirecta.domicilio,
            victimaIndirecta.codigoPostal,
            victimaIndirecta.curp,
            victimaIndirecta.fechaNacimiento,
            victimaIndirecta.lugarNacimiento,
            victimaIndirecta.telefono,
            victimaIndirecta.apoyosRecibidos,
            victimaIndirecta.calidadVictima,
            victimaIndirecta.fud
        );
    }

const eliminarVictimaIndirecta = (idVictimaIndirecta) => {
        const query = `
            DELETE FROM victima_indirecta
            WHERE id_victima_indirecta = ?
        `;

        const stmt = db.prepare(query);
        stmt.run(idVictimaIndirecta);
    }

const agregarExpediente = (expediente) => {
        const query = `
            INSERT INTO expediente (
                id_expediente_interno,
                causa_penal,
                menores_victimas,
                delito,
                fecha_hecho_victimizante,
                fecha_entrega,
                mp_responsable,
                distrito_judicial,
                apoyos_recibidos,
                calidad_victima,
                fud
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const stmt = db.prepare(query);
        stmt.run(
            expediente.idExpedienteInterno,
            expediente.causaPenal,
            expediente.menoresVictimas,
            expediente.delito,
            expediente.fechaHechoVictimizante,
            expediente.fechaEntrega,
            expediente.mpResponsable,
            expediente.distritoJudicial,
            expediente.apoyosRecibidos,
            expediente.calidadVictima,
            expediente.fud
        );
    }

const leerExpediente = (idExpediente) => {
        const query = `
            SELECT * FROM expediente
            WHERE id_expediente_interno = ?
        `;
        const stmt = db.prepare(query);
        return stmt.get(idExpediente);
    }

const leerExpedientes = () => {
    const query = `
        SELECT * FROM expediente
    `;
    const expedientes = db.prepare(query).all()
    return expedientes;
}

const actualizarExpediente = (expediente) => {
        const query = `
            UPDATE expediente SET
                causa_penal = ?,
                menores_victimas = ?,
                delito = ?,
                fecha_hecho_victimizante = ?,
                fecha_entrega = ?,
                mp_responsable = ?,
                distrito_judicial = ?,
                apoyos_recibidos = ?,
                calidad_victima = ?,
                fud = ?
            WHERE id_expediente_interno = ?
        `;
        const stmt = db.prepare(query);
        stmt.run(
            expediente.causaPenal,
            expediente.menoresVictimas,
            expediente.delito,
            expediente.fechaHechoVictimizante,
            expediente.fechaEntrega,
            expediente.mpResponsable,
            expediente.distritoJudicial,
            expediente.apoyosRecibidos,
            expediente.calidadVictima,
            expediente.fud
        );
    }

const eliminarExpediente = (idExpediente) => {
        const query = `
            DELETE FROM expdiente
            WHERE id_expediente_interno = ?
        `;

        const stmt = db.prepare(query);
        stmt.run(idExpediente);
    }
