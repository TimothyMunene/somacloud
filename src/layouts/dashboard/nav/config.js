// component
import { useState } from 'react';
import SvgColor from '../../../components/svg-color';



// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/home',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Marks Entry',
    path: '/home/marks',
    icon: icon('ic_wallet'),
  },
  {
    title: 'SMS',
    path: '/home/sms',
    icon: icon('ic_transfer'),
  },
  {
    title: 'Admin',
    path: '/home/admin',
    icon: icon('ic_transaction'),
  }
];





export default navConfig;
