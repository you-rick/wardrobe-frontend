import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OutfitsComponent} from "./outfits.component";
import {OutfitInfoComponent} from "./outfit-info/outfit-info.component";
import {AddOutfitComponent} from "./add-outfit/add-outfit.component";
import {OutfitListComponent} from "./outfit-list/outfit-list.component";


const routes: Routes = [
  {
    path: '', component: OutfitsComponent, children: [
      {path: '', component: OutfitListComponent},
      {path: 'add', component: AddOutfitComponent, data: {add: true}},
      {path: ':id', component: OutfitInfoComponent},
      {path: ':id/edit', component: AddOutfitComponent, data: {edit: true}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutfitsRouting {
}
