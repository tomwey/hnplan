import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular';

/**
 * Generated class for the FeedbackTimelineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'feedback-timeline',
  templateUrl: 'feedback-timeline.html'
})
export class FeedbackTimelineComponent {

  @Input() dates: any = [];
  @Input() data: any = {};
  constructor(private app: App) {

  }

  doClick(obj) {
    this.app.getRootNavs()[0].push('FeedbackDetailPage');
  }

}
