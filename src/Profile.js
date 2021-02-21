import React, {useState} from 'react'
import fire from 'firebase'
import {Card, Button, CardDeck, Row, Alert} from 'react-bootstrap'

function Profile({uid}) {

    const [reportsD, setReportsD] = useState([])
    const [dCheck, setDCheck] = useState(false)
    const [reportsCHD, setReportsCHD] = useState([])
    const [chdCheck, setChdCheck] = useState(false)
    const [reportsH, setReportsH] = useState([])
    const [hCheck, setHCheck] = useState(false)
    const [asthma, setAsthma] = useState([])
    const [aCheck, setACheck] = useState(false)
    const [other, setOther] = useState([])
    const [oCheck, setOCheck] = useState(false)

    const getDiabetesReports = () => {
        setDCheck(true)
        fire.firestore()
            .collection("reports")
            .doc(uid)
            .collection("Diabetes")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot)=> {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{
                        id, ...data
                    }
                })
                
                setReportsD(posts)
            })

    }
    const getCHDReports = () => {
        setChdCheck(true)
        fire.firestore()
            .collection("reports")
            .doc(uid)
            .collection("CHD")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot)=> {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{
                        id, ...data
                    }
                })
                
                setReportsCHD(posts)
            })

    }
    const getHReports = () => {
        setHCheck(true)
        fire.firestore()
            .collection("reports")
            .doc(uid)
            .collection("Hypoxemia")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot)=> {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{
                        id, ...data
                    }
                })
                
                setReportsH(posts)
            })

    }
    const getAReports = () => {
        setACheck(true)
        fire.firestore()
            .collection("reports")
            .doc(uid)
            .collection("Asthma")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot)=> {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{
                        id, ...data
                    }
                })
                
                setAsthma(posts)
            })

    }
    const getOReports = () => {
        setOCheck(true)
        fire.firestore()
            .collection("reports")
            .doc(uid)
            .collection("Other")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot)=> {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{
                        id, ...data
                    }
                })
                
                setOther(posts)
            })

    }

    return (
        <div style={{marginLeft: 40}}>
            <Button style={{marginTop: 20, marginBottom: 20}} onClick={getDiabetesReports} variant="primary">Generate Diabetes Reports</Button>
            <div>
                {dCheck ? reportsD.length > 0 ? 
                <CardDeck style={{margin: 20}}>
                    <Row className="d-flex justify-content-around">
                        {reportsD.map(report => (
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={report.downloadURL} />
                            <Card.Body>
                                <Card.Title>{report.caption}</Card.Title>
                                <Card.Text>
                                {report.caption}
                                </Card.Text>

                            </Card.Body>
                            </Card>
                        ))}
                    </Row>
                </CardDeck> :
                <Alert variant="danger">No Diabetes Report of the user</Alert> : null}
                
            </div>
            <Button style={{marginBottom: 20}} onClick={getCHDReports} variant="primary">Generate CHD Reports</Button>
            <div>
                { chdCheck ? reportsCHD.length > 0 ? 
                <CardDeck style={{margin: 20}}>
                    <Row className="d-flex justify-content-around">
                        {reportsCHD.map(report => (
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={report.downloadURL} />
                            <Card.Body>
                                <Card.Title>{report.caption}</Card.Title>
                                <Card.Text>
                                {report.caption}
                                </Card.Text>

                            </Card.Body>
                            </Card>
                        ))}
                    </Row>
                </CardDeck> :
                <Alert variant="danger">No CHD reports of this user</Alert> : null}
                
            </div>
            <Button style={{marginBottom: 20}} onClick={getHReports} variant="primary">Generate Hypoxemia Reports</Button>
            <div>
                {hCheck ? reportsH.length > 0 ? 
                <CardDeck style={{margin: 20}}>
                    <Row className="d-flex justify-content-around">
                        {reportsH.map(report => (
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={report.downloadURL} />
                            <Card.Body>
                                <Card.Title>{report.creation}</Card.Title>
                                <Card.Text>
                                {report.caption}
                                </Card.Text>

                            </Card.Body>
                            </Card>
                        ))}
                    </Row>
                </CardDeck> :
                <Alert variant="danger" style={{margin : 20}}>No Hypoxemia Reports of this user.</Alert> : null}
                
            </div>
            <Button style={{marginBottom: 20}} onClick={getAReports} variant="primary">Generate Asthma Reports</Button>
            <div>
                {aCheck ? asthma.length > 0 ? 
                <CardDeck style={{margin: 20}}>
                    <Row className="d-flex justify-content-around">
                        {asthma.map(report => (
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={report.downloadURL} />
                            <Card.Body>
                                <Card.Title>{report.creation}</Card.Title>
                                <Card.Text>
                                {report.caption}
                                </Card.Text>

                            </Card.Body>
                            </Card>
                        ))}
                    </Row>
                </CardDeck> :
                <Alert variant="danger" style={{margin : 20}}>No Asthma Reports of this user.</Alert> : null}
                
            </div>

            <Button style={{marginBottom: 20}} onClick={getOReports} variant="primary">Generate Other Reports</Button>
            <div>
                {oCheck ? other.length > 0 ? 
                <CardDeck style={{margin: 20}}>
                    <Row className="d-flex justify-content-around">
                        {other.map(report => (
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={report.downloadURL} />
                            <Card.Body>
                                <Card.Title>{report.creation}</Card.Title>
                                <Card.Text>
                                {report.caption}
                                </Card.Text>

                            </Card.Body>
                            </Card>
                        ))}
                    </Row>
                </CardDeck> :
                <Alert variant="danger" style={{margin : 20}}>No Other Reports of this user.</Alert> : null}
                
            </div>
        </div>
    )
}

export default Profile
