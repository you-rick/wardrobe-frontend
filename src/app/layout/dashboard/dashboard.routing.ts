import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)},
      {path: 'outfits', loadChildren: () => import('./outfits/outfits.module').then(m => m.OutfitsModule)}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouting {
}
