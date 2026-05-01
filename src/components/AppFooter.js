import React from "react";
import { CFooter } from "@coreui/react";
import { momentFormat } from "src/lib/date";

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        Copyright @ {momentFormat(Date.now(), "YYYY")} VV Groups  I
        All Rights Reserved
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
