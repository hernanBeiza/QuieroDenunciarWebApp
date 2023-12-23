import AdjuntarDocumentosStateInterface from './AdjuntarDocumentosStateInterface';
import { AdjuntarDocumentosActionType } from './AdjuntarDocumentosActionType';
import { Archivo } from './../../../models';

export default function AdjuntarDocumentosReducer(state:AdjuntarDocumentosStateInterface, action:AdjuntarDocumentosActionType) : AdjuntarDocumentosStateInterface {
	console.log(state, action);

	switch (action.type) {
		case 'ENVIAR':
			const { archivos } = state;
			let enviar:boolean = true;
			let errores = "Faltó completar lo siguiente:";
			if(archivos.length>0){
				const todosConFecha = archivos.every((itemArchivo:Archivo)=>itemArchivo.fecha);
				if(!todosConFecha){
					enviar = false;
					errores = errores.concat("\nSeleccionar fecha");
				}

				const todosConArchivo = archivos.filter(itemArchivo=>!itemArchivo.id).every((itemArchivo:Archivo)=>itemArchivo.file);
				if(!todosConArchivo){
					enviar = false;
					errores = errores.concat("\nSeleccionar archivo a adjuntar");
				}
			}
			state.enviar = enviar;
			if(enviar){
				state.errores = "";
				state.mostrarAlerta = false;
				state.invalido = false;
			} else {
				state.errores = errores;
				state.mostrarAlerta = true;
				state.invalido = true;
			}
			return { ...state };
		break;
	case 'LIMPIAR':
		return { ...state, enviar:false, mostrarAlerta:false, errores:"", invalido:false };
		break;
	case 'CERRAR_ALERTA':
		return { ...state, enviar:false, mostrarAlerta:false, };
		break;
	default:
		console.warn("Tipo de action no soportado");
		return { ... state };
		break;
	}
	return { ... state };	
}
