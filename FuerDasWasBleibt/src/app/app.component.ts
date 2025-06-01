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
  onlyImages = false;

  scenes = [
    {id: 1, imageSrc: "assets/images/Szene1Final.png", heading: "Asche über dem Tal", text: story.scene1},
    {id: 2, imageSrc: "assets/images/Szene2Final.png", heading: "Was getan werden muss", text: story.scene2},
    {id: 3, imageSrc: "assets/images/Szene3Final.png", heading: "Für das Ende des Krieges", text: story.scene3},
    {id: 4, imageSrc: "assets/images/Szene4Final.png", heading: "Letzte Befehle", text: story.scene4},
    {id: 5, imageSrc: "assets/images/Szene5Final.png", heading: "Vor dem Sturm", text: story.scene5},
    {id: 6, imageSrc: "assets/images/Szene6Final.png", heading: "Nie allein", text: story.scene6},
    {id: 7, imageSrc: "assets/images/Szene7Final.png", heading: "Der Preis des Friedens", text: story.scene7},
    {id: 8, imageSrc: "assets/images/Szene8Final.png", heading: "Ein letzter Atemzug", text: story.scene8},
    {id: 9, imageSrc: "assets/images/Szene9Final.png", heading: "Nach dem Sturm", text: story.scene9},
    {id: 10, imageSrc: "assets/images/EpilogFinal.png", heading: "Epilog", text: story.scene10},
  ]

  currentSceneTitle = this.scenes[0].heading;

  getNextSceneId(index: number){
    if(index < this.scenes.length){
      return index+2;
    }
    return undefined;
  }

  getPrevSceneId(index: number){
    if(index > 0){
      return index;
    }
    return undefined;
  }

  triggerOnlyImages(){
    this.onlyImages = !this.onlyImages;
  }

  setSceneTitleAndScrollProgress(sceneId: number){
    this.currentSceneTitle = this.scenes.find((s)=> s.id === sceneId)?.heading ?? "";
    console.log(this.scrollProgress);
    this.scrollProgress = sceneId/10 * 100;
  }

}
