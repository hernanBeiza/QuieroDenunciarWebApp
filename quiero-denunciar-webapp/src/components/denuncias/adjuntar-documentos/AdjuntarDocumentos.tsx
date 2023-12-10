import { useEffect, useState } from 'react';

import { Row, Col, Button, Form } from 'react-bootstrap';
import  './AdjuntarDocumentos.css'
import AdjuntarDocumentoItem from './adjuntar-documento-item';

//TODO Crear archivo con interface o modelo, class
interface Archivo {
  id:number
}

export default function AdjuntarDocumentos() {
  console.log("AdjuntarDocumentos");
  
  const [archivos, setArchivos] = useState<Array<Archivo>>([]);
  console.log(archivos);

  function agregarArchivo() {
    console.log("agregarArchivo");
    //TODO Crear clase y objeto
    const archivo:Archivo = { id:archivos.length+1 };
    archivos.push(archivo);
    setArchivos([...archivos]);
  }

  useEffect(()=>{
    console.log("useEffect");
    console.log(archivos);
  },[archivos])

  return (
    <main>
      <Row>
        <Col className="text-start">
          <h4>Adjunta las evidencias que tengas aquí.</h4>
          <p>Puedes subir archivos .pdf, .docx, jpg y .png.</p>
          <small>Si tu denuncia es anónima, recuerda <strong>no ingresar datos que puedan delatarte.</strong></small>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Row>
                <Col className="text-end">
                  <Button type="button" onClick={agregarArchivo}>Agregar nuevo archivo</Button>
                </Col>
              </Row>
            </Form.Group>

            {archivos && archivos.map((archivo,indice)=> <AdjuntarDocumentoItem archivo={archivo } key={indice} id={indice+=1}/>)}

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Total de archivos a enviar: {archivos.length }</Form.Label>
            </Form.Group>

          <Form.Group>
            <Row>
              <Col className="text-start">
                <Button href="/denuncias/ingresar-datos">Volver</Button>
              </Col>
              <Col className="text-end">
                <Button type="button" href="/denuncias/revisar">Enviar</Button>
              </Col>
            </Row>
          </Form.Group>

          </Form>
        </Col>
      </Row>

      {/**
      <Row>
        <Col className="text-start">
          <Button href="/denuncias/denuncia-ingresar-datos">Volver</Button>
        </Col>
        <Col className="text-end">
          <Button href="/denuncias/denuncia-revisar">Siguiente</Button>
        </Col>
      </Row>
      **/}
    </main>
  )
}
