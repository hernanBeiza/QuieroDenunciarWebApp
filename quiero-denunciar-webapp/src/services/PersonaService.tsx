import { Persona } from './../models';
import { ModelBuilder } from './../builders';

export default class PersonaService {
	private static api:string = import.meta.env.VITE_API_URL;

	constructor() { }

	static async guardar(persona:Persona):Promise<{result:boolean, mensajes:string, persona:Persona | null, error:string | undefined}> {
		console.log("PersonaService: guardar();");
		const url = `${this.api}/persona/`;
		const options = {
			method: 'POST',
			headers: new Headers({
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      }),
	    body: JSON.stringify(persona)
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:true,mensajes:string,persona:Persona | null}) => {
			console.log(data);
			if(data.persona){
				data.persona = ModelBuilder.getPersonaBuilder(data.persona).build();
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

	static async actualizar(persona:Persona):Promise<{result:boolean, mensajes:string, persona:Persona | null, error:string | undefined}> {
		console.log("PersonaService: actualizar();");
		const url = this.api + `persona/${persona.id}`;
		const options = {
			method: 'PUT',
			headers: new Headers({
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      }),
	    body: JSON.stringify(persona)
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:true,mensajes:string,persona:Persona | null}) => {
			console.log(data);
			if(data.persona){
				data.persona = ModelBuilder.getPersonaBuilder(data.persona).build();
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

}