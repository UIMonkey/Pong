import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { PaddleComponent } from './paddle/paddle.component';
import { CommonModule } from '@angular/common';
import { BallComponent } from './ball/ball.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    PaddleComponent,
    BallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
