import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { TranslationsPageService } from './translations-page.service';

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

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private routerParams: ActivatedRoute,
        public trans: TranslationsPageService
    ) {}

    ngOnInit(): void {
        this.routerParams.params.subscribe((params: Params) => {
            this.selected = params.language;
            this.trans.setLang(params.language);
            this.trans.getContent();
        });
    }

    select(value: string): void {
        this.router.navigate([`translations/${value}`]);
    }

    open(): void {
        this.dialog.open(CreateModalComponent, {
            maxWidth: '70rem',
            width: '100%',
        });
    }
}
