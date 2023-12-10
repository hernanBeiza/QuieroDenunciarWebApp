import { Row, Col, Button } from 'react-bootstrap';

import './RevisarDatos.css'

export default function RevisarDatos() {
  return (
    <main>
      <Row>
        <Col className="text-start">
          <h4>Revisa los detalles de tu denuncia a continuación</h4>
          <p>Una vez que envíes tu denuncia, se enviará al departamento de fiscalización competente.</p>
          <small>Si tu denuncia es anónima, recuerda <strong>no ingresar datos ni incluir documentos que puedan delatarte.</strong></small>
        </Col>
      </Row>

      <Row>
        <Col className="text-start">
          <h4>Resumen de tu denuncia</h4>
        </Col>
      </Row>
      <Row>
        <Col className="text-start">
          <h5>Denunciante</h5>
        </Col>
      </Row>
      <Row>
        <Col className="text-start">
          <h5>Denunciado</h5>
        </Col>
      </Row>
      <Row>
        <Col className="text-start">
          <h5>Antecedentes</h5>
        </Col>
      </Row>
      <Row>
        <Col className="text-start">
          <h5>Documentos</h5>
        </Col>
      </Row>
      
      <Row>
        <Col className="text-start">
          <Button href="/denuncias/adjuntar-documentos">Volver</Button>
        </Col>
        <Col className="text-end">
          <Button href="/denuncias/finalizar">Finalizar</Button>
        </Col>
      </Row>
    </main>
  )
}
