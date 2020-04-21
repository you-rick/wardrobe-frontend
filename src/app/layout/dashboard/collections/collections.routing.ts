import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CollectionsComponent} from "./collections.component";
import {CollectionInfoComponent} from "./collection-info/collection-info.component";
import {AddCollectionComponent} from "./add-collection/add-collection.component";
import {CollectionListComponent} from "./collection-list/collection-list.component";


const routes: Routes = [
  {
    path: '', component: CollectionsComponent, children: [
      {path: '', component: CollectionListComponent},
      {path: 'add', component: AddCollectionComponent, data: {add: true}},
      {path: ':id', component: CollectionInfoComponent},
      {path: ':id/edit', component: AddCollectionComponent, data: {edit: true}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRouting {
}
