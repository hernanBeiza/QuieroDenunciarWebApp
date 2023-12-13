import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useReducer } from 'react';
import dayjs from 'dayjs';

import { Row, Col, Button, Form } from 'react-bootstrap';
import './IngresarDatos.css'

import { LocalStorageService, DenunciaMateriaService, IngresarDenunciaMateriaService } from './../../../services';
import { Denuncia, Materia, DenunciaMateria } from './../../../models';
import { IngresarDatosReducer, IngresarDatosStateInterface, IngresarDatosActionType } from './../../../reducers';

import { Alerta, MateriaCheckBoxGroup } from './../../compartidos';

export default function IngresarDatos() {
  console.log("IngresarDatos");
  const navigate = useNavigate();

  const [denuncia, setDenuncia] = useState(new Denuncia());

  const initialState:IngresarDatosStateInterface = {
    denuncia: denuncia,
    enviar:false,
    mostrarAlerta:false,
    invalido:false,
    errores:""
  }

  const [state, dispatch] = useReducer<(state: IngresarDatosStateInterface, action: IngresarDatosActionType) => IngresarDatosStateInterface>(IngresarDatosReducer, initialState);

  const onCerrarAlerta = () => {
    dispatch( { type: 'CERRAR_ALERTA' } );
  }

  const enviarFormulario = (e:any) => {
    console.log("enviarFormulario();");
    e.preventDefault();
    //
    state.denuncia = denuncia;

    dispatch( { type: 'ENVIAR' } );
  }

  const onSeleccionarMateria = (materiaSeleccionada:Materia) => {
    console.log("onSeleccionarMateria", materiaSeleccionada);
    if(denuncia.denunciasMaterias && denuncia.denunciasMaterias.find((item:DenunciaMateria)=>item.codigoMateria === materiaSeleccionada.codigo)==undefined){
      const actuales:Array<DenunciaMateria> = [...denuncia.denunciasMaterias];
      actuales.push(new DenunciaMateria(null, denuncia.id, materiaSeleccionada.codigo));
      setDenuncia({...denuncia,denunciasMaterias:actuales});
    } else {
      const iniciales:Array<DenunciaMateria> = new Array<DenunciaMateria>(new DenunciaMateria(null, denuncia.id, materiaSeleccionada.codigo));
      setDenuncia({...denuncia,denunciasMaterias:iniciales});
    }
  }

  const onDeseleccionarMateria = (materiaDeseleccionada:Materia) => {
    console.log("onDeseleccionarMateria", materiaDeseleccionada);
    const encontrada = denuncia.denunciasMaterias.find(item=>item.codigoMateria===materiaDeseleccionada.codigo);
    if(encontrada.id){
      DenunciaMateriaService.eliminar(encontrada).then(data=>{
        console.log(data);
        if(data.result){
          const filtradas:Array<DenunciaMateria> = denuncia.denunciasMaterias.filter((item:DenunciaMateria)=>item.codigoMateria!=materiaDeseleccionada.codigo);
          setDenuncia({...denuncia,denunciasMaterias:filtradas});
        }
      },error=>console.error(error))      
    }
  }

  const cargarDatosPrevios = () => {
    const denunciante = LocalStorageService.obtenerParteDenunciante();
    const denunciado = LocalStorageService.obtenerParteDenunciada();
    const denunciaGuardada = LocalStorageService.obtenerDenuncia();
    if (denunciaGuardada){
      setDenuncia(denunciaGuardada);
    } else {
      setDenuncia({...denuncia, idDenunciante:denunciante.id, idDenunciado:denunciado.id});
    }
  }

  const enviarDenuncia = async () => {
    try {
      let denunciaGuardada = await IngresarDenunciaMateriaService.guardar(denuncia);
      console.log(denunciaGuardada);
      if(denunciaGuardada.id){
        LocalStorageService.guardarDenuncia(denunciaGuardada);
        navigate("/denuncias/adjuntar-documentos");
      } else {
        console.error("Hubo un error no controlado al guardar");
      }
    } catch (e) {
      console.error(e);
    }
  }

  const enviarDatos = () => {
    if(state.enviar){
      enviarDenuncia();
    }
  };

  const transformarFecha = (fecha:string) => {
    const fechaFormateada = dayjs(fecha).format("YYYY-MM-DD");
    return fechaFormateada;
    //const partesDeFecha:Array<string> =  fecha.split("T")[0].split("-");
    //return partesDeFecha[0].concat("-").concat(partesDeFecha[1]).concat("-").concat(partesDeFecha[2])
  };

  useEffect(() => {
    if(state.enviar){
      enviarDatos();
    }
  }, [state]);

  useEffect(()=>{
    cargarDatosPrevios();
  },[]);

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
        <Form noValidate validated={state.invalido} onSubmit={enviarFormulario}>
          <Alerta mostrar={state.mostrarAlerta} mensaje={state.errores} tipo={state.errores ? 'danger' : '' } onCerrarEvent={onCerrarAlerta}/>

          <Form.Group as={Row} className="mb-3" controlId="materia">
            <Form.Label className="text-sm-start text-md-end" column xs={12} sm={4} md={2}>Materia(s) relacionada(s)</Form.Label>
            <Col className="text-start" xs={12} sm={8} md={10}>
              <MateriaCheckBoxGroup 
              materias={denuncia.denunciasMaterias ? denuncia.denunciasMaterias.map((item:DenunciaMateria)=>new Materia(item.codigoMateria)): null} 
              onSeleccionarMateriaChange = { ((materiaSeleccionada:Materia) => onSeleccionarMateria(materiaSeleccionada)) }
              onDeseleccionarMateriaChange = { ((materiaDeseleccionada:Materia) => onDeseleccionarMateria(materiaDeseleccionada)) } />
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="fecha">
            <Form.Label className="text-sm-start text-md-end" column xs={12} sm={4} md={2}>Fecha de los hechos</Form.Label>
            <Col className="text-start" xs={12} sm={8} md={10}>
              <Form.Control required type="date" placeholder="" 
              value = {denuncia.fecha ? transformarFecha(denuncia.fecha) : ""}
              onChange={e => setDenuncia({...denuncia, fecha:e.target.value})} />
              <Form.Control.Feedback type="invalid">La fecha de los hechos denunciados es obligatoria</Form.Control.Feedback>
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3 text-sm-start text-md-end" controlId="descripcion">
            <Form.Label column xs={12} sm={4} md={2}>Descripción</Form.Label>
            <Col xs={12} sm={8} md={10}>
              <Form.Control required as="textarea" rows={3} 
              value = {denuncia.descripcion ? denuncia.descripcion : ""}
              onChange={e => setDenuncia({...denuncia, descripcion:e.target.value})} />
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
