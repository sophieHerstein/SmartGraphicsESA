import {Component, HostListener} from '@angular/core';
import story from "../assets/story/story.json"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  scrollProgress = 0;
  protected readonly story = story;

  scenes = [
    {id: "scene1", imageSrc: "assets/images/Szene1Final.png", heading: "Scene 1", text: story.scene1},
    {id: "scene2", imageSrc: "assets/images/Szene2Final.png", heading: "Scene 2", text: story.scene2},
    {id: "scene3", imageSrc: "assets/images/Szene3Final.png", heading: "Scene 3", text: story.scene3},
    {id: "scene4", imageSrc: "assets/images/Szene4Final.png", heading: "Scene 4", text: story.scene4},
    {id: "scene5", imageSrc: "assets/images/Szene5Final.png", heading: "Scene 5", text: story.scene5},
    {id: "scene6", imageSrc: "assets/images/Szene6Final.png", heading: "Scene 6", text: story.scene6},
    {id: "scene7", imageSrc: "assets/images/Szene7Final.png", heading: "Scene 7", text: story.scene7},
    {id: "scene8", imageSrc: "assets/images/Szene8Final.png", heading: "Scene 8", text: story.scene8},
    {id: "scene9", imageSrc: "assets/images/Szene9Final.png", heading: "Scene 9", text: story.scene9},
    {id: "scene10", imageSrc: "assets/images/EpilogFinal.png", heading: "Scene 10", text: story.scene10},
  ]
  getNextSceneId(index: number){
    if(index < this.scenes.length){
      return "scene"+(index+2);
    }
    return "";
  }

  getPrevSceneId(index: number){
    if(index > 0){
      return "scene"+index;
    }
    return "";
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
  }

}
