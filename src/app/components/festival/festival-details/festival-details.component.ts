import {Component, Input, OnChanges,} from '@angular/core';
import {Festival} from "../../../models/festival";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.css']
})
export class FestivalDetailsComponent implements OnChanges {

  @Input() festival: Festival | undefined;
  nameControl: FormControl = new FormControl();
  festivalGroup: FormGroup = new FormGroup({});

  fb = new FormBuilder();

  onNameChange() {
    if (this.festival) this.festival.name = this.nameControl.value;
  }


  update() {
    if (this.festival) {
      this.festival.name = this.festivalGroup.value.name;
      this.festival.tableprice_1 = this.festivalGroup.value.entrancePrice;
      this.festival.tablemax_1 = this.festivalGroup.value.room;
    }
  }

  ngOnChanges(): void {
    this.nameControl = new FormControl(this.festival?.name);
    this.festivalGroup = this.fb.group({
      name: [this.festival?.name, [Validators.required,
        Validators.minLength(4)]],
      entrancePrice: [this.festival?.tableprice_1, [Validators.required,
        Validators.min(80)]],
      room: [this.festival?.tablemax_1, [Validators.required,
        Validators.min(1)]],
    });
  }

}
