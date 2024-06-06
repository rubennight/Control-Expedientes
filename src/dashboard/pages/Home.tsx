import Calendario from '../../components/Calendar';
import Pendientes from '../../components/Pendientes';

function Home(){
    return(
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly ', alignItems: 'center' }}>
                <Pendientes />
                <Calendario />
            </div>            
        </div>
    )
}

export default Home;