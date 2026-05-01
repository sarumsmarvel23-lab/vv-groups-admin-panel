// src/components/common/Loading.js

import React from "react";
import { Circles ,LineWave} from "react-loader-spinner";

const Loading = () => {
  return (
    <div style={styles.container}>
      <LineWave
        height="100"
        width="100"
        color="#6366f1"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "259px",
  },
  text: {
    marginTop: 8,
    fontSize: "14px",
    color: "#444",
  },
};

export default Loading;
