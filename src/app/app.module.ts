import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { HeaderComponent } from './features/header/header.component';
import { ContactListComponent } from './features/contact-list/contact-list.component';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from '@angular/material/dialog';

import { ContactBoxComponent } from './features/contact-box/contact-box.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { ModalContactComponent } from './features/modal-contact/modal-contact.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './features/confirmation-dialog/confirmation-dialog.component';
import { HeaderContentList } from './features/header-content-list/header-content-list.component';
import { NgxMaskModule } from 'ngx-mask'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    HeaderComponent,
    ContactListComponent,
    ContactBoxComponent,
    ModalContactComponent,
    ConfirmationDialogComponent,
    HeaderContentList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    StorageServiceModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalContactComponent, ConfirmationDialogComponent]
})
export class AppModule { }
