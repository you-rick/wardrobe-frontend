import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {ImageCropperModule} from "ngx-image-cropper";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ItemsSharedModule} from "../items/items-shared.module";
import {SharedModule} from "../../../shared/shared.module";
import {Ng5SliderModule} from 'ng5-slider';


import {OutfitsRouting} from "./outfits.routing";
import {OutfitsComponent} from "./outfits.component";
import {OutfitListComponent} from './outfit-list/outfit-list.component';
import {OutfitInfoComponent} from './outfit-info/outfit-info.component';
import {AddOutfitComponent} from './add-outfit/add-outfit.component';

@NgModule({
  declarations: [
    OutfitsComponent,
    OutfitListComponent,
    OutfitInfoComponent,
    AddOutfitComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    OutfitsRouting,
    ItemsSharedModule,
    SharedModule,
    Ng5SliderModule
  ]
})
export class OutfitsModule {
}
