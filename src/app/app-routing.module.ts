import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HcertComponent} from './component/hcert/hcert.component';
import {PemComponent} from './component/pem/pem.component';
import {AboutComponent} from './component/about/about.component';
import {DocumentationComponent} from './component/documentation/documentation.component';
import {UrlComponent} from './component/url/url.component';
import {HcertTestComponent} from './component/hcert-test/hcert-test.component';

const routes: Routes = [
  {path: '', redirectTo: '/hcertDecoder', pathMatch: 'full'},
  {path: 'hcertDecoder', component: HcertComponent},
  {path: 'pemDecoder', component: PemComponent},
  {path: 'about', component: AboutComponent},
  {path: 'documentation', component: DocumentationComponent},
  {path: 'urlQRCodeEncoder', component: UrlComponent},
  {path: 'hcertTestEncoder', component: HcertTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
