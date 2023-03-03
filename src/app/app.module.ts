import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FestivalsListComponent } from './components/festival/festivals-list/festivals-list.component';
import { FestivalDetailsComponent } from './components/festival/festival-details/festival-details.component';
import { MessageComponent } from './components/shared/message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";
import { RootComponent } from './components/root/root.component';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { EditeurComponent } from './components/editeur/editeur.component';
import { JeuComponent } from './components/jeu/jeu.component';

@NgModule({
  declarations: [
    AppComponent,
    FestivalsListComponent,
    FestivalDetailsComponent,
    MessageComponent,
    RootComponent,
    EditeurComponent,
    JeuComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'jeux', component: JeuComponent},
      {path: 'editeurs', component: EditeurComponent},
      {path: 'festivals', component: FestivalsListComponent},
      {path: 'festival/:id', component: FestivalDetailsComponent},
      {path: '', component: AppComponent},
    ]),
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
