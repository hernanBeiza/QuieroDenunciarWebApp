import ArchivoBuilder from './ArchivoBuilder';
import DenunciaBuilder from './DenunciaBuilder';
import DenunciaMateriaBuilder from './DenunciaMateriaBuilder';
import DireccionBuilder from './DireccionBuilder';
import ParteBuilder from './ParteBuilder';
import PersonaBuilder from './PersonaBuilder';

export default class ModelBuilder {

  public static getArchivoBuilder(archivo:any):ArchivoBuilder { return new ArchivoBuilder().fromArchivo(archivo); }

  public static getDenunciaBuilder(denuncia:any):DenunciaBuilder { return new DenunciaBuilder().fromDenuncia(denuncia); }

  public static getDenunciaMateriaBuilder(denunciaMateria:any):DenunciaMateriaBuilder { return new DenunciaMateriaBuilder().fromDenunciaMateria(denunciaMateria); }

  public static getDireccionBuilder(direccion:any):DireccionBuilder { return new DireccionBuilder().fromDireccion(direccion); }

  public static getParteBuilder(parte:any):ParteBuilder { return new ParteBuilder().fromParte(parte); }

  public static getPersonaBuilder(persona:any):PersonaBuilder { return new PersonaBuilder().fromPersona(persona); }

}