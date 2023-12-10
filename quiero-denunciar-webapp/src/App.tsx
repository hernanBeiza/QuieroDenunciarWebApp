import 'bootstrap/dist/css/bootstrap.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';

import Inicio from './components/inicio';

import {Denuncias, IngresarDenunciante, IngresarDenunciado, IngresarDatos, AdjuntarDocumentos, RevisarDatos, Finalizar} from './components/denuncias';

import './App.css'

function App() {

  return (
    <Container>
    <Row>
    <Col>
      <Router>
        <Routes>
          <Route path="/" element={ <Inicio />}/>
          <Route path="/inicio" element={ <Inicio />}/>
          <Route path="/denuncias" element={ <Denuncias />}>
            <Route path="ingresar-denunciante" element={ <IngresarDenunciante />} />
            <Route path="ingresar-denunciado" element={ <IngresarDenunciado />} />
            <Route path="ingresar-datos" element={ <IngresarDatos />} />
            <Route path="adjuntar-documentos" element={ <AdjuntarDocumentos />} />
            <Route path="revisar" element={ <RevisarDatos />} />
            <Route path="finalizar" element={ <Finalizar />} />
          </Route>
        </Routes>
      </Router>
    </Col>
    </Row>
    </Container>
  )
}

export default App
