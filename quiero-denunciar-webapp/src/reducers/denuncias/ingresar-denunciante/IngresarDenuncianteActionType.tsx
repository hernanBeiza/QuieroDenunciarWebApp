//TODO type pasar a ENUM
export type IngresarDenuncianteActionType = {
  type: 'DENUNCIA_ANONIMA' | 'PERSONA' | 'PARTE' | 'DIRECCION' | 'ENVIAR' | 'LIMPIAR' | 'CERRAR_ALERTA';
  payload?:any;
}
