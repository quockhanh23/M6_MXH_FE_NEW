import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from "@angular/material/tooltip";

const MaterialComponents = [
  MatButtonModule,
  MatBadgeModule,
  MatIconModule,
  MatBottomSheetModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatCardModule,
  MatButtonToggleModule,
  MatListModule,
  MatToolbarModule,
  MatTooltipModule
]

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents]
})
export class MaterialModule {
}
