import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { CFormSelect } from "@coreui/react";
import { useAsyncDebounce } from "react-table";

import DatePicker from "react-datepicker";
import { SET_DATE_FILLTER } from "../../../redux/dateFillter/type";
import "react-datepicker/dist/react-datepicker.css";

//import
import { capitalize } from "../../../lib/string";

export const GlobalFilter = props => {
  const { globalFilter, state, fetchData } = props;
  // const count = preGlobalFilteredRows.length
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(globalFilter);
  const [endDate, setEndDate] = useState("");

  const startDateChange = useAsyncDebounce(value => {
    // console.log('valuevalue', value)
    setStartDate(value);
    // setGlobalFilter(value || undefined)
  }, 200);
  const endDateChange = useAsyncDebounce(value => {
    setEndDate(value);
    // setGlobalFilter(value)
  }, 200);

  const handleSearch = () => {
    let searchArray = [];
    searchArray.push({
      id: "sefd_",
      value: {
        startDate,
        endDate,
      },
    });
    let pageIndex = state.pageIndex + 1;
    let pageSize = state.pageSize;
    let filters = searchArray;
    let sortBy = state.sortBy;

    dispatch({
      type: SET_DATE_FILLTER,
      dateFilter: {
        filters: filters,
        isDate: true,
      },
    });
    fetchData({ pageIndex, pageSize, filters, sortBy });
  };
  return (
    <span>
      Search:{" "}
      {/* <input
        value={startDate || ''}
        onChange={(e) => {
          setStartDate(e.target.value)
          onChange(e.target.value)
        }}
        // placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      /> */}
      <DatePicker
        selected={
          new Date().getTimezoneOffset() < 0
            ? new Date(startDate).getTime() -
              Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
            : new Date().getTimezoneOffset() > 0
              ? new Date(startDate).getTime() +
                Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
              : new Date(startDate).getTime()
        }
        onChange={date => {
          date =
            new Date().getTimezoneOffset() < 0
              ? date.getTime() +
                Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
              : new Date().getTimezoneOffset() > 0
                ? date.getTime() -
                  Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                : date.getTime();
          date = new Date(date);
          startDateChange(date);
        }}
        dateFormat="yyyy/MM/dd"
      />
      <DatePicker
        selected={
          new Date().getTimezoneOffset() < 0
            ? new Date(endDate).getTime() -
              Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
            : new Date().getTimezoneOffset() > 0
              ? new Date(endDate).getTime() +
                Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
              : new Date(endDate).getTime()
        }
        onChange={date => {
          date =
            new Date().getTimezoneOffset() < 0
              ? date.getTime() +
                Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
              : new Date().getTimezoneOffset() > 0
                ? date.getTime() -
                  Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                : date.getTime();
          date = new Date(date);
          endDateChange(date);
        }}
        dateFormat="yyyy/MM/dd"
      />
      <div>
        <button onClick={handleSearch}>Search</button>
      </div>
    </span>
  );
};
export const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;
  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

