// story-scene.component.ts
import { Component, Input, OnInit, ElementRef, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class SceneComponent implements OnInit {
  @Input() imageSrc!: string;
  @Input() heading!: string;
  @Input() text!: string;
  @Input() nextSceneId?: string;
  @Input() prevSceneId?: string;

  @ViewChild('scene', { static: true }) sceneRef!: ElementRef;
  imageInView = false;
  textInView = false;

  ngOnInit() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.imageInView = true;
            setTimeout(() => {
              this.textInView = true;
            }, 600);
          } else {
            this.imageInView = false;
            this.textInView = false;
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(this.sceneRef.nativeElement);
  }

  scrollToNextScene() {
    if (this.nextSceneId) {
      const nextElement = document.getElementById(this.nextSceneId);
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  scrollToPrevScene() {
    if (this.prevSceneId) {
      const prevElement = document.getElementById(this.prevSceneId);
      if (prevElement) {
        prevElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
