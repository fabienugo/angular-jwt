import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

const MATERIALMODULE = [
  FlexLayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MATERIALMODULE
  ],
  exports: [
    MATERIALMODULE
  ]
})
export class LayoutModule { }