export const DateColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <>
      <DatePicker
        selected={
          new Date().getTimezoneOffset() < 0
            ? new Date(filterValue).getTime() -
              Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
            : new Date().getTimezoneOffset() > 0
              ? new Date(filterValue).getTime() +
                Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
              : new Date(filterValue).getTime()
        }
        onChange={date => {
          let isValid = !isNaN(Date.parse(date));
          if (isValid) {
            date =
              new Date().getTimezoneOffset() < 0
                ? date.getTime() +
                  Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                : new Date().getTimezoneOffset() > 0
                  ? date.getTime() -
                    Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                  : date.getTime();
            date = new Date(date);
            setFilter(date);
          } else {
            setFilter(undefined);
          }
        }}
        // onChange={(date) => setFilter(date)}
        dateFormat="yyyy/MM/dd"
        placeholderText="Search date"
        maxDate={new Date()}
        isClearable={filterValue ? true : false}
      />
      {/* 
      <CDatePicker
        size="sm"
        value={filterValue}
        onDateChange={(date: Date) => {
          setFilter(date || undefined) // Set undefined to remove the filter entirely
        }}
      /> */}
    </>
  );
};
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const options = new Set();
    if (id == "google2Fa.secret") {
      let twoFaStatusArray = ["All", "Enabled", "Disabled"];
      twoFaStatusArray.forEach(row => {
        options.add(row);
      });
    } else if (id == "paymentType") {
      let arrayData = ["All", "Coin", "Fiat"];
      arrayData.forEach(row => {
        options.add(row);
      });
    } else {
      preFilteredRows.forEach(row => {
        options.add(capitalize(row.values[id]));
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box
  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </CFormSelect>
  );
}

export function StatusColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  console.log("--->column")
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    if (id == "status") {
      let StatusArray = ["active", "deactive"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }
    else if (id == "coinStatus") {
      let StatusArray = ["active", "inactive"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }else if (id == "kycStatus") {
      let StatusArray = ["pending", "approved", "rejected"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    } else if (id == "level") {
      let StatusArray = ["Basic", "Advanced"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }else if(id=="type"){
      let StatusArray = ["client", "partner"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }else if(id=="emailStatus"){
      let StatusArray = ["verified", "unverified"];
      StatusArray.forEach(row => {
        options.add(row);
      });
      
    }else if(id=="google"){
      let StatusArray = ["enabled", "Disabled"];
      StatusArray.forEach(row => {
        options.add(row);
      });
      
    }
    else if(id=="PhoneverifyStatus"){
      let StatusArray = ["verified", "unverified"];
      StatusArray.forEach(row => {
        options.add(row);
      });
      
    }
    else if(id=="depositStatus"){
      let StatusArray = ["pending", "completed", "rejected"];
      StatusArray.forEach(row => {
        options.add(row);
      });
      
    }
    else if(id=="withdrawStatus"){
      let StatusArray = ["pending", "completed", "rejected"];
      StatusArray.forEach(row => {
        options.add(row);
      });
      
    }
    else if(id=="buysellstatus"){
      let StatusArray = ["pending", "completed", "rejected"];
      StatusArray.forEach(row => {
        options.add(row);
      });
      
    }
    else if(id=="buyselltype"){
      let StatusArray = ["buy","sell"];
      StatusArray.forEach(row => {
        options.add(row);
      });
      
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box

  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="all">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option)}
        </option>
      ))}
    </CFormSelect>
  );
}

export function StatusColumnFilterTWO({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  console.log("--->column")
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    if (id == "status") {
      let StatusArray = ["pending", "completed", "rejected"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    } 

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box

  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="all">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option)}
        </option>
      ))}
    </CFormSelect>
  );
}
export function SupportStatusColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    if (id == "status") {
      let StatusArray = ["Open", "Closed"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box

  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="all">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option)}
        </option>
      ))}
    </CFormSelect>
  );
}
//login By filter
export function LoginByFillter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const options = new Set();
    if (id == "loginType") {
      let StatusArray = ["all", "google", "email","wallet"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box
  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      {/* <option value="">All</option> */}
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option)}
        </option>
      ))}
    </CFormSelect>
  );
}

//Order side filter
export function OrderSideFillter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const options = new Set();
    if (id == "side" || id == "userSide") {
      let StatusArray = ["all", "yes", "no"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }else if(id==="type"){
      let StatusArray = ["all", "limit", "market"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }
    else if(id==="action"){
      let StatusArray = ["all", "buy", "sell"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box
  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      {/* <option value="">All</option> */}
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option)}
        </option>
      ))}
    </CFormSelect>
  );
}

//closed position filter
export function ClosedPositionFillter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const options = new Set();
    if (id == "exitType" ) {
      let StatusArray = ["all", "trade"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box
  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      {/* <option value="">All</option> */}
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option)}
        </option>
      ))}
    </CFormSelect>
  );
}

