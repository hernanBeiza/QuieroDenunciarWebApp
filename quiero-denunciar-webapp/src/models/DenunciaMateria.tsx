export default class DenunciaMateria {

	public id:number | null;
	public idDenuncia:number;
	public codigoMateria:number;
	public fechaCreacion:Date;
	public fechaModificacion:Date;
	public flagActivo:boolean;
	
	constructor(id?:number | null, idDenuncia?:number, codigoMateria?:number, fechaCreacion?:Date, fechaModificacion?:Date, flagActivo?:boolean);
	constructor(id:number | null, idDenuncia:number, codigoMateria:number, fechaCreacion:Date, fechaModificacion:Date, flagActivo:boolean){
		this.id = id;
		this.idDenuncia = idDenuncia;
		this.codigoMateria = codigoMateria;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
		this.flagActivo = flagActivo;
	}

}
