import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateModalComponent } from './create-modal/create-modal.component';

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
        private routes: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.routes.params.subscribe((params: Params) => {
            this.selected = params.language;
        });
    }

    select(value: string): void {
        this.router.navigate([`translations/${value}`]);
    }

    open(): void {
        const dialogRef = this.dialog.open(CreateModalComponent, {
            maxWidth: '70rem',
            width: '100%',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) console.log(result);
        });
    }
}
