import { Optional } from "@angular/core";

export class Festival {

  constructor(
    id:string,
    name:string,
    tablemax_1:number,
    tableprice_1:number,
    sqmprice_1:number,
    tablemax_2: number,
    tableprice_2:number,
    sqmprice_2:number,
    tablemax_3: number,
    tableprice_3:number,
    sqmprice_3:number,

    @Optional() sqmprix_1?: number,
    @Optional() tablereserv_1: number = 0,
    ) {

    this.id=id
    this.name = name
    this.tablemax_1=tablemax_1
    this.tableprice_1=tableprice_1
    this.sqmprice_1=sqmprice_1
    this.tablemax_2=tablemax_2
    this.tableprice_2=tableprice_2
    this.sqmprice_2=sqmprice_2
    this.tablemax_3=tablemax_3
    this.tableprice_3=tableprice_3
    this.sqmprice_3=sqmprice_3


    this.sqmprice_1 = sqmprix_1 ?? this.tableprice_1/6;
    this.tablebooked_1 = tablereserv_1;
  }
  static sqmTable = 6;
  public id?: string;
  public name!: string;
  public tablemax_1: number;
  public tableprice_1: number;
  public sqmprice_1: number;
  public tablebooked_1: number = 0;
  public sqmbooked_1: number = 0;
  public tablemax_2: number;
  public tableprice_2: number;
  public sqmprice_2: number;
  public tablebooked_2: number = 0;
  public sqmbooked_2: number = 0;
  public tablemax_3: number;
  public tableprice_3: number;
  public sqmprice_3: number;
  public tablebooked_3: number = 0;
  public sqmbooked_3: number = 0;
  public revenue: number = 0;
  public visitor: boolean = false;
  public get tableTotal() : number { return this.tablemax_1 + this.tablemax_2 +
    this.tablemax_3; }

}
