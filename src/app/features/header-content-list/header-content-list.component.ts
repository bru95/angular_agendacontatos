import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalContactComponent } from '../modal-contact/modal-contact.component';
import { Contact } from "../../models/Contact";

@Component({
  selector: 'app-header-content-list',
  templateUrl: './header-content-list.component.html',
  styleUrls: ['./header-content-list.component.scss']
})
export class HeaderContentList implements OnInit {

  @Input() contacts: Contact[];

  constructor(public matDialog: MatDialog) { }

  ngOnInit() {
  }

  openDialogForm(e) {
    e.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.autoFocus = true;
    this.matDialog.open(ModalContactComponent, dialogConfig);
  }

}
