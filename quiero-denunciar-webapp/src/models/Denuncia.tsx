import DenunciaMateria from './DenunciaMateria';

export default class Denuncia {

	public id:number;
	public idDenunciado:number;
	public idDenunciante:number;
	public codigoEstadoDenuncia:number;
	public denunciasMaterias:Array<DenunciaMateria>;
	public descripcion:string;
	public fecha:string;
	public fechaCreacion:Date;
	public fechaModificacion:Date;
	public flagActivo:boolean;
	
	constructor(id?:number, idDenunciado?:number, idDenunciante?:number, codigoEstadoDenuncia?:number, denunciasMaterias?:Array<DenunciaMateria>, descripcion?:string, fecha?:string, fechaCreacion?:Date, fechaModificacion?:Date, flagActivo?:boolean);
	constructor(id:number, idDenunciado:number, idDenunciante:number, codigoEstadoDenuncia:number, denunciasMaterias:Array<DenunciaMateria>,  descripcion:string, fecha:string, fechaCreacion:Date, fechaModificacion:Date, flagActivo:boolean) {
		this.id = id;
		this.idDenunciado = idDenunciado;
		this.idDenunciante = idDenunciante;
		this.codigoEstadoDenuncia = codigoEstadoDenuncia;
		this.denunciasMaterias = denunciasMaterias;
		this.descripcion = descripcion;
		this.fecha = fecha;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
		this.flagActivo = flagActivo;
	}

}
