import { Component, Input, OnInit } from '@angular/core';
import { Contact } from "../../models/Contact";
import { ContactService } from "../../services/contact-service.service";
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalContactComponent } from '../modal-contact/modal-contact.component';
import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.scss']
})
export class ContactBoxComponent implements OnInit {

  @Input() contact: Contact;

  ngOnInit() { }

  constructor(private contactService: ContactService, public dialogConfirm: MatDialog, public matDialog: MatDialog) { }

  deleteContact = (e, id) => {
    e.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-confirmation";
    dialogConfig.autoFocus = true;
    dialogConfig.data = "Tem certeza que deseja excluir este contato?"
    const dialogRef = this.dialogConfirm.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactService.removeContact(id);
      }
    });
  }

  editContact = (e, id) => {
    e.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.autoFocus = true;
    dialogConfig.data = id;
    this.matDialog.open(ModalContactComponent, dialogConfig);
  }

  formatPhone(phone: string) {
    if (phone.length > 0) {
      let ddd = phone.substring(0, 2);
      let number = phone.substring(2, phone.length);
      if (number.length == 8) {
        return "(" + ddd + ") " + number.substring(0, 4) + "-" + number.substring(4, 8);
      } else {
        return "(" + ddd + ") " + number.substring(0, 1) + " " + number.substring(1, 5) + "-" + number.substring(5, 9);
      }
    }
    else {
      return phone;
    }
  }

}
