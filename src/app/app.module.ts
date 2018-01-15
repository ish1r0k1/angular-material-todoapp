import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule,
         MatInputModule,
         MatFormFieldModule,
         MatOptionModule,
         MatSelectModule,
         MatButtonModule,
         MatToolbarModule,
         MatCardModule,
         MatTableModule,
         MatCheckboxModule
       } from '@angular/material';
import { NgModule } from '@angular/core';
import { TodoService } from './services/todo.service';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
