import { useState, useEffect } from 'react';

import { Form, Row, Col } from 'react-bootstrap';

import { Materia } from './../../../models';
import { MateriaService } from './../../../services';

interface MateriaCheckBoxGroupPropsInterface {
  materias?:Array<Materia> | null;
  desactivado?:boolean;
  onSeleccionarMateriaChange:Function;
  onDeseleccionarMateriaChange:Function;
}

export default function MateriaCheckBoxGroup(props:MateriaCheckBoxGroupPropsInterface) {
  //console.log("MateriaCheckBoxGroup");
  const [materias, setMaterias] = useState(new Array<Materia>());  
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState(new Array<Materia>());  

  const onCheckboxChange = (codigoMateriaSeleccionada:number, seleccionada:boolean) => {
    if(seleccionada) {
      onSeleccionarMateria(codigoMateriaSeleccionada);
    } else {
      onDeseleccionarMateria(codigoMateriaSeleccionada);
    }
  }

  const onSeleccionarMateria = (codigoMateriaSeleccionada:number) => {
    let seleccionadas = [...materiasSeleccionadas];

    const materiaEncontrada = seleccionadas.find(item=>item.codigo === codigoMateriaSeleccionada);
    if(materiaEncontrada) {
      seleccionadas = seleccionadas.filter(item=>item.codigo !== codigoMateriaSeleccionada);
    } else {
      const materiaSeleccionada = new Materia();
      materiaSeleccionada.codigo = codigoMateriaSeleccionada;
      seleccionadas.push(materiaSeleccionada);
    }

    setMateriasSeleccionadas(seleccionadas);

    if(props.onSeleccionarMateriaChange){
      props.onSeleccionarMateriaChange(new Materia(codigoMateriaSeleccionada));
    }
  }

  const onDeseleccionarMateria = (codigoMateriaDeseleccionada:number) => {
    let seleccionadas = [...materiasSeleccionadas];
    seleccionadas = seleccionadas.filter(item=>item.codigo !== codigoMateriaDeseleccionada);
    setMateriasSeleccionadas(seleccionadas);

    if(props.onDeseleccionarMateriaChange){
      props.onDeseleccionarMateriaChange(new Materia(codigoMateriaDeseleccionada));
    }
  }

 useEffect(()=>{
    obtenerMaterias();
  },[]);


 useEffect(()=>{
    iniciarConMaterias();
  },[props]);

  const obtenerMaterias = () => {
    MateriaService.obtener().then((data:{result:boolean, materias:Array<Materia>, mensajes:string})=>{
      if(data.result){
        setMaterias(data.materias);
      }
    },error=>console.error(error));
  }

  const iniciarConMaterias = () => {
    if(props.materias){
      setMateriasSeleccionadas(materiasSeleccionadas.concat(props.materias));
    }
  }

  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId="materia">
        <Form.Label className="text-sm-start text-md-end" column xs={12} sm={4} md={2}>Materia(s) relacionada(s)</Form.Label>
        <Col className="text-start" xs={12} sm={8} md={10}>
          {materias && materias.map((materia:Materia)=> <Form.Check 
          required = { materiasSeleccionadas.length===0 }
          disabled = { props.desactivado ? props.desactivado : false }
          type="checkbox"
          id = { String(materia.codigo) }
          value = { materia.codigo }
          checked = { materiasSeleccionadas && materiasSeleccionadas.find(item=>item.codigo == materia.codigo ) !=undefined ? true : false }
          key = { materia.codigo }
          label = { materia.glosa }
          onChange = { (event:any) => onCheckboxChange(materia.codigo, event.currentTarget.checked) } />)}
          <Form.Control.Feedback type="invalid">La materia es obligatoria</Form.Control.Feedback>
        </Col>
      </Form.Group>
    </>
  )
}
