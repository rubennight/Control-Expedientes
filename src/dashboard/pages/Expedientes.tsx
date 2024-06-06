import { Divider, Input, List, Skeleton } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ExpedienteCard from '../../components/ExpedienteCard';
const { Search } = Input;

function Expedientes(){
    const [expedientes, setExpedientes] = React.useState<Expediente[]>([]);
    const [cargando, setCargando] = React.useState(false);

    const width = window.innerWidth;

    const convertirExpedientes = (data: any): Expediente[] => {
        const expedientes: Expediente[] = data.map((d: any) => ({
            idExpedienteInterno: d.id_expediente_interno,
            causaPenal: d.causa_penal,
            menoresVictimas: d.menores_victimas,
            delito: d.delito,
            fechaHechoVictimizante: d.fecha_hecho_victimizante,
            fechaEntrega: d.fecha_entrega,
            mpResponsable: d.mp_responsable,
            distritoJudicial: d.distrito_judicial,
            apoyosRecibidos: d.apoyos_recibidos,
            calidadVictima: d.calidad_victima,
            fud: d.fud
        }));
        return expedientes;
    }

    const cargarMasExpedientes = () =>{
        if(cargando){
            return;
        }
        setCargando(true)
        fetch('http://localhost:3000/leerExpedientes')
            .then(response => response.json())
            .then(data => {
                const exp = convertirExpedientes(data.expedientes)
                setExpedientes(exp)
                setCargando(false)
            })
            .catch(error => {
                console.error('Error obteniendo expedientes:', error);
                setCargando(false);
            });
    }

    React.useEffect(() => {
        cargarMasExpedientes()
    }, [])

    return(
        <>
            <div>
                <h1>Expedientes</h1>
                <Search 
                    placeholder='Buscar expediente por folio interno' 
                    size='middle'
                    allowClear
                    style={{
                        width: width * 0.3
                    }}   
                />               
            </div>
            <Divider />
            <div id='scrollDiv'>
                <InfiniteScroll
                    dataLength={expedientes.length}
                    next={cargarMasExpedientes}
                    hasMore={expedientes.length < 5}
                    loader={
                        <Skeleton 
                            paragraph={{
                                rows: 2
                            }}
                            active
                        />
                    }
                    endMessage={<Divider plain>Son todos los expedientes</Divider>}
                    scrollableTarget={"scrollDiv"}
                >
                    <List
                        dataSource={expedientes}
                        itemLayout='horizontal'
                        renderItem={(exp) => (
                            <List.Item>
                                <ExpedienteCard 
                                    idExpedienteInterno={exp.idExpedienteInterno} 
                                    causaPenal={exp.causaPenal}
                                    menoresVictimas={exp.menoresVictimas}
                                    delito={exp.delito}
                                    fechaHechoVictimizante={exp.fechaHechoVictimizante}
                                    fechaEntrega={exp.fechaEntrega}
                                    mpResponsable={exp.mpResponsable}
                                    distritoJudicial={exp.distritoJudicial}
                                    apoyosRecibidos={exp.apoyosRecibidos}
                                    calidadVictima={exp.calidadVictima}
                                    fud={exp.fud}
                                />
                            </List.Item>
                        )}
                    >
                    </List>   
                </InfiniteScroll>
            </div>
        </>
    )
}

export default Expedientes;