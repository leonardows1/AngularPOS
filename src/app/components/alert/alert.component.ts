import { Component, Input, OnInit } from '@angular/core';
import { _closeDialogVia } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() color!: string;
  @Input() mensaje!: string;

  constructor() { }

  ngOnInit(): void {
  }

  onClose(): void{

  }
}
