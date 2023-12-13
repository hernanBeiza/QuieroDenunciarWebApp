import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useReducer } from 'react';

import { Row, Col, Button, Form } from 'react-bootstrap';
import './IngresarDenunciado.css'

import { Alerta, TipoPersonaSelect, IngresarDireccion } from './../../compartidos';
import { Persona, Parte, Direccion } from './../../../models';
import { TipoParteEnum } from './../../../enums';
import { LocalStorageService, IngresarDireccionPersonaParteService } from './../../../services';

import { IngresarDenunciadoReducer, IngresarDenunciadoStateInterface, IngresarDenunciadoActionType } from './../../../reducers';

export default function IngresarDenunciado() {
  console.log("IngresarDenunciado");
  const navigate = useNavigate();

  const [persona, setPersona] = useState(new Persona());
  const [direccion, setDireccion] = useState(new Direccion());
  const [parte, setParte] = useState(new Parte(0,0,0,TipoParteEnum.Denunciado));
  
  const initialState:IngresarDenunciadoStateInterface = {
    parte: parte,
    persona: persona,
    direccion: direccion,
    enviar:false,
    mostrarAlerta:false,
    invalido:false,
    errores:""
  }

  const [state, dispatch] = useReducer<(state: IngresarDenunciadoStateInterface, action: IngresarDenunciadoActionType) => IngresarDenunciadoStateInterface>(IngresarDenunciadoReducer, initialState);

  const recibirDireccion = (direccionRecibida:Direccion) => {
    setDireccion(direccionRecibida);
  }

  const cargarDatosPrevios = () => {
    const direccionGuardada = LocalStorageService.obtenerDireccionDenunciada();
    const personaGuardada = LocalStorageService.obtenerPersonaDenunciada();
    const parteGuardada = LocalStorageService.obtenerParteDenunciada();
    if(direccionGuardada){
      setDireccion(direccionGuardada);      
    }
    if(personaGuardada){
      setPersona(personaGuardada);      
    }
    if(parteGuardada){
      setParte(parteGuardada);      
    }
  }

  const enviarFormulario = (e:any) => {
    //console.log("enviarFormulario();");
    e.preventDefault();
    //
    state.parte = parte;
    state.persona = persona;
    state.direccion = direccion;
    dispatch( { type: 'ENVIAR' } );
  }


 useEffect(() => {
    if(state.enviar){
      enviarDatos();
    }
  }, [state]);


  useEffect(() => {
    cargarDatosPrevios();
  }, []);

  const enviarDatos = async () => {
    try {
      let [direccionGuardada, personaGuardada, parteGuardada] = await IngresarDireccionPersonaParteService.guardar(direccion, persona, parte);
      console.log(direccionGuardada, personaGuardada, parteGuardada);
      if(direccionGuardada.id && personaGuardada.id && parteGuardada.id){
        LocalStorageService.guardarDireccionDenunciada(direccionGuardada);
        LocalStorageService.guardarPersonaDenunciada(personaGuardada);
        LocalStorageService.guardarParteDenunciada(parteGuardada);
        navigate("/denuncias/ingresar-datos");
      } else {
        console.error("Hubo un error no controlado al guardar");
      }
    } catch (e) {
      console.error(e);
    }
  }

  const onCerrarAlerta = () => {
    dispatch( { type: 'CERRAR_ALERTA' } );
  }

  return (
    <main>
      <Row>
        <Col className="text-start">
          <h5>Ingresa los datos del denunciado.</h5>
          <small>Recuerda ingresar la mayor cantidad de detalles posibles para identificarlo. Sin embargo no ingreses datos que puedan delatarte.</small>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form noValidate validated={state.invalido} onSubmit={ enviarFormulario }>
            <Alerta mostrar={state.mostrarAlerta} mensaje={state.errores} tipo={state.errores ? 'danger' : '' } onCerrarEvent={onCerrarAlerta}/>

            <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="tipoPersona">
              <Form.Label column xs={12} sm={4} md={2}>Tipo de persona</Form.Label>
              <Col xs={12} sm={8} md={10}>
                <TipoPersonaSelect 
                codigoTipoPersona = {persona.codigoTipoPersona} 
                onTipoPersonaSelectChange = { ((codigoTipoPersona:number) => setPersona({...persona, codigoTipoPersona:Number(codigoTipoPersona) }) ) }/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="rut">
              <Form.Label column xs={4} sm={4} md={2}>Rut</Form.Label>
              <Col xs={4} sm={4} md={4}>
                <Form.Control type="text" placeholder="" maxLength = { 8 } 
                value = { persona.rut }
                onChange = { e => setPersona({...persona, rut:Number(e.target.value) })} />
              </Col>
              <Form.Label column xs={2} sm={2} md={1}>DV</Form.Label>
              <Col xs={2} sm={2} md={1}>
                <Form.Control type="text" placeholder="" maxLength = { 1 } 
                value = { persona.dv }
                onChange = { e => setPersona({...persona, dv:e.target.value })} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="nombre">
              <Form.Label column xs={12} sm={4} md={2}>Nombre</Form.Label>
              <Col xs={12} sm={8} md={10}>
                <Form.Control required type="text" placeholder="" 
                value = { persona.nombre }
                onChange = { e => setPersona({...persona, nombre:e.target.value })} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="nombreSegundo">
              <Form.Label column sm={4} md={2}>Segundo nombre</Form.Label>
              <Col sm={8} md={10}>
                <Form.Control 
                type="text" placeholder="" 
                value = { persona.nombreSegundo }
                disabled={persona.codigoTipoPersona==TipoParteEnum.Denunciado} 
                onChange = { e => setPersona({...persona, nombreSegundo:e.target.value })} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="apellidoPaterno">
              <Form.Label column sm={4} md={2}>Apellido paterno</Form.Label>
              <Col sm={8} md={10}>
                <Form.Control 
                type="text" placeholder="" 
                value = { persona.apellidoPaterno }
                disabled={persona.codigoTipoPersona==TipoParteEnum.Denunciado} 
                onChange = { e => setPersona({...persona, apellidoPaterno:e.target.value })} 
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="apellidoMaterno">
              <Form.Label column sm={4} md={2}>Apellido materno</Form.Label>
              <Col sm={8} md={10}>
                <Form.Control 
                type="text" placeholder="" 
                value = { persona.apellidoMaterno }
                disabled={persona.codigoTipoPersona==TipoParteEnum.Denunciado} 
                onChange = { e => setPersona({...persona, apellidoMaterno:e.target.value })}
                />                
              </Col>
            </Form.Group>

            <IngresarDireccion 
            direccion={direccion} 
            onIngresarDireccionEvent={(direccion:Direccion)=>recibirDireccion(direccion)}/>

            <Form.Group>
              <Row>
                <Col className="text-start">
                  <Button type="button" href="/denuncias/ingresar-denunciante">Volver</Button>
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
