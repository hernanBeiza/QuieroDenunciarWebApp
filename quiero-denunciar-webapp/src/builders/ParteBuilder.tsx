import { Parte } from './../models';

export default class ParteBuilder {

	private parte:any;

	constructor() { }

	public fromParte(parte:any):ParteBuilder {
		this.parte = parte;
		return this;
	}

	public build():Parte | null {
		if (this.parte == null){
			return null;
		}
		const parte = new Parte();
		parte.id = this.parte.id;
		parte.idPersona = this.parte.idPersona;
		parte.idDireccion = this.parte.idDireccion;
		parte.codigoTipoParte = this.parte.codigoTipoParte;
		parte.correo = this.parte.correo;
		parte.fechaCreacion = this.parte.fechaCreacion;
		parte.fechaModificacion = this.parte.fechaModificacion;
		parte.flagActivo = this.parte.flagActivo;

		return parte;
	}

}
