import { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';

import { TipoPersonaService } from './../../../services';
import { TipoPersona } from './../../../models';

interface TipoPersonaPropsInterface {
  codigoTipoPersona?:number
  onTipoPersonaSelectChange:Function
}

export default function TipoPersonaSelect(props:TipoPersonaPropsInterface) {
  //console.log("TipoPersonaSelect");
  const [tipoPersonas, setTipoPersonas] = useState(new Array<TipoPersona>());

  useEffect(() => {
    obtenerTiposDePersonas();
  },[]);

  const obtenerTiposDePersonas = () => {
    TipoPersonaService.obtener().then((data:{result:boolean, tipoPersonas:Array<TipoPersona>, mensajes:string})=>{
      console.log(data);
      if(data.result){
        setTipoPersonas(data.tipoPersonas);
      }
    },error=>console.error(error));
  }

  return (
    <>
    <Form.Select required aria-label="Tipo de persona" 
    value = {props.codigoTipoPersona ? props.codigoTipoPersona : "" }
    onChange = { (event:React.SyntheticEvent) => props.onTipoPersonaSelectChange((event.target as HTMLInputElement).value)} >
      <option value="">Selecciona tipo de persona</option>
      {tipoPersonas && tipoPersonas.map((item:TipoPersona) => <option value={item.codigo} key={ item.codigo } >{item.glosa}</option>)}
    </Form.Select>
    <Form.Control.Feedback type="invalid">Tipo de persona es obligatorio</Form.Control.Feedback>
    </>
  )
}
