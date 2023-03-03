import {Component, Input, OnChanges, OnInit,} from '@angular/core';
import {Festival} from "../../../models/festival";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {FestivalsService} from "../../../services/festivals.service";

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.css']
})
export class FestivalDetailsComponent implements OnChanges, OnInit {

  constructor(private route: ActivatedRoute, private festivalService: FestivalsService) {
  }

  @Input() festival: Festival | undefined;
  nameControl: FormControl = new FormControl();
  festivalGroup: FormGroup = new FormGroup({});

  fb = new FormBuilder();

  onNameChange() {
    if (this.festival) this.festival.name = this.nameControl.value;
  }

  update() {
    if (!this.festival) {
      this.festival = new Festival(
        Math.floor(Math.random() * 10000).toString(),
        this.festivalGroup.value.name,
        this.festivalGroup.value.room,
        this.festivalGroup.value.entrancePrice,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      );

    } else {
      this.festival.name = this.festivalGroup.value.name;
      this.festival.tableprice_1 = this.festivalGroup.value.entrancePrice;
      this.festival.tablemax_1 = this.festivalGroup.value.room;
    }

    this.festivalService.addUpdateFestival(this.festival)
    this.festival = undefined;
    this.ngOnChanges()
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

  ngOnInit()
    :
    void {
    if (this.route.snapshot.paramMap.has('id')
    ) {
      const id = this.route.snapshot.paramMap.get('id');
      this.festivalService.getFestival(id).subscribe(
        (fest) => {
          this.festival = fest;
          this.ngOnChanges()
        }
      );
    } else {
      this.ngOnChanges()
    }

  }

  onDelete() {
    if (this.festival) {
      this.festivalService.deleteFestival(this.festival);
      this.festival = undefined;
      this.ngOnChanges()
    }
  }
}
