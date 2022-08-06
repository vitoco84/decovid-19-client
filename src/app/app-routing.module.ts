import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HcertComponent} from './component/hcert/hcert.component';
import {PemComponent} from './component/pem/pem.component';
import {AboutComponent} from './component/about/about.component';
import {DocumentationComponent} from './component/documentation/documentation.component';
import {UrlComponent} from './component/url/url.component';
import {HcertTestComponent} from './component/hcert-test/hcert-test.component';
import {Base45EncodeComponent} from './component/base45-encode/base45-encode.component';
import {Base45DecodeComponent} from './component/base45-decode/base45-decode.component';

const routes: Routes = [
  {path: '', redirectTo: '/hcertDecoder', pathMatch: 'full'},
  {path: 'hcertDecoder', component: HcertComponent},
  {path: 'pemDecoder', component: PemComponent},
  {path: 'about', component: AboutComponent},
  {path: 'documentation', component: DocumentationComponent},
  {path: 'urlQRCodeEncoder', component: UrlComponent},
  {path: 'hcertTestEncoder', component: HcertTestComponent},
  {path: 'base45Encoder', component: Base45EncodeComponent},
  {path: 'base45Decoder', component: Base45DecodeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
