import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/core/services/chat.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  isMinimized = false;
  isChatSettings = false;
  isUsersShowed = false;
  @Input() chat;
  @Input() ind;
  @Input() color;
  @Input() pass;
  rooms = [];
  private socket = io.connect('http://localhost:3000');
  // @Input() somebodyJoined;


  public messagesArr: string[] = [];
  public message;

  users = [
    {
      'name': 'Steve',
    },
    {
      'name': 'Tim',
    },
  ];

  constructor(
    private chatService: ChatService
    ) {}

  ngOnInit() {
    if (!this.pass) {
      return;
    }
  }

  ngAfterViewInit() {
    const userColor = this.chatService.generateRandomColor();
    this.color = userColor;
  }

 sendMes(roomID) {
   this.rooms = JSON.parse(localStorage.getItem('rooms'));
//    if (this.rooms.length > 1) {
//       this.chatService.sendMessage(roomID);
//  }
   this.chatService.sendMessage(roomID);
 }

  minimizeToggle() {
    this.isMinimized = !this.isMinimized;
  }

  chatSettings() {
    this.isChatSettings = true;
  }

  returnToChat() {
    this.isChatSettings = false;
  }

  toggleUsersList() {
    this.isUsersShowed = !this.isUsersShowed;
  }

  editChatName(value) {
    this.chat.chatName = value;
  }

    changePosition(event) {
    const el = document.querySelectorAll('.main-chat-view');
       for (let i = 0; i < el.length; i ++) {
       el[i].classList.remove('target');
       el[i].classList.add('change-position');
       event.currentTarget.classList.add('target');
    }
  }
}
