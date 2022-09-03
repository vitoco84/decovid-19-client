import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  localHost = false;

  ngOnInit(): void {
    this.isLocalHost();
  }

  private isLocalHost(): void {
    this.localHost = window.location.hostname === 'localhost';
  }
}
