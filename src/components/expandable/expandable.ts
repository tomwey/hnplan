import { Component, Input, ElementRef, Renderer } from '@angular/core';

/**
 * Generated class for the ExpandableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent {

  @Input('scrollArea') scrollArea: any;
  @Input('fixedArea') fixedArea: any;
  @Input('height') height: number;

  newHeight: any;

  constructor(public element: ElementRef, public renderer: Renderer) {

  }

  ngOnInit() {
    // console.log(this.height);
    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.height + 'px');
    // this.renderer.setElementStyle(this.element.nativeElement, 'marginTop', -this.height + 'px')

    // this.scrollArea.ionScroll.subscribe((ev) => {
    //   // console.log(ev);
    //   this.resizeArea(ev);
    // });

    document.getElementById("main-area").style.height = `calc(100% - ${this.height}px)`;

    document.addEventListener('scroll', (e) => {
      // console.log(e);
      this.resizeArea2(e);
    }, true);
  }

  resizeArea2(ev) {
    if (ev.target['className'] != 'rightside' /*&& ev.target['className'] != 'leftside'*/) return;

    this.newHeight = this.height - ev.target['scrollTop'];
    if (this.newHeight < 0) {
      this.newHeight = 0;
    }

    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.newHeight + 'px');

    document.getElementById("main-area").style.height = `calc(100% - ${this.newHeight}px)`;

    for (let ele of this.element.nativeElement.children) {
      let totalHeight = ele.clientHeight;
      this.renderer.setElementStyle(ele, 'opacity', `${this.newHeight / totalHeight}`);
    }

    // this.scrollArea.resize();
  }

  resizeArea(ev) {
    // console.log(ev);
    ev.domWrite(() => {
      console.info('ev.st:', ev.scrollTop);
      this.newHeight = this.height - ev.scrollTop;
      // console.log(this.newHeight);
      if (this.newHeight < 0) {
        this.newHeight = 0;
      }

      console.info('newHeight:', this.newHeight);

      this.renderer.setElementStyle(this.element.nativeElement, 'height', this.newHeight + 'px');

      for (let ele of this.element.nativeElement.children) {
        let totalHeight = ele.clientHeight;
        // console.info('ele.st:', ele.offsetTop);
        // console.info('totalHeight:', totalHeight);
        // console.log(ele.clientHeight);
        // console.info('ele.total.height:', totalHeight);
        // if (totalHeight > this.newHeight && !ele.isHidden) {
        //   ele.isHidden = true;
        //   this.renderer.setElementStyle(ele, 'opacity', '0.0');
        // } else if (totalHeight <= this.newHeight && ele.isHidden) {
        //   ele.isHidden = false;
        //   this.renderer.setElementStyle(ele, 'opacity', '1.0');
        // }
        this.renderer.setElementStyle(ele, 'opacity', `${this.newHeight / totalHeight.toFixed(2)}`);
      }
    });
  }

}
