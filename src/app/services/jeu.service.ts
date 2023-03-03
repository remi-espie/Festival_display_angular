import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {MessageService} from "./message.service";
import {Jeu} from "../models/jeu";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JeuService {
  constructor(
    private db: AngularFirestore,
    private messageService: MessageService) {
    this.jeuStore = db;
    this.jeuCollection = db.collection(this.path);
  }

  private path = '/jeux/';
  private jeuStore: AngularFirestore;
  private jeuCollection: AngularFirestoreCollection<Jeu>;

  getAllJeux(): Observable<Jeu[]> {
    return this.jeuCollection
      .valueChanges({idField: "id"}).pipe(
        tap(doc => {
          this.messageService.log(`doc=${JSON.stringify(doc)}`)
        }),
        map(data => data.map(doc => this.json2Jeu(doc)))
      );
  }

  getJeuOf(id: string): Observable<Jeu[] | undefined> {
    const jeux = this.getAllJeux();
    return jeux.pipe(map(jeux => jeux.filter(jeu => jeu.idedit === id)));
  }

  addUpdateJeu(jeu: Jeu) {
    if (jeu.id == null) {
      jeu.id = this.jeuStore.createId()
    }
    console.log(jeu);
    this.jeuCollection.doc(jeu.id).set(Object.assign({}, jeu));
  }

  addNewJeu(jeu: Jeu) {
    if (jeu.id == null) {
      jeu.id = this.jeuStore.createId()
    }
    this.jeuCollection.doc(jeu.id).get()
      .subscribe(doc => {
        if (!doc.exists) {
          this.jeuCollection.doc(jeu.id).set(Object.assign({},
            jeu));
        } // else doc exists!
      });
  }

  deleteJeu(jeu: Jeu) {
    this.jeuStore.doc<Jeu>(this.path + jeu.id).delete();
  }

  getJeu(id: String | null): Observable<Jeu> {
    const itemDoc = this.jeuStore.doc<Jeu>(this.path + id);
    return itemDoc.valueChanges()
      .pipe(
        map(fest => this.json2Jeu(fest))
      );
  }


  json2Jeu(json: any): Jeu {
    return new Jeu(
      json.id, json.idedit, json.name, json.type, json.ageMin, json.ageMax, json.jMin, json.jMax, json.duree)
  }
}
