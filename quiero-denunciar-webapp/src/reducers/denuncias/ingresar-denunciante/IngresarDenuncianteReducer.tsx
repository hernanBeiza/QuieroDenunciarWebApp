import IngresarDenuncianteStateInterface from './IngresarDenuncianteStateInterface'
import { IngresarDenuncianteActionType } from './IngresarDenuncianteActionType'

export default function IngresarDenuncianteReducer(state:IngresarDenuncianteStateInterface, action:IngresarDenuncianteActionType) : IngresarDenuncianteStateInterface {
	console.log(state, action);

	switch (action.type) {
		case 'ENVIAR':
			const { denunciaAnonima, parte, persona, direccion } = state;
			let enviar:boolean = true;
			let errores = "Faltó completar lo siguiente:";
			if (denunciaAnonima){

			} else {
				if(!parte.correo){
					enviar = false;
					errores = errores.concat("\nCorreo");
				}
				if(!persona.codigoTipoPersona){
					enviar = false;
					errores = errores.concat("\nTipo de persona");
				}
				if(!persona.rut){
					enviar = false;
					errores = errores.concat("\nRut");
				}
				if(!persona.dv){
					enviar = false;
					errores = errores.concat("\nDV");
				}
				if(!persona.nombre){
					enviar = false;
					errores = errores.concat("\nNombre");
				}
				if(!persona.apellidoPaterno){
					enviar = false;
					errores = errores.concat("\nApellido paterno");
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
