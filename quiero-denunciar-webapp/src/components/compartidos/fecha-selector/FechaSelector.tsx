import { useState } from 'react';

import { Row, Col, Form } from 'react-bootstrap';
import dayjs from 'dayjs';

interface FechaPropsInterface {
  label?:string,
  fecha?:string,
  onFechaChange:Function
}
export default function FechaSelector(props:FechaPropsInterface) {
  //console.log("FechaSelector", props);
  const [fecha, setFecha] = useState("");

  const transformarFecha = (fecha:string) => {
    const fechaFormateada = dayjs(fecha).format("YYYY-MM-DD");
    return fechaFormateada;
    //const partesDeFecha:Array<string> =  fecha.split("T")[0].split("-");
    //return partesDeFecha[0].concat("-").concat(partesDeFecha[1]).concat("-").concat(partesDeFecha[2])
  };

  const seleccionar = (event:any) => {
    setFecha(event.target.value);
    props.onFechaChange(event.target.value);
  }

  return (
    <>
      <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="fecha">
        <Form.Label className="text-sm-start text-md-end" column xs={12} sm={4} md={2}>{props.label ? props.label : 'Fecha de los hechos'}</Form.Label>
        <Col className="text-start" xs={12} sm={8} md={10}>
          <Form.Control required type="date" placeholder="" 
          value = {props.fecha ? transformarFecha(props.fecha) : ""}
          onChange={seleccionar}/>
          <Form.Control.Feedback type="invalid">La fecha de los hechos denunciados es obligatoria</Form.Control.Feedback>
        </Col>
      </Form.Group>
    </>
  )
  
}
