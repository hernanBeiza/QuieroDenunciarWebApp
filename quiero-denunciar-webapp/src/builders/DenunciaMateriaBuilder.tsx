import { DenunciaMateria } from './../models';

export default class DenunciaMateriaBuilder {

	private denunciaMateria:any;

	constructor() { }

	public fromDenunciaMateria(denunciaMateria:any):DenunciaMateriaBuilder {
		this.denunciaMateria = denunciaMateria;
		return this;
	}

	public build():DenunciaMateria | null {
		if (this.denunciaMateria == null){
			return null;
		}
		const denunciaMateria = new DenunciaMateria();
		denunciaMateria.id = this.denunciaMateria.id;
		denunciaMateria.idDenuncia = this.denunciaMateria.idDenuncia;
		denunciaMateria.codigoMateria = this.denunciaMateria.codigoMateria;
		denunciaMateria.fechaCreacion = this.denunciaMateria.fechaCreacion;
		denunciaMateria.fechaModificacion = this.denunciaMateria.fechaModificacion;
		denunciaMateria.flagActivo = this.denunciaMateria.flagActivo;

		return denunciaMateria;
	}

}
