import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  constructor(public messageService : MessageService) { }

  ngOnInit(): void {
    this.message = this.messageService.messageList;
  }

  @Input() message: string[] = [];

  clear() {
    this.messageService.clear();
  }
}
