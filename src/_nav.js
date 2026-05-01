import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilList,
  cilSettings,
  cilUserPlus,
  cilWallet,
  cilSpeech
} from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";
let demoRoutes = [];
const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Business Entities",
    to: "/business-entities",
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
    items: [


      {
        component: CNavItem,
        name: "Enquiries",
        to: "/enquiries",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Contacts",
        to: "/contacts",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Estates",
    to: "/estates",
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Estates",
        to: "/estates",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },

    ],
  },
  {
    component: CNavGroup,
    name: "Stays",
    to: "/stays",
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Stays",
        to: "/stays",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Spices",
    to: "/spices",
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
    items: [

      {
        component: CNavItem,
        name: "Spices",
        to: "/spices",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },

    ],
  },
  // {
  //   component: CNavGroup,
  //   name: "Templates",
  //   to: "/templates",
  //   icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Email Templates",
  //       to: "/email-template-list",
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     }
  //   ],
  // },
  {
    component: CNavItem,
    name: "Site Setting",
    to: "/site-setting",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },

];

export default [..._nav, ...demoRoutes];
