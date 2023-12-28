import { Archivo } from './../models';
import { ModelBuilder } from './../builders';

export default class ArchivoService {
	private static api:string = import.meta.env.VITE_API_URL;

	constructor() { }

	static async guardar(archivo:Archivo):Promise<{result:boolean, mensajes:string, errores:string | undefined, archivo:Archivo | null}> {
		console.log("ArchivoService: guardar();");
		const url = `${this.api}/archivo/`;
		const formData:FormData = new FormData();
		formData.append("idDenuncia", archivo.idDenuncia.toString());
		formData.append("codigoTipoArchivo", archivo.codigoTipoArchivo.toString());
		if(archivo.file){
			formData.append("archivo", archivo.file);
		}
		formData.append("descripcion", archivo.descripcion);
		formData.append("fecha", archivo.fecha);
		const options = {
			method: 'POST',
			headers: new Headers({
        'Accept': 'application/json',
        //'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      }),
	    body: formData
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:true,mensajes:string,archivo:Archivo | null}) => {
			if(data.archivo){
				data.archivo = ModelBuilder.getArchivoBuilder(data.archivo).build();
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

	static async actualizar(archivo:Archivo):Promise<{result:boolean, mensajes:string, errores:string | undefined, archivo:Archivo | null}> {
		console.log("ArchivoService: actualizar();");
		const url = `${this.api}/archivo/${archivo.id}`;
		const formData:FormData = new FormData();
		formData.append("id", archivo.id.toString());
		formData.append("idDenuncia", archivo.idDenuncia.toString());		
		formData.append("codigoTipoArchivo", archivo.codigoTipoArchivo.toString());
		if(archivo.file){
			formData.append("archivo", archivo.file);
		}
		formData.append("descripcion", archivo.descripcion);
		formData.append("fecha", archivo.fecha);
		formData.append("fechaCreacion", archivo.fechaCreacion);
		const options = {
			method: 'PUT',
			headers: new Headers({
        'Accept': 'application/json',
        //'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + LocalStoreService.obtenerToken()
      }),
	    body: formData
		}
		return fetch(url,options)
		.then(res => {
			//console.info(res);
			//console.info(res.status);
			//console.info(res.ok);
			return res.json();
		}).then((data:{result:true,mensajes:string,archivo:Archivo | null}) => {
			if(data.archivo){
				data.archivo = ModelBuilder.getArchivoBuilder(data.archivo).build();
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

	static async eliminar(archivo:Archivo):Promise<{result:boolean, mensajes:string | undefined, errores:string | undefined}> {
		console.log("ArchivoService: eliminar();");
		const url = `${this.api}/archivo/${archivo.id}`;
		const options = {
			method: 'DELETE',
			headers: new Headers({
        'Accept': 'application/json',
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
		}).then((data:{result:boolean, mensajes:string | undefined, errores:string | undefined}) => {
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

}