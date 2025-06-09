import {
  Component,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
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
export class SceneComponent implements OnInit, AfterViewInit {
  @Output() setCurrentScene: EventEmitter<number> = new EventEmitter();

  @Input({required: true}) sceneId?: number;
  @Input() imageSrc!: string;
  @Input() heading!: string;
  @Input() text!: string;
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.sceneRef.nativeElement.classList.add('render-complete');
    }, 50);
  }

  toggleText() {
    this.textHidden = !this.textHidden;
  }
}
