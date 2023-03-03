import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from
    '@angular/fire/compat/firestore';
import {Festival} from "../models/festival";
import {MessageService} from "./message.service";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FestivalsService {

  constructor(
    private db: AngularFirestore,
    private messageService: MessageService) {
    this.festivalStore = db;
    this.festivalCollection = db.collection(this.path);
  }

  private path = '/festivals/';
  private festivalStore: AngularFirestore;
  private festivalCollection: AngularFirestoreCollection<Festival>;

  getAllFestivals(): Observable<Festival[]> {
    return this.festivalCollection
      .valueChanges({idField: "id"}).pipe(
        tap(doc => {
          this.messageService.log(`doc=${JSON.stringify(doc)}`)
        }),
        map(data => data.map(doc => this.json2Festival(doc)))
      );
  }

  addUpdateFestival(festival: Festival) {
    if (festival.id == null) {
      festival.id = this.festivalStore.createId()
    }
    this.festivalCollection.doc(festival.id).set(Object.assign({}, festival));
  }

  addNewFestival(festival: Festival) {
    if (festival.id == null) {
      festival.id = this.festivalStore.createId()
    }
    this.festivalCollection.doc(festival.id).get()
      .subscribe(doc => {
        if (!doc.exists) {
          this.festivalCollection.doc(festival.id).set(Object.assign({},
            festival));
        } // else doc exists!
      });
  }

  deleteFestival(festival: Festival) {
    this.festivalStore.doc<Festival>(this.path + festival.id).delete();
  }

  getFestival(id: String | null): Observable<Festival> {
    const itemDoc = this.festivalStore.doc<Festival>(this.path + id);
    return itemDoc.valueChanges()
      .pipe(
        map(fest => this.json2Festival(fest))
      );
  }


  json2Festival(json: any): Festival {
    return new Festival(
      json.id, json.name, json.tablemax_1, json.tablemax_2,
      json.tablemax_3, json.tableprice_1, json.tableprice_2, json.tableprice_3,
      json.sqmprice_1, json.sqmprice_2, json.sqmprice_3);
  }
}
