export default class Parte {
	public id:number;
	public idPersona:number;
	public idDireccion:number;
	public codigoTipoParte:number;
	public correo:string;
	public fechaCreacion:string;
	public fechaModificacion:string;
	public flagActivo:number;

	constructor(id?:number, idPersona?:number, idDireccion?:number, codigoTipoParte?:number, correo?:string, fechaCreacion?:string, fechaModificacion?:string, flagActivo?:number);
	constructor(id:number, idPersona:number, idDireccion:number, codigoTipoParte:number, correo:string, fechaCreacion:string, fechaModificacion:string, flagActivo:number) {
		this.id = id;
		this.idPersona = idPersona;
		this.idDireccion = idDireccion;
		this.codigoTipoParte = codigoTipoParte;
		this.correo = correo;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
		this.flagActivo = flagActivo;
	}

}
