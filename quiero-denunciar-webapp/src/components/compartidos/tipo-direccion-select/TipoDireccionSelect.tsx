import { useState, useEffect} from 'react';

import { Form } from 'react-bootstrap';

import { TipoDireccion } from './../../../models';
import { TipoDireccionService } from './../../../services';

interface TipoDireccionPropsInterface {
  codigoTipoDireccion?:number,
  onTipoDireccionChange:Function
}

export default function TipoDireccionSelect(props:TipoDireccionPropsInterface) {
  //console.log("TipoDireccionSelect", props);
  const [tipoDirecciones, setTipoDirecciones] = useState(new Array<TipoDireccion>());

  //TODO Corregir carga doble
  useEffect(() => {
    obtenerTiposDeDirecciones();
  },[]);

  const obtenerTiposDeDirecciones = () => {
    TipoDireccionService.obtener().then((data:{result:boolean, tipoDirecciones:Array<TipoDireccion>, mensajes:string}) => {
      console.log(data);
      if(data.result) {
        setTipoDirecciones(data.tipoDirecciones);
      }
    },error=>console.error(error));
  }

  return (
    <>
      <Form.Select required aria-label="Tipo de dirección" 
      value = {props.codigoTipoDireccion ? props.codigoTipoDireccion : ""}
      onChange = { (event:React.SyntheticEvent) => props.onTipoDireccionChange((event.target as HTMLInputElement).value)}>
        <option value="">Selecciona tipo de dirección</option>      
        {tipoDirecciones && tipoDirecciones.map((item:TipoDireccion) => <option value={item.codigo} key={item.codigo}>{item.glosa}</option> ) }
      </Form.Select>
      <Form.Control.Feedback type="invalid">Tipo de dirección es obligatorio</Form.Control.Feedback>
    </>
  )
}
