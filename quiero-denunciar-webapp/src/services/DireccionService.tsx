import { Direccion } from './../models';
import { ModelBuilder } from './../builders';

export default class DireccionService {
	private static api:string = import.meta.env.VITE_API_URL;

	constructor() { }

	static async guardar(direccion:Direccion):Promise<{result:boolean, mensajes:string, direccion:Direccion | null, error:string | undefined}>{
		console.log("DireccionService: guardar();");
		const url = `${this.api}/direccion/`;
		const options = {
			method: 'POST',
			headers: new Headers({
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      }),
	    body: JSON.stringify(direccion)
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:boolean, mensajes:string, direccion:Direccion | null}) => {
			console.log(data);
			if(data.direccion){
				data.direccion = ModelBuilder.getDireccionBuilder(data.direccion).build();
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

	static async actualizar(direccion:Direccion):Promise<{result:boolean, mensajes:string, direccion:Direccion | null, error:string | undefined}>{
		console.log("DireccionService: actualizar();");
		const url = this.api + `direccion/${direccion.id}`;
		const options = {
			method: 'PUT',
			headers: new Headers({
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      }),
	    body: JSON.stringify(direccion)
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:boolean, mensajes:string, direccion:Direccion | null}) => {
			console.log(data);
			if(data.direccion){
				data.direccion = ModelBuilder.getDireccionBuilder(data.direccion).build();
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

}