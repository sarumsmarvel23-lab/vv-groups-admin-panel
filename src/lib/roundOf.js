import isEmpty from "./isEmpty";

export const eToDecimal = (n) => {
	try {
		const sign = +n < 0 ? "-" : "",
			toStr = n.toString();
		if (!/e/i.test(toStr)) {
			return n.toString();
		}
		const [lead, decimal, pow] = n
			.toString()
			.replace(/^-/, "")
			.replace(/^([0-9]+)(e.*)/, "$1.$2")
			.split(/e|\./);
		return +pow < 0
			? sign + "0." + "0".repeat(Math.max(Math.abs(Number(pow)) - 1 || 0, 0)) + lead + decimal
			: sign +
					lead +
					(+pow >= decimal.length
						? decimal + "0".repeat(Math.max(+pow - decimal.length || 0, 0))
						: decimal.slice(0, +pow) + "." + decimal.slice(+pow));
	} catch {
		return "0";
	}
};

export const trunc = (x, n) => {
	try {
		if (!isEmpty(x.toString()) && !isNaN(x)) {
			const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g");

			const match = eToDecimal(x).toString().match(reg);
			if (!match) {
				return "0";
			}
			const a = match[0];
			const dot = a.indexOf(".");

			if (dot === -1) {
				return a + "." + "0".repeat(n);
			}

			const b = n - (a.length - dot) + 1;
			return b > 0 ? a + "0".repeat(b) : n == 0 ? a.replace(".", "") : a;
		}
		return "0";
	} catch {
		return "0";
	}
};

  export const toFixedDown = (item, type = 2) => {
    try {
      if (!isEmpty(item) && !isNaN(item)) {
        item = parseFloat(item);
        let decReg = new RegExp("(\\d+\\.\\d{" + type + "})(\\d)"),
          m = item.toString().match(decReg);
        return m ? parseFloat(m[1]) : item.valueOf();
      }
      return "";
    } catch (err) {
      return "";
    }
  };

  export const toFixed = (item, type = 2) => {
    try {
      if (!isEmpty(item) && !isNaN(item)) {
        item = parseFloat(item);
        return item.toFixed(type);
      }
      return "";
    } catch (err) {
      return "";
    }
  };
  