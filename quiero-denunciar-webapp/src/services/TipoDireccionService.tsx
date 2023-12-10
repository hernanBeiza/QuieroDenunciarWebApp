import { TipoDireccion } from './../models';

export default class TipoDireccionService {
	private static api:string = import.meta.env.VITE_API_URL;

	constructor() {	}

	static async obtener(){
		console.log("TipoDireccionService: obtener();");
		const url = `${this.api}/tipo-direccion/`;
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
		}).then((data:{result:true,mensajes:string,tipoDirecciones:Array<TipoDireccion>}) => {
			//console.log(data);
			if(data.tipoDirecciones){
				data.tipoDirecciones = data.tipoDirecciones.map((item:any)=> new TipoDireccion(item.codigoTipoDireccion, item.glosa, item.flagActivo));
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

}