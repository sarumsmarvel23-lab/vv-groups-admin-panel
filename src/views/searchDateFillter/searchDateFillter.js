import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";

//import redux
import isEmpty from "src/lib/isEmpty";

const SerachDateFillter = props => {
  const { filterState, fetchData, setFilterState, dateObj } = props;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const startDateChange = value => {
    setStartDate(value);

    setFilterState(state => ({
      ...state,
      ["startDate"]: value,
    }));
  };
  const endDateChange = value => {
    setEndDate(value);
    setFilterState(state => ({
      ...state,
      ["endDate"]: value,
    }));
  };
  const handleDateFillter = async () => {
    try {
      let searchArray = [];
      if (startDate != "" || endDate != "") {
        if (startDate != "Invalid Date" || endDate != "Invalid Date") {
          searchArray.push({
            id: "sefd_createdAt", //"sefd_"
            value: {
              startDate,
              endDate,
            },
          });
        }
      }
      let filters = searchArray;
      let pageIndex = filterState?.pageIndex;
      let pageSize = filterState?.pageSize;
      let sortBy = filterState?.sortBy;

      //if there any data filter then add it
      if (filterState?.filters)
        filters = [...(filterState?.filters ?? []), ...searchArray];

      let filData = { pageIndex, pageSize, filters, sortBy };
      if (startDate != "" || endDate != "") {
        filData["type"] = "searchType";
      }

      fetchData(filData);
    } catch (err) {
      console.log("...errr", err);
    }
  };

  useEffect(() => {
    if (dateObj && Object.keys(dateObj).length > 0) {
      if (dateObj?.startDate) setStartDate(dateObj.startDate);
      if (dateObj?.endDate) setEndDate(dateObj.endDate);
    }
  }, [dateObj]);

  return (
    <>
      <div className="input-inline">
        <div className="from-input field-group">
          <label className="mr-2">From</label>{" "}
          <DatePicker
            selected={
              new Date().getTimezoneOffset() < 0
                ? new Date(startDate).getTime() -
                  Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                : new Date().getTimezoneOffset() > 0
                  ? new Date(startDate)?.getTime() +
                    Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                  : new Date(startDate)?.getTime()
            }
            onChange={date => {
              date =
                new Date()?.getTimezoneOffset() < 0
                  ? date?.getTime() +
                    Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                  : new Date().getTimezoneOffset() > 0
                    ? date?.getTime() -
                      Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                    : date?.getTime();
              date = new Date(date);
              startDateChange(date);
            }}
            onBlur={event => {
              if (!isEmpty(startDate)) {
                startDateChange("");
              }
            }}
            maxDate={endDate ? new Date(endDate) : new Date()}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="to-input field-group">
          <label className="mr-2">To</label>
          <DatePicker
            selected={
              new Date().getTimezoneOffset() < 0
                ? new Date(endDate)?.getTime() -
                  Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                : new Date().getTimezoneOffset() > 0
                  ? new Date(endDate)?.getTime() +
                    Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                  : new Date(endDate)?.getTime()
            }
            onChange={date => {
              date =
                new Date().getTimezoneOffset() < 0
                  ? date?.getTime() +
                    Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                  : new Date().getTimezoneOffset() > 0
                    ? date?.getTime() -
                      Math.abs(new Date().getTimezoneOffset()) * 60 * 1000
                    : date?.getTime();
              date = new Date(date);
              endDateChange(date);
            }}
            onBlur={event => {
              if (!isEmpty(endDate)) {
                endDateChange("");
              }
            }}
            minDate={startDate ? new Date(startDate) : null}
            maxDate={new Date()}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="search-button">
          <button className="btn btn-primary" onClick={handleDateFillter}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

SerachDateFillter.propTypes = {
  filterState: PropTypes.any,
  fetchData: PropTypes.any,
  setFilterState: PropTypes.any,
  dateObj: PropTypes.any,
};

export default SerachDateFillter;
