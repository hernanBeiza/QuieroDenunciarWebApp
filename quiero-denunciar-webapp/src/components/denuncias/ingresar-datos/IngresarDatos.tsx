import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Row, Col, Button, Form } from 'react-bootstrap';
import './IngresarDatos.css'

import { Denuncia, Direccion, Materia, DenunciaMateria } from './../../../models';

import { Alerta, ComunaSelect, MateriaCheckBoxGroup } from './../../compartidos';

export default function IngresarDatos() {
  const navigate = useNavigate();
  let denunciasMateria:Array<DenunciaMateria> = new Array<DenunciaMateria>();
  const [denuncia, setDenuncia] = useState(new Denuncia());
  const [direccion, setDireccion] = useState(new Direccion());
  const [invalido, setInvalido] = useState(false);
  const [errores, setErrores] = useState("");

  //TODO Ver como inicar objeto con valores por defecto
  denuncia.codigoEstadoDenuncia = 1;
  
  const onCerrarAlerta = () => {
    setErrores("");
  }

  const enviarFormulario = (e:any) => {
    e.preventDefault();
    console.log("enviarFormulario();");

    //TODO Ver como obtener los datos del denunciante y denunciado para completar el objeto
    console.log("denuncia", denuncia);
    console.log("direccion", direccion);
    console.log("denunciasMateria", denunciasMateria);

    let enviar = true;
    let errores = "Faltó completar lo siguiente:";

    if(denunciasMateria.length===0){
      enviar = false;
      errores = errores.concat("\nMateria");
    }
    if(!direccion.idComuna){
      enviar = false;
      errores = errores.concat("\nComuna");
    }
    if(!direccion.calle){
      enviar = false;
      errores = errores.concat("\nCalle");
    }
    if(!direccion.numero){
      enviar = false;
      errores = errores.concat("\nNúmero");
    }
    if(!direccion.codigoTipoDireccion){
      enviar = false;
      errores = errores.concat("\nTipo de recinto");
    }
    if(!denuncia.descripcion){
      enviar = false;
      errores = errores.concat("\nDenuncia");
    }

    if(enviar){
      setInvalido(false);
      setErrores("");
      navigate("/denuncias/adjuntar-documentos");
    } else {
      setInvalido(true);
      setErrores(errores);
    }
  }

  const onSeleccionarMateria = (materiasSeleccionadas:Array<Materia>) => {
    console.log("onSeleccionarMateria", materiasSeleccionadas);
    denunciasMateria = materiasSeleccionadas.map(materia=>{
      let denunciaMateria:DenunciaMateria = new DenunciaMateria();
      denunciaMateria.idDenuncia = denuncia.id;
      denunciaMateria.codigoMateria = materia.codigo;
      return denunciaMateria;
    });
  }

  return (
    <main>
    <Row>
      <Col className="text-start">
        <h5>Relata aquí los datos de la denuncia. Intenta que sea lo mas detallado y claro posible.</h5>
        <p>Detalla lugar, fecha y hora de los hechos.</p>
        <small>Si tu denuncia es anónima, recuerda no ingresar datos que puedan delatarte.</small>
      </Col>
    </Row>
    <Row>
      <Col>
        <Form noValidate validated={invalido} onSubmit={enviarFormulario}>
          <Alerta mostrar ={errores=="" ? false : true } mensaje={errores} tipo={errores ? 'danger' : '' } onCerrarEvent={onCerrarAlerta}/>

          <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="comuna">
            <Form.Label column xs={12} sm={4} md={2}>Comuna</Form.Label>
            <Col xs={12} sm={8} md={10}>
              <ComunaSelect idComuna={1} onComunaSelectChange={(idComuna:number)=>setDireccion({...direccion, idComuna:Number(idComuna)})}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="materia">
            <Form.Label className="text-sm-start text-md-end" column xs={12} sm={4} md={2}>Materia(s) relacionada(s)</Form.Label>
            <Col className="text-start" xs={12} sm={8} md={10}>
              <MateriaCheckBoxGroup onSeleccionarMateriaChange = { ((materiasSeleccionadas:Array<Materia>) => onSeleccionarMateria(materiasSeleccionadas)) } />
            </Col>
          </Form.Group>
          

          <Form.Group as={Row} className="mb-3" controlId="fecha">
            <Form.Label className="text-sm-start text-md-end" column xs={12} sm={4} md={2}>Fecha de los hechos</Form.Label>
            <Col className="text-start" xs={12} sm={8} md={10}>
              <Form.Control required type="date" placeholder="" onChange={e => setDenuncia({...denuncia, fecha:e.target.value})} />
            </Col>
          </Form.Group>
          
          <code>Agregar componente IngresarDireccion</code>

          <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="descripcion">
            <Form.Label column xs={12} sm={4} md={2}>Descripción</Form.Label>
            <Col xs={12} sm={8} md={10}>
              <Form.Control required as="textarea" rows={3} onChange={e => setDenuncia({...denuncia, descripcion:e.target.value})} />
              <Form.Control.Feedback type="invalid">Los detalles de la denuncia son obligatorios</Form.Control.Feedback>
              <Form.Text className="text-muted">Ingresa detalles que permitan identificar al implicado y la actividad denunciada.</Form.Text>
            </Col>
          </Form.Group>

          <Form.Group>
            <Row>
              <Col className="text-start">
                <Button type="button"  href="/denuncias/ingresar-denunciado">Volver</Button>
              </Col>
              <Col className="text-end">
                <Button type="submit">Enviar</Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  </main>
  )
}
