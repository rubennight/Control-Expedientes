
interface Expediente {
    idExpedienteInterno: string,
    causaPenal: string,
    menoresVictimas: number,
    delito: string,
    fechaHechoVictimizante: string,
    fechaEntrega: string,
    mpResponsable: string,
    distritoJudicial: string,
    apoyosRecibidos: string,
    calidadVictima: number,
    fud: number
}

interface VictimaDirecta {
    idVictimaDirecta: string,
    idExpedienteInterno: string,
    nombre: string,
    apellidos: string,
    sexo: string,
    menor: boolean,
    domicilio: string,
    codigoPostal: string,
    curp: string,
    fechaNacimiento: string,
    lugarNacimiento: string,
    conyugue: string,
    apoyosRecibidos: string,
    calidadVictima: number,
    fud: number
}

interface VictimaIndirecta {
    idVictimaIndirecta: string,
    idExpedienteInterno: string,
    nombre: string,
    apellidos: string,
    sexo: string,
    menor: boolean,
    domicilio: string,
    codigoPostal: string,
    curp: string,
    fechaNacimiento: string,
    lugarNacimiento: string,
    telefono: string,
    apoyosRecibidos: string,
    calidadVictima: number,
    fud: number
}

interface Pendiente {
    titulo: string,
    descripcion: string,
    fecha: string,
    hecho: number
}
