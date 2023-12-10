import { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';

import { Comuna } from './../../../models';
import { ComunaService } from './../../../services';

interface ComunaPropsInterface {
  idComuna?:number,
  onComunaSelectChange:Function
}
export default function ComunaSelect(props:ComunaPropsInterface) {
  //console.log("ComunaSelect", props);
  const [comunas, setComunas] = useState(new Array<Comuna>());

  useEffect(()=>{
    obtenerComunas();
  },[]);

  //TODO Cambiar a idProvicia cuando se habilita Región y Provincia
  const obtenerComunas = () => {
    ComunaService.obtenerConId(109).then((data:{result:true, comuna:Comuna, mensajes:string})=>{
      const comunasEncontradas = new Array<Comuna>();
      if(data.result){
        comunasEncontradas.push(data.comuna);
        setComunas(comunasEncontradas);
      }
    },error=>console.error(error));
  }
  return (
    <>
    <Form.Select required aria-label="Seleccione comuna" 
    value = {props.idComuna ? props.idComuna : ""}
    onChange = {(event:React.SyntheticEvent) => props.onComunaSelectChange((event.target as HTMLInputElement).value)}>
      <option value="">Selecciona comuna</option>
      {comunas && comunas.map(itemComuna=><option value={itemComuna.idComuna} key={itemComuna.idComuna ? itemComuna.idComuna : 0}>{itemComuna.comuna}</option>)}
    </Form.Select>
    <Form.Control.Feedback type="invalid">Comuna es obligatorio</Form.Control.Feedback>
    </>
  )
}
