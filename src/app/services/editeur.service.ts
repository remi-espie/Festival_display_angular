import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {MessageService} from "./message.service";
import {Editeur} from "../models/editeur";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EditeurService {

  constructor(
    private db: AngularFirestore,
    private messageService: MessageService) {
    this.editeurStore = db;
    this.editeurCollection = db.collection(this.path);
  }

  private path = '/editeurs/';
  private editeurStore: AngularFirestore;
  private editeurCollection: AngularFirestoreCollection<Editeur>;

  getAllEditeurs(): Observable<Editeur[]> {
    return this.editeurCollection
      .valueChanges({idField: "id"}).pipe(
        tap(doc => {
          this.messageService.log(`doc=${JSON.stringify(doc)}`)
        }),
        map(data => data.map(doc => this.json2Editeur(doc)))
      );
  }

  getEditeurOf(id: string): Observable<Editeur[] | undefined> {
    const editeurs = this.getAllEditeurs();
    return editeurs.pipe(map(editeurs => editeurs.filter(editeur => editeur.idfest === id)));
  }

  addUpdateEditeur(editeur: Editeur) {
    if (editeur.id == null) {
      editeur.id = this.editeurStore.createId()
    }
    console.log(editeur);
    this.editeurCollection.doc(editeur.id).set(Object.assign({}, editeur));
  }

  addNewEditeur(editeur: Editeur) {
    if (editeur.id == null) {
      editeur.id = this.editeurStore.createId()
    }
    this.editeurCollection.doc(editeur.id).get()
      .subscribe(doc => {
        if (!doc.exists) {
          this.editeurCollection.doc(editeur.id).set(Object.assign({},
            editeur));
        } // else doc exists!
      });
  }

  deleteEditeur(editeur: Editeur) {
    this.editeurStore.doc<Editeur>(this.path + editeur.id).delete();
  }

  getEditeur(id: String | null): Observable<Editeur> {
    const itemDoc = this.editeurStore.doc<Editeur>(this.path + id);
    return itemDoc.valueChanges()
      .pipe(
        map(fest => this.json2Editeur(fest))
      );
  }


  json2Editeur(json: any): Editeur {
    return new Editeur(
      json.id, json.idfest, json.name, json.contact)
  }
}
