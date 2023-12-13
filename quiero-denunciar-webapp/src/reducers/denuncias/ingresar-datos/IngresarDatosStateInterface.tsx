import { Denuncia } from './../../../models';

export default interface IngresarDatosStateInterface {
  denuncia:Denuncia;
  enviar:boolean;
  mostrarAlerta:boolean;
  invalido:boolean;
  errores:string;
}