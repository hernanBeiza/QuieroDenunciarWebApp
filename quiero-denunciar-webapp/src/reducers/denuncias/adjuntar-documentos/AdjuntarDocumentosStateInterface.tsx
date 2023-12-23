import { Archivo } from './../../../models';

export default interface AdjuntarDocumentosStateInterface {
  archivos:Array<Archivo>;
  enviar:boolean;
  mostrarAlerta:boolean;
  invalido:boolean;
  errores:string;
}