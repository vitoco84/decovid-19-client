import {Component} from '@angular/core';
import {ErrorHandlerService} from '../../service/error-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'Decovid-19';

  constructor(public errorHandlerService: ErrorHandlerService) {}

  cleanupErrors() {
    this.errorHandlerService.cleanupErrors();
  }
}
