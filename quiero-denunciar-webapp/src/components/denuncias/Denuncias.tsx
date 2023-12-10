import { Outlet } from "react-router-dom";

import { Cabecera, Paginacion } from "./../compartidos";

import './Denuncias.css'

function Denuncias() {

  return (
    <>
    <Cabecera/>
    <Outlet/>
    <Paginacion/>
    </>
  )
}

export default Denuncias
