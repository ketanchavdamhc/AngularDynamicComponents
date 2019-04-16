import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-skills-rating',
  templateUrl: './skills-rating.component.html',
  styleUrls: ['./skills-rating.component.css']
})
export class SkillsRatingComponent implements OnInit {

  reference: any;
  index: number;

  selectedSkill: string;
  yearsOfExperiences: string = '0';
  selectedRating: string;

  skills: any = [];
  ratings: any = [];

  constructor(private elementRef: ElementRef) {
  }

  removeSkills() {
    this.reference.destroy();
  }

  ngOnInit() {
  }

}
