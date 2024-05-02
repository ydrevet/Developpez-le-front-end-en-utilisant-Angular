import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';



@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent],
})
export class AppModule {}
