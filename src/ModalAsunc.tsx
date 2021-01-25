import React, {useState} from "react";
import {Button, Form, Input, Modal} from 'antd'
import firebase from "firebase/app"
import 'firebase/firestore'



const ModalAsync: React.FC = () => {
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    }

    const onValuesChange = (values: { author: React.SetStateAction<string>; quote: React.SetStateAction<string>; }) => {
        if (values.author) {
            setAuthor(values.author)
        }
        if (values.quote) {
            setQuote(values.quote)
        }
    }

    const [visible, setVisible] = useState<boolean>(false)
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const [author, setAuthor] = useState<string>('')
    const [quote, setQuote] = useState<string>('')


    const showModal = () => {
        setVisible(true)
    }

    const handleOk = () => {

        firebase.firestore().collection('quotes').add({
            author,
            quote,
        })
        setAuthor('')
        setQuote('')
        setConfirmLoading(true)
        setTimeout(() => {
            setVisible(false)
            setConfirmLoading(false)
        }, 1)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    return (
        <>  <Button type="link"
                    onClick={showModal}
                    style={{color: 'rgb(255,165,0)'}}>Сбацай цитату</Button>
            <Modal
                title="Закинуть цитату в печь"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose
            >
                <Form {...layout} name="nest-messages" onValuesChange={onValuesChange} >

                    <Form.Item name={'author'} label="Автор">
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'quote'} label="Изречение">
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ModalAsync