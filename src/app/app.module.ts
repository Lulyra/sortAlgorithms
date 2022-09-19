import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { ConfigNavBarComponent } from './config-nav-bar/config-nav-bar.component';

@NgModule({
  declarations: [AppComponent, GraphComponent, ConfigNavBarComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
