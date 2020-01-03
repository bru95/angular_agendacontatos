import { Inject, Injectable, EventEmitter } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Contact } from "../models/Contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private identifier: string = "contacts_data"; //identificador do loca storage

  updateContactsEvent = new EventEmitter(); //evento

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  //adiciona um novo contato
  addContact = (contact: Contact) => {
    const currentContacts = this.storage.get(this.identifier) || [];
    currentContacts.push(contact);
    currentContacts.sort((a, b) => a.name.localeCompare(b.name));
    this.storeContacts(currentContacts);
  }

  //método auxiliar para criar uma sequencia de ID fake
  getIDNewContact() {
    const contacts = this.storage.get(this.identifier) || [];
    if (contacts.length == 0) {
      return 1;
    } else {
      return contacts.reduce((max, contact) => contact.id > max ? contact.id : max, contacts[0].id) + 1;
    }
  }

  //atualiza informacoes de um contato
  updateContact = (contact: Contact, id: number) => {
    const currentContacts = this.storage.get(this.identifier) || [];
    let foundIndex = currentContacts.findIndex(contact => contact.id == id);
    currentContacts[foundIndex] = contact;
    this.storeContacts(currentContacts);
  }

  //pega todos contatos
  getContacts = () => this.storage.get(this.identifier) || [];
  
  //exclui um contato
  removeContact = (id: Number) => {
    let currentContacts = this.storage.get(this.identifier) || [];
    currentContacts = currentContacts.filter(contact =>
      contact.id !== id
    );
    this.storeContacts(currentContacts);
  }

  //pega um contato especifico
  getContact = (id: number) => {
    const currentContacts = this.storage.get(this.identifier) || [];
    return currentContacts.find(contact => contact.id == id);
  }

  //salva uma lista nova de contatos no local storage e emite evento
  storeContacts = (contacts: Contact[]) => {
    this.storage.set(this.identifier, contacts);
    this.updateContactsEvent.emit(contacts);
  }

}
