import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TranslationsPageComponent } from './translations-page/translations-page.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'translations', component: TranslationsPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
