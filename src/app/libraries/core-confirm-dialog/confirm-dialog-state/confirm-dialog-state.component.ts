import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'confirm-dialog-state',
  templateUrl: './confirm-dialog-state.component.html',
  styleUrls: ['./confirm-dialog-state.component.scss']
})
export class ConfirmDialogStateComponent implements OnInit {

  constructor(public ds: DialogService) { }

  ngOnInit(): void {
  }

}
