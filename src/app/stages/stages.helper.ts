import { IStage, StageItem } from './models/stage-item.interface';

export const planningStage: IStage = {
  title: 'תכנון',
  stageItems: [
    {
      title: 'אדריכלות',
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
};
