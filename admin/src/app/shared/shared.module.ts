import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    declarations: [HeaderComponent, ContainerComponent],
    imports: [
        CommonModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
    ],
    exports: [HeaderComponent, ContainerComponent],
})
export class SharedModule {}
