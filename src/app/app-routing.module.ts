import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HcertDataComponent} from './component/hcert-data/hcert-data.component';
import {PemDataComponent} from './component/pem-data/pem-data.component';
import {AboutDataComponent} from './component/about-data/about-data.component';
import {DocumentationDataComponent} from './component/documentation-data/documentation-data.component';

const routes: Routes = [
  {path: '', redirectTo: '/hcertDecoder', pathMatch: 'full'},
  {path: 'hcertDecoder', component: HcertDataComponent},
  {path: 'pemDecoder', component: PemDataComponent},
  {path: 'about', component: AboutDataComponent},
  {path: 'documentation', component: DocumentationDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
