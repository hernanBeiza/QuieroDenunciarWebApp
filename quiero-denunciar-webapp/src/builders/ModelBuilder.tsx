import DireccionBuilder from './DireccionBuilder';
import ParteBuilder from './ParteBuilder';
import PersonaBuilder from './PersonaBuilder';

export default class ModelBuilder {

  public static getDireccionBuilder(direccion:any):DireccionBuilder { return new DireccionBuilder().fromDireccion(direccion); }

  public static getParteBuilder(parte:any):ParteBuilder { return new ParteBuilder().fromParte(parte); }

  public static getPersonaBuilder(persona:any):PersonaBuilder { return new PersonaBuilder().fromPersona(persona); }

}