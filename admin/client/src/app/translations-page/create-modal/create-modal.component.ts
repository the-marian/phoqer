import { Component } from '@angular/core';

@Component({
    selector: 'app-create-modal',
    templateUrl: './create-modal.component.html',
    styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent {
    id = '';
    content = '';
    constructor() {}
}
