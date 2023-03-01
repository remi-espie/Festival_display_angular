import {Component, Input} from '@angular/core';
import {Festival} from "../../../models/festival";

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.css']
})
export class FestivalsListComponent {
  @Input() festivals: Festival[] | undefined
}
