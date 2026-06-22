import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CCard, CCardBody, CCardHeader, CButton, CFormInput, CFormSelect, CRow, CCol, CBadge } from "@coreui/react";
import ServerSideTable from "../../components/Table/ServerSide";
import { getContacts, deleteContact } from "../../api/contact";
import { toast } from "../../redux/toast/toast.action";



const ContactList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [filters, setFilters] = React.useState([]);





  //function
  const fetchContacts = async ({
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

      const { success, result } = await getContacts(reqData);
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
    if (window.confirm("Delete this contact message?")) {
      const res = await deleteContact(id);
      if (res.success) {
        toast({ type: "success", message: "Contact deleted successfully!" }, dispatch);
        fetchContacts({ pageIndex: 1,
            pageSize: 10,
            filters: [],
            sortBy: [],});
      } else {
        toast({ type: "error", message: res.message || "Error deleting contact" }, dispatch);
      }
    }
  };

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    {
      Header: "Message",
      accessor: "message",
      Cell: ({ value }) => (
        <span title={value} style={{ display: "block", maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value || "—"}
        </span>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <CBadge color={value === "New" ? "danger" : value === "Contacted" ? "warning" : "success"}>
          {value}
        </CBadge>
      ),
    },
    {
      Header: "Date",
      accessor: "createdAt",
      Cell: ({ value }) => new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    },
    {
      Header: "Actions",
      accessor: "_id",
      disableFilters: true,
      Cell: ({ value, row }) => (
        <div className="d-flex gap-2">
          <Link className="btn btn-sm btn-info text-white" to={`/update-contact/${value}`}>
            View
          </Link>
          <CButton
            size="sm"
            color="danger"
            className="text-white"
            onClick={() => handleDelete(value)}
          >
            Delete
          </CButton>
        </div>
      ),
    },
  ];

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>Contact Messages</strong>
      </CCardHeader>
      <CCardBody>


        <ServerSideTable
          columns={columns}
          data={data}
          fetchData={fetchContacts}
          loading={loading}
          pageCount={count}
          filters={filters}
          setFilters={setFilters}
        />
      </CCardBody>
    </CCard>
  );
};

export default ContactList;
