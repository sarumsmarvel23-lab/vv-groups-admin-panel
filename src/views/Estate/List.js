import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CCard, CCardBody, CCardHeader, CButton, CFormInput, CFormSelect, CRow, CCol } from "@coreui/react";
import ServerSideTable from "../../components/Table/ServerSide";
import { getEstates, deleteEstate } from "../../api/estate";
import { toast } from "../../redux/toast/toast.action";



const EstateList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [filters, setFilters] = React.useState([]);




  //function
  const fetchEstates = async ({
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

      const { success, result } = await getEstates(reqData);
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
    if (window.confirm("Are you sure you want to delete this estate?")) {
      const res = await deleteEstate(id);
      if (res.success) {
        toast({ type: "success", message: "Estate deleted successfully!" }, dispatch);
        fetchEstates({  pageIndex: 1,
            pageSize: 10,
            filters: [],
            sortBy: [],});
      } else {
        toast({ type: "error", message: res.message || "Error deleting estate" }, dispatch);
      }
    }
  };

  const columns = [
    { Header: "Title", accessor: "title" },
    { Header: "Type", accessor: "type" },
    { Header: "Price", accessor: "price" },
    { Header: "Location", accessor: "location" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      accessor: "_id",
      disableFilters: true,
      Cell: ({ value }) => (
        <div className="d-flex gap-2">
          <Link to={`/update-estate/${value}`} className="btn btn-sm btn-info text-white">Edit</Link>
          <CButton size="sm" color="danger" className="text-white" onClick={() => handleDelete(value)}>Delete</CButton>
        </div>
      ),
    },
  ];

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>Estate List</strong>
        <Link to="/add-estate" className="btn btn-primary btn-sm">Add Estate</Link>
      </CCardHeader>
      <CCardBody>


        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchEstates}
          loading={loading}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
        />
      </CCardBody>
    </CCard>
  );
};

export default EstateList;
