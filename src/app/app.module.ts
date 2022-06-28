import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HcertDataComponent} from './component/hcert-data/hcert-data.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PemDataComponent} from './component/pem-data/pem-data.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {AboutDataComponent} from './component/about-data/about-data.component';
import {DocumentationDataComponent} from './component/documentation-data/documentation-data.component';
import {UrlDataComponent} from './component/url-data/url-data.component';

@NgModule({
  declarations: [AppComponent, HcertDataComponent, PemDataComponent, HeaderComponent, FooterComponent, AboutDataComponent, DocumentationDataComponent, UrlDataComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
