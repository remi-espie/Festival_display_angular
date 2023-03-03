import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JeuService} from "../../services/jeu.service";
import {EditeurService} from "../../services/editeur.service";
import {Editeur} from "../../models/editeur";
import {Jeu} from "../../models/jeu";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']
})
export class JeuComponent implements OnInit {
  constructor(private route: ActivatedRoute, private jeuService: JeuService, private editeursService: EditeurService) {
  }

  editeurs: Editeur[] = [];
  jeux: Jeu[] | undefined = [];
  editeur: Editeur | undefined;
  jeu: Jeu | undefined;
  jeuGroup: FormGroup = new FormGroup({});

  fb = new FormBuilder();

  changeEdit(jeu: string) {
    this.editeur = this.editeurs.filter(f => f.id === jeu)[0];
    console.log(this.jeux)
    if (this.editeur) {
      this.jeuService.getJeuOf(this.editeur!.id!).subscribe(jeux => {
        this.jeux = jeux;
        this.jeu = undefined;
        this.changeForm();
      })
    }
  }

  update() {
    if (!this.jeu) {
      this.jeu = new Jeu(
        Math.floor(Math.random() * 10000).toString(),
        <string>this.editeur?.id,
        this.jeuGroup.value.name,
        this.jeuGroup.value.type,
        this.jeuGroup.value.ageMin,
        this.jeuGroup.value.ageMax,
        this.jeuGroup.value.jMin,
        this.jeuGroup.value.jMax,
        this.jeuGroup.value.duree,
      );

    } else {
      this.jeu.name = this.jeuGroup.value.name;
      this.jeu.type = this.jeuGroup.value.type;
      this.jeu.ageMin = this.jeuGroup.value.ageMin;
      this.jeu.ageMax = this.jeuGroup.value.ageMax;
      this.jeu.jMin = this.jeuGroup.value.jMin;
      this.jeu.jMax = this.jeuGroup.value.jMax;
      this.jeu.duree = this.jeuGroup.value.duree;
    }

    this.jeuService.addUpdateJeu(this.jeu)
    this.jeu = undefined;
    this.changeForm()
  }

  changeForm(): void {
    this.jeuGroup = this.fb.group({
      name: [this.jeu?.name, [Validators.required,
        Validators.minLength(4)]],
      type: [this.jeu?.type, [Validators.required, Validators.minLength(4)]],
      ageMin: [this.jeu?.ageMin, [Validators.required, Validators.min(0), Validators.max(99)]],
      ageMax: [this.jeu?.ageMax, [Validators.required, Validators.max(99), Validators.min(0)]],
      jMin: [this.jeu?.jMin, [Validators.required, Validators.min(1)]],
      jMax: [this.jeu?.jMax, [Validators.required, Validators.min(1)]],
      duree: [this.jeu?.duree, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.editeursService.getAllEditeurs().subscribe(editeurs => {
      this.editeurs = editeurs
      this.editeur = this.editeurs[0];
    });
    this.jeuService.getAllJeux().subscribe(jeux => this.jeux = jeux);
    this.changeForm()
  }

  onDelete() {
    if (this.jeu) {
      this.jeuService.deleteJeu(this.jeu);
    }
  }

  changeJeu(game: Jeu) {
    this.jeu = game;
    this.changeForm();
  }
}
