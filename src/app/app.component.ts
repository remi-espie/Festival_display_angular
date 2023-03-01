import {Component, Output} from '@angular/core';
import {Festival} from "./models/festival";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fest1: Festival = new Festival(
     "1",
    'Festival 1',
    10,
    100,
    16.67,
    10,
    200,
    33.33,
    10,
    300,
    50,
  )
  @Output() festivals: Festival[] = [
    this.fest1
  ]
}
