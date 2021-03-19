import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    faBars = faBars;
    faChevronLeft = faChevronLeft;

    constructor() {}

    ngOnInit(): void {}
}
