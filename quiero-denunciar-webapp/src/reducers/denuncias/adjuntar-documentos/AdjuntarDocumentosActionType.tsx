//TODO type pasar a ENUM
export type AdjuntarDocumentosActionType = {
  type: 'ENVIAR' | 'LIMPIAR' | 'CERRAR_ALERTA' | 'ELIMINAR_ARCHIVO';
  payload?:any;
}
