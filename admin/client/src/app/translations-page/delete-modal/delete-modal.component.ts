import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
    Translations,
    TranslationsPageService,
} from '../translations-page.service';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Translations,
        public trans: TranslationsPageService
    ) {}
}
