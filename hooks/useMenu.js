import {
  AccountBalance,
  CardGiftcard,
  Create,
  Dashboard,
  Dock,
  DockOutlined,
  DockTwoTone,
  DocumentScannerRounded,
  DocumentScannerSharp,
  Edit,
  List,
  PortableWifiOffOutlined,
} from "@mui/icons-material";

import { lazy } from "react";
import { useSelector } from "react-redux";
//
// import { ROLE_TYPES } from "constant.js";
import { retry } from "utils/retry";
import useAuth from "./useAuth";

// const Export = lazy(() => retry(() => import("pages/MDM/Export")));

import * as React from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import AppointmentForm from "pages/Dashboard/AppointmentForm";

import {
  BillingEntry,
  OPDRegistration,
  OPDRenewal,
  BarcodeToken,
  TokenList,
} from "pages/Dashboard/Receptionist/OPD";

import ConsultationMaster from "pages/Consultation";
import ShiftMaster from "pages/DutyRoster/ShiftMaster/ShiftMaster";
import AssignDuty from "pages/DutyRoster/AssignDuty/AssignDuty";

export default function BasicDatePicker() {
  const [d, setD] = React.useState(new Date());

  return (
    <DatePicker
      label="Basic example"
      value={d}
      inputFormat="dd-MM-yyyy"
      onChange={(newValue) => {
        setD(newValue);
        console.log(newValue);
      }}
      renderInput={(params) => <TextField size="small" {...params} />}
    />
  );
}

const MenuList = [
  {
    subheader: "general",
    items: [
      {
        title: "profile",
        path: "/dashboard/profile",
        icon: <PortableWifiOffOutlined />,
        element: <AppointmentForm />,
      },
    ],
  },
  {
    subheader: "Token generation",
    items: [
      {
        title: "Token",
        path: "/dashboard/TokenList",
        icon: <DocumentScannerSharp />,
        element: <TokenList />,
      },
    ],
  },
  {
    subheader: "OPD Consultation",
    items: [
      {
        title: "Consultation",
        path: "/dashboard/consultation",
        icon: <AccountBalance />,
        element: <ConsultationMaster />,
      },
    ],
  },
  {
    subheader: "OPD",
    items: [
      {
        title: "OPD Registration",
        path: "/dashboard/OPD-registration",
        icon: <DocumentScannerRounded />,
        element: <OPDRegistration />,
      },
      {
        title: "OPD Renewal",
        path: "/dashboard/OPD-renewal",
        icon: <Dock />,
        element: <OPDRenewal />,
      },
      {
        title: "Billing Entry",
        path: "/dashboard/OPD-billingEntry",
        icon: <DockTwoTone />,
        element: <BillingEntry />,
      },
      {
        title: "Barcode & Token",
        path: "/dashboard/OPD-barcodeToken",
        icon: <DocumentScannerSharp />,
        element: <BarcodeToken />,
      },
    ],
  },

  {
    subheader: "IPD",
    items: [
      {
        title: "OPD Registration",
        path: "/dashboard/IPD-reg",
        icon: <DocumentScannerRounded />,
        element: <p>IPD1</p>,
      },
      {
        title: "OPD Renewal",
        path: "/dashboard/IPD-Renewal",
        icon: <Dock />,
        element: <p>IPD2</p>,
      },
      {
        title: "Billing Entry",
        path: "/dashboard/IPD-billingentry",
        icon: <DockTwoTone />,
        element: <p>IPD3</p>,
      },
      {
        title: "Barcode & Token",
        path: "/dashboard/IPD-token",
        icon: <DocumentScannerSharp />,
        element: <p>IPD4</p>,
      },
    ],
  },

  {
    subheader: "management",
    items: [
      // // USER
      // {
      //   title: "user",
      //   path: "/dashboard/user",
      //   icon: <List />,
      //   children: [
      //     {
      //       title: "profile",
      //       path: "/dashboard/user/profile2",
      //       element: <p>profille</p>,
      //     },
      //     {
      //       title: "cards",
      //       path: "/dashboard/user/cards",
      //       element: <p>profille</p>,
      //     },
      //     {
      //       title: "list",
      //       path: "/dashboard/user/list",
      //       element: <p>profille</p>,
      //     },
      //     {
      //       title: "create",
      //       path: "/dashboard/user/create",
      //       element: <p>profille</p>,
      //     },
      //     {
      //       title: "edit",
      //       path: "/dashboard/user/edit",
      //       element: <p>profille</p>,
      //     },
      //     {
      //       title: "account",
      //       path: "/dashboard/user/account",
      //       element: <p>profille</p>,
      //     },
      //   ],
      // },
      {
        title: "Duty Roster",
        path: "/dashboard/DutyRoster",
        icon: <List />,
        children: [
          {
            title: "Shift Master",
            path: "/dashboard/dutyroster/ShiftMaster",
            element: <ShiftMaster />,
          },
          {
            title: "Assign Duty",
            path: "/dashboard/dutyroster/AssignDuty",
            element: <AssignDuty />,
          },
        ],
      },
    ],
  },
];

// const menuItemsHigherOfficials = [
//   //6
//   {
//     displayName:"Home",
//     title: "Home",
//     to: "ims$home",
//     Icon: <FontAwesomeIcon icon={faHouseUser} />,
//     element: <Home />,
//   },

//   {
//     displayName:"User Management",
//     title: "User Management",
//     to: "#",
//     Icon: <FontAwesomeIcon icon={faUsers} />,
//     submenu: [
//       {
//         displayName:"Higher Officials",
//         title: "Higher Officials",
//         to: "ims$higher-officials",
//         element: <HigherOfficials />,
//       },
//     ],
//   },

//   {
//     displayName:"Invitation System",
//     title: "Invitation System",
//     to: "#",
//     Icon: <FontAwesomeIcon icon={faAddressCard} />,
//     submenu: [
//       {
//         displayName:"My Invitations (Visitor & CPL pass)",
//         title: "My Invitations (Visitor & CPL pass)",
//         to: "ims$my-invitations",
//         element: <MyInvitation title="My Invitations (Visitor pass and CPL pass)" />,
//       },
//     ],
//   },
//   {
//     displayName:"Administration",
//     title: "Administration",
//     to: "#",
//     Icon: <FontAwesomeIcon icon={faFileExport} />,
//     submenu: [
//       {
//         displayName:"Reports",
//         title: "Reports",
//         to: "ims$report",
//         Icon: <FontAwesomeIcon icon={faReceipt} />,
//         element: <Reports title="Reports" />,
//       },
//     ],
//   },
// ];

export const useMenuItem = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return MenuList;
  }
  return [];
};
