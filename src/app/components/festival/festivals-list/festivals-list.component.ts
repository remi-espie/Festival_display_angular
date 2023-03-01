import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Festival} from "../../../models/festival";
import {MessageService} from "../../../services/message.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.css']
})
export class FestivalsListComponent implements OnInit{
  constructor(public messageService : MessageService) {
  }

  @Input() festivals: Festival[] | undefined

  selectFestival(festival: Festival) {
    this.messageService.log("Affichage du festival " + festival.name);
    this.festivalSelect.emit(festival);
  }

  @Output() festivalSelect = new EventEmitter<Festival>();

  ngOnInit(): void {
    this.messageService.log("Affichage de la liste des festivals - " + this.festivals?.length + " festivals");
  }

}
