import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-planning-dashboard',
  templateUrl: './planning-dashboard.component.html',
  styleUrls: ['./planning-dashboard.component.scss'],
})
export class PlanningDashboardComponent implements OnInit {
  constructor() {}
  public planningList = [
    {
      value: 'אדריכלות',
      checked: false,
      comment: ' 80% בוצע',
    },
    {
      value: 'תכנון קרקע',
      checked: true,
      comment: 'חסר מדידה אחרונה לפני יציקה',
    },
    {
      value: 'אישור מועצה',
      checked: true,
      comment: 'גרמושקה הוגשה',
    },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.planningList, event.previousIndex, event.currentIndex);
  }
  ngOnInit(): void {}

  onCheckboxClick(event: Event) {
    debugger;
    event.stopPropagation();
  }
}
