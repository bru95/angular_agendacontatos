import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output() searchInputEvent = new EventEmitter();
  
  doSearch(e) {
    this.searchInputEvent.emit(e.target.value); //emite evento para filtrar contatos
  }

}
