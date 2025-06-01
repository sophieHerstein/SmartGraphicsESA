import {
  Component,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class SceneComponent implements OnInit {
  @Output() setCurrentScene: EventEmitter<number> = new EventEmitter();

  @Input({required: true}) sceneId?: number;
  @Input() imageSrc!: string;
  @Input() heading!: string;
  @Input() text!: string;
  @Input() nextSceneId?: number;
  @Input() prevSceneId?: number;
  @Input() onlyImages?: boolean;

  @ViewChild('scene', { static: true }) sceneRef!: ElementRef;
  imageInView = false;
  textInView = false;
  textHidden = false;


  constructor(private sanitizer: DomSanitizer) {}

  formatText(text: string): SafeHtml {
    const html = text
      .split('\n\n')
      .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
      .join('');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.setCurrentScene.emit(this.sceneId);
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
      const nextElement = document.getElementById(String(this.nextSceneId));
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  scrollToPrevScene() {
    if (this.prevSceneId) {
      console.log(this.prevSceneId)
      const prevElement = document.getElementById(String(this.prevSceneId));
      if (prevElement) {
        prevElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  toggleText() {
    this.textHidden = !this.textHidden;
  }
}
