import { Materia } from './../models';

export default class MateriaService {
	private static api:string = import.meta.env.VITE_API_URL;

	constructor() {	}

	static async obtener(){
		console.log("MateriaService: obtener();");
		const url = `${this.api}/materia/`;
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
		}).then((data:{result:true,mensajes:string,materias:Array<Materia>}) => {
			//console.log(data);
			if(data.materias){
				data.materias = data.materias.map((item:any)=> new Materia(item.codigo, item.glosa, item.flagActivo));
			}
			return data;
		}).catch(error => {
			//console.error(error);
			return error;
		});
	}

}