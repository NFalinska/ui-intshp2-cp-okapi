import {
  Component,
  OnDestroy,
  ElementRef,
  ViewChild,
  OnInit,
  OnChanges,
  AfterViewChecked,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-controller',
  templateUrl: './chat-controller.component.html',
  styleUrls: ['./chat-controller.component.scss'],
})
export class ChatControllerComponent
  implements OnDestroy, OnInit, OnChanges, AfterViewChecked {
  @ViewChild('chat') chat;
  joinForm: FormGroup;
  isMinimized = false;
  isChatController = false;
  isJoinChat = false;
  pos = '';
  arr = [];
  selectedArr = [];
  isOpen = true;
  checkName = true;
  checkTitle = true;
  public password;
  // private checkNameRegExp = /^[a-zа-я]+$/i;
  private checkNameRegExp = /^[A-Za-z]+[\w\-\_\.]*$/;
  // public somebodyJoined;

  chats = [
    {
      name: 'Family Chat',
    },
    {
      name: 'Friends Chat',
    },
  ];

  constructor(private el: ElementRef, private chatService: ChatService) {}

  ngAfterViewChecked() {}

  ngOnInit() {
    // this.checkTitleName();
    this.checkLocal();
    if (!localStorage.getItem('chats')) {
      localStorage.setItem('chats', '[]');
    } else {
      this.arr = JSON.parse(localStorage.getItem('chats'));
    }
    // this.chatService.addUser();
  this.chatService.updateListArr(this.arr);
  this.chatService.updateChat();
  this.joinForm = new FormGroup({
    'chat': new FormControl(null, [Validators.required, Validators.pattern(this.checkNameRegExp)])
  });

      // this.chatService.sendMessage()

  }

  selectChat(e) {
    if (!this.selectedArr.includes(e)) {
      this.selectedArr.push(e);
    } else {
      const currItemIndex = this.selectedArr.findIndex(
        el => e.chatId === el.chatId
      );
      this.selectedArr.splice(currItemIndex, 1);
    }
  }

  updateChats() {
    localStorage.setItem('chats', JSON.stringify(this.arr));
  }

  ngOnDestroy() {}

  ngOnChanges() {}

  openNewChat(chatName, userName, chatId) {
    if (!this.selectedArr.find(el => el.userName === userName)) {
      const messageColor = this.chatService.generateRandomColor();
      this.password = this.chatService.generateRandomPassword(8);
      // console.log(pass)
      this.arr.push({ chatName, userName, chatId});
      this.selectedArr.push({ chatName, userName, chatId});
      console.log(this.selectedArr, 'selected start');
      this.chatService.addChat(chatName, userName, chatId, this.password, messageColor);
    } else {
      this.checkName = false;
    }
  }

  checkTitleName() {
      return this.joinForm.get('chat-title').valid;
  }

  minimizeToggle() {
    this.isMinimized = !this.isMinimized;
  }

  startChat() {
    this.isChatController = false;
    this.isJoinChat = false;
  }

  returnToController() {
    this.isChatController = true;
  }

  joinChat() {
    this.isJoinChat = true;
    this.isChatController = false;
  }
  joinExsitingChat(userName, password) {
      this.chatService.joinRoom(userName, password);
      this.chatService.addUser(userName);
      this.chatService.updateSelectedArr(this.selectedArr);
      localStorage.setItem('rooms', JSON.stringify(this.selectedArr));
      console.log(this.selectedArr, 'join');
  }

  checkLocal() {
    if (!localStorage.getItem('rooms')) {
      localStorage.setItem('rooms', '[]');
    } else {
      this.selectedArr = JSON.parse(localStorage.getItem('rooms'));
    }
  }

  changeChatTitle() {
    // this.arr =this.chatService.updateListArr();
  }
}
