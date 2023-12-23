import { Archivo } from './../models';
import { ModelBuilder } from './../builders';

export default class ArchivoService {
	private static api:string = import.meta.env.VITE_API_URL;

	constructor() { }

	static async guardar(archivo:Archivo):Promise<{result:boolean, mensajes:string, error:string | undefined, archivo:Archivo | null}> {
		console.log("ArchivoService: guardar();");
		const url = `${this.api}/archivo/`;
		const formData:FormData = new FormData();
		formData.append("idDenuncia", archivo.idDenuncia);
		formData.append("codigoTipoArchivo", archivo.codigoTipoArchivo);
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

	static async actualizar(archivo:Archivo):Promise<{result:boolean, mensajes:string, error:string | undefined, archivo:Archivo | null}> {
		console.log("ArchivoService: actualizar();");
		const url = `${this.api}/archivo/${archivo.id}`;
		const formData:FormData = new FormData();
		formData.append("id", archivo.id);
		formData.append("idDenuncia", archivo.idDenuncia);		
		formData.append("codigoTipoArchivo", archivo.codigoTipoArchivo);
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

}