import { Parte } from './../models';
import { ModelBuilder } from './../builders';

export default class ParteService {
	private static api:string = import.meta.env.VITE_API_URL;

	constructor() { }

	static async guardar(parte:Parte):Promise<{result:boolean, mensajes:string, error:string | undefined, parte:Parte | null}> {
		console.log("ParteService: guardar();");
		const url = `${this.api}/parte/`;
		const options = {
			method: 'POST',
			headers: new Headers({
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      }),
	    body: JSON.stringify(parte)
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:true,mensajes:string,parte:Parte | null}) => {
			if(data.parte){
				data.parte = ModelBuilder.getParteBuilder(data.parte).build();
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

	static async actualizar(parte:Parte):Promise<{result:boolean, mensajes:string, error:string | undefined, parte:Parte | null}> {
		console.log("ParteService: actualizar();");
		const url = this.api + `parte/${parte.id}`;
		const options = {
			method: 'PUT',
			headers: new Headers({
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      }),
	    body: JSON.stringify(parte)
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:true,mensajes:string,parte:Parte | null}) => {
			if(data.parte){
				data.parte = ModelBuilder.getParteBuilder(data.parte).build();
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

}