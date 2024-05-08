import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SummaryBlockComponent } from './pages/home/ui/summary-block/summary-block.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, SummaryBlockComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
