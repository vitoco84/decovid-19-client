import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent {
  windowScrolled: boolean;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.windowScrolled = document.documentElement.scrollTop > 100 || document.body.scrollTop > 100;
  }

  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
