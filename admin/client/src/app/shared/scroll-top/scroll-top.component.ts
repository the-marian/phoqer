import { Component } from '@angular/core';

@Component({
    selector: 'app-scroll-top',
    templateUrl: './scroll-top.component.html',
    styleUrls: ['./scroll-top.component.scss'],
})
export class ScrollTopComponent {
    scroll(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
}
