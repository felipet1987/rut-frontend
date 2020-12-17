
import React, { useState } from 'react';
import { Button, Form, Label, Input ,Alert, Spinner, Table } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Jumbotron } from 'reactstrap';

import { getUser } from './restClient'



function App() {

  const [rut, setRut] = useState("")
  const [user, setUser] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);



  const handleSubmit = event => {

    setSubmitting(true);
    setSuccess(false)
    getUser(rut).then(res => {
      setSuccess(true)
      setSubmitting(false);

      setUser(res.data)

    }).catch(error => {

      setError(true)
      setSuccess(false)
      setSubmitting(false);

      setTimeout(() => {
        setError(false);
      }, 1500);

    });
    event.preventDefault();
  }


  return (
    <Container fluid="md">


      <Jumbotron fluid>
        <Container fluid>
          <h4 className="display-3">Busqueda por Rut</h4>
        </Container>
      </Jumbotron>


      <Form onSubmit={handleSubmit}>
        <Row xs="4">
          <Col>
            <Input type="text" name="rut" id="rut" placeholder="ingrese rut" onChange={e => setRut(e.target.value)} />
          </Col>
          <Col>
            <Button type="submit">Buscar</Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
        </Col>
        {submitting &&
          <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
        }






      </Row>
      <Row style={{paddingTop: "50px"}}>
        <Col xs="6">
          {success &&
              <Table dark>
                <tbody>
                  <tr>
                    <th scope="row">Nombre</th>
                    <td>{user.nombre}</td>
                  </tr>
                  <tr>
                    <th scope="row">Apellido</th>
                    <td>{user.apellido}</td>
                  </tr>
                  <tr>
                    <th scope="row">Fecha de Nacimiento</th>
                    <td>{user.fechaNac}</td>
                  </tr>
                </tbody>
              </Table>
          }
        </Col>
      </Row>
      <Row style={{paddingTop: "50px"}}>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          {error &&
            <Alert style={{ position: "fixed" }} color="warning">
              Usuario no encontrado
            </Alert>
          }
        </Col>
      </Row>



    </Container>
  );
}

export default App;
