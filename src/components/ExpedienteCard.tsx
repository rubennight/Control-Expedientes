import { Button, Card, Descriptions, Flex, Input, List, Modal, Select, message } from "antd";
import React from 'react'

const ExpedienteCard = (expediente: Expediente) => {
    const [victimasDirectas, setVictimasDirectas] = React.useState<VictimaDirecta[]>([]);
    const [victimasIndirectas, setVictimasIndirectas] = React.useState<VictimaIndirecta[]>([]);
    const [modalAbierto, setModalAbierto] = React.useState(false);

    const idExpediente = expediente.idExpedienteInterno;

    const cancelar = () => {
        setModalAbierto(false);
    }

    const abrirModal = () => {
        setModalAbierto(true);
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
                        <Modal title={`Editar expediente ` + expediente.idExpedienteInterno} open={modalAbierto} onCancel={cancelar}>
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-evenly' }}>
                                <Flex vertical>
                                    <p>ID del Expediente</p>
                                    <Input variant="filled" placeholder={expediente.idExpedienteInterno} />
                                    <p>Ministerio Público</p>
                                    <Input variant="filled" placeholder={expediente.mpResponsable} />
                                    <p>Fecha del Hecho Victimizante</p>
                                    <Input variant="filled" placeholder={expediente.fechaHechoVictimizante} />
                                    <p>Fecha de Entrega</p>
                                    <Input variant="filled" placeholder={expediente.fechaEntrega} />
                                    <p>Fud</p>
                                    <Select
                                        defaultValue={tieneFud(expediente.fud)}
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
                                    <Input variant="filled" placeholder={expediente.causaPenal} />
                                    <p>Distrito Judicial</p>
                                    <Input variant="filled" placeholder={expediente.distritoJudicial} />
                                    <p>Delito</p>
                                    <Input variant="filled" placeholder={expediente.delito} />
                                    <p>Menor de Edad</p>
                                    <Select
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