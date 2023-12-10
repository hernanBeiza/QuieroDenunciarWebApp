export default class Comuna {

	public idComuna:number;
	public idProvincia:number;
	public comuna:string;
	
	constructor(idComuna?:number, idProvincia?:number, comuna?:string);
	constructor(idComuna:number, idProvincia:number, comuna:string) {
		this.idComuna = idComuna;
		this.idProvincia = idProvincia;
		this.comuna = comuna;
	}

}
