import { Divider, Input, List, Skeleton } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ExpedienteCard from '../../components/ExpedienteCard';
const { Search } = Input;

function Expedientes(){
    const [expedientes, setExpedientes] = React.useState<Expediente[]>([]);
    const [cargando, setCargando] = React.useState(false);

    const width = window.innerWidth;

    const cargarMasExpedientes = () =>{
        if(cargando){
            return;
        }
        setCargando(true)
        fetch('http://localhost:3000/leerExpedientes')
            .then(response => response.json())
            .then(data => {
                setExpedientes(data.expedientes)
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
                                    idExpedienteInterno={exp.id_expediente_interno} 
                                    causaPenal={exp.causa_penal}
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