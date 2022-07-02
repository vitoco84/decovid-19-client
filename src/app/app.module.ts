import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HcertComponent} from './component/hcert/hcert.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PemComponent} from './component/pem/pem.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {AboutComponent} from './component/about/about.component';
import {DocumentationComponent} from './component/documentation/documentation.component';
import {UrlComponent} from './component/url/url.component';
import {HcertTestComponent} from './component/hcert-test/hcert-test.component';

@NgModule({
  declarations: [AppComponent, HcertComponent, PemComponent, HeaderComponent, FooterComponent, AboutComponent, DocumentationComponent, UrlComponent, HcertTestComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
