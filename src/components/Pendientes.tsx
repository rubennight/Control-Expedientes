import { Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const pendientes = () => {
  const [pendientes, setPendientes] = useState<Pendiente[]>([]);
  const [cargando, setCargando] = useState(false);

  const width = window.innerWidth;
  const height = window.innerHeight;

  const cargarMasPendientes = () =>{
    if(cargando) {
      return;
    }
    setCargando(true)
    fetch('http://localhost:3000/leerPendientes')
      .then(response => response.json())
      .then(data => {
        setPendientes(data.pendientes);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error fetching pendientes:', error);
        setCargando(false);
      });
  }

  const boxStyle = {
      background: '#ffffff',
      borderRadius: '10px',
      padding: '20px',
      width: width * 0.35,
      height: height * 0.43
    };

  useEffect(() => {
    cargarMasPendientes()
  }, []);  

  return(
    <div>
      <h2 style={{ textAlign: 'left'}}>Pendientes</h2>
      <Divider />
      <div id="scrollDiv" style={boxStyle}>
        <InfiniteScroll
          height={height * 0.37}
          dataLength={pendientes.length}
          next={cargarMasPendientes}
          hasMore={pendientes.length < 5}
          loader={
            <Skeleton 
              paragraph={{
                rows: 2
              }}
              active
            />
          }
          endMessage={<Divider plain>Esos son todos los pendientes.</Divider>}
          scrollableTarget={"scrollDiv"}
        >
          <List
            size='small'
            dataSource={pendientes}
            itemLayout="horizontal"
            renderItem={(p) => (
              <List.Item>
                <List.Item.Meta
                  title={<a>{p.titulo}</a>}
                  description={p.descripcion}
                />
              </List.Item>
            )}>
          </List>                        
        </InfiniteScroll>
      </div>
    </div>

  )
}

export default pendientes;