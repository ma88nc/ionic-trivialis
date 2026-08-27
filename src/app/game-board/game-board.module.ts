import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameBoardPageRoutingModule } from './game-board-routing.module';

import { GameBoardPage } from './game-board.page';
import { DecodeHtmlString } from "../shared/decodeHtml.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameBoardPageRoutingModule,
    DecodeHtmlString
],
  declarations: [GameBoardPage]
})
export class GameBoardPageModule {}
