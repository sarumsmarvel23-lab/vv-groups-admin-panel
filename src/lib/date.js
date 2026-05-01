// import lib
import { isEmpty } from "./validate";
import moment from "moment";

export const momentFormat = (dateTime, format = "YYYY-MM-DD HH:mm") => {
  try {
    if (!isEmpty(dateTime)) {
      let newDateTime = new Date(dateTime);
      return moment(newDateTime).format(format);
    }
    return "";
  } catch (err) {
    return "";
  }
};

export const timeStampFormat = (timestamp, format = "YYYY-MM-DD HH:mm:ss") => {
  try {
    let value = "";
    const milliseconds = timestamp * 1000;
    const dateObject = new Date(milliseconds);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    if (format.includes("YYYY")) {
      value += `${year}-`;
    }

    if (format.includes("MM")) {
      value += `${month.toString().padStart(2, "0")}-`;
    }

    if (format.includes("DD")) {
      value += `${day.toString().padStart(2, "0")} `;
    }

    if (format.includes("HH")) {
      value += `${hours.toString().padStart(2, "0")}:`;
    }

    if (format.includes("mm")) {
      value += `${minutes.toString().padStart(2, "0")}:`;
    }

    if (format.includes("ss")) {
      value += `${seconds.toString().padStart(2, "0")}`;
    }
    return value;
  } catch (err) {
    console.log("err: ", err);
    return "";
  }
};
