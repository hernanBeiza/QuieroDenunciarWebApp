import { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';

import { Materia } from './../../../models';
import { MateriaService } from './../../../services';

interface MateriaCheckBoxGroupPropsInterface {
  onSeleccionarMateriaChange:Function;
}

export default function MateriaCheckBoxGroup(props:MateriaCheckBoxGroupPropsInterface) {
  //console.log("MateriaCheckBoxGroup");
  const [materias, setMaterias] = useState(new Array<Materia>());  
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState(new Array<Materia>());  
  //TODO Ver si es posible pasar el objeto completo
  const onSeleccionarMateria = (codigoMateriaSeleccionada:number) => {
    const materia = new Materia();
    materia.codigo = codigoMateriaSeleccionada;
    let seleccionadas = [...materiasSeleccionadas];
    const materiaEncontrada = seleccionadas.find(item=>item.codigo === codigoMateriaSeleccionada);
    if(materiaEncontrada) {
      seleccionadas = seleccionadas.filter(item=>item.codigo !== codigoMateriaSeleccionada);
    } else {
      seleccionadas.push(materia);
    }
    setMateriasSeleccionadas(seleccionadas);
    if(props.onSeleccionarMateriaChange){
      props.onSeleccionarMateriaChange(seleccionadas);      
    }
  }

  //TODO Corregir carga doble
 useEffect(()=>{
    obtenerMaterias();
  },[]);

  const obtenerMaterias = () => {
    MateriaService.obtener().then((data:{result:boolean, materias:Array<Materia>, mensajes:string})=>{
      console.log(data);
      if(data.result){
        setMaterias(data.materias);
      }
    },error=>console.error(error));
  }

  return (
    <>
      {materias && materias.map((materia:Materia)=> <Form.Check required={ materiasSeleccionadas.length===0 } key={ materia.codigo } type="checkbox" label = { materia.glosa } onChange = { () => onSeleccionarMateria(materia.codigo) } />)}
      <Form.Control.Feedback type="invalid">La materia es obligatoria</Form.Control.Feedback>
    </>
  )
}
