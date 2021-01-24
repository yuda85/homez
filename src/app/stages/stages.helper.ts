import { StageType } from './models';
import { IStage, StageItem } from './models/stage-item.interface';

export const BaseStages: Array<IStage> = [
  {
    title: 'תכנון',
    type: StageType.Planning,
    stageItems: [
      {
        title: 'אדריכלות',
        description: "צ'ק ליסט למשימות נדרשות בשלב האדריכלות",
        todos: [
          {
            title: 'תכנון אדריכלי',
            isCompleted: false,
          },
          {
            title: 'מפה טופוגרפית - מודד',
            isCompleted: false,
          },
          {
            title: 'מפה טופוגרפית - מודד',
            isCompleted: false,
          },
        ],
      },
      {
        title: 'תיאום תיכנון',
        description: "צ'ק ליסט למשימות נדרשות בשלב התיאומים",
        todos: [
          {
            title: 'תיאום תיכנון פתחים',
            isCompleted: false,
          },
          {
            title: 'תיאום תיכנון אינסטלציה',
            isCompleted: false,
          },
          {
            title: 'תיאום תיכנון עבודות פלדה',
            isCompleted: false,
          },
        ],
      },
    ],
  },
];
