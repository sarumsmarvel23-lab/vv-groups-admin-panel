import { FaDiceFive, FaRegWindowRestore } from "react-icons/fa";

let key = {};
if (process.env.REACT_APP_MODE === "production") {
  const API_URL = "https://vv-groups-backend.onrender.com";
  key = {
    secretOrKey: "FxUum76z",
    API_URL: `${API_URL}`,
    ADMIN_URL: "https://vvgroups-adminpanel.pages.dev",
    SITENAME: "VV Groups",
    getGeoInfo: "https://ipapi.co/json/",
    imgUrl: "https://vv-groups-backend.onrender.com",
    TINY_MCE_EDITOR_API_KEY: "14hm2vusasftyayrynnjnm4qev1qif6lth879bwnt36xhci7",
    socialMedia: {
      facebook: {
        appId: "1034988646970193",
      },
      linkedIn: {
        clientId: "78szlpfkw7ee7s",
        redirectUrl: "https://99893158a13c.ngrok.io/signup",
        oauthUrl:
          "https://www.linkedin.com/oauth/v2/authorization?response_type=code",
        scope: "r_liteprofile%20r_emailaddress",
        state: "123456",
      },
    },
    txUrl: "https://solscan.io/tx/",
    networkType: "devnet",
    USER_SERVICE: {
      URL: "https://vv-groups-backend.onrender.com",
    },
    WALLET_SERVICE: {
      URL: "https://vv-groups-backend.onrender.com",
    },
  };
} else if (process.env.REACT_APP_MODE === "development") {

  const API_URL = "https://vv-groups-backend.onrender.com";
  key = {
    secretOrKey: "FxUum76z",
    API_URL: `${API_URL}`,
    ADMIN_URL: "https://vvgroups-adminpanel.pages.dev",
    SITENAME: "VV Groups",
    getGeoInfo: "https://ipapi.co/json/",
    imgUrl: "https://vv-groups-backend.onrender.com",
    TINY_MCE_EDITOR_API_KEY: "14hm2vusasftyayrynnjnm4qev1qif6lth879bwnt36xhci7",
    socialMedia: {
      facebook: {
        appId: "1034988646970193",
      },
      linkedIn: {
        clientId: "78szlpfkw7ee7s",
        redirectUrl: "https://99893158a13c.ngrok.io/signup",
        oauthUrl:
          "https://www.linkedin.com/oauth/v2/authorization?response_type=code",
        scope: "r_liteprofile%20r_emailaddress",
        state: "123456",
      },
    },
    txUrl: "https://solscan.io/tx/",
    networkType: "devnet",
    USER_SERVICE: {
      URL: "https://vv-groups-backend.onrender.com",
    },
    WALLET_SERVICE: {
      URL: "https://vv-groups-backend.onrender.com",
    },
  };
} else {
  console.log("Set Development Config");
  const API_URL = "http://localhost:2025";
  key = {
    secretOrKey: "FxUum76z",
    API_URL: `${API_URL}`,
    ADMIN_URL: "http://localhost:3000",
    SITENAME: "VV Groups",
    getGeoInfo: "https://ipapi.co/json/",
    imgUrl: "http://localhost:2025",
    TINY_MCE_EDITOR_API_KEY: "14hm2vusasftyayrynnjnm4qev1qif6lth879bwnt36xhci7",
    socialMedia: {
      facebook: {
        appId: "1034988646970193",
      },
      linkedIn: {
        clientId: "78szlpfkw7ee7s",
        redirectUrl: "https://99893158a13c.ngrok.io/signup",
        oauthUrl:
          "https://www.linkedin.com/oauth/v2/authorization?response_type=code",
        scope: "r_liteprofile%20r_emailaddress",
        state: "123456",
      },
    },
    txUrl: "https://solscan.io/tx/",
    networkType: "devnet",
    USER_SERVICE: {
      URL: "http://localhost:2025",
    },
    WALLET_SERVICE: {
      URL: "http://localhost:2025",
    },
  };
}

export default key;




