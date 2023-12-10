export default class Archivo {

	public id:number;
	public idAntecedente:number;
	public codigoTipoArchivo:number;
	public rutaArchivo:string;
	public nombreArchivo:string;
	public extensionArchivo:string;
	public fecha:Date;
	public fechaCreacion:Date;
	public fechaModificacion:Date;
	public flagActivo:boolean;
	
	constructor(id?:number, idAntecedente?:number, codigoTipoArchivo?:number, rutaArchivo?:string, nombreArchivo?:string, extensionArchivo?:string, fecha?:Date, fechaCreacion?:Date, fechaModificacion?:Date, flagActivo?:boolean);
	constructor(id:number, idAntecedente:number, codigoTipoArchivo:number, rutaArchivo:string, nombreArchivo:string, extensionArchivo:string, fecha:Date, fechaCreacion:Date, fechaModificacion:Date, flagActivo:boolean) {
		this.id = id;
		this.idAntecedente = idAntecedente;
		this.codigoTipoArchivo = codigoTipoArchivo;
		this.rutaArchivo = rutaArchivo;
		this.nombreArchivo = nombreArchivo;
		this.extensionArchivo = extensionArchivo;
		this.fecha = fecha;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
		this.flagActivo = flagActivo;
	}

}
