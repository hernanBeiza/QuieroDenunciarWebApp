import { Form } from 'react-bootstrap';

export default function MateriaSelect() {
  console.log("MateriaSelect");
  return (
    <>
    <Form.Select required aria-label="Default select example">
      <option value="">Seleccione la(s) materia(s) involucrada(s) en la denuncia</option>
    </Form.Select>
    <Form.Control.Feedback type="invalid">Tipo de persona es obligatorio</Form.Control.Feedback>
    </>

  )
}
