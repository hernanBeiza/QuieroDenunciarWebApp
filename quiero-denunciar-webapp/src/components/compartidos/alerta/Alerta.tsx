import { ToastContainer, Toast } from 'react-bootstrap';

export default function Alerta(props:{ titulo?:string, mostrar:boolean, mensaje:string, tipo?:string, onCerrarEvent:Function | undefined } ) {
  //console.log("Alerta", props);
  
  const cerrarEvent = () => {
    if (props.onCerrarEvent){
      props.onCerrarEvent();
    }
  }

  return (
    <ToastContainer position="top-end" className="position-fixed pt-2" style={{ zIndex: 1 }}>
      <Toast bg={props.tipo ? props.tipo : ''} show={props.mostrar} onClose={cerrarEvent} delay={2000} autohide>
        <Toast.Header>
          {/**
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          */}
          <strong className="me-auto">{props.titulo ? props.titulo : 'Atención'}</strong>
          {/**
          <small>11 mins ago</small>
          */}
        </Toast.Header>
        <Toast.Body>
          <div style={{whiteSpace: 'pre-line'}} className={`text-start ${props.tipo=="danger" ? "text-white" : ""}`}>{props.mensaje}</div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );

}
