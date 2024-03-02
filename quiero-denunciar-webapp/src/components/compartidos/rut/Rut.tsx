import { useState } from 'react';

import { Row, Col, Form } from 'react-bootstrap';

import { checkRut, prettifyRut, formatRut } from "react-rut-formatter";

interface RutPropsInterface {
  label?:string,
  rut?:number,
  dv?:string,
  desactivado?:boolean,
  onRutChange:(rut:number, dv:string) => void
}
export default function Rut(props:RutPropsInterface) {
  //console.log("Rut", props);
  const [rut, setRut] = useState(0);
  const [dv, setDv] = useState("");

  const enviar = (rut:number, dv:string) => {
    if(props.onRutChange){
      props.onRutChange(rut, dv);
    }
  }

  const mostrarValidez = (rut:number, dv:string) => {
    if(props.desactivado) {
      return false;
    } else {
      const esValido = checkRut(rut+"-"+dv);
      return esValido;
    }
  }

  const mostrarInvalidez = (rut:number, dv:string) => {
    if(props.desactivado) {
      return false;
    } else {
      const esValido = checkRut(rut+"-"+dv);
      return !esValido;
    }
  }

  return (
    <>
      <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="rut">
        <Form.Label column xs={4} sm={4} md={2}>{props.label ? props.label : 'Rut'}</Form.Label>
        <Col xs={4} sm={4} md={4}>
        <Form.Control type="text" required placeholder="" 
        maxLength = { 12 }
        value = {props.rut || props.dv ? prettifyRut(props.rut+"-"+props.dv) : rut}
        onFocus= { () => {
          if(Number(rut) === 0 || String(dv==="0")){
            setRut(0);
            setDv("");
          }
        }}
        onBlur={ (e:React.FocusEvent<HTMLInputElement>) => {
          const rut = formatRut(e.target.value).split("-")[0];
          const dv = formatRut(e.target.value).split("-")[1];
          if(Number(rut) === 0 || String(dv==="0")){
            setRut(0);
            setDv("");
          } else {
            setRut(Number(rut));
            setDv(dv);
          }
          enviar(Number(rut),dv);
        }} 
        onChange = { (e:React.ChangeEvent<HTMLInputElement>) => {
          const rut = formatRut(e.target.value).split("-")[0];
          const dv = formatRut(e.target.value).split("-")[1];
          setRut(Number(rut));
          setDv(dv);
          enviar(Number(rut),dv);
        }}
        isValid = { mostrarValidez(props.rut ? props.rut : rut, props.dv ? props.dv : dv) }
        isInvalid = { mostrarInvalidez(props.rut ? props.rut : rut, props.dv ? props.dv : dv) }
        />
        <Form.Control.Feedback type="invalid">Rut no válido</Form.Control.Feedback>
        </Col>
      </Form.Group>
      {/*
      <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="rut">
        <Form.Label column xs={4} sm={4} md={2}>Rut</Form.Label>
        <Col xs={4} sm={4} md={4}>
        <Form.Control type="text" required placeholder="" 
        maxLength = { 8 } 
        value = {rut ? rut : ""} 
        onChange = { e => {
          //TODO Enviar rut
          //setPersona({...persona, rut:Number(e.target.value) })
        }}
        />
        <Form.Control.Feedback type="invalid">Rut es obligatorio</Form.Control.Feedback>
        </Col>
        <Form.Label column xs={2} sm={2} md={1}>DV</Form.Label>
        <Col xs={2} sm={2} md={1}>
        <Form.Control type="text" required placeholder="" maxLength = { 1 }
        value = {dv ? dv : ""}
        onChange = { e => {
          //TODO Enviar dv          
          //setPersona({...persona, dv:e.target.value })};
        }}
        />
        <Form.Control.Feedback type="invalid">DV es obligatorio</Form.Control.Feedback>
        </Col>
      </Form.Group>
      */}
    </>
  )
  
}
