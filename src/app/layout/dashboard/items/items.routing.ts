import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemsComponent} from "./items.component";
import {ItemsListComponent} from "./items-list/items-list.component";
import {AddItemComponent} from "./add-item/add-item.component";

const routes: Routes = [
  {
    path: '', component: ItemsComponent, children: [
      {path: '', component: ItemsListComponent},
      {path: 'add', component: AddItemComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRouting {
}
