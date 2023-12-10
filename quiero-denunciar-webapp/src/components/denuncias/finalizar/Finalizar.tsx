import { Row, Col, Button } from 'react-bootstrap';

import './Finalizar.css'

export default function Finalizar() {
  return (
    <main>
    <Row>
      <Col>
        <p>Tu denuncia ha sido enviada!</p>
        <p>Una vez que envíes tu denuncia, será brevemente revisada y se enviará al departamento de fiscalización de La Florida.</p>
        <small>Si tu denuncia no fue anónima, recuerda revisar tu correo por si te el ente fiscalizador se comunica contigo.</small>
      </Col>
    </Row>
    <Row>
      <Col>
        <Button href="/">Ir al inicio</Button>
      </Col>
    </Row>
    </main>
  )
}
