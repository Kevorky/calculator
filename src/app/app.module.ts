import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CalculatorComponent],
  imports: [BrowserModule, RouterModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
