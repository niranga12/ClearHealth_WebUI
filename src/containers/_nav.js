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


const _nav =  [
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   }
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Menu']
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Main',
     to: '/main',
    // icon: 'cil-drop',
    icon:<CIcon content={logoMenu} size={'2xl'}  className="m-auto"/>,
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: 'cil-pencil',
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Admin']
  // },




  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Admin',
  //   route: '/base',
  //   icon:<CIcon content={freeSet.cilAddressBook} size={'lg'} className="mr-3"/>,
  //   // icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Health Systems',
  //        to: '/healthsystem',
  //       icon: <CIcon content={freeSet.cilHeart} size={'lg'} className="mr-3"/>,
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Hospitals',
  //       // to: '/base/cards',
  //       icon:<CIcon content={freeSet.cilHospital} size={'lg'} className="mr-3"/>,
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Providers',
  //       icon: <CIcon content={freeSet.cilBadge} size={'lg'} className="mr-3"/>,
  //       // to: '/base/cards',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Specialities',
  //       icon: <CIcon content={freeSet.cilStar} size={'lg'} className="mr-3"/>,
  //       // to: '/base/cards',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Packages',
  //       icon: <CIcon content={freeSet.cilFile} size={'lg'} className="mr-3"/>,
  //       // to: '/base/cards',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Patients',
  //       icon: <CIcon content={freeSet.cilGroup} size={'lg'} className="mr-3"/>,
  //       // to: '/base/cards',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Ancillary Providers',
  //       // to: '/base/cards',
  //       icon: <CIcon content={freeSet.cilNoteAdd} size={'lg'} className="mr-3"/>,
  //     },
  //   ]
  // },


 
  {
    _tag: 'CSidebarNavItem',
    name: 'Hospitals',
   to: '/hospitals',
    icon:<CIcon content={logoHospital} size={'2xl'} className="m-auto"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Health Systems',
     to: '/healthsystem',
    icon: <CIcon content={logoHealthSystem} size={'2xl'} className="m-auto"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Providers',
    icon: <CIcon content={logoProviders} size={'2xl'} className="m-auto"/>,
     to: '/providers',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pricing Tools',
    icon: <CIcon content={pricingTool} size={'2xl'} className="m-auto"/>,
     to: '/pricing',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Orders',
    icon: <CIcon content={logoOrders} size={'2xl'} className="m-auto"/>,
    // to: '/base/cards',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Patients',
    icon: <CIcon content={logoPatients} size={'2xl'} className="m-auto"/>,
     to: '/patients',
  },
 
  {
    _tag: 'CSidebarNavItem',
    name: 'Accounting',
    // to: '/base/cards',
    icon: <CIcon content={logoAccounting} size={'2xl'} className="m-auto"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Profile',
    icon: <CIcon content={Profile} size={'2xl'} className="m-auto"/>,
    // to: '/base/cards',
  },

  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Components']
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Admin',
  //   route: '/base',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Breadcrumb',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Carousel',
  //       to: '/base/carousels',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Collapse',
  //       to: '/base/collapses',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Forms',
  //       to: '/base/forms',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Jumbotron',
  //       to: '/base/jumbotrons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'List group',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Navs',
  //       to: '/base/navs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Navbars',
  //       to: '/base/navbars',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Progress',
  //       to: '/base/progress-bar',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Switches',
  //       to: '/base/switches',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tabs',
  //       to: '/base/tabs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Buttons',
  //   route: '/buttons',
  //   icon: 'cil-cursor',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Brand buttons',
  //       to: '/buttons/brand-buttons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Dropdowns',
  //       to: '/buttons/button-dropdowns',
  //     }
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: 'cil-chart-pie'
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Icons',
  //   route: '/icons',
  //   icon: 'cil-star',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Notifications',
  //   route: '/notifications',
  //   icon: 'cil-bell',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Toaster',
  //       to: '/notifications/toaster'
  //     }
  //   ]
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: 'cil-calculator',
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   _tag: 'CSidebarNavDivider'
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Extras'],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Pages',
  //   route: '/pages',
  //   icon: 'cil-star',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Disabled',
  //   icon: 'cil-ban',
  //   badge: {
  //     color: 'secondary',
  //     text: 'NEW',
  //   },
  //   addLinkClass: 'c-disabled',
  //   'disabled': true
  // },
  // {
  //   _tag: 'CSidebarNavDivider',
  //   className: 'm-2'
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Labels']
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Label danger',
  //   to: '',
  //   icon: {
  //     name: 'cil-star',
  //     className: 'text-danger'
  //   },
  //   label: true
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Label info',
  //   to: '',
  //   icon: {
  //     name: 'cil-star',
  //     className: 'text-info'
  //   },
  //   label: true
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Label warning',
  //   to: '',
  //   icon: {
  //     name: 'cil-star',
  //     className: 'text-warning'
  //   },
  //   label: true
  // },
  // {
  //   _tag: 'CSidebarNavDivider',
  //   className: 'm-2'
  // }
]

export default _nav
