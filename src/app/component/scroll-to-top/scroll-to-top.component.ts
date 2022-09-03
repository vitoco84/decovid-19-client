import {Component, HostListener, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent {
  windowScrolled: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.windowScrolled = document.documentElement.scrollTop > 100 || document.body.scrollTop > 100;
  }

  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
