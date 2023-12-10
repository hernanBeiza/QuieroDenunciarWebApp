//import { useLocation, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Row, Col, Pagination } from 'react-bootstrap';

import './paginacion.css'

export default function Paginacion() {
  const location = useLocation();
  //const navigate = useNavigate();
  let items = [];
  //TODO Crear objeto
  //TODO Crear ENUM
  const paginas = [
    { id:1, url:"/denuncias/ingresar-denunciante"},
    { id:2, url:"/denuncias/ingresar-denunciado"},
    { id:3, url:"/denuncias/ingresar-datos"},
    { id:4, url:"/denuncias/adjuntar-documentos"},
    { id:5, url:"/denuncias/revisar"},
    { id:6, url:"/denuncias/finalizar"}
  ];

  //TODO Mejorar inicialización de variables
  const paginaEncontrada = paginas.find(pagina=>pagina.url===location.pathname);
  const paginaActual = paginaEncontrada ? paginaEncontrada : paginas[0];

  //TODO Crear objeto para página
  const irPagina = (pagina:{id:number,url:string}) =>{
    console.log("irPagina", pagina);
    const paginaActual = paginaEncontrada ? paginaEncontrada : paginas[0];
    console.log(paginaActual.url);
    //router.push(paginaActual.url);
  }

  items = paginas.map(pagina=><Pagination.Item key={pagina.id} active={pagina.id === paginaActual.id} onClick={()=>irPagina(pagina)}>{pagina.id}</Pagination.Item>);

  return (
    <Row>
      <Col className="text-center pt-4">
        <Pagination className="justify-content-center" size="sm">{items}</Pagination>
      </Col>
    </Row>
  )
}
