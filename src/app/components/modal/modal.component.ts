import { Component, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() message = '';
  @Output() yes: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalRoot') modalEl: ElementRef;

  onYesClicked() {
    this.yes.emit(null);
  }
  show(show: boolean) {
    const arg = show ? 'show' : 'hide';
    const el = $(this.modalEl.nativeElement);
    el.modal(arg);
  }
}
