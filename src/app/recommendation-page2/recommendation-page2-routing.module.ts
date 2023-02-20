import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendationPage2Page } from './recommendation-page2.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendationPage2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendationPage2PageRoutingModule {}
