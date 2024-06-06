import { Card, Descriptions } from "antd";

const ExpedienteCard = (expediente: Expediente) => {
    
    return(
        <Card
            size="small"
            title={expediente.idExpedienteInterno}
        >
            <Descriptions>
                <Descriptions.Item label="Causa Penal">{expediente.causaPenal}</Descriptions.Item>
                <br />
                <br />
                <Descriptions.Item label="Delito">{expediente.delito}</Descriptions.Item>
            </Descriptions>
        </Card>
    )
}

export default ExpedienteCard;