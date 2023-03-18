import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationPage2PageRoutingModule } from './recommendation-page2-routing.module';

import { RecommendationPage2Page } from './recommendation-page2.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationPage2PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RecommendationPage2Page]
})
export class RecommendationPage2PageModule {}
