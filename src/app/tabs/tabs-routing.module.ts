import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // {
      //   path: 'tab1',
      //   loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      // },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'confirmation',
        loadChildren: () => import('../confirmation/confirmation.module').then(m => m.ConfirmationPageModule)
      },
      {
        path: 'recommendation',
        loadChildren: () => import('../recommendation/recommendation.module').then(m => m.RecommendationPageModule)
      },
      {
        path: 'recommendation-page1',
        loadChildren: () => import('../recommendation-page1/recommendation-page1.module').then(m => m.RecommendationPage1PageModule)
      },
      {
        path: 'recommendation-page2',
        loadChildren: () => import('../recommendation-page2/recommendation-page2.module').then(m => m.RecommendationPage2PageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then(m => m.HistoryPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }      
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
