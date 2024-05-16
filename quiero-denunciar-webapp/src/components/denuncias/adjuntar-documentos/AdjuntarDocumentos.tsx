import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useReducer } from 'react';

import { Row, Col, Button, Form } from 'react-bootstrap';
import  './AdjuntarDocumentos.css'
import AdjuntarArchivoItem from './adjuntar-archivo-item';

import { Archivo } from 'quiero-denunciar-models';
import { LocalStorageService, AdjuntarArchivoService, ArchivoService } from 'quiero-denunciar-services';
import { Alerta } from 'quiero-denunciar-shared-components';

import { AdjuntarDocumentosReducer, AdjuntarDocumentosStateInterface, AdjuntarDocumentosActionType } from './../../../reducers';

export default function AdjuntarDocumentos(props:{desactivado?:boolean}) {
  console.log("AdjuntarDocumentos");
  const navigate = useNavigate();

  const [archivos, setArchivos] = useState<Array<Archivo>>([]);

  const initialState:AdjuntarDocumentosStateInterface = {
    archivos: archivos,
    enviar:false,
    mostrarAlerta:false,
    invalido:false,
    errores:""
  }

  const [state, dispatch] = useReducer<(state: AdjuntarDocumentosStateInterface, action: AdjuntarDocumentosActionType) => AdjuntarDocumentosStateInterface>(AdjuntarDocumentosReducer, initialState);

  function agregarNuevoArchivo() {
    console.log("agregarNuevoArchivo");
    const denuncia = LocalStorageService.obtenerDenuncia();
    if(denuncia){
      const nuevosArchivo:Array<Archivo> = [...archivos];
      nuevosArchivo.push(new Archivo(0,denuncia.id));
      setArchivos(nuevosArchivo);
    }
  }

  const cargarDatosDenuncia = () =>{
    const denuncia = LocalStorageService.obtenerDenuncia();
    const archivosPrevios = LocalStorageService.obtenerArchivos();
    if(denuncia && !archivosPrevios){
      const archivosAdjuntadosPreviamente:Array<Archivo> = [...archivos];
      archivosAdjuntadosPreviamente.push(new Archivo(0,denuncia.id));
      setArchivos(archivosAdjuntadosPreviamente);
    }
    if(archivosPrevios){
      setArchivos(archivosPrevios);
    }
  }

  const enviarFormulario = (event:any) => {
    console.log("enviarFormulario");
    event.preventDefault();
    console.log(archivos);
    //
    state.archivos = archivos;
    dispatch( { type: 'ENVIAR' } );
  }

  const onCerrarAlerta = () => {
    dispatch( { type: 'CERRAR_ALERTA' } );
  }

  const actualizarArchivo = (indice:number, archivo:Archivo) => {
    console.log(indice, archivo);
    archivos[indice] = archivo as Archivo;
    setArchivos([...archivos]);
  }

  const eliminarArchivo = (indice:number, archivo:Archivo) => {
    console.log(indice, archivo);
    if(archivo.id){
      ArchivoService.eliminar(archivo).then(data=>{
        console.log(data);
        if(data.result) {
          archivos.splice(indice, 1);
          setArchivos([...archivos]);
          LocalStorageService.eliminarArchivo(archivo);
        } else {
          console.log(data.errores);
        }
      },error=>{
        console.log(error);
      });
    } else {
      archivos.splice(indice, 1);
      setArchivos([...archivos]);
    }
  }

  const enviarDatos = () => {
    if(state.enviar){
      enviarArchivos();
    }
  };

  const enviarArchivos = async () => {
    AdjuntarArchivoService.enviarVarios(archivos).then((data:Array<{result:boolean, mensajes:string, errores:string | undefined, archivo:Archivo | null}>)=>{
      console.log(data);
      const todosLosArchivosGuardados = data.every(item=>item.result);
      if(todosLosArchivosGuardados){
        const archivos:Array<Archivo> = data.map(itemData=>itemData.archivo!);
        LocalStorageService.guardarArchivos(archivos);
        navigate("/denuncias/revisar");
      } else {
        const errores = data.filter(item=>!item.result).map(item=>item.errores!.concat("\n"));
        console.error("Hubo un error no controlado al guardar");
        console.error(errores);
        //TODO Mostrar alerta
      }
    }, error=>{
      console.error(error);
      //TODO Mostrar alerta
    });
  }

  useEffect(()=>{
    cargarDatosDenuncia();
  },[])

  useEffect(() => {
    if(state.enviar){
      enviarDatos();
    }
  }, [state]);



  const mostrarAdjuntarSegunModo = () =>{
    if(props.desactivado){
      return null;
    } else {
      return (
        <Form.Group controlId="formFile" className="mb-3">
        <Row>
          <Col className="text-end">
            <Button type="button" onClick={agregarNuevoArchivo}>Adjuntar nuevo archivo</Button>
          </Col>
        </Row>
        </Form.Group>
      )
    }
  }

  const mostrarNavegacionSegunModo = () =>{
    if(props.desactivado){
      return null;
    } else {
      return (
        <Form.Group>
          <Row>
            <Col className="text-start">
              <Button type="button" href="/denuncias/ingresar-datos">Volver</Button>
            </Col>
            <Col className="text-end">
              <Button type="submit">Enviar</Button>
            </Col>
          </Row>
        </Form.Group>
      )
    }
  }

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
          <Form noValidate validated={state.invalido} onSubmit={ enviarFormulario }>
          <Alerta mostrar={state.mostrarAlerta} mensaje={state.errores} tipo={state.errores ? 'danger' : '' } onCerrarEvent={onCerrarAlerta}/>
          <fieldset disabled={props.desactivado ? props.desactivado : false}>
            {mostrarAdjuntarSegunModo()}
            {archivos && archivos.map((archivo:Archivo,index)=> <AdjuntarArchivoItem desactivado={props.desactivado ? props.desactivado : false} archivo={archivo} key={index} indice={index}
              onActualizarArchivo = {actualizarArchivo}
              onEliminarArchivo = {eliminarArchivo}/>)}
            <p className="text-start">Total de archivos a enviar: {archivos.length }</p>
            </fieldset>
            {mostrarNavegacionSegunModo()}
          </Form>
        </Col>
      </Row>

    </main>
  )
}
