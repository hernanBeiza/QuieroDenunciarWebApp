import { Denuncia } from './../models';
import { ModelBuilder } from './../builders';

export default class DenunciaService {
	private static api:string = import.meta.env.VITE_API_URL;

	constructor() { }

	static async guardar(denuncia:Denuncia):Promise<{result:boolean, mensajes:string, denuncia:Denuncia | null, error:string | undefined}> {
		console.log("DenunciaService: guardar();");
		const url = `${this.api}/denuncia/`;
		const options = {
			method: 'POST',
			headers: new Headers({
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      }),
	    body: JSON.stringify(denuncia)
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:true,mensajes:string,denuncia:Denuncia | null}) => {
			console.log(data);
			if(data.denuncia){
				data.denuncia = ModelBuilder.getDenunciaBuilder(data.denuncia).build();
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

	static async actualizar(denuncia:Denuncia):Promise<{result:boolean, mensajes:string, denuncia:Denuncia | null, error:string | undefined}> {
		console.log("DenunciaService: actualizar();");
		const url = `${this.api}/denuncia/${denuncia.id}`;
		const options = {
			method: 'PUT',
			headers: new Headers({
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      }),
	    body: JSON.stringify(denuncia)
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:true,mensajes:string,denuncia:Denuncia | null}) => {
			console.log(data);
			if(data.denuncia){
				data.denuncia = ModelBuilder.getDenunciaBuilder(data.denuncia).build();
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

}