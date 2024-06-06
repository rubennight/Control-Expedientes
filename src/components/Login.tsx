import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

function Login(){
    const width = window.innerWidth;
    const navigate = useNavigate();

    const loginStyle={
        width: width * 0.35,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        borderRadius: 8,
        padding: 20,
        background: 'white'
    }

    const entrarButtonOnClick = () => {
        navigate('/dashboard')
    }


    return(
        <div style={loginStyle}>
            <Form
                name='login'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true}}
                autoComplete='off'
                >
                    <Form.Item
                        label="Usuario"
                        name="usuario"
                        rules={[{required: true, message: 'Por favor, introduzca su usuario.'}]}>
                        <Input />
                    </ Form.Item>
                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[{required: true, message: 'Por favor, introduzca su contraseña.'}]}>
                        <Input.Password />
                    </ Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                      <Button type="primary" htmlType="submit" onClick={entrarButtonOnClick}>
                        Entrar
                      </Button>
                    </Form.Item>

            </Form>
        </div>
    )
}

export default Login;