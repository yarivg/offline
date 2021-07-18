
interface Aircraft {
  level: string;
  objectType: string;
  tmsMnf: string;
  profileDescription: string;
  iiiNumber: string;
  serialNumber: string;
  actualLocationCode: string;
}

interface ActivityUnit {
  description: string;
  type: string;
  intervalValue: string;
  timingValue: string;
  potentialValue: string;
  permissionTimingValue: string;
  permissionPotentialValue: string;
}

interface Inspection {
  actualWorkLocationDescription: string;
  responsibleWorkLocation: string;
  positionDescription: string;
  permissionMainActionNumber: string;
  description: string;
  activityUnits: Array<ActivityUnit>;
  isApplicable: boolean;
}

let aircraftData: Aircraft = {
  level: 'אב',
  objectType: '1',
  profileDescription: 'חבצלת 9000',
  iiiNumber: '5308989392',
  serialNumber: '111',
  tmsMnf: '301111',
  actualLocationCode: 'ביצה 09'
};

let inspectionData: Array<Inspection> = [
  {
    actualWorkLocationDescription: 'כספית 113, נקודה א',
    responsibleWorkLocation: '100.200.300',
    positionDescription: '22ק',
    permissionMainActionNumber: '82740932479832',
    description: 'יש לקמפל הכל תוך יומיים',
    activityUnits: [
      {
        description: 'לחיצות',
        type: 'מספרי',
        intervalValue: '2',
        potentialValue: '10',
        timingValue: '8',
        permissionPotentialValue: '2',
        permissionTimingValue: '12'
      },
      {
        description: 'בידוד',
        type: 'מספרי',
        intervalValue: '14',
        potentialValue: '11',
        timingValue: '9',
        permissionPotentialValue: '',
        permissionTimingValue: ''
      }
    ],
    isApplicable: true
  },
  {
    actualWorkLocationDescription: 'כספית 113, נקודה ב',
    responsibleWorkLocation: '100.220.333',
    positionDescription: '',
    permissionMainActionNumber: '409324798312312',
    description: 'יש לעדכן לאנגולאר 9',
    activityUnits: [
      {
        description: 'לחיצות',
        type: 'מספרי',
        intervalValue: '5',
        potentialValue: '20',
        timingValue: '11',
        permissionPotentialValue: '2',
        permissionTimingValue: '12'
      }
    ],
    isApplicable: false
  }
];

let tableMock = [
  {
    headElements: [
      'רמה',
      'סוג פריט',
      'תיאור פרופיל',
      'מספר יצרן / TMS',
      'מסחח',
      'מספר סידורי',
      'תיאור מיקום',
      'תיאור ביקורת',
      'יח נבדקת',
      'מרווח לביצוע',
      'עיתוי לביצוע',
      'פונציאל ביקורת',
      'מספר אישור/היתר',
      'יח נבדקת של עיתוי אישור',
      'עיתוי אישור',
      'פוטנציאל אישור/היתר',
      'סוג פריט אב עליון',
      'TMS / מספר יצרן אב עליון',
      'תיאור אב עליון',
      'סידורי אב עליון',
      'סוג פריט אב',
      'TMS מספר יצרן אב',
      'תיאור אב',
      'סידורי אב',
      'נקודת עבודה בפועל',
      'נקודת עבודה אחראית'
    ],
    data: [
      {
        aircraft: aircraftData,
        inspections: inspectionData
      }
    ]
  }
];

module.exports = {tableMock};
