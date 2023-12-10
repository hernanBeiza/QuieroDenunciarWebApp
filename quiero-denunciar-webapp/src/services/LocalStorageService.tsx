import { Direccion, Persona, Parte } from './../models';
import { ModelBuilder } from './../builders';

export default class LocalStorageService {

	private static QDDireccionDenuncianteKEY:string = "QDDireccionDenunciante";
	private static QDPersonaDenuncianteKEY:string = "QDPersonaDenunciante";
	private static QDParteDenuncianteKEY:string = "QDParteDenunciante";

	private static QDDireccionDenunciadaKEY:string = "QDDireccionDenunciada";
	private static QDPersonaDenunciadaKEY:string = "QDPersonaDenunciada";
	private static QDParteDenunciadaKEY:string = "QDParteDenunciada";

	constructor() { }

	static guardarDireccionDenunciante(direccion:Direccion):void {
		console.log("LocalStorageService: guardarDireccionDenunciante();");
		sessionStorage.setItem(LocalStorageService.QDDireccionDenuncianteKEY, JSON.stringify(direccion));
	}

	static guardarDireccionDenunciada(direccion:Direccion):void {
		console.log("LocalStorageService: guardarDireccionDenunciada();");
		sessionStorage.setItem(LocalStorageService.QDDireccionDenunciadaKEY, JSON.stringify(direccion));
	}

	static guardarPersonaDenunciante(persona:Persona):void {
		console.log("LocalStorageService: guardarPersonaDenunciante();");
		sessionStorage.setItem(LocalStorageService.QDPersonaDenuncianteKEY, JSON.stringify(persona));
	}

	static guardarPersonaDenunciada(persona:Persona):void {
		console.log("LocalStorageService: guardarPersonaDenunciada();");
		sessionStorage.setItem(LocalStorageService.QDPersonaDenunciadaKEY, JSON.stringify(persona));
	}

	static guardarParteDenunciante(parte:Parte):void {
		console.log("LocalStorageService: guardarParteDenunciante();");
		sessionStorage.setItem(LocalStorageService.QDParteDenuncianteKEY, JSON.stringify(parte));
	}

	static guardarParteDenunciada(parte:Parte):void {
		console.log("LocalStorageService: guardarParteDenunciada();");
		sessionStorage.setItem(LocalStorageService.QDParteDenunciadaKEY, JSON.stringify(parte));
	}

	static obtenerDireccionDenunciante():Direccion | null {
		console.log("LocalStorageService: obtenerDireccionDenunciante();");
		const direccionString = sessionStorage.getItem(LocalStorageService.QDDireccionDenuncianteKEY);
		return direccionString ? ModelBuilder.getDireccionBuilder(JSON.parse(direccionString)).build() : null;
	}

	static obtenerDireccionDenunciada():Direccion | null {
		console.log("LocalStorageService: obtenerDireccionDenunciada();");
		const direccionString = sessionStorage.getItem(LocalStorageService.QDDireccionDenunciadaKEY);
		return direccionString ? ModelBuilder.getDireccionBuilder(JSON.parse(direccionString)).build() : null;
	}

	static obtenerPersonaDenunciante():Persona | null {
		console.log("LocalStorageService: obtenerPersonaDenunciante();");
		const personaString = sessionStorage.getItem(LocalStorageService.QDPersonaDenuncianteKEY);
		return personaString ? ModelBuilder.getPersonaBuilder(JSON.parse(personaString)).build() : null;
	}

	static obtenerPersonaDenunciada():Persona | null {
		console.log("LocalStorageService: obtenerPersonaDenunciada();");
		const personaString = sessionStorage.getItem(LocalStorageService.QDPersonaDenunciadaKEY);
		return personaString ? ModelBuilder.getPersonaBuilder(JSON.parse(personaString)).build() : null;
	}

	static obtenerParteDenunciante():Parte | null {
		console.log("LocalStorageService: obtenerParteDenunciante();");
		const parteString = sessionStorage.getItem(LocalStorageService.QDParteDenuncianteKEY);
		return parteString ? ModelBuilder.getParteBuilder(JSON.parse(parteString)).build() : null;
	}

	static obtenerParteDenunciada():Parte | null {
		console.log("LocalStorageService: obtenerParteDenunciada();");
		const parteString = sessionStorage.getItem(LocalStorageService.QDParteDenunciadaKEY);
		return parteString ? ModelBuilder.getParteBuilder(JSON.parse(parteString)).build() : null;
	}

	static eliminarDireccionDenunciante():void {
		console.log("LocalStorageService: eliminarDireccionDenunciante();");
		return sessionStorage.removeItem(LocalStorageService.QDDireccionDenuncianteKEY);
	}

	static eliminarDireccionDenunciada():void {
		console.log("LocalStorageService: eliminarDireccionDenunciada();");
		return sessionStorage.removeItem(LocalStorageService.QDDireccionDenunciadaKEY);
	}

	static eliminarPersonaDenunciante():void {
		console.log("LocalStorageService: eliminarPersonaDenunciante();");
		return sessionStorage.removeItem(LocalStorageService.QDPersonaDenuncianteKEY);
	}

	static eliminarPersonaDenunciada():void {
		console.log("LocalStorageService: eliminarPersonaDenunciada();");
		return sessionStorage.removeItem(LocalStorageService.QDPersonaDenunciadaKEY);
	}

	static eliminarParteDenunciante():void {
		console.log("LocalStorageService: eliminarParteDenunciante();");
		return sessionStorage.removeItem(LocalStorageService.QDParteDenuncianteKEY);
	}

	static eliminarParteDenunciada():void {
		console.log("LocalStorageService: eliminarParteDenunciada();");
		return sessionStorage.removeItem(LocalStorageService.QDParteDenunciadaKEY);
	}

	static eliminarTodo():void {
		sessionStorage.clear();
	}

}