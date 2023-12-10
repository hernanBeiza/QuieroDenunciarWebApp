export default class Persona {
	public id:number;
	public codigoTipoPersona:number;
	public rut:number;
	public dv:string;
	public nombre:string;
	public nombreSegundo:string;
	public apellidoPaterno:string;
	public apellidoMaterno:string;
	public fechaCreacion:Date;
	public fechaModificacion:Date;
	public flagActivo:number;

	constructor(id?:number, codigoTipoPersona?:number, rut?:number, dv?:string, nombre?:string, nombreSegundo?:string, apellidoPaterno?:string, apellidoMaterno?:string, fechaCreacion?:Date, fechaModificacion?:Date, flagActivo?:number);
	constructor(id:number, codigoTipoPersona:number, rut:number, dv:string, nombre:string, nombreSegundo:string, apellidoPaterno:string, apellidoMaterno:string, fechaCreacion:Date, fechaModificacion:Date, flagActivo:number) {
		this.id = id;
		this.codigoTipoPersona = codigoTipoPersona;
		this.rut = rut;
		this.dv = dv;
		this.nombre = nombre;
		this.nombreSegundo = nombreSegundo;
		this.apellidoPaterno = apellidoPaterno;
		this.apellidoMaterno = apellidoMaterno;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
		this.flagActivo = flagActivo;
	}

}
