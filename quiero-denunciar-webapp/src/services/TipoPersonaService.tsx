import { TipoPersona } from './../models';

export default class TipoPersonaService {
	private static api:string = import.meta.env.VITE_API_URL;

	constructor() { }

	static async obtener(){
		console.log("TipoPersonaService: obtener();");
		const url = `${this.api}/tipo-persona/`;
		const options = {
			method: 'GET',
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
		}).then((data:{result:true,mensajes:string,tipoPersonas:Array<TipoPersona>}) => {
			//console.log(data);
			if(data.tipoPersonas){
				data.tipoPersonas = data.tipoPersonas.map((item:any)=> new TipoPersona(item.codigoTipoPersona, item.glosa, item.flagActivo));
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

}