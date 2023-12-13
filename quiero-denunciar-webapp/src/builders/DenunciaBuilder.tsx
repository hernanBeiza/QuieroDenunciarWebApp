import { Denuncia } from './../models';
import ModelBuilder from './ModelBuilder';

export default class DenunciaBuilder {

	private denuncia:any;

	constructor() { }

	public fromDenuncia(denuncia:any):DenunciaBuilder {
		this.denuncia = denuncia;
		return this;
	}

	public build():Denuncia | null {
		if (this.denuncia == null){
			return null;
		}
		const denuncia = new Denuncia();
		denuncia.id = this.denuncia.id;
		denuncia.idDenunciado = this.denuncia.idDenunciado;
		denuncia.idDenunciante = this.denuncia.idDenunciante;
		denuncia.codigoEstadoDenuncia = this.denuncia.codigoEstadoDenuncia;
		denuncia.denunciasMaterias = this.denuncia.denunciasMaterias ? this.denuncia.denunciasMaterias.map((item:any)=>ModelBuilder.getDenunciaMateriaBuilder(item).build()) : null;
		denuncia.descripcion = this.denuncia.descripcion;
		denuncia.fecha = this.denuncia.fecha;
		denuncia.fechaCreacion = this.denuncia.fechaCreacion;
		denuncia.fechaModificacion = this.denuncia.fechaModificacion;
		denuncia.flagActivo = this.denuncia.flagActivo;

		return denuncia;
	}

}
