import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Festival} from "../../models/festival";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Editeur} from "../../models/editeur";
import {EditeurService} from "../../services/editeur.service";
import {FestivalsService} from "../../services/festivals.service";

@Component({
  selector: 'app-editeur',
  templateUrl: './editeur.component.html',
  styleUrls: ['./editeur.component.css']
})
export class EditeurComponent implements OnInit {
  constructor(private route: ActivatedRoute, private editeurService: EditeurService, private festivalsService: FestivalsService) {
  }

  festivals: Festival[] = [];
  editeurs: Editeur[] | undefined = [];
  festival: Festival | undefined;
  editeur: Editeur | undefined;
  editeurGroup: FormGroup = new FormGroup({});

  fb = new FormBuilder();

  changefest(festival: string) {
    this.festival = this.festivals.filter(f => f.id === festival)[0];
    if (this.festival) {
      this.editeurService.getEditeurOf(this.festival!.id!).subscribe(editeurs => {
        this.editeurs = editeurs;
        this.changeForm();
      })
    }
  }

  update() {
    if (!this.editeur) {
      this.editeur = new Editeur(
        Math.floor(Math.random() * 10000).toString(),
        <string>this.festival?.id,
        this.editeurGroup.value.name,
        this.editeurGroup.value.contact,
      );

    } else {
      this.editeur.name = this.editeurGroup.value.name;
      this.editeur.contact = this.editeurGroup.value.contact;
    }

    this.editeurService.addUpdateEditeur(this.editeur)
    this.editeur = undefined;
    this.changeForm()
  }

  changeForm(): void {
    this.editeurGroup = this.fb.group({
      name: [this.editeur?.name, [Validators.required,
        Validators.minLength(4)]],
      contact: [this.editeur?.contact, [Validators.required,
        Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.festivalsService.getAllFestivals().subscribe(festivals => {
      this.festivals = festivals
      this.festival = this.festivals[0];
    });
    this.editeurService.getAllEditeurs().subscribe(editeurs => this.editeurs = editeurs);
    this.changeForm()
  }

  onDelete() {
    if (this.editeur) {
      this.editeurService.deleteEditeur(this.editeur);
    }
  }

  changeEdit(edit: Editeur) {
    this.editeur = edit;
    this.changeForm()
  }
}
