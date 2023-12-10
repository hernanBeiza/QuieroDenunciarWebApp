import IngresarDenunciadoStateInterface from './IngresarDenunciadoStateInterface'
import { IngresarDenunciadoActionType } from './IngresarDenunciadoActionType'

export default function IngresarDenuncianteReducer(state:IngresarDenunciadoStateInterface, action:IngresarDenunciadoActionType) : IngresarDenunciadoStateInterface {
	console.log(state, action);

	switch (action.type) {
		case 'ENVIAR':
			const { persona, direccion } = state;
			let enviar:boolean = true;
			let errores = "Faltó completar lo siguiente:";
			if(!persona.codigoTipoPersona){
				enviar = false;
				errores = errores.concat("\nTipo de persona");
			}
			if(!persona.nombre){
				enviar = false;
				errores = errores.concat("\nNombre");
			}
			if(!direccion.codigoTipoDireccion){
				enviar = false;
				errores = errores.concat("\nTipo de dirección");
			}
			if(!direccion.idComuna){
				enviar = false;
				errores = errores.concat("\nComuna");
			}
			if(!direccion.calle){
				enviar = false;
				errores = errores.concat("\nCalle");
			}
			if(!direccion.calle){
				enviar = false;
				errores = errores.concat("\nNúmero");
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
