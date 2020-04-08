import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouting {
}
