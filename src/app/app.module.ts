import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DatatableComponent } from './datatable/datatable.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DialogModule } from 'primeng/dialog';
import { JsonPrettyPipe } from './json-pretty.pipe';
@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent,
    JsonPrettyPipe
  ],
  imports: [
    DialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    BrowserModule,
    AppRoutingModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule
  ],

  providers: [
    MessageService,
    provideAnimationsAsync(),
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
