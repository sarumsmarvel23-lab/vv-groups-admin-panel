// import package
import React, {
  useEffect,
  useRef,
  useMemo,
  memo,
  useLayoutEffect,
} from "react";
import { CTable } from "@coreui/react";
import {
  useTable,
  usePagination,
  useFilters,
  useAsyncDebounce,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import PropTypes from "prop-types";
import { DefaultColumnFilter } from "./filters";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { WaveLoading } from "react-loadingg";

const ServerSideTable = props => {
  const {
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    filterState,
  } = props;
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    visibleColumns,
    state: { pageIndex, pageSize, filters, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      defaultColumn,
      pageCount: controlledPageCount,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  // add previous filter have date filters then add date
  const handleFilters = (filters, filterState) => {
    let arr = [];
    arr = filters;
    if (filterState?.filters?.length > 0) {
      let dateFilter = filterState?.filters.find(
        oldFlter => oldFlter.id === "sefd_"
      );
      if (dateFilter) arr.push(dateFilter);
    }
    return arr;
  };
  useEffect(() => {
    if (pageIndex == 0 && filters?.length != 0) {
      debounceFilter(filters);
    } else {
      fetchData({
        pageIndex: pageIndex + 1,
        pageSize,
        filters: handleFilters(filters, filterState),
        sortBy,
        type: filterState?.type ?? "",
      });
    }
  }, [pageIndex, pageSize, sortBy]);

  const debounceFilter = useAsyncDebounce(filters => {
    try {
      if (filters && filters.length >= 0) {
        fetchData({
          pageIndex: pageIndex + 1,
          pageSize,
          filters: handleFilters(filters, filterState),
          sortBy,
          type: filterState?.type ?? "",
        });
      }
    } catch (err) {
      console.log("file: index.js:96  debounceFilter  err", err);
    }
  }, 2000);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (filters.length > 0) {
      debounceFilter(filters);
    } else {
      // cancel debounceFilter api call for table filter clear
      debounceFilter({});
      fetchData({
        pageIndex: pageIndex + 1,
        pageSize,
        filters: handleFilters(filters, filterState),
        sortBy,
        type: filterState?.type ?? "",
      });
    }
  }, [debounceFilter, filters]);


  return (
    <>
      {loading && <WaveLoading style={{ "margin-left": "40%" }} />}
      <div className="table-responsive">
        {!loading && (
          <table className="table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, key) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={key}>
                  {headerGroup.headers.map((column, index) => (
                    <th {...column.getHeaderProps()} key={index}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <thead>
              {headerGroups.map((headerGroup, key) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={key}>
                  {headerGroup.headers.map((column, index) => (
                    <th key={index}>
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
              <tr>
                <th
                  colSpan={visibleColumns.length}
                  style={{
                    textAlign: "left",
                  }}
                ></th>
              </tr>
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell, key) => {
                      return (
                        <td {...cell.getCellProps()} key={key}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {!loading && page.length === 0 && (
        <CTable className="d-flex justify-content-center">No Data Found</CTable>
      )}
      {!loading && page.length > 0 && controlledPageCount >10 && (
        <Pagination
          current={pageIndex + 1}
          onChange={(current, pageSize) => {
            gotoPage(current - 1);
          }}
          pageSize={pageSize}
          total={controlledPageCount}
          showLessItems
          showTitle={false}
        />
      )}
    </>
  );
};

ServerSideTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
  setFilterState: PropTypes.func,
  filterState: PropTypes.object,
};

export default memo(ServerSideTable);
