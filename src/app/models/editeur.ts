export class Editeur {

  constructor(
    id:string,
    idfest: string,
    name:string,
    contact: string,
  ) {

    this.id=id
    this.name = name
    this.contact = contact
    this.idfest = idfest
  }

  public id?: string;
  public idfest?: string;
  public name!: string;
  public contact!: string;

}
