export const sampleMenuOption = [
  {
    subheader: 'general',
    items: [
      {
        title: 'Profile',
      },
    ],
  },
  {
    subheader: 'Token generation',
    items: [
      {
        title: 'Token',
      },
    ],
  },
  {
    subheader: 'OPD Consultation',
    items: [
      {
        title: 'Consultation',
      },
      {
        title: 'Consultation Dashboard',
      },
    ],
  },
  {
    subheader: 'OPD',
    items: [
      {
        title: 'Patient Registration',
      },
      {
        title: 'Registration',
      },
      {
        title: 'Billing Entry',
      },
      {
        title: 'Barcode & Token',
      },
    ],
  },
  // -----------------------IPD------------------------------
  {
    subheader: 'IPD',
    items: [
      { title: 'Patient List' },
      { title: 'Bulk Meal Order' },
      { title: 'Patient Meal Order' },
      { title: 'Kitchen Dashboard' },
      { title: 'Bed Management' },
      {
        title: 'Renewal',
      },
      {
        title: 'Billing Entry',
      },
      {
        title: 'Barcode & Token',
      },
    ],
  },
  // -----------------------IPD------------------------------

  {
    subheader: 'Management',
    items: [
      // management
      {
        title: 'Duty Roster',
        children: [
          {
            title: 'Shift Master',
          },
          {
            title: 'Assign Duty',
          },
          {
            title: 'Building',
          },
          {
            title: 'Floor',
          },
          {
            title: 'Consultation Room',
          },
        ],
      },

      {
        title: 'Blood Bank',
        children: [
          {
            title: 'Blood Bank Dashboard',
          },
          {
            title: 'Individual Donors',
            tabs: ['All Donors', 'In Lab Testing', 'Added to Stock', 'Rejected'],
          },
          {
            title: 'Camp Donors',
            tabs: ['All Donors', 'In Lab Testing', 'Added to Stock', 'Rejected'],
          },
          {
            title: 'Blood Inventory',
            tabs: ['Whole Blood', 'Platelets', 'Plasma', 'Red Cells'],
          },
          {
            title: 'Blood Grouping',
          },
          {
            title: 'Cross Matching',
          },
          {
            title: 'Blood Screening',
            tabs: ['All Donors', 'In Lab Testing', 'Added to Stock', 'Rejected'],
          },
          {
            title: 'Raise Blood Request',
          },
          {
            title: 'Our Hospital Requests',
            tabs: ['All Requests', 'Pending', 'Fulfilled'],
          },
          {
            title: 'Other Hospital Requests',
            tabs: ['All Requests', 'Pending', 'Fulfilled'],
          },
          {
            title: 'Transfusions',
          },
        ],
      },
      {
        title: 'Operation Theatre',
        children: [
          {
            title: 'OT Dashboard',
          },
          {
            title: 'OT Schedule',
          },
          {
            title: 'OT Notes',
          },
          {
            title: 'OT Billing',
          },
          {
            title: 'Billing Service',
          },
        ],
      },
    ],
  },
  {
    subheader: 'Vehicle',
    items: [
      // management
      {
        title: 'Transport',
        children: [
          {
            title: 'Battery Type',
          },
          {
            title: 'Fuel Type',
          },
          {
            title: 'Vehicle Class',
          },
          {
            title: 'Vehicle Transport',
          },
          {
            title: 'Vehicle Registration',
          },
          {
            title: 'RTO File',
          },
          {
            title: 'Insurance File',
          },
          {
            title: 'Polution File',
          },
          {
            title: 'Vehicle Availability',
          },
          {
            title: 'Vehicle Request',
          },
          {
            title: 'Vehicle Accessories',
          },
          {
            title: 'Attach Fixed Vehicle',
          },
          {
            title: 'Vehicle Log Book',
          },
          {
            title: 'Battery',
          },
          {
            title: 'Tyres',
          },
          {
            title: 'Oil',
          },
          {
            title: 'Work Order',
          },
          {
            title: 'Major Change',
          },
          {
            title: 'Damage',
          },
        ],
      },
    ],
  },
  {
    subheader: 'Master',
    items: [
      // management

      {
        title: 'Type',
        children: [
          {
            title: 'OP-type',
          },
          {
            title: 'IP-type',
          },
        ],
      },

      {
        title: 'Fee Type',
      },
      {
        title: 'Staff Profile',
        children: [
          {
            title: 'Educational Qualification',
          },
          {
            title: 'Specialization',
          },
          {
            title: 'Staff Creation',
          },
          {
            title: 'Users Credentials',
          },
        ],
      },

      {
        title: 'Vital Signs',
      },
      {
        title: 'Lab',
        children: [
          {
            title: 'Labs',
          },
          // {
          //   title: 'Test Name',
          // },
          {
            title: 'Test Method',
          },
          {
            title: 'Test Unit',
          },
          {
            title: 'Specimen Container',
          },
          {
            title: 'Sample Type',
          },
          {
            title: 'Single Test',
          },
          // {
          //   title: 'Group Test Name',
          // },
          {
            title: 'Group Test',
          },

          {
            title: 'Radiology Body Part',
          },
          {
            title: 'Radiology View - Body Part',
          },
        ],
      },
      {
        title: 'Payment Mode',
      },
      {
        title: 'Procedure',
      },

      {
        title: 'Ward',
        children: [
          {
            title: 'Ward Type',
          },
          {
            title: 'Ward Mapping',
          },
        ],
      },

      {
        title: 'Bed',
        children: [
          {
            title: 'Bed Type',
          },
          {
            title: 'Bed Mapping',
          },
        ],
      },

      {
        title: 'IP Discharge Note',
      },

      {
        title: 'Wound Care',
        children: [
          {
            title: 'Wound Type',
          },
          {
            title: 'Wound Bed',
          },
          {
            title: 'Wound Odour',
          },
          {
            title: 'Wound Status',
          },
          {
            title: 'Wound Area',
          },
          {
            title: 'Drainage Type',
          },
          {
            title: 'Drainage Intensity',
          },
          {
            title: 'Periwound Skin Type',
          },
        ],
      },
      {
        title: 'Therapy Package',
        children: [
          {
            title: 'Therapy Details',
          },
          {
            title: 'Package Details',
          },
        ],
      },

      {
        title: 'External Therapy',
      },
      {
        title: 'Diet & Kitchen',
        children: [
          {
            title: 'Diet Article',
          },
          {
            title: 'Meal Type',
          },
          {
            title: 'Food Item',
          },
          {
            title: 'Order Set',
          },
          {
            title: 'Diet Cycle',
          },
        ],
      },
      {
        title: 'Laundry',
        children: [
          {
            title: 'Linen Process',
          },
          {
            title: 'Linen Item Category',
          },
          {
            title: 'Linen Laundry Item',
          },
          {
            title: 'Location',
          },
          {
            title: 'Location Department Mapping',
          },
          {
            title: 'Equipment',
          },
          {
            title: 'Linen Order',
          },
          {
            title: 'Linen Supply',
          },
          {
            title: 'Linen Washing Dry Cleaning',
          },
          {
            title: 'Laundry Item Utilization',
          },
        ],
      },
      {
        title: 'Sanitation',
        children: [
          {
            title: 'Categories',
          },
          {
            title: 'Man Power',
          },
          {
            title: 'Garbage Collection',
          },
          {
            title: 'Complaints',
          },
        ],
      },
      {
        title: 'Assign Duty New',
      },

      // {
      //   title: 'Drug',
      //   children: [
      //     {
      //       title: 'Product-Type',
      //     },
      //     {
      //       title: 'Measurement',
      //     },
      //     {
      //       title: 'Product-Name',
      //     },
      //     {
      //       title: 'Adjuvant & Vehicle',
      //     },
      //     {
      //       title: 'Medication-Frequency',
      //     },
      //   ],
      // },
    ],
  },
  {
    subheader: 'Laboratory',
    items: [
      {
        title: 'Lab Dashboard',
      },
      {
        title: 'Lab Result Entry',
      },
      {
        title: 'Verify Test',
      },
    ],
  },
  {
    subheader: 'Nursing Care',
    items: [
      {
        title: 'Nursing Dashboard',
      },
    ],
  },
];

function getLowercasePath(path) {
  return '/' + path.replace(/ /g, '-').toLowerCase();
}

export function getAllMenuOption(menuList) {
  return menuList.flatMap((m) => {
    return {
      ...m,
      items: m.items.map((subMenu) => {
        if (subMenu.children) {
          return {
            ...subMenu,
            path: getLowercasePath(m.subheader) + getLowercasePath(subMenu.title),
            children: subMenu.children.map((k) => {
              return {
                ...k,
                path:
                  getLowercasePath(m.subheader) +
                  getLowercasePath(subMenu.title) +
                  getLowercasePath(k.title),
              };
            }),
          };
        } else {
          return {
            ...subMenu,
            path: getLowercasePath(m.subheader) + getLowercasePath(subMenu.title),
          };
        }
      }),
    };
  });
}
