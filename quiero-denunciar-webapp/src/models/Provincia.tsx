export default class Provincia {

	public id:number;
	public idRegion:number;
	public provincia:string;
	
	constructor(id?:number, idRegion?:number, provincia?:string);
	constructor(id:number, idRegion:number, provincia:string) {
		this.id = id;
		this.idRegion = idRegion;
		this.provincia = provincia;
	}

}
