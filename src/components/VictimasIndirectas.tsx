import { Button, Card, Descriptions, List, message } from "antd";
import React from "react";

function VictimasIndirectas(){
    const [victimasIndirectas, setvictimasIndirectas] = React.useState<VictimaIndirecta[]>([]);

    const convertirVictimasIndirectas = (data: any): VictimaIndirecta[] => {
        const victimasD: VictimaIndirecta[] = data.map((d: any) => ({
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
            telefono: d.telefono,
            apoyosRecibidos: d.apoyos_recibidos,
            calidadVictima: d.calidad_victima,
            fud: d.fud
        }))
        return victimasD;
    }

    const obtenerVictimasIndirectas = () => {
        fetch(`http://localhost:3000/leerVictimasIndirectas`)
            .then(response => {
                if(!response.ok){
                    message.error('Hubo un problema al obtener a las victimas indirectas')
                }
                return response.json();
            })
            .then(data => {
                if (data && data.victimasIndirectas) {  
                    const victimasDir = convertirVictimasIndirectas(data.victimasIndirectas);
                    setvictimasIndirectas(victimasDir);
                } else {
                    throw new Error('No se encontraron víctimas directas en la respuesta');
                }
            })
            .catch(error => {
                console.error('Error obteniendo victimas directas:', error);
            })
    }

    React.useEffect(() => {
        obtenerVictimasIndirectas()
    }, [])

    return(
        <List
            dataSource={victimasIndirectas}
            itemLayout="vertical"
            size="small"
            renderItem={(vd) => (
                <List.Item>
                    <Card>
                        <Descriptions>
                            <Descriptions.Item label="Nombre:">{vd.nombre}</Descriptions.Item>
                            <Descriptions.Item label="Apellidos">{vd.apellidos}</Descriptions.Item>
                            <Descriptions.Item label="Fecha de Nacimiento">{vd.fechaNacimiento}</Descriptions.Item>
                            <Descriptions.Item label="Telefono">{vd.telefono}</Descriptions.Item>
                            <Descriptions.Item label="CURP">{vd.curp}</Descriptions.Item>
                            <Descriptions.Item label="Expediente">{vd.idExpedienteInterno}</Descriptions.Item>
                        </Descriptions>
                        <div style={{ flex: 1, display:"flex", justifyContent: 'space-evenly' }}>
                            <Button type="text">Ver Detalles</Button>
                            <Button type="text">Actualizar Información</Button>                            
                        </div>

                    </Card>                    
                </List.Item>
            )}
        >

        </List>

    )
}

export default VictimasIndirectas;