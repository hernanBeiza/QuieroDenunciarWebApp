import { useNavigate } from 'react-router-dom';

import { Row, Col, Button, Form, Accordion } from 'react-bootstrap';

import { LocalStorageService } from 'quiero-denunciar-services';
import { IngresarDenunciante, IngresarDenunciado, IngresarDatos, AdjuntarDocumentos } from './../';

import './RevisarDatos.css'

export default function RevisarDatos() {
  const navigate = useNavigate();

  const finalizar = () => {
    LocalStorageService.eliminarTodo();
    navigate("/denuncias/finalizar");
  }

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
        <Col xs={12} className="text-start">
          <h4>Resumen de tu denuncia</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Denunciante</Accordion.Header>
                <Accordion.Body>
                  <IngresarDenunciante desactivado={true}/>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Denunciado</Accordion.Header>
                <Accordion.Body>
                  <IngresarDenunciado desactivado={true}/>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Detalles de la denuncia</Accordion.Header>
                <Accordion.Body>
                <IngresarDatos desactivado={true}/>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Documentos adjuntos</Accordion.Header>
                <Accordion.Body>
                <AdjuntarDocumentos desactivado={true}/>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Form.Group className="pt-2">
              <Row>
                <Col className="text-start">
                  <Button type="button" href="/denuncias/adjuntar-documentos">Volver</Button>
                </Col>
                <Col className="text-end">
                  <Button type="button" onClick={finalizar}>Finalizar</Button>
                </Col>
              </Row>
            </Form.Group>

          </Form>
        </Col>
      </Row>
      
    </main>
  )
}
