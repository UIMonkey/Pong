import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent {

  @Input() xPos? = 0;
  @Input() yPos? = 0;

}
