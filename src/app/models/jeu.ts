export class Jeu {
  constructor(
    id: string,
    idedit: string,
    name: string,
    type: string,
    ageMin: number,
    ageMax: number,
    jMin: number,
    jMax: number,
    duree: number,
  ) {

    this.id = id
    this.idedit = idedit
    this.name = name
    this.type = type
    this.ageMin = ageMin
    this.ageMax = ageMax
    this.jMin = jMin
    this.jMax = jMax
    this.duree = duree
  }

  public id?: string;
  public idedit?: string;
  public name!: string;
  public type: string;
  public ageMin: number;
  public ageMax: number;
  public jMin: number;
  public jMax: number;
  public duree: number;
}
