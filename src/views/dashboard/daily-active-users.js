import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getDashboardChartData } from "src/api/Dashboard/rtaAPi";
import { CCard, CCardBody, CFormSelect, CSpinner } from "@coreui/react";
import "chartjs-adapter-date-fns";
import { format } from "date-fns";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DashboardUSDTChart = ({totalUSDT}) => {
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState("1W");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchChartData = async (selectedRange) => {
    setLoading(true);
    try {
      const res = await getDashboardChartData({ range: selectedRange });
      if (res?.success && res?.result) {
        setChartData(res.result.chart || []);
        setTotal(res.result.totalUSDT || 0);
      }
    } catch (err) {
      console.error("Failed to load dashboard chart data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData(range);
  }, [range]);

  const data = {
    labels: chartData.map((d) => new Date(d.updatedAt)),
    datasets: [
      {
        label: "USDT Volume",
        data: chartData.map((d) => d.convertPrice),
        fill: true,
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderColor: "#22c55e",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#22c55e",
        pointBorderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => {
            try {
              const timestamp = context[0]?.parsed?.x;
              const date = new Date(timestamp);
              return isNaN(date.getTime()) ? "Invalid Date" : format(date, "PPP p");
            } catch (e) {
              console.error("Tooltip formatting failed:", e);
              return "Invalid Date";
            }
          }
          ,
          label: (ctx) => `Volume: ${ctx.raw?.toFixed(2)} USDT`,
        },
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#22c55e",
        borderWidth: 1,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: range === "24H" ? "hour" : "day",
          displayFormats: {
            hour: "MMM d, ha",
            day: "MMM d",
          },
        },
        ticks: {
          maxRotation: 45,
          autoSkip: true,
          maxTicksLimit: 10,
        },
        title: {
          display: true,
          text: "Date",
          color: "#6b7280",
          font: { size: 14 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (USDT)",
          color: "#6b7280",
          font: { size: 14 },
        },
        ticks: {
          callback: (val) => `${val} USDT`,
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <CCard className="mb-4">
      <CCardBody>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold mb-0">USDT Volume Over Time</h5>
          <CFormSelect
            value={range}
            onChange={(e) => setRange(e.target.value)}
            style={{ maxWidth: "180px" }}
          >
            <option value="24H">Last 24 Hours</option>
            <option value="1W">Last 7 Days</option>
            <option value="1M">Last 30 Days</option>
          </CFormSelect>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <CSpinner color="success" />
          </div>
        ) : (
          <>
            <div style={{ height: "350px" }}>
              <Line data={data} options={options} />
            </div>
            <div className="mt-3 text-end fw-semibold">
              Total Volume: {totalUSDT && totalUSDT.toFixed(2)} USDT
            </div>
          </>
        )}
      </CCardBody>
    </CCard>
  );
};

export default DashboardUSDTChart;


