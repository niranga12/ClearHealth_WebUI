import React from 'react'
import CIcon from '@coreui/icons-react'
// import { freeSet } from '@coreui/icons'
import { logoAccounting } from 'src/assets/icons/logo-accounting'
import { logoOrders } from 'src/assets/icons/logo-orders'
import { logoHealthSystem } from 'src/assets/icons/logo-healthsystem'
import { logoHospital } from 'src/assets/icons/logo-hospital'
import { logoProviders } from 'src/assets/icons/logo-provider'
import { pricingTool } from 'src/assets/icons/logo-pricingtool'
import { logoPatients } from 'src/assets/icons/logo-patients'
import { Profile } from 'src/assets/icons/logo-profile'
import { logoMenu } from 'src/assets/icons/logo-menu'
import { ScreenPermissions } from 'src/reusable/enum'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Main',
    to: '/main',
    // icon: 'cil-drop',
    screenid: ScreenPermissions.Main,

    icon: <CIcon content={logoMenu} size={'2xl'} className="m-auto" />
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Hospitals',
    to: '/hospitals',
    screenid: ScreenPermissions.Hospital,
    icon: <CIcon content={logoHospital} size={'2xl'} className="m-auto" />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Health Systems',
    to: '/healthsystem',
    screenid: ScreenPermissions.HealthSystem,

    icon: <CIcon content={logoHealthSystem} size={'2xl'} className="m-auto" />
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Providers',
  //   icon: <CIcon content={logoProviders} size={'2xl'} className="m-auto"/>,
  //    to: '/providers',
  //    screenid:ScreenPermissions.Providers,

  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Pricing Tools',
  //   icon: <CIcon content={pricingTool} size={'2xl'} className="m-auto"/>,
  //    to: '/pricing',
  //    screenid:ScreenPermissions.PricingTool,

  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Orders',
    icon: <CIcon content={logoOrders} size={'2xl'} className="m-auto" />,
    // to: '/base/cards',
    screenid: ScreenPermissions.Orders
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Patients',
    icon: <CIcon content={logoPatients} size={'2xl'} className="m-auto" />,
    to: '/patients',
    screenid: ScreenPermissions.Patients
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Accounting',
    // to: '/base/cards',
    icon: <CIcon content={logoAccounting} size={'2xl'} className="m-auto" />,
    screenid: ScreenPermissions.Accounting
  }
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Profile',
  //   icon: <CIcon content={Profile} size={'2xl'} className="m-auto"/>,

  //   screenid:ScreenPermissions.Profile,
  // },
]

export default _nav
