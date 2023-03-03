import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Festival} from "../../../models/festival";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.css']
})
export class FestivalsListComponent implements OnInit{
  constructor(public messageService : MessageService) {
  }

  @Input() festivals: Festival[] | null = null

  selectFestival(festival: Festival) {
    this.messageService.log("Affichage du festival " + festival.name);
    this.festivalSelect.emit(festival);
  }

  @Output() festivalSelect = new EventEmitter<Festival>();

  ngOnInit(): void {
    const len = this.festivals !== undefined ? this.festivals?.length : "0"
    this.messageService.log("Affichage de la liste des festivals - " + len + " festivals");
  }

}
