export default class Direccion {
	public id:number;
	public codigoTipoDireccion:number;
	public idComuna:number;
	public calle:string;
	public numero:number;
	public departamento:number;
	public fechaCreacion:string;
	public fechaModificacion:string;
	public flagActivo:number;

	constructor(id?:number, codigoTipoDireccion?:number, idComuna?:number, calle?:string, numero?:number, departamento?:number, fechaCreacion?:string, fechaModificacion?:string, flagActivo?:number);
	constructor(id:number, codigoTipoDireccion:number, idComuna:number, calle:string, numero:number, departamento:number, fechaCreacion:string, fechaModificacion:string, flagActivo:number) {
		this.id = id;
		this.codigoTipoDireccion = codigoTipoDireccion;
		this.idComuna = idComuna;
		this.calle = calle;
		this.numero = numero;
		this.departamento = departamento;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
		this.flagActivo = flagActivo;
	}

}
