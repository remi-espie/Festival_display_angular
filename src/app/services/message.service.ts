import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageList: string[] = [];

  log(message: string) {
    this.messageList.push(message);
  }

  clear() {
    this.messageList.splice(0, this.messageList.length)
  }

  constructor() { }
}
