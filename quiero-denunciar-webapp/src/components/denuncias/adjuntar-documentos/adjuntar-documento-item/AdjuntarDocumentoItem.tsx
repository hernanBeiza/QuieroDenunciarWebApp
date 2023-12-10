import { Form } from 'react-bootstrap';
//import styles from './cabecera.module.css'

//TODO Implementar tipo de dato
export default function AdjuntarDocumentoItem(props:{archivo:{id:number}, id:number}) {
  console.log("AdjuntarDocumentoItem");
  console.log(props);

  return (
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Archivo {props.id}: Seleccione un archivo</Form.Label>
      <Form.Control type="file" />
    </Form.Group>
  )
}
