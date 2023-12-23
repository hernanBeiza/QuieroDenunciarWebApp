import { Archivo } from './../models';

export default class ArchivoBuilder {

	private archivo:any;

	constructor() { }

	public fromArchivo(archivo:any):ArchivoBuilder {
		this.archivo = archivo;
		return this;
	}

	public build():Archivo | null {
		if (this.archivo == null){
			return null;
		}
		const archivo = new Archivo();
		archivo.id = this.archivo.id;
		archivo.idDenuncia = this.archivo.idDenuncia;
		archivo.codigoTipoArchivo = this.archivo.codigoTipoArchivo;
		archivo.rutaArchivo = this.archivo.rutaArchivo;
		archivo.nombreArchivo = this.archivo.nombreArchivo;
		archivo.extensionArchivo = this.archivo.extensionArchivo;
		archivo.descripcion = this.archivo.descripcion;
		archivo.fecha = this.archivo.fecha;
		archivo.fechaCreacion = this.archivo.fechaCreacion;
		archivo.fechaModificacion = this.archivo.fechaModificacion;
		archivo.flagActivo = this.archivo.flagActivo;

		return archivo;
	}

}
