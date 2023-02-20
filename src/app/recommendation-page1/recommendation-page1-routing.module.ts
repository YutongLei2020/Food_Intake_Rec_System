import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendationPage1Page } from './recommendation-page1.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendationPage1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendationPage1PageRoutingModule {}
