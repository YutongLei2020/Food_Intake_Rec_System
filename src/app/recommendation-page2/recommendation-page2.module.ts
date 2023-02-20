import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationPage2PageRoutingModule } from './recommendation-page2-routing.module';

import { RecommendationPage2Page } from './recommendation-page2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationPage2PageRoutingModule
  ],
  declarations: [RecommendationPage2Page]
})
export class RecommendationPage2PageModule {}
