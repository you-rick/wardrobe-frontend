import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)},
      {path: 'collections', loadChildren: () => import('./collections/collections.module').then(m => m.CollectionsModule)}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouting {
}
