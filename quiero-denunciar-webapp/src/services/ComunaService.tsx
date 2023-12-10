import { Comuna } from './../models';

export default class ComunaService {
	private static api:string = import.meta.env.VITE_API_URL;

	constructor() { }

	static async obtenerConId(id:number){
		console.log("ComunaService: obtenerConId();");
		const url =`${this.api}/comuna/${id}`;
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
		}).then((data:{result:true,mensajes:string,comuna:Comuna}) => {
			console.log(data);
			if(data.comuna){
				data.comuna = new Comuna(data.comuna.idComuna, data.comuna.idProvincia, data.comuna.comuna);
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

}