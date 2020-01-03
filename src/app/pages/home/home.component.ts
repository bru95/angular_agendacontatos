import { Component, OnInit } from '@angular/core';
import { Contact } from "../../models/Contact";
import { ContactService } from "../../services/contact-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contacts: Contact[] = [];
  filteredContacts: Contact[] = this.contacts;
  sFilter: string = "";

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.filteredContacts = this.contactService.getContacts();
    this.contactService.updateContactsEvent.subscribe( //se inscreve no evento que avisa qnd lista de contatos mudou
      res => {
        this.contacts = this.filteredContacts = res;
        this.filterContacts(this.sFilter);
      }
    );
  }

  //filtra contatos
  filterContacts = (word: string) => {
    this.sFilter = word;
    this.filteredContacts = this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(word.toLowerCase())
    );
  };

}
