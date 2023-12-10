import { Container, Row, Col, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'

import './Inicio.css'
function Inicio() {

  return (
    <main>
    <Container>
    <Row>
      <Col>
        <h1 className="text-center">Quiero denunciar</h1>
        <p>Quiero denunciar es un ente remisor de denuncias de La Florida.</p>
      </Col>
    </Row>
    <Row>
      <Col className="text-center">
        <Button href="/denuncias/ingresar-denunciante" variant="primary">
          ¡Quiero denunciar ahora!
          <FontAwesomeIcon icon={faBullhorn} className="ml-3"/>
        </Button>
      </Col>
    </Row>
    </Container>
    </main>
  )
}

export default Inicio
