import { ViewContainerRef, ComponentRef } from '@angular/core';

export class ModalContext {
  private componentRef: ComponentRef<any>;
  private containerRef: ViewContainerRef;

  data;

  private _resolve: Function;
  private _reject: Function;
  private _promise: Promise<any>;

  constructor() { }

  private hide() {
    this.containerRef.remove(this.containerRef.indexOf(this.componentRef.hostView));
  }

  resolve(...args: any[]) {
    this.hide();
    this._resolve(...args);
    const body = document.querySelector('body');
    body.classList.remove('noscroll');
  }

  reject(reason: any) {
    this.hide();
    this._reject(reason);
  }

  private promise(componentRef: ComponentRef<any>, containerRef: ViewContainerRef): Promise<any> {
    return this._promise || (this._promise = new Promise((resolve, reject) => {
      this.componentRef = componentRef;
      this.containerRef = containerRef;
      this._resolve = resolve;
      this._reject = reject;
    }));
  }
}
