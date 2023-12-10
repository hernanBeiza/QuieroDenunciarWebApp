export type IngresarDenunciadoActionType = {
  type: 'PERSONA' | 'PARTE' | 'DIRECCION' | 'ENVIAR' | 'LIMPIAR' | 'CERRAR_ALERTA';
  payload?:any;
}
