import { Direccion } from './../models';

export default class DireccionBuilder {

	private direccion:any;

	constructor() { }

	public fromDireccion(direccion:any):DireccionBuilder {
		this.direccion = direccion;
		return this;
	}

	public build():Direccion | null {
		if (this.direccion == null){
			return null;
		}
		const direccion = new Direccion();
		direccion.id = this.direccion.id;
		direccion.codigoTipoDireccion = this.direccion.codigoTipoDireccion;
		direccion.idComuna = this.direccion.idComuna;
		direccion.calle = this.direccion.calle;
		direccion.numero = this.direccion.numero;
		direccion.departamento = this.direccion.departamento;
		direccion.fechaCreacion = this.direccion.fechaCreacion;
		direccion.fechaModificacion = this.direccion.fechaModificacion;
		direccion.flagActivo = this.direccion.flagActivo;

		return direccion;
	}

}
