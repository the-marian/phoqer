import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TranslationsPageComponent } from './pages/translations-page/translations-page.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'translations/:language', component: TranslationsPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
