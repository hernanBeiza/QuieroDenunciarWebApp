import IngresarDatosStateInterface from './IngresarDatosStateInterface'
import { IngresarDatosActionType } from './IngresarDatosActionType'

export default function IngresarDatosReducer(state:IngresarDatosStateInterface, action:IngresarDatosActionType) : IngresarDatosStateInterface {
	console.log(state, action);

	switch (action.type) {
		case 'ENVIAR':
			const { denuncia } = state;
			let enviar:boolean = true;
			let errores = "Faltó completar lo siguiente:";
			if(!denuncia.fecha){
				enviar = false;
				errores = errores.concat("\nFecha de los hechos denunciados");
			}
			if(denuncia.denunciasMaterias && denuncia.denunciasMaterias.length===0){
				enviar = false;
				errores = errores.concat("\nMateria(s) de la denuncia");
			}
			if(!denuncia.descripcion){
				enviar = false;
				errores = errores.concat("\nDescripción de los hechos denunciados");
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
