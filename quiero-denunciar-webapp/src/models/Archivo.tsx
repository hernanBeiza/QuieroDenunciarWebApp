export default class Archivo {

	public id:number;
	public idDenuncia:number;
	public codigoTipoArchivo:number;
	public rutaArchivo:string;
	public nombreArchivo:string;
	public extensionArchivo:string;
	public descripcion:string;
	public fecha:string;
	public fechaCreacion:string;
	public fechaModificacion:string;
	public flagActivo:boolean;
	
	public file:File;

	constructor(id?:number, idDenuncia?:number, codigoTipoArchivo?:number, rutaArchivo?:string, nombreArchivo?:string, extensionArchivo?:string, descripcion?:string, fecha?:string, fechaCreacion?:string, fechaModificacion?:string, flagActivo?:boolean, file?:File);
	constructor(id:number, idDenuncia:number, codigoTipoArchivo:number, rutaArchivo:string, nombreArchivo:string, extensionArchivo:string, descripcion:string, fecha:string, fechaCreacion:string, fechaModificacion:string, flagActivo:boolean, file:File) {
		this.id = id;
		this.idDenuncia = idDenuncia;
		this.codigoTipoArchivo = codigoTipoArchivo;
		this.rutaArchivo = rutaArchivo;
		this.nombreArchivo = nombreArchivo;
		this.extensionArchivo = extensionArchivo;
		this.descripcion = descripcion;
		this.fecha = fecha;
		this.fechaCreacion = fechaCreacion;
		this.fechaModificacion = fechaModificacion;
		this.flagActivo = flagActivo;
		this.file = file;
	}

}
