import { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
//import styles from './cabecera.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { FechaSelector } from 'quiero-denunciar-shared-components';
import { Archivo } from 'quiero-denunciar-models';
import { TipoArchivoEnum } from 'quiero-denunciar-enums';

export default function AdjuntarArchivoItem(props:{desactivado?:boolean, indice:number, archivo:Archivo, onActualizarArchivo:Function, onEliminarArchivo:Function}) {
  console.log("AdjuntarArchivoItem");
  const api:string = import.meta.env.VITE_API_URL;
  const endpointDescargarImagen:string = import.meta.env.VITE_API_ENDPOINT_DESCARGAR_IMAGEN;

  const [archivo, setArchivo] = useState(new Archivo());

  const mantenerDatosDeArchivoAntiguo = () =>{
    setArchivo(props.archivo);
  }

  const seleccionarFecha = (fecha:string) =>{
    archivo.fecha = fecha;
    props.onActualizarArchivo(props.indice, archivo);
  }

  const ingresarDescripcion = (event:any) =>{
    archivo.descripcion = event.target.value;
    props.onActualizarArchivo(props.indice, archivo);
  }

  const seleccionarArchivo = (event:any) => {
    console.log(event.currentTarget.value);
    console.log(event.currentTarget.files);
    const itemFile:File = (event.currentTarget.files as FileList)[0];
    const codigoTipoArchivo:number = identificarTipoDeArchivo(itemFile);
    const archivoPermitido = validarTipoDeArchivo(itemFile);
    if(!archivoPermitido){
      //TODO Levantar alerta
      console.error("Archivo no permitido");
    }
    archivo.codigoTipoArchivo = codigoTipoArchivo;
    archivo.nombreArchivo = itemFile.name;
    archivo.file = itemFile;
    archivo.extensionArchivo = obtenerExtensionDeArchivo(itemFile);
    props.onActualizarArchivo(props.indice, archivo);
  }

  const eliminar = (event:any) => {
    console.log(event);
    props.onEliminarArchivo(props.indice, archivo);
  }

  //Identificar es IMAGEN, DOC, PDF, WORD, etc.
  const identificarTipoDeArchivo = (file:File) : TipoArchivoEnum => {
    console.log(file.type);
    const extension = obtenerExtensionDeArchivo(file);    
    switch(extension){
    case "jpeg":
    case "jpg":
    case "png":
      return TipoArchivoEnum.Imagen;
      break;
    case "mp4":
    case "avi":
      return TipoArchivoEnum.Video;
      break;
    case "doc":
    case "docx":
    case "xls":
    case "xlsx":
      return TipoArchivoEnum.Documento;
      break;
    case "pdf":
      return TipoArchivoEnum.PDF;
      break;
    default:
      return TipoArchivoEnum.NoIdentificado;
      break;
    }
  }

  const validarTipoDeArchivo = (file:File) : boolean => {
    const extension:string = obtenerExtensionDeArchivo(file);
    const extensionesPermitidas:Array<string> = new Array<string>("doc","docx","xls","xlsx","jpg","jpeg","png","pdf");
    return extensionesPermitidas.includes(extension);
  }

  const obtenerExtensionDeArchivo = (file:File) : string => {
    return file.type.split("/")[1].toLowerCase();
  }

  const VisualizadorArchivo = () => {
    //TODO Diferenciar por tipo de archivo la funcionalidad: img, video, pdf, descargar
    //TODO Mostrar un cono según tipo de archivo
    return (
      <Row>
        <Col xs={12} sm={4} md={2}>Imagen</Col>
        <Col xs={12} sm={4} md={10}><img src={api.concat(endpointDescargarImagen).concat("/").concat(archivo.id.toString())} width={200}/></Col>
      </Row>
    )
  }

  useEffect(()=>{
    mantenerDatosDeArchivoAntiguo();
  },[]);

  return (
    <>
    <Card className="p-0 mb-4">
      <Card.Header as={'h5'}>
        <Row>
          <Col sm={8} className="text-start pt-1">Archivo {props.indice+1}</Col>
          <Col sm={4} className="text-end" >
            {props.desactivado ? null : (<Button type="button" variant="outline-danger" size="sm" onClick={eliminar}><FontAwesomeIcon icon={faTrash}/></Button>)}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
      <Row>
      <Col sm={12} md={12} xl={6}>
        <FechaSelector label={'Fecha'} fecha={props.archivo.fecha ? props.archivo.fecha : ""} onFechaChange={seleccionarFecha}/>
        <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="descripcion">
          <Form.Label column xs={12} sm={4} md={2}>Descripción</Form.Label>
          <Col xs={12} sm={8} md={10}>
            <Form.Control
            as="textarea" rows={3}
            value = {props.archivo.descripcion ? props.archivo.descripcion : ""}
            onChange={ingresarDescripcion} />
            <Form.Control.Feedback type="invalid">La descripción del documento son obligatorios</Form.Control.Feedback>
            <Form.Text className="text-muted">Ingresa detalles que permitan identificar al implicado y la actividad denunciada.</Form.Text>
          </Col>
        </Form.Group>
      </Col>
      <Col sm={12} md={12} xl={6}>
        { 
          archivo.id ? VisualizadorArchivo() :
          <InputGroup className="mb-2">
            <Form.Control type="file" required accept=".png, .jpg, .jpeg, doc, docx, xls, xlsx, pdf, .mp4" onChange={seleccionarArchivo} />
            <Form.Control.Feedback type="invalid">El archivo es obligatorio</Form.Control.Feedback>
          </InputGroup>
        }
      </Col>
      </Row>
      </Card.Body>
    </Card>
    </>
  )

}
