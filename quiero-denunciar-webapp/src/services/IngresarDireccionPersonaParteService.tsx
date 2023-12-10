import { Direccion, Parte, Persona } from './../models';
import { DireccionService, ParteService, PersonaService } from './../services';

export default class IngresarDireccionPersonaParteService {
	
	constructor() { }

	static async guardar(direccion:Direccion, persona:Persona, parte:Parte):Promise<[Direccion, Persona, Parte]>{
		console.log("IngresarDireccionPersonaParteService: guardar();");
		
		let direccionData = direccion.id ? await DireccionService.actualizar(direccion) : await DireccionService.guardar(direccion);
		if(direccionData.result){
			let personaData = persona.id ? await PersonaService.actualizar(persona): await PersonaService.guardar(persona);
			if(personaData.result){
				parte.idPersona = personaData.persona!.id
				parte.idDireccion = direccionData.direccion!.id
				const parteData = parte.id ? await ParteService.actualizar(parte) : await ParteService.guardar(parte);
				if (parteData.result){
					return [direccionData.direccion!, personaData.persona!, parteData.parte!];
				} else {
					throw new Error(parteData.error);
				}
			} else {
				throw new Error(personaData.error);
			}
		} else {
			throw new Error(direccionData.error);
		}
		
	}

}