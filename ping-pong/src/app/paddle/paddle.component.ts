import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paddle',
  templateUrl: './paddle.component.html',
  styleUrls: ['./paddle.component.scss']
})
export class PaddleComponent {

  @Input() xPos = 0;
  @Input() yPos = 0;

}