export function UserSatusFillter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const options = new Set();
    if (id == "status" || id == "emailStatus" || id == "phoneStatus") {
      let StatusArray = ["all", "verified", "unverified"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box
  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        console.log(e.target.value,"e.target.value");
        setFilter(e.target.value || undefined);
      }}
    >
      {/* <option value="">All</option> */}
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option)}
        </option>
      ))}
    </CFormSelect>
  );
}

export function passbookFillter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const options = new Set();
    if (id == "category" ) {
      let StatusArray = ["all","credit", "debit"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box
  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      {/* <option value="">All</option> */}
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option)}
        </option>
      ))}
    </CFormSelect>
  );
}

export function PairStatusFillter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const options = new Set();
    console.log("...id", id);
    if (id == "botstatus") {
      let StatusArray = ["all", "off", "wazirx", "binance"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box
  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      {console.log("...options", options)}
      {/* <option value="">All</option> */}
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option == "binance" ? capitalize(option) : capitalize(option)}
        </option>
      ))}
    </CFormSelect>
  );
}

PairStatusFillter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
    preFilteredRows: PropTypes.array,
    id: PropTypes.any,
  }),
};

export function TradeStatusColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    if (id == "status") {
      let StatusArray = ["all", "open", "pending", "completed", "cancel"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box

  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option == "cancel" ? "Cancelled" : option)}
        </option>
      ))}
    </CFormSelect>
  );
}
TradeStatusColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
    preFilteredRows: PropTypes.array,
    id: PropTypes.any,
  }),
};
export function p2pTradeStatusColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    if (id == "status") {
      let StatusArray = [
        "all",
        "open",
        "pending",
        "paid",
        "completed",
        "disputed",
        "closed",
        "cancelled",
        "dispute",
      ];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box

  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option == "cancel" ? "Cancelled" : option)}
        </option>
      ))}
    </CFormSelect>
  );
}

export function LevelFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    if (id == "level") {
      let StatusArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  // Render a multi-select box

  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option == "cancel" ? "Cancelled" : option)}
        </option>
      ))}
    </CFormSelect>
  );
}
LevelFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
    preFilteredRows: PropTypes.array,
    id: PropTypes.any,
  }),
};

export function p2pReportStatusColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    if (id == "status") {
      let StatusArray = ["all", "open", "completed", "closed"];
      StatusArray.forEach(row => {
        options.add(row);
      });
    }

    return [...options.values()];
  }, [id, preFilteredRows]);
  return (
    <CFormSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option)}
        </option>
      ))}
    </CFormSelect>
  );
}
p2pTradeStatusColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
    preFilteredRows: PropTypes.array,
    id: PropTypes.any,
  }),
};
DefaultColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
    preFilteredRows: PropTypes.object.isRequired,
  }),
};

DateColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

SelectColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
    preFilteredRows: PropTypes.array,
    id: PropTypes.any,
  }),
};

UserSatusFillter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
    preFilteredRows: PropTypes.array,
    id: PropTypes.any,
  }),
};
SupportStatusColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
    preFilteredRows: PropTypes.array,
    id: PropTypes.any,
  }),
};
StatusColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
    preFilteredRows: PropTypes.array,
    id: PropTypes.any,
  }),
};
GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
  globalFilter: PropTypes.any,
  setGlobalFilter: PropTypes.any,
  state: PropTypes.any,
  fetchData: PropTypes.any,
};


export function WithdrawStatusFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const opts = new Set();

    preFilteredRows.forEach(row => {
      const status = row.values[id];
      if (status) {
        opts.add(status);
      }
    });

    return ["all", ...Array.from(opts)];
  }, [id, preFilteredRows]);

  return (
    <CFormSelect
      value={filterValue || "all"}
      onChange={e => {
        const val = e.target.value;
        setFilter(val === "all" ? undefined : val);
      }}
    >
      {options.map((option, i) => (
        <option key={i} value={option}>
          {capitalize(option)}
        </option>
      ))}
    </CFormSelect>
  );
}

WithdrawStatusFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
    preFilteredRows: PropTypes.array,
    id: PropTypes.any,
  }),
};