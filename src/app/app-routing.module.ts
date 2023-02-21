import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'recommendation',
    loadChildren: () => import('./recommendation/recommendation.module').then( m => m.RecommendationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recommendation-page1',
    loadChildren: () => import('./recommendation-page1/recommendation-page1.module').then( m => m.RecommendationPage1PageModule)
  },
  {
    path: 'recommendation-page2',
    loadChildren: () => import('./recommendation-page2/recommendation-page2.module').then( m => m.RecommendationPage2PageModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
