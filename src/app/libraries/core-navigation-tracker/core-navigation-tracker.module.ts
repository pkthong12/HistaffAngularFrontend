import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreNavigationTrackerComponent } from './core-navigation-tracker/core-navigation-tracker.component';



@NgModule({
  declarations: [
    CoreNavigationTrackerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CoreNavigationTrackerComponent
  ]
})
export class CoreNavigationTrackerModule { }
