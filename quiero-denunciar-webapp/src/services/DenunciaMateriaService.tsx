import { DenunciaMateria } from './../models';
import { ModelBuilder } from './../builders';

export default class DenunciaMateriaService {
	private static api:string = import.meta.env.VITE_API_URL;

	constructor() { }

	static async guardar(denunciaMateria:DenunciaMateria):Promise<{result:boolean, mensajes:string, denunciaMateria:DenunciaMateria | null, error:string | undefined}> {
		console.log("DenunciaMateriaService: guardar();");
		const url = `${this.api}/denuncia-materia/`;
		const options = {
			method: 'POST',
			headers: new Headers({
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      }),
	    body: JSON.stringify(denunciaMateria)
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:true,mensajes:string,denunciaMateria:DenunciaMateria | null}) => {
			console.log(data);
			if(data.denunciaMateria){
				data.denunciaMateria = ModelBuilder.getDenunciaMateriaBuilder(data.denunciaMateria).build();
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

	static async eliminar(denunciaMateria:DenunciaMateria):Promise<{result:boolean, mensajes:string, error:string | undefined}> {
		console.log("DenunciaMateriaService: eliminar();");
		const url = `${this.api}/denuncia-materia/${denunciaMateria.id}`;
		const options = {
			method: 'DELETE',
			headers: new Headers({
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      })
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:true,mensajes:string}) => {
			console.log(data);
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

}