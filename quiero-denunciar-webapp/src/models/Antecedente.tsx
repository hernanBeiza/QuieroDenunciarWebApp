export default class Antecedente {

	public id:number;
	public idDenuncia:number;
	public descripcion:string;
	public fecha:Date;
	public fechaCreacion:Date;
	public fechaModificacion:Date;
	public flagActivo:boolean;
	
	constructor(id?:number, idDenuncia?:number, descripcion?:string, fecha?:Date, fechaCreacion?:Date, fechaModificacion?:Date, flagActivo?:boolean);
	constructor(id:number, idDenuncia:number, descripcion:string, fecha:Date, fechaCreacion:Date, fechaModificacion:Date, flagActivo:boolean) {
		this.id = id;
		this.idDenuncia = idDenuncia;
		this.descripcion = descripcion;
		this.fecha = fecha;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
		this.flagActivo = flagActivo;
	}

}
