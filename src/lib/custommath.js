import { convert } from "./convert"
import { PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";

export function isAddress(address) {
  try {
    new PublicKey(address); // Will throw if invalid
    return true;
  } catch (e) {
    return false;
  }
}

export function shortText(address) {
  try {
    var addr = address.substring(0, 4);
    var addr1 = address.substring(38, 44);
    var concat = addr + "...." + addr1;
    return concat;
  } catch (err) {
    return "";
  }
}


// export function numberFloatOnly(value) {
//   //eslint-disable-next-line
//   const regxFormat = /^-?\d*(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
//   var result = regxFormat.test(value)
//   return result;
// }

// export function numberFloatOnly(value) {
//   //eslint-disable-next-line
//   const regxFormat = /^[]?\d*(?:[.]\d*)?$/;
//   var result = regxFormat.test(value)
//   return result;
// }

export function numberFloatOnly(value) {
  if (value === "") return true; // allow empty
  const regxFormat = /^-?(\d+(\.\d*)?|\.\d*)$/;
  return regxFormat.test(value);
}


export function numberOnly(value) {
  try {
    const regxFormat = /^[0-9]*$/;
    var result = regxFormat.test(value)
    return result;
  } catch (err) {
    console.log(err, "numberOnly")
    return false;
  }

}

// export function formatNumber1(num, decimalPlaces) {
//   if (!isFinite(num) || isNaN(num)) return "0";
//   return Number(num).toFixed(decimalPlaces).replace(/\.?0+$/, ""); // trims trailing 0s
// }
export function formatNumber1(num, decimalPlaces) {
  return new BigNumber(num)
    .toFixed(decimalPlaces)   // keep required decimals
    .replace(/\.?0+$/, "");   // trim trailing zeros
}

export function formatNumberTyping(num) {
  if (num.endsWith(".")) return num;
  return new BigNumber(num)
    .toFixed(20)
    .replace(/\.?0+$/, "");
}


export function toFixedWithoutRound(number, decimalPlaces = 2) {
  try {
    let numberString = number.toString();
    let decimalIndex = numberString.indexOf('.');
    if (decimalIndex === -1) {
      return number;
    }
    numberString = numberString.slice(0, decimalIndex + decimalPlaces + 1);
    let truncatedNumber = parseFloat(numberString);
    return truncatedNumber;
  } catch (err) {
    return 0;
  }

}

export function formatNumber(num, defaultFixed) {

  try {
    if (defaultFixed && parseInt(defaultFixed) > 0) {
      defaultFixed = parseInt(defaultFixed);
    } else {
      defaultFixed = 5;
    }
    var numval = num.toString();
    numval = convert(numval);

    var chkDeci = numval.split(".");
    var returnNum = num;
    if (chkDeci.length == 2) {
      if (defaultFixed < chkDeci[1].length) {
        returnNum = toFixedWithoutRound(numval, defaultFixed);
      } else {
        var fix = chkDeci[1].length;
        returnNum = toFixedWithoutRound(numval, fix);
      }
    }

    return returnNum;
  } catch (err) {
    return 0;
  }

}

export function isFirstLetterCaps(str) {
  try {
    var first = str.charAt(0).toUpperCase();
    var letter = str.slice(1)
    var fullname = first + letter
    return fullname
  } catch (err) {
    return "";
  }
}

export function shortValue(address) {
  try {
    var addr = address.substring(0, 6);
    var addr1 = address.substring(34, 42);
    var concat = addr + "...." + addr1;
    return concat;
  } catch (err) {
    return "";
  }
}