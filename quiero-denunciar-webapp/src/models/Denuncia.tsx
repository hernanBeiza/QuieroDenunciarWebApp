export default class Denuncia {

	public id:number;
	public idDenunciado:number;
	public idDenunciante:number;
	public idDireccion:number;
	public codigoEstadoDenuncia:number;
	public descripcion:string;
	public fecha:string;
	public fechaCreacion:Date;
	public fechaModificacion:Date;
	public flagActivo:boolean;
	
	constructor(id?:number, idDenunciado?:number, idDenunciante?:number, idDireccion?:number, codigoEstadoDenuncia?:number, descripcion?:string, fecha?:string, fechaCreacion?:Date, fechaModificacion?:Date, flagActivo?:boolean);
	constructor(id:number, idDenunciado:number, idDenunciante:number, idDireccion:number, codigoEstadoDenuncia:number, descripcion:string, fecha:string, fechaCreacion:Date, fechaModificacion:Date, flagActivo:boolean) {
		this.id = id;
		this.idDenunciado = idDenunciado;
		this.idDenunciante = idDenunciante;
		this.idDireccion = idDireccion;
		this.codigoEstadoDenuncia = codigoEstadoDenuncia;
		this.descripcion = descripcion;
		this.fecha = fecha;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
		this.flagActivo = flagActivo;
	}

}
