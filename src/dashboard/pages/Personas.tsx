import { Tabs } from 'antd';
import VictimasDirectas from '../../components/VictimasDirectas';
import VictimasIndirectas from '../../components/VictimasIndirectas';


function Personas(){
    const items = [
        {
            key: 'victimaDirectas',
            label: 'Victimas Directas',
            children: <VictimasDirectas />
        },
        {
            key: 'victimasIndirectas',
            label: 'Victimas Indirectas',
            children: <VictimasIndirectas />
        }
    ]

    return(
        <div>
            <h1>Personas</h1>
            <Tabs defaultActiveKey='victimaDirectas' items={items} />
        </div>
    )
}

export default Personas;