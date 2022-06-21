import { ReactNode } from 'react';

import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import DonutSmallTwoToneIcon from '@mui/icons-material/DonutSmallTwoTone';
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Overview',
        icon: DonutSmallTwoToneIcon,
        link: '/app/dashboard'
      }
    ]
  },
  {
    heading: '',
    items: [
      {
        name: 'Messages',
        icon: MmsTwoToneIcon,
        link: '/app/messenger'
      }
    ]
  },
  {
    heading: '',
    items: [
      {
        name: 'Jobs',
        link: '/app/jobs',
        icon: BusinessCenterTwoToneIcon
      }
    ]
  },
  {
    heading: '',
    items: [
      {
        name: 'Calender',
        link: '/app/job-workers',
        icon: CalendarTodayTwoToneIcon
      }
    ]
  },
  {
    heading: '',
    items: [
      {
        name: 'Workers',
        icon: EngineeringTwoToneIcon,
        link: '/app/workers'
      }
    ]
  },
  {
    heading: '',
    items: [
      {
        name: 'New Applicants',
        icon: GroupAddTwoToneIcon,
        link: '/app/new-applicants'
      }
    ]
  },
  {
    heading: '',
    items: [
      {
        name: 'Reports',
        icon: AssessmentTwoToneIcon,
        link: '/app/report'
      }
    ]
  },
  {
    heading: '',
    items: [
      {
        name: 'Payments',
        icon: PaymentsTwoToneIcon,
        link: '/app/payments'
      }
    ]
  }
];

export default menuItems;
