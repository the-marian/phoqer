import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

type Links = 'en' | 'pl' | 'ru';
interface Languages {
    value: string;
    link: Links;
}

@Component({
    selector: 'app-translations-page',
    templateUrl: './translations-page.component.html',
    styleUrls: ['./translations-page.component.scss'],
})
export class TranslationsPageComponent implements OnInit {
    languages: Languages[] = [
        { value: 'English', link: 'en' },
        { value: 'Poland', link: 'pl' },
        { value: 'Russian', link: 'ru' },
    ];
    selected: Links = 'en';

    constructor(public routes: ActivatedRoute) {}

    ngOnInit(): void {
        this.routes.params.subscribe((params: Params) => {
            this.selected = params.language;
        });
    }
}
