import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SkillsRatingComponent } from './skills-rating/skills-rating.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamicComponent';

  @ViewChild('dynamicContainer',{read : ViewContainerRef})
  container:ViewContainerRef;
  skills:any;
  ratings:any;
  rowId:any;
  data:String;
  embeddedViews: number = 0;

  constructor(private comFacResolver: ComponentFactoryResolver) {
  }
 
  addNewSkills() {
    let rows = document.getElementById("dynamicContainer");
    let rowIdIndex = rows.innerHTML.indexOf("row");
    if (rowIdIndex == -1) {
      this.rowId = 1;
    }
    this.skills = ['CSharp', '.Net Framework', 'Asp.Net', 'Asp.Net Core', 'Angular 1.x', 'Angular 2.x', 'Web API', 'Azure', 'Javascript', 'SQL'];
    this.ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let comp = this.comFacResolver.resolveComponentFactory(SkillsRatingComponent);
    let dynamicComp = this.container.createComponent(comp);
    dynamicComp.instance.reference = dynamicComp;
    dynamicComp.instance.skills = this.skills;
    dynamicComp.instance.ratings = this.ratings;
    dynamicComp.instance.index = this.rowId;

    dynamicComp.instance.selectedSkill = '';
    dynamicComp.instance.yearsOfExperiences = '0';
    dynamicComp.instance.selectedRating = this.ratings[0];

    this.rowId += 1;

    let com = this.container;
    if (com !== undefined) {
      this.embeddedViews = com['_embeddedViews'].length;
    }
  }

  saveSkills() {
    let comp = this.container;
    this.data = "";
    (<HTMLSpanElement>document.getElementById("addedSkills")).innerText = "";
    if (comp !== undefined) {
      //debugger;
      if (comp['_embeddedViews'].length != 0) {
        for (let i = 0; i < comp['_embeddedViews'].length; i++) {
          if (comp['_embeddedViews'][i] != undefined) {
            //debugger;
            let selectedSkill = comp['_embeddedViews'][i].nodes[1].instance.selectedSkill == '' ? "NONE" : comp['_embeddedViews'][i].nodes[1].instance.selectedSkill;
            let yearsOfExperiences = comp['_embeddedViews'][i].nodes[1].instance.yearsOfExperiences == '' ? "NONE" : comp['_embeddedViews'][i].nodes[1].instance.yearsOfExperiences;
            let selectedRating = comp['_embeddedViews'][i].nodes[1].instance.selectedRating;

            this.data = 'User knows <b style="color:green;">' + selectedSkill + ' </b> from <b>' + yearsOfExperiences + ' years</b> , provided rating as <b>' + selectedRating + '</b>.';

            (<HTMLSpanElement>document.getElementById("addedSkills")).innerHTML += this.data;
            (<HTMLSpanElement>document.getElementById("addedSkills")).appendChild(document.createElement('br'));

          }
        }
      }
    }
  }

}
