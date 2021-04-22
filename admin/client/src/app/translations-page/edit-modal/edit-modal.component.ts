import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Translations } from '../translations-page.service';

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
    content = '';
    constructor(@Inject(MAT_DIALOG_DATA) public data: Translations) {}

    ngOnInit(): void {
        this.content = this.data.content;
    }
    changeContent(event: Event): void {
        this.content = (event.target as HTMLTextAreaElement).value;
    }
}
