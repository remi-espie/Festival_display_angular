import {Component, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Festival} from "./models/festival";
import {Observable} from "rxjs";
import {FestivaljsonService} from "./services/festivaljson.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private festivalJson: FestivaljsonService) {}

  ngOnInit(): void {
    this.festivals = this.festivalJson.getFestivals();
  }

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

  fest2: Festival = new Festival(
    "2",
    'Festival 2',
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
  @Output() festivals: Observable<Festival[]> | undefined;


  festivalChange(festival: Festival) {
    this.festivalSelect = festival;
  }

  @Input() festivalSelect: Festival | undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
