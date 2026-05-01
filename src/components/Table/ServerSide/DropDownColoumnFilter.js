import React, { useMemo } from "react";
import { CFormSelect } from "@coreui/react";
import { capitalize } from "src/lib/string";

const DropdownColumnFilter = ({ column: { filterValue, setFilter, id } }) => {
  const options = useMemo(() => {
    switch (id) {
      case "kycStatus":
        return ["", "new", "pending", "rejected", "approved"];
      case "emailStatus":
      case "status":
        return ["", "verified", "unverified"];
      case "google":
        return ["", "enabled", "disabled"];
      default:
        return [""];
    }
  }, [id]);

  return (
    <CFormSelect
      size="sm"
      value={filterValue || ""}
      onChange={e => setFilter(e.target.value || undefined)}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt ? capitalize(opt) : "All"}
        </option>
      ))}
    </CFormSelect>
  );
};

export default DropdownColumnFilter;