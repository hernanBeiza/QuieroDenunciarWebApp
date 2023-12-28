import { Archivo } from './../models';
import { ArchivoService } from './../services';

export default class AdjuntarArchivoService {
	
	constructor() { }

	static async enviarVarios(archivos:Array<Archivo>):Promise<Array<{result:boolean, mensajes:string, errores:string | undefined, archivo:Archivo | null}>>{
		console.log("AdjuntarArchivoService: enviarVarios();");
		const datas:Array<{result:boolean, mensajes:string, errores:string | undefined, archivo:Archivo | null}> = await Promise.all(
			archivos.map(async (itemArchivo:Archivo)=>{
			const archivoData = itemArchivo.id ? await ArchivoService.actualizar(itemArchivo) : await ArchivoService.guardar(itemArchivo);
			console.log(archivoData);
			if(archivoData.result){
				return archivoData!;
			} else {
				throw new Error(archivoData.errores);
			}
		}));
		return datas;
	}

	static async guardar(archivo:Archivo):Promise<Archivo>{
		console.log("AdjuntarArchivoService: guardar();");
		let archivoData = archivo.id ? await ArchivoService.actualizar(archivo): await ArchivoService.guardar(archivo);
		if(archivoData.result) {
			return archivoData.archivo!;
		} else {
			throw new Error(archivoData.errores);
		}
	}

}