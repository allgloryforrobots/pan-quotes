import 'antd/dist/antd.css'
import React, {useState} from "react"
import {Button, Layout, Space, Spin} from 'antd'
import { HeartTwoTone } from '@ant-design/icons'
import {Card, message} from 'antd'
import ModalAsync from "./ModalAsunc"
import firebase from "firebase/app"
import 'firebase/firestore'
import {useCollection} from "react-firebase-hooks/firestore"

const {Content, Footer} = Layout


const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
}

//Initialize Firebase
if (!firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig)
    } catch (err) {
        console.error('Firebase initialization error raised', err.stack)
    }
}

function App() {

    const messagesRef = firebase.firestore().collection('quotes')
    const query = messagesRef.limit(25)
    const [quotes, loading, error] = useCollection(query)
    const [izbr, setIzbr] = useState('normal')


    return (
        <Layout className="layout">
            <div style={{
                background: '#001529',
                height: '60px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{marginLeft: 40}}>
                    <h2 style={{color: 'white', whiteSpace: 'nowrap', margin: 0}}>iЦитата 🔥</h2>
                </div>

                <div>
                    {
                        izbr === 'normal' && <Button type="link"
                                                     onClick={() => setIzbr('izbr')}
                                                     style={{color: 'rgb(255,165,0)'}}>
                            Полюбившиеся</Button>
                    }
                    {
                        izbr === 'izbr' && <Button type="link"
                                                   onClick={() => setIzbr('normal')}
                                                   style={{color: 'rgb(255,165,0)'}}>
                            Все цитаты</Button>
                    }
                    <ModalAsync/>
                </div>
            </div>

                <Content style={{padding: '15px 25px', minHeight: '100vh'}}>
                    <Space size={[4, 16]} wrap>
                        {
                            quotes ? quotes.docs.filter(quote => {
                                if (izbr === 'izbr') {
                                    return Object.keys(localStorage).indexOf(quote.id) > -1
                                }
                                return true

                            }).map(quote => {
                            return <Card title={quote.data().author}
                                         key={Math.random()}
                                  bordered={false}
                                  extra={
                                      <span>
                                        <HeartTwoTone
                                            onClick={() => localStorage.setItem(quote.id, quote.id)}
                                            style={{ fontSize: '16px', marginRight: 15}}/>
                                      </span>
                                  }
                                  style={{width: 300, margin: 10}}>
                                <p>{quote.data().quote}</p>
                            </Card>
                        }) : <Spin/>
                        }

                        {
                            error && message.info(JSON.stringify(error))
                        }

                    </Space>
                </Content>


            <Footer style={{ textAlign: 'center' }}> © Created by IT-дизель</Footer>
        </Layout>
)
}

export default App
