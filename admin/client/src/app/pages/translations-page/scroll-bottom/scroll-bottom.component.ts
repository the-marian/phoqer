import { Component } from '@angular/core';

@Component({
    selector: 'app-scroll-bottom',
    templateUrl: './scroll-bottom.component.html',
    styleUrls: ['./scroll-bottom.component.scss'],
})
export class ScrollBottomComponent {
    scroll(): void {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }
}
