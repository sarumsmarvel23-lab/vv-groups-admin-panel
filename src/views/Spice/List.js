import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CCard, CCardBody, CCardHeader, CButton, CFormInput, CRow, CCol } from "@coreui/react";
import ServerSideTable from "../../components/Table/ServerSide";
import { getSpices, deleteSpice } from "../../api/spice";
import { toast } from "../../redux/toast/toast.action";


const SpiceList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [filters, setFilters] = React.useState([]);




  //function
  const fetchSpices = async ({
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

      const { success, result } = await getSpices(reqData);
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
    if (window.confirm("Are you sure you want to delete this spice?")) {
      const res = await deleteSpice(id);
      if (res.success) {
        toast({ type: "success", message: "Spice deleted successfully!" }, dispatch);
        fetchSpices();
      } else {
        toast({ type: "error", message: res.message || "Error deleting spice" }, dispatch);
      }
    }
  };

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Origin", accessor: "origin" },
    { Header: "Grade", accessor: "grade" },
    { Header: "Price/Kg (₹)", accessor: "pricePerKg" },
    { Header: "Min. Order", accessor: "minOrder" },
    {
      Header: "Actions",
      accessor: "_id",
      disableFilters: true,
      Cell: ({ value }) => (
        <div className="d-flex gap-2">
          <Link to={`/update-spice/${value}`} className="btn btn-sm btn-info text-white">Edit</Link>
          <CButton size="sm" color="danger" className="text-white" onClick={() => handleDelete(value)}>Delete</CButton>
        </div>
      ),
    },
  ];

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>Spice List</strong>
        <Link to="/add-spice" className="btn btn-primary btn-sm">Add Spice</Link>
      </CCardHeader>
      <CCardBody>

        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchSpices}
          loading={loading}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
        />
      </CCardBody>
    </CCard>
  );
};

export default SpiceList;
