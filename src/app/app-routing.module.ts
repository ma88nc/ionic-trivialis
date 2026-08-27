import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./game-board/game-board.module').then( m => m.GameBoardPageModule)
  },
  {
    path: 'game-board',
    loadChildren: () => import('./game-board/game-board.module').then( m => m.GameBoardPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
