import { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import { TipoDireccionSelect, ComunaSelect } from './../';
import { Direccion } from './../../../models';
import { TipoDireccionEnum } from './../../../enums';

interface IngresarDireccionPropsInterface {
  direccion?:Direccion, 
  onIngresarDireccionEvent:Function
}

export default function IngresarDireccion(props:IngresarDireccionPropsInterface) {
  //console.log("IngresarDireccion");
  const [direccion, setDireccion] = useState(new Direccion());

  const seleccionarComuna = (idComuna:number) => {
    setDireccion({...direccion, idComuna:Number(idComuna)});
    props.onIngresarDireccionEvent(direccion);
  }

  useEffect(() => {
    props.onIngresarDireccionEvent(direccion);
  },[direccion]);

  return (
    <>
      <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="tipoRecinto">
        <Form.Label column xs={12} sm={4} md={2}>Tipo de recinto</Form.Label>
        <Col xs={12} sm={8} md={10}>
          <TipoDireccionSelect 
          codigoTipoDireccion={props.direccion?.codigoTipoDireccion}
          onTipoDireccionChange={(codigoTipoDireccion:number) => setDireccion({...direccion, codigoTipoDireccion:Number(codigoTipoDireccion)})} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="comuna">
        <Form.Label column xs={12} sm={4} md={2}>Comuna</Form.Label>
        <Col xs={12} sm={8} md={10}>
          <ComunaSelect idComuna={props.direccion?.idComuna} 
          onComunaSelectChange={(idComuna:number) => seleccionarComuna(idComuna)}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 text-xs-start text-sm-start text-md-end" controlId="direccion">
        <Form.Label column xs={12} sm={4} md={2}>Calle</Form.Label>
        <Col xs={12} sm={8} md={4}>
          <Form.Control required type="text" placeholder="" value={props.direccion?.calle} onChange={e => setDireccion({...direccion, calle:e.target.value})} />
          <Form.Control.Feedback type="invalid">La calle es obligatoria</Form.Control.Feedback>
        </Col>
        <Form.Label column xs={12} sm={4} md={1} className="text-sm-start text-md-end">Número</Form.Label>
        <Col xs={12} sm={4} md={2}>
          <Form.Control required type="text" placeholder="" value={props.direccion?.numero} onChange={e => setDireccion({...direccion, numero:Number(e.target.value)})} />
        </Col>
        <Form.Label column xs={12} sm={2} md={1}>Depto</Form.Label>
        <Col xs={12} sm={2} md={2}>
          <Form.Control type="text" disabled={direccion.codigoTipoDireccion !== TipoDireccionEnum.Departamento} 
          required={direccion.codigoTipoDireccion === TipoDireccionEnum.Departamento} 
          placeholder="" 
          value={props.direccion?.departamento} 
          onChange={e => setDireccion({...direccion, departamento:Number(e.target.value)})} />
        </Col>
      </Form.Group>
    </>
  )
}
