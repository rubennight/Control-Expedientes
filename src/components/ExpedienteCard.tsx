import { Button, Card, Descriptions, Flex, Input, List, Modal, Select, message } from "antd";
import React from 'react'

const ExpedienteCard = (expediente: Expediente) => {
    const [victimasDirectas, setVictimasDirectas] = React.useState<VictimaDirecta[]>([]);
    const [victimasIndirectas, setVictimasIndirectas] = React.useState<VictimaIndirecta[]>([]);
    const [modalAbierto, setModalAbierto] = React.useState(false);
    const [expedienteEditado, setExpedienteEditado] = React.useState({
        idExpedienteInterno: expediente.idExpedienteInterno,
        mpResponsable: expediente.mpResponsable,
        fechaHechoVictimizante: expediente.fechaHechoVictimizante,
        fechaEntrega: expediente.fechaEntrega,
        fud: expediente.fud,
        causaPenal: expediente.causaPenal,
        distritoJudicial: expediente.distritoJudicial,
        delito: expediente.delito,
        menoresVictimas: expediente.menoresVictimas,
        calidadVictima: expediente.calidadVictima
    });

    const idExpediente = expediente.idExpedienteInterno;

    const cancelar = () => {
        setModalAbierto(false);
    }

    const manejarCambioEnInput = (e: any) => {
        const { name, value } = e.target;
        setExpedienteEditado(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    const manejarSelectCambio = (name: any, value: any) => {
        setExpedienteEditado(prevValues => ({
            ...prevValues,
            [name]: value
        }))
    }

    const abrirModal = () => {
        setModalAbierto(true);
    }

    const manejarEnvioDeActualizacion = async (e: any) => {
        e.preventDefault();
        console.log(expedienteEditado);
        try{
            const response = await fetch('http://localhost:3000/actualizarExpediente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expedienteEditado)
            })

            if(!response.ok){
                throw new Error('Error al actualizar el expediente');
                message.error('Error al actualizar expediente');
            }

            const data = await response.text();
            console.log('Expediente actualizado:', data);
            message.success('Expediente actualizado correctamente')
        } catch (error) {
            console.error('Error actualizando el expediente:', error);
        }
    }

    const convertirVictimasDirectas = (data: any): VictimaDirecta[] => {
        const victimasD: VictimaDirecta[] = data.map((d: any) => ({
            idVictimaDirecta: d.id_victima_directa,
            idExpedienteInterno: d.id_expediente_interno,
            nombre: d.nombre,
            apellidos: d.apellidos,
            sexo: d.sexo,
            menor: d.menor,
            domicilio: d.domicilio,
            codigoPostal: d.codigo_postal,
            curp: d.curp,
            fechaNacimiento: d.fecha_nacimiento,
            lugarNacimiento: d.lugar_nacimiento,
            conyugue: d.conyugue,
            apoyosRecibidos: d.apoyos_recibidos,
            calidadVictima: d.calidad_victima,
            fud: d.fud
        }))
        return victimasD;
    }

    const convertirVictimasIndirectas = (data: any): VictimaIndirecta[] => {
        const victimasI: VictimaIndirecta[] = data.map((d: any) => ({
            idVictimaIndirecta: d.victima_indirecta,
            idExpedienteInterno: d.id_expediente_interno,
            nombre: d.nombre,
            apellidos: d.apellidos,
            sexo: d.sexo,
            menor: d.menor,
            domicilio: d.domicilio,
            codigoPostal: d.codigo_postal,
            curp: d.curp,
            fechaNacimiento: d.fecha_nacimiento,
            lugarNacimiento: d.lugar_nacimiento,
            telefono: d.telefono,
            apoyosRecibidos: d.apoyos_recibidos,
            calidadVictima: d.calidad_victima,
            fud: d.fud
        }))
        return victimasI;
    }

    const obtenerVictimasDirectas = (idExpedienteInterno: string) => {
        fetch(`http://localhost:3000/leerVictimasDirectasPorExpediente?idExpedienteInterno=${idExpedienteInterno}`)
            .then(response => {
                if(!response.ok){
                    message.error('Hubo un problema al obtener a las victimas directas')
                }
                return response.json();
            })
            .then(data => {
                if (data && data.victimasDirectas) {  
                    const victimasDir = convertirVictimasDirectas(data.victimasDirectas);
                    setVictimasDirectas(victimasDir);
                } else {
                    throw new Error('No se encontraron víctimas directas en la respuesta');
                }
            })
            .catch(error => {
                console.error('Error obteniendo victimas directas:', error);
            })
    }

    const obtenerVictimasIndirectas = (idExpedienteInterno: string) => {
        fetch(`http://localhost:3000/leerVictimasIndirectasPorExpediente?idExpedienteInterno=${idExpedienteInterno}`)
            .then(response => {
                if(!response.ok){
                    message.error('Hubo un problema al obtener las victimas indirectas de la base de datos.');
                }
                return response.json();
            })
            .then(data => {
                if(data && data.victimasIndirectas) {
                    const victimasInd = convertirVictimasIndirectas(data.victimasIndirectas);
                    setVictimasIndirectas(victimasInd);
                } else {
                    throw new Error('No se encontraron victimas indirectas en la respuesta');
                }
            })
            .catch(error => {
                console.error('Error obteniendo victimas indirectas:', error);
            })
    }

    const menoresVictimas = (menor: number) => {
        if(menor == 0){
            return 'No'
        } else {
            return 'Si'
        }
    }

    const calidadDeVictima = (calidadVictima: number) => {
        if(calidadVictima == 0){
            return 'No';
        }
        else {
            return 'Si';
        }
    }

    const tieneFud = (fud: number) => {
        if(fud == 0){
            return 'No';
        } else {
            return 'Si';
        }
    }

    React.useEffect(() => {
        obtenerVictimasDirectas(idExpediente);
        obtenerVictimasIndirectas(idExpediente);
    }, [])
    
    return(
        <div>
            <div style={{ flex: 1 }}>
                <Card
                    id="expedienteCard"
                    size="small"
                    title={expediente.idExpedienteInterno}
                    style={{ width: '100%' }}
                >
                    <Descriptions>
                        <Descriptions.Item label="Causa Penal">{expediente.causaPenal}</Descriptions.Item>
                        <Descriptions.Item label="Ministerio Público">{expediente.mpResponsable}</Descriptions.Item>
                        <Descriptions.Item label="Distrito Judicial">{expediente.distritoJudicial}</Descriptions.Item>
                        <Descriptions.Item label="Delito">{expediente.delito}</Descriptions.Item>
                        <Descriptions.Item label="Apoyos Recibidos">{expediente.apoyosRecibidos}</Descriptions.Item>
                        <Descriptions.Item label="Fecha de Entrega">{expediente.fechaEntrega}</Descriptions.Item>
                        <Descriptions.Item label="Menor de edad">{menoresVictimas(expediente.menoresVictimas)}</Descriptions.Item>        
                        <Descriptions.Item label="Fud">{tieneFud(expediente.fud)}</Descriptions.Item>                        
                        <Descriptions.Item label="Calidad de Victima">{calidadDeVictima(expediente.calidadVictima)}</Descriptions.Item>
                        <Descriptions.Item label="Fecha del Hecho Victimizante">{expediente.fechaHechoVictimizante}</Descriptions.Item>
                    </Descriptions>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-evenly'}}>
                        <Button type="text" onClick={abrirModal}>Editar</Button>
                        <Button type="text">Archivar</Button>               
                        <Modal 
                            title={`Editar expediente ` + expediente.idExpedienteInterno} 
                            open={modalAbierto} 
                            onCancel={cancelar}
                            onOk={manejarEnvioDeActualizacion}
                            >
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-evenly' }}>
                                <Flex vertical>
                                    <p>ID del Expediente</p>
                                    <Input 
                                        name="idExpedienteInterno" 
                                        variant="filled" 
                                        placeholder={expediente.idExpedienteInterno} 
                                        value={expedienteEditado.idExpedienteInterno} 
                                        onChange={manejarCambioEnInput}
                                        />
                                    <p>Ministerio Público</p>
                                    <Input 
                                        name="mpResponsable" 
                                        variant="filled" 
                                        placeholder={expediente.mpResponsable}
                                        value={expedienteEditado.mpResponsable}
                                        onChange={manejarCambioEnInput}
                                        />
                                    <p>Fecha del Hecho Victimizante</p>
                                    <Input 
                                        name="fechaHechoVictimizante" 
                                        variant="filled" 
                                        placeholder={expediente.fechaHechoVictimizante} 
                                        value={expedienteEditado.fechaHechoVictimizante} 
                                        onChange={manejarCambioEnInput}
                                        />
                                    <p>Fecha de Entrega</p>
                                    <Input 
                                        name="fechaEntrega" 
                                        variant="filled" 
                                        placeholder={expediente.fechaEntrega} 
                                        value={expedienteEditado.fechaEntrega}
                                        onChange={manejarCambioEnInput}
                                        />
                                    <p>Fud</p>
                                    <Select
                                        defaultValue={tieneFud(expediente.fud)}
                                        onChange={(value) => manejarSelectCambio('fud', value)}
                                        options={[
                                            {
                                                value: 0,
                                                label: 'No'
                                            },
                                            {
                                                value: 1,
                                                label: 'Si'
                                            }
                                        ]}
                                    />
                                </Flex>
                                <Flex vertical>
                                    <p>Causa Penal/Carpeta de Investigación</p>
                                    <Input 
                                        name="causaPenal" 
                                        variant="filled" 
                                        placeholder={expediente.causaPenal} 
                                        value={expedienteEditado.causaPenal}
                                        onChange={manejarCambioEnInput}
                                        />
                                    <p>Distrito Judicial</p>
                                    <Input 
                                        name="distritoJudicial" 
                                        variant="filled" 
                                        placeholder={expediente.distritoJudicial} 
                                        value={expedienteEditado.distritoJudicial} 
                                        onChange={manejarCambioEnInput}
                                        />
                                    <p>Delito</p>
                                    <Input 
                                        name="fechaHechoVictimizante" 
                                        variant="filled" 
                                        placeholder={expediente.delito} 
                                        value={expedienteEditado.delito} 
                                        onChange={manejarCambioEnInput}
                                        />
                                    <p>Menor de Edad</p>
                                    <Select
                                        onChange={(value) => manejarSelectCambio('menoresVictimas', value)}
                                        defaultValue={menoresVictimas(expediente.menoresVictimas)}
                                        options={[
                                            {
                                                value: 0,
                                                label: 'No'
                                            },
                                            {
                                                value: 1,
                                                label: 'Si'
                                            }
                                        ]}
                                    />
                                    <p>Calidad Victima</p>
                                    <Select 
                                        onChange={(value) => manejarSelectCambio('calidadVictima', value)}
                                        defaultValue={calidadDeVictima(expediente.calidadVictima)}
                                        options={[
                                            {
                                                value: 0,
                                                label: 'No'
                                            },
                                            {
                                                value: 1,
                                                label: 'Si'
                                            }
                                        ]}
                                    />
                                </Flex>                                
                            </div>
                        </Modal>
                    </div>
                </Card>                
            </div>
            <div style={{ flex: 1, display: 'flex' }}>
                <Card
                    size="small"
                    title="Victimas Directas"
                >
                    <List
                        dataSource={victimasDirectas}
                        itemLayout="vertical"
                        size="small"
                        renderItem={(vd) => (
                            <List.Item>
                                <Descriptions>
                                    <Descriptions.Item label="Nombre">{vd.nombre}</Descriptions.Item>
                                    <Descriptions.Item label="Apellidos">{vd.apellidos}</Descriptions.Item>
                                    <Descriptions.Item label="Sexo">{vd.sexo}</Descriptions.Item>
                                </Descriptions>
                            </List.Item>
                        )}
                    />
                </Card>
                <Card
                    size="small"
                    title="Victimas Indirectas"
                >
                    <List
                        dataSource={victimasIndirectas}
                        itemLayout="vertical"
                        size="small"
                        renderItem={(vi) => (
                            <List.Item>
                                <Descriptions>
                                    <Descriptions.Item label="Nombre">{vi.nombre}</Descriptions.Item>
                                    <Descriptions.Item label="Apellidos">{vi.apellidos}</Descriptions.Item>
                                    <Descriptions.Item label="Sexo">{vi.sexo}</Descriptions.Item>
                                </Descriptions>
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        </div>
    )
}

export default ExpedienteCard;