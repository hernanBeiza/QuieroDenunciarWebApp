import { Parte, Persona, Direccion  } from './../../../models';

export default interface IngresarDenuncianteStateInterface {
  denunciaAnonima:boolean;
  parte:Parte;
  persona:Persona;
  direccion:Direccion;
  enviar:boolean;
  mostrarAlerta:boolean;
  invalido:boolean;
  errores:string;
}