import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ContactService } from "../../services/contact-service.service";
import { Contact } from "../../models/Contact";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const CELLPHONE = '(00) 0 0000-0000';
const LANDLINE = '(00) 0000-0000';

@Component({
  selector: 'app-modal-contact',
  templateUrl: './modal-contact.component.html',
  styleUrls: ['./modal-contact.component.scss']
})

export class ModalContactComponent implements OnInit {

  form: FormGroup;

  phoneMask = LANDLINE;
  phoneNumber = '';
  previusLength = 0;

  constructor(
    private dialogRef: MatDialogRef<ModalContactComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configForm();
  }

  // configura o formulario. Se "id" não for recebido, adiciona contato novo. Se for recebido exibe infos do contato no form
  configForm() {
    let nameI = null;
    let emailI = "";
    let phoneI = "";
    if (this.id != null) {
      let contact = this.contactService.getContact(this.id);
      this.defineMask(contact);
      nameI = contact.name;
      emailI = contact.email;
      phoneI = contact.phone;
    }

    this.form = this.formBuilder.group({
      name: [nameI, Validators.required],
      email: [emailI, Validators.email],
      phone: [phoneI]
    });
  }

  //define a mascara no formulario edição de um contato
  defineMask(contact: Contact) {
    if (contact.phone.length > 0) {
      this.phoneNumber = contact.phone;
      this.previusLength = this.phoneNumber.length;
      if (this.previusLength == 10) {
        this.phoneMask = LANDLINE;
      } else {
        this.phoneMask = CELLPHONE;
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  //cria um novo contato ou atualiza infos de um existente com base na variavel auxiliar id
  createContact() {
    let idNewContact = this.id;
    if (idNewContact == null) {
      idNewContact = this.contactService.getIDNewContact();
    }
    let contact: Contact =
    {
      id: idNewContact,
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone
    }
    if (this.id == null) {
      this.contactService.addContact(contact);
    } else {
      this.contactService.updateContact(contact, this.id);
    }
    this.close();
  }

  //verifica qual mascara utilizar
  onPhoneChanged() {
    if (this.phoneNumber.length <= 10 && this.phoneMask === CELLPHONE) {
      this.phoneMask = LANDLINE;
    }
    else if (this.phoneNumber.length === 10 && this.phoneMask === LANDLINE && this.previusLength === 10) {
      this.phoneMask = CELLPHONE;
    }

    setTimeout(() => {
      this.previusLength = this.phoneNumber.length;
    }, 0);
  }

}
