import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

export default function Cabecera() {
  //console.log("Cabecera");
  const location = useLocation();
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

  return (
    <Row>
      <Col>
        <h1 className="text-center">Quiero denunciar</h1>
        <h2 className="text-center">Paso {paginaActual.id}</h2>
        <h6 className="text-center">Paso {paginaActual.id} de {paginas.length}</h6>
        </Col>
    </Row>
  )
}
