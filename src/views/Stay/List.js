import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CCard, CCardBody, CCardHeader, CButton, CFormInput, CFormSelect, CRow, CCol } from "@coreui/react";
import ServerSideTable from "../../components/Table/ServerSide";
import { getStays, deleteStay } from "../../api/stay";
import { toast } from "../../redux/toast/toast.action";



const StayList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [filters, setFilters] = React.useState([]);




  //function
  const fetchStays = async ({
    pageIndex,
    pageSize,
    filters,
    sortBy,
  }) => {
    try {
      //  array of Object into object
      setLoading(true);
      const fillterObj = {};
      const sortObj = {};

      sortBy.length > 0 &&
        sortBy.forEach(({ id, desc }) =>
          Object.assign(sortObj, { [id]: desc === false ? 1 : -1 })
        );

      filters.forEach(({ id, value }) =>
        Object.assign(fillterObj, { ["fs_" + id]: value })
      );
      let reqData = {
        page: parseInt(pageIndex),
        limit: parseInt(pageSize),
        fillter: fillterObj,
        sortObj: sortObj,
      };

      const { success, result } = await getStays(reqData);
      if (success) {
        setData(result.data);
        setCount(result.count);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };



  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this stay?")) {
      const res = await deleteStay(id);
      if (res.success) {
        toast({ type: "success", message: "Stay deleted successfully!" }, dispatch);
        fetchStays({ pageIndex: 1,
            pageSize: 10,
            filters: [],
            sortBy: [],});
      } else {
        toast({ type: "error", message: res.message || "Error deleting stay" }, dispatch);
      }
    }
  };

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Type", accessor: "type" },
    { Header: "Location", accessor: "location" },
    { Header: "Price/Night (₹)", accessor: "pricePerNight" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      accessor: "_id",
      disableFilters: true,
      Cell: ({ value }) => (
        <div className="d-flex gap-2">
          <Link to={`/update-stay/${value}`} className="btn btn-sm btn-info text-white">Edit</Link>
          <CButton size="sm" color="danger" className="text-white" onClick={() => handleDelete(value)}>Delete</CButton>
        </div>
      ),
    },
  ];

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>Stay List</strong>
        <Link to="/add-stay" className="btn btn-primary btn-sm">Add Stay</Link>
      </CCardHeader>
      <CCardBody>


        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchStays}
          loading={loading}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
        />
      </CCardBody>
    </CCard>
  );
};

export default StayList;
