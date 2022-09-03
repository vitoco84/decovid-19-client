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
import {ClipboardModule} from 'ngx-clipboard';
import {Base45EncodeComponent} from './component/base45-encode/base45-encode.component';
import {Base45DecodeComponent} from './component/base45-decode/base45-decode.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ScrollToTopComponent} from './component/scroll-to-top/scroll-to-top.component';

@NgModule({
  declarations: [
    AppComponent,
    HcertComponent,
    PemComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    DocumentationComponent,
    UrlComponent,
    HcertTestComponent,
    Base45EncodeComponent,
    Base45DecodeComponent,
    ScrollToTopComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ClipboardModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {}
