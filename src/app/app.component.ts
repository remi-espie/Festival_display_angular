import {Component, Input} from '@angular/core';

type fest = {
  name: string,
  tables: number
}

type Festival = Array<fest>;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled1';
  modify = 0
  @Input() festival: Festival = [
    {name: "1", tables: 160},
    {name: "2", tables: 80},
    {name: "3", tables: 110}
  ]

  addFest() {
    this.festival.push({name: "coucou", tables: 100})
  }

  modifyFirst() {
    if (this.festival.at(0) !== undefined) {
      this.modify++
      (this.festival.at(0) as fest).name = "Modifié " + this.modify + " fois !"
    }
  }
}
