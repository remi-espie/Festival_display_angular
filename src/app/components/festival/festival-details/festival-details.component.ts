import {Component, Input, OnChanges, OnInit,} from '@angular/core';
import {Festival} from "../../../models/festival";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {FestivaljsonService} from "../../../services/festivaljson.service";

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.css']
})
export class FestivalDetailsComponent implements OnChanges, OnInit {

  constructor(private route: ActivatedRoute, private festivalService: FestivaljsonService) {
  }

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

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
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

}
