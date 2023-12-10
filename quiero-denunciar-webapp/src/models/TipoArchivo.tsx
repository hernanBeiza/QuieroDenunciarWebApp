export default class TipoArchivo {

	public codigo:number;
	public glosa:string;
	public flagActivo:boolean;
	
	constructor(codigo?:number, glosa?:string, flagActivo?:boolean);
	constructor(codigo:number, glosa:string, flagActivo:boolean){
		this.codigo = codigo;
		this.glosa = glosa;
		this.flagActivo = flagActivo;
	}

}
