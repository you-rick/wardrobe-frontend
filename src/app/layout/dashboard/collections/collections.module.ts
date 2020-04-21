import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ImageCropperModule} from "ngx-image-cropper";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../../shared/shared.module";


import {CollectionsRouting} from "./collections.routing";
import {CollectionsComponent} from "./collections.component";
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionInfoComponent } from './collection-info/collection-info.component';
import { AddCollectionComponent } from './add-collection/add-collection.component';

@NgModule({
  declarations: [
    CollectionsComponent,
    CollectionListComponent,
    CollectionInfoComponent,
    AddCollectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImageCropperModule,
    NgbModule,
    CollectionsRouting,
    SharedModule
  ]
})
export class CollectionsModule { }
