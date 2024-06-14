import { Divider, Flex, Input, Select } from "antd"

function AgregarExpediente(){
    const width = window.innerWidth;

    return (
        <div>
            <h1 style={{ textAlign: 'center'}}>Agregar Nuevo Expediente</h1>
            <Divider />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-evenly' }}>
                <Flex vertical>
                    <p>ID del Expediente</p>
                    <Input style={{width: width * 0.3}} variant="filled" placeholder={"Id del Expediente Interno"} />
                    <p>Ministerio Público</p>
                    <Input variant="filled" placeholder={"Nombre del Ministerio Público"} />
                    <p>Fecha del Hecho Victimizante</p>
                    <Input variant="filled" placeholder={"Fecha del Hecho Victimizante"} />
                    <p>Fecha de Entrega</p>
                    <Input variant="filled" placeholder={"Fecha de Entrega del Expediente"} />
                    <p>Fud</p>
                    <Select
                        defaultValue={'No'}
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
                    <Input style={{width: width * 0.3}} variant="filled" placeholder={"Causa Penal/Carpeta de Investigación"} />
                    <p>Distrito Judicial</p>
                    <Input variant="filled" placeholder={"Distrito Judicial"} />
                    <p>Delito</p>
                    <Input variant="filled" placeholder={"Delito"} />
                    <p>Menor de Edad</p>
                    <Select
                        defaultValue={'No'}
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
                    <p>Calidad de Victima</p>
                    <Select 
                        defaultValue={'Calidad de Victima'}
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
            <Divider />   
            <div>
                //TODO: agregar botones para continuar y agregar victimas directas e indirectas
            </div>
        </div>

    )
}

export default AgregarExpediente