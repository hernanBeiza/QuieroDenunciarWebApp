export default class DenunciaMateria {

	public id:number;
	public idDenuncia:number;
	public codigoMateria:number;
	public fechaCreacion:Date;
	public fechaModificacion:Date;
	public flagActivo:boolean;
	
	constructor(id?:number, idDenuncia?:number, codigoMateria?:number, fechaCreacion?:Date, fechaModificacion?:Date, flagActivo?:boolean);
	constructor(id:number, idDenuncia:number, codigoMateria:number, fechaCreacion:Date, fechaModificacion:Date, flagActivo:boolean){
		this.id = id;
		this.idDenuncia = idDenuncia;
		this.codigoMateria = codigoMateria;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
		this.flagActivo = flagActivo;
	}

}
