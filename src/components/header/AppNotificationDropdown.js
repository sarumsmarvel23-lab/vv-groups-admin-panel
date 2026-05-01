import React, { useEffect, useRef, useState } from "react";

import {
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownHeader,
} from "@coreui/react";
import { cilBell, cilEnvelopeLetter, cilEnvelopeClosed } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import { List } from "src/api/notification";

const AppNotificationDropdown = () => {
  const [data, setData] = useState([]);
  const dataCount = useRef(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchNotification = async () => {
    try {
      let reqData = {
        pageIndex: 1,
        limit: 6,
        fillter: {},
        sortObj: {},
      };
      let { success, result } = await List(reqData);
      setLoading(false);
      console.log("SUCCESS", success);
      console.log("RESULT", result.count);
      if (success) {
        setData(result?.data);
        // dataCount.current = result?.count
        setCount(result.count);
      }
    } catch (error) {
      console.error("fetchNotification _ error", error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="" caret={false}>
        <div className="position-relative mx-2">
          <CIcon icon={cilBell} size="lg" className="notify_icon" />
          <CBadge
            color="primary"
            position="top-end"
            shape="rounded-pill"
            className="notify_count"
          >
            {count}
          </CBadge>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="notify_dropdown" placement="bottom-end">
        <CDropdownHeader className="py-3">
          <CIcon icon={cilEnvelopeLetter} className="me-2" />
          New Notifications
        </CDropdownHeader>

        <ul className="list-group unread-list">
          {Array.isArray(data) && data.length > 0 ? (
            data.map(item => (
              <li className="list-group-item" key={item._id}>
                <div className="d-flex justify-content-start gap-3">
                  <CIcon size="lg" icon={cilEnvelopeClosed} />
                  <div>
                    <p className="notify_title">{item.title}</p>
                    <span className="description">{item.description}</span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item">
              <div className="d-flex justify-content-start gap-3">
                <CIcon size="lg" icon={cilEnvelopeClosed} />
                <span>No data</span>
              </div>
            </li>
          )}
        </ul>
        <CDropdownItem href="/notification" className="notify_btn">
          View All Notifications
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppNotificationDropdown;
