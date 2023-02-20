import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationPage1PageRoutingModule } from './recommendation-page1-routing.module';

import { RecommendationPage1Page } from './recommendation-page1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationPage1PageRoutingModule
  ],
  declarations: [RecommendationPage1Page]
})
export class RecommendationPage1PageModule {}
