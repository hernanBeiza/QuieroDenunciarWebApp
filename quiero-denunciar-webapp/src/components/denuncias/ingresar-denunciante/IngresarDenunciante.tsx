import { useNavigate } from 'react-router-dom';
import { useState, useReducer, useEffect } from 'react';

import { Row, Col, Button, Form } from 'react-bootstrap';

import './IngresarDenunciante.css'

import { Alerta, IngresarDireccion, Rut, TipoPersonaSelect } from 'quiero-denunciar-shared-components';
import { Persona, Parte, Direccion } from 'quiero-denunciar-models';
import { IngresarDireccionPersonaParteService, LocalStorageService } from 'quiero-denunciar-services';
import { TipoPersonaEnum, TipoParteEnum } from 'quiero-denunciar-enums';

import { IngresarDenuncianteReducer, IngresarDenuncianteStateInterface, IngresarDenuncianteActionType } from './../../../reducers';

export default function IngresarDenunciante(props:{desactivado?:boolean}) {
  console.log("IngresarDenunciante");

  const navigate = useNavigate();

  const [denunciaAnonima, setDenunciaAnonima] = useState(false);
  const [persona, setPersona] = useState(new Persona());
  const [direccion, setDireccion] = useState(new Direccion());
  const [parte, setParte] = useState(new Parte(0,0,0,TipoParteEnum.Denunciante));

  const initialState:IngresarDenuncianteStateInterface = {
    denunciaAnonima: denunciaAnonima,
    parte: parte,
    persona: persona,
    direccion: direccion,
    enviar:false,
    mostrarAlerta:false,
    invalido:false,
    errores:""
  }

  const [state, dispatch] = useReducer<(state: IngresarDenuncianteStateInterface, action: IngresarDenuncianteActionType) => IngresarDenuncianteStateInterface>(IngresarDenuncianteReducer, initialState);
  //const [state, dispatch] = useReducer(IngresarDenuncianteReducer, initialState);

  const cargarDatosPrevios = () => {
    const direccionGuardada = LocalStorageService.obtenerDireccionDenunciante();
    const personaGuardada = LocalStorageService.obtenerPersonaDenunciante();
    const parteGuardada = LocalStorageService.obtenerParteDenunciante();
    if(direccionGuardada){
      setDireccion(direccionGuardada);      
    }
    if(personaGuardada){
      setPersona(personaGuardada);      
    }
    if(parteGuardada){
      setParte(parteGuardada);      
    }
    if(!direccionGuardada && !personaGuardada && !parteGuardada) {
      setDenunciaAnonima(true);
    }
  }

  const recibirDireccion = (direccionRecibida:Direccion) => {
    setDireccion(direccionRecibida);
  }

  const enviarFormulario = (event:any) => {
    console.log("enviarFormulario();");
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form.checkValidity());
    //
    state.denunciaAnonima = denunciaAnonima;
    state.parte = parte;
    state.persona = persona;
    state.direccion = direccion;
    dispatch( { type: 'ENVIAR' } );
  }

  const enviarDenuncia = async () => {
    if(state.denunciaAnonima){
      navigate("/denuncias/ingresar-denunciado");
    } else {
      try {
        let [direccionGuardada, personaGuardada, parteGuardada] = await IngresarDireccionPersonaParteService.guardar(direccion, persona, parte);
        console.log(direccionGuardada, personaGuardada, parteGuardada);
        if(direccionGuardada.id && personaGuardada.id && parteGuardada.id){
          LocalStorageService.guardarDireccionDenunciante(direccionGuardada);
          LocalStorageService.guardarPersonaDenunciante(personaGuardada);
          LocalStorageService.guardarParteDenunciante(parteGuardada);
          navigate("/denuncias/ingresar-denunciado");
        } else {
          console.error("Hubo un error no controlado al guardar");
        }
      } catch (e) {
        console.error(e);
      }      
    }
  }

  const enviarDatos = () => {
    if(state.enviar){
      enviarDenuncia();
    }
  }

  const onCerrarAlerta = () => {
    dispatch( { type:'CERRAR_ALERTA' } );
  }

  const mostrarEnModoRevision = () => {
    if (props.desactivado){
      return (<></>)
    } else {
      return (
        <Form.Group>
          <Row>
            <Col className="text-end">
              <Button type="submit">Enviar</Button>
            </Col>
          </Row>
        </Form.Group>
      )
    }
  }

 useEffect(() => {
    if(state.enviar){
      enviarDatos();
    }
  }, [state]);

 useEffect(() => {
   cargarDatosPrevios();
  }, []);

  return (
    <main>

      <Row>
        <Col className="text-start">
          <h5>Ingresa los datos de denunciante si quieres que se comuniquen contigo para mantenerte informado.</h5>
          <small>Recuerda que puedes ingresar una denuncia anónima.</small>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form noValidate validated={state.invalido} onSubmit={ enviarFormulario }>
            <Alerta mostrar={state.mostrarAlerta} mensaje={state.errores} tipo={state.errores ? 'danger' : '' } onCerrarEvent={onCerrarAlerta}/>
            <Form.Group as={Row} className="mb-3" controlId="denunciaAnonima">
            <Form.Label column className={`text-sm-start text-md-end ${ denunciaAnonima ? "text-primary" : ""}`} xs={4} sm={4} md={2}>Denuncia anónima</Form.Label>
            <Col xs={8} sm={8} md={10}>
            <Form.Switch id="anonimo" className="text-start mt-2"
              checked={denunciaAnonima}
              disabled={props.desactivado ? props.desactivado : false } 
              onChange={(event)=>setDenunciaAnonima(event.target.checked)}/>
            </Col>
            </Form.Group>

            <fieldset disabled={denunciaAnonima || (props.desactivado ? props.desactivado : false)}>
              <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="correo">
              <Form.Label column xs={12} sm={4} md={2}>Correo</Form.Label>
              <Col xs={12} sm={8} md={10}>
              <Form.Control type="email" required placeholder=""
              value = {parte.correo ? parte.correo : ''}
              onChange = { e => setParte({...parte, correo:e.target.value}) }/>
              <Form.Control.Feedback type="invalid">Correo es obligatorio</Form.Control.Feedback>
              </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="tipoPersona">
              <Form.Label column xs={12} sm={4} md={2}>Tipo de persona</Form.Label>
              <Col xs={12} sm={8} md={10}>
                <TipoPersonaSelect 
                codigoTipoPersona = {persona.codigoTipoPersona} 
                onTipoPersonaChange = {((codigoTipoPersona:number) => setPersona({...persona, codigoTipoPersona: Number(codigoTipoPersona) }))}/>
              </Col>
              </Form.Group>

              <Rut 
              rut = {persona ? persona.rut : 0 }
              dv = {persona ? persona.dv : "0" }
              desactivado = {denunciaAnonima } 
              onRutChange = { (rut:Number, dv:string) => setPersona({...persona, rut:Number(rut), dv:dv})}/>

              <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="nombre">
              <Form.Label column xs={12} sm={4} md={2}>Nombre</Form.Label>
              <Col xs={12} sm={8} md={10}>
              <Form.Control type="text" required placeholder=""
              value = {persona.nombre ? persona.nombre : ""}
              onChange = { e => setPersona({...persona, nombre:e.target.value })}/>
              <Form.Control.Feedback type="invalid">Nombre es obligatorio</Form.Control.Feedback>
              </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="nombreSegundo">
              <Form.Label column xs={12} sm={4} md={2}>Segundo nombre</Form.Label>
              <Col xs={12} sm={8} md={10}>
              <Form.Control type="text" placeholder=""
              value = {persona.nombreSegundo ? persona.nombreSegundo : ""} 
              onChange = { e => setPersona({...persona, nombreSegundo:e.target.value })} 
              disabled = {persona.codigoTipoPersona === TipoPersonaEnum.Juridica} />
              </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="apellidoPaterno">
              <Form.Label column sm={4} md={2}>Apellido paterno</Form.Label>
              <Col sm={8} md={10}>
              <Form.Control type="text" 
              value = {persona.apellidoPaterno ? persona.apellidoPaterno : ""} 
              required = {persona.codigoTipoPersona === TipoPersonaEnum.Natural} 
              disabled = {persona.codigoTipoPersona===TipoPersonaEnum.Juridica} placeholder="" 
              onChange = { e => setPersona({...persona, apellidoPaterno:e.target.value })}/>
              <Form.Control.Feedback type="invalid">Apellido es obligatorio</Form.Control.Feedback>
              </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3 text-start text-md-end" controlId="apellidoMaterno">
              <Form.Label column sm={4} md={2}>Apellido materno</Form.Label>
              <Col sm={8} md={10}>
              <Form.Control type="text" 
              value = {persona.apellidoMaterno ? persona.apellidoMaterno : ""} 
              disabled = {persona.codigoTipoPersona===TipoPersonaEnum.Juridica} placeholder="" 
              onChange = { e => setPersona({...persona, apellidoMaterno:e.target.value }) } />
              </Col>
              </Form.Group>
              
              <IngresarDireccion 
              idProvincia={23} 
              direccion={direccion} 
              onIngresarDireccionEvent={(direccion:Direccion)=>recibirDireccion(direccion)}/>

            </fieldset>
            {mostrarEnModoRevision()}
          </Form>
        </Col>
      </Row>
    
    </main>
    )
}
