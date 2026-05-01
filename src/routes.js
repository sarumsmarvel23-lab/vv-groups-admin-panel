import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const LoginHistory = React.lazy(() => import("./views/Login/loginHistory"));
const SubAdminloginHistory = React.lazy(
  () => import("./views/Login/SubAdminloginHistory")
);
const ProfileDetails = React.lazy(() => import("./views/profile/profile"));
const ChangePassword = React.lazy(
  () => import("./views/changePassword/changePassword")
);
//2FA
const Google2FA = React.lazy(
  () => import("./views/2FA-settings/Two-Factor-Auth")
);

//sitesetting
const SiteSetting = React.lazy(() => import("./views/SiteSetting/Sitesetting"));

// Template
const Emailtemplate = React.lazy(() => import("./views/EmailTemplate/List"));
const EmailTempUpdate = React.lazy(() => import("./views/EmailTemplate/Update"));

// NEW MODULES
const EstateList = React.lazy(() => import("./views/Estate/List"));
const EstateAdd = React.lazy(() => import("./views/Estate/Add"));
const EstateUpdate = React.lazy(() => import("./views/Estate/Update"));

const SpiceList = React.lazy(() => import("./views/Spice/List"));
const SpiceAdd = React.lazy(() => import("./views/Spice/Add"));
const SpiceUpdate = React.lazy(() => import("./views/Spice/Update"));

const StayList = React.lazy(() => import("./views/Stay/List"));
const StayAdd = React.lazy(() => import("./views/Stay/Add"));
const StayUpdate = React.lazy(() => import("./views/Stay/Update"));

const EnquiryList = React.lazy(() => import("./views/Enquiry/List"));
const EnquiryUpdate = React.lazy(() => import("./views/Enquiry/Update"));
const ContactList = React.lazy(() => import("./views/Contact/List"));
const ContactUpdate = React.lazy(() => import("./views/Contact/Update"));

const routes = [
  { path: "/", exact: true, name: "Home", restrictionName: "Home" },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: Dashboard,
    restrictionName: "Dashboard",
  },
  //Admin Profile
  {
    path: "/profile",
    name: "Profile Details",
    element: ProfileDetails,
    type: "private",
    restrictionName: "Profile",
  },
  {
    path: "/changePassword",
    name: "Change Password",
    element: ChangePassword,
    type: "private",
    restrictionName: "Change Password",
  },

  {
    path: "/loginHistory",
    name: "Login History",
    element: LoginHistory,
    type: "private",
    restrictionName: "Login History",
  },
  {
    path: "/2fa-settings",
    name: "2FA Settings",
    element: Google2FA,
    type: "private",
    restrictionName: "2FA Settings",
  },

  {
    path: "/site-setting",
    name: "Site Setting",
    element: SiteSetting,
    type: "private",
    restrictionName: "Site Setting",
  },
  
  // NEW MODULE ROUTES
  { path: "/estates", name: "Estates", element: EstateList, type: "private" },
  { path: "/add-estate", name: "Add Estate", element: EstateAdd, type: "private" },
  { path: "/update-estate/:id", name: "Update Estate", element: EstateUpdate, type: "private" },
  { path: "/spices", name: "Spices", element: SpiceList, type: "private" },
  { path: "/add-spice", name: "Add Spice", element: SpiceAdd, type: "private" },
  { path: "/update-spice/:id", name: "Update Spice", element: SpiceUpdate, type: "private" },
  { path: "/stays", name: "Stays", element: StayList, type: "private" },
  { path: "/add-stay", name: "Add Stay", element: StayAdd, type: "private" },
  { path: "/update-stay/:id", name: "Update Stay", element: StayUpdate, type: "private" },
  { path: "/enquiries", name: "Enquiries", element: EnquiryList, type: "private" },
  { path: "/update-enquiry/:id", name: "Update Enquiry", element: EnquiryUpdate, type: "private" },
  { path: "/contacts", name: "Contacts", element: ContactList, type: "private" },
  { path: "/update-contact/:id", name: "Update Contact", element: ContactUpdate, type: "private" },

];

export default routes;
