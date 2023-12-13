import { Denuncia } from './../models';
import { DenunciaService } from './../services';

export default class IngresarDenunciaMateriaService {
	
	constructor() { }

	static async guardar(denuncia:Denuncia):Promise<Denuncia>{
		console.log("IngresarDenunciaMateriaService: guardar();");

		let denunciaData = denuncia.id ? await DenunciaService.actualizar(denuncia): await DenunciaService.guardar(denuncia);
		if(denunciaData.result) {
			return denunciaData.denuncia!;
		} else {
			throw new Error(denunciaData.error);
		}

	}

}