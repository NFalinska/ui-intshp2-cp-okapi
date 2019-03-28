import {
  Component,
  OnDestroy,
  ElementRef,
  ViewChild,
  OnInit,
  OnChanges,
  AfterViewChecked,
  AfterContentInit,
  AfterViewInit,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-chat-controller',
  templateUrl: './chat-controller.component.html',
  styleUrls: ['./chat-controller.component.scss'],
})
export class ChatControllerComponent
  implements OnDestroy, OnInit, OnChanges, AfterViewChecked, AfterViewInit {
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

  ngAfterViewInit(): void {
    if (this.joinForm) {
      console.log(this.joinForm.value, 'after');
    }
  }

  ngOnInit() {
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
    if (this.selectedArr.find(el => el.chatName === chatName)) {
      if (!this.selectedArr.find(el => el.userName === userName)) {
        this.createUser(chatName, userName, chatId);
      } else {
        this.checkName = false;
      }
    } else {
        this.createUser(chatName, userName, chatId);
    }
  }

  createUser(chatName, userName, chatId) {
    const messageColor = this.chatService.generateRandomColor();
    this.password = this.chatService.generateRandomPassword(8);
    this.arr.push({ chatName, userName, chatId});
    this.selectedArr.push({ chatName, userName, chatId});
    this.chatService.addChat(chatName, userName, chatId, this.password, messageColor);
  }

  checkTitleName() {
    if (this.joinForm) {
        return this.joinForm.get('chat').valid;
    }
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
