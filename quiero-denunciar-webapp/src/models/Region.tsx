export default class Region {

	public id:number;
	public region:string;
	public abreviatura:string;
	public capital:string;
	
	constructor(id?:number, region?:string, abreviatura?:string, capital?:string);
	constructor(id:number, region:string, abreviatura:string, capital:string) {
		this.id = id;
		this.region = region;
		this.abreviatura = abreviatura;
		this.capital = capital;
	}

}
