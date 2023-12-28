import { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import { TipoDireccionSelect, ComunaSelect } from './../';
import { Direccion } from './../../../models';
import { TipoDireccionEnum } from './../../../enums';

interface IngresarDireccionPropsInterface {
  direccion?:Direccion, 
  desactivado?:boolean, 
  onIngresarDireccionEvent?:Function
}

export default function IngresarDireccion(props:IngresarDireccionPropsInterface) {
  //console.log("IngresarDireccion");
  const [direccion, setDireccion] = useState(new Direccion());

  const seleccionarComuna = (idComuna:number) => {
    setDireccion({...direccion, idComuna:Number(idComuna)});
    if (props.onIngresarDireccionEvent){
      props.onIngresarDireccionEvent(direccion);      
    }
  }

  useEffect(() => {
    if (props.onIngresarDireccionEvent){
      props.onIngresarDireccionEvent(direccion);      
    }
  },[direccion]);

  return (
    <>
      <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="tipoRecinto">
        <Form.Label column xs={12} sm={4} md={2}>Tipo de recinto</Form.Label>
        <Col xs={12} sm={8} md={10}>
          <TipoDireccionSelect 
          desactivado={props.desactivado ? props.desactivado : false}
          codigoTipoDireccion={props.direccion?.codigoTipoDireccion}
          onTipoDireccionChange={(codigoTipoDireccion:number) => setDireccion({...direccion, codigoTipoDireccion:Number(codigoTipoDireccion)})} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="comuna">
        <Form.Label column xs={12} sm={4} md={2}>Comuna</Form.Label>
        <Col xs={12} sm={8} md={10}>
          <ComunaSelect 
          desactivado={props.desactivado ? props.desactivado : false}
          idComuna={props.direccion?.idComuna} 
          onComunaSelectChange={(idComuna:number) => seleccionarComuna(idComuna)}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="direccion">
        <Form.Label column xs={12} sm={4} md={2}>Calle</Form.Label>
        <Col xs={12} sm={8} md={4}>
          <Form.Control required type="text" placeholder=""
          value={props.direccion?.calle ? props.direccion?.calle : ''} 
          disabled={props.desactivado ? props.desactivado : false}
          onChange={e => setDireccion({...direccion, calle:e.target.value})} />
          <Form.Control.Feedback type="invalid">La calle es obligatoria</Form.Control.Feedback>
        </Col>
        <Form.Label column xs={12} sm={4} md={1} className="text-start text-md-end">Número</Form.Label>
        <Col xs={12} sm={4} md={2}>
          <Form.Control required type="text" placeholder="" 
          value={props.direccion?.numero ? props.direccion?.numero : ''} 
          disabled={props.desactivado ? props.desactivado : false}
          onChange={e => setDireccion({...direccion, numero:Number(e.target.value)})} />
        </Col>
        <Form.Label column xs={12} sm={2} md={1}>Depto</Form.Label>
        <Col xs={12} sm={2} md={2}>
          <Form.Control type="text" 
          disabled={direccion.codigoTipoDireccion !== TipoDireccionEnum.Departamento || props.desactivado && props.desactivado} 
          required={direccion.codigoTipoDireccion === TipoDireccionEnum.Departamento} 
          placeholder="" 
          value={props.direccion?.departamento ? props.direccion?.departamento : ''} 
          onChange={e => setDireccion({...direccion, departamento:Number(e.target.value)})} />
        </Col>
      </Form.Group>
    </>
  )
}
