import { Persona } from './../models';

export default class PersonaBuilder {

	private persona:any;

	constructor() { }

	public fromPersona(persona:any):PersonaBuilder {
		this.persona = persona;
		return this;
	}

	public build():Persona | null {
		if (this.persona == null){
			return null;
		}
		const persona = new Persona();
		persona.id = this.persona.id;
		persona.codigoTipoPersona = this.persona.codigoTipoPersona;
		persona.rut = this.persona.rut;
		persona.dv = this.persona.dv;
		persona.nombre = this.persona.nombre;
		persona.nombreSegundo = this.persona.nombreSegundo;
		persona.apellidoPaterno = this.persona.apellidoPaterno;
		persona.apellidoMaterno = this.persona.apellidoMaterno;
		persona.fechaCreacion = this.persona.fechaCreacion;
		persona.fechaModificacion = this.persona.fechaModificacion;
		persona.flagActivo = this.persona.flagActivo;

		return persona;
	}

}
