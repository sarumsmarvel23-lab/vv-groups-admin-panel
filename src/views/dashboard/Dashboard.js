import React, { useState, useEffect } from "react";
import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";
import { getVVDashboardStats } from "../../api/dashboard";
import CountUp from "react-countup";

const Dashboard = () => {
  const [stats, setStats] = useState({
    estatesCount: 0,
    spicesCount: 0,
    staysCount: 0,
    enquiriesCount: 0,
    recentEnquiries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getVVDashboardStats();
      if (res.success && res.result) {
        setStats(res.result);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <>
      <section className="mb-4">
        <h2 className="mb-4 fw-semibold" style={{ color: '#C9A84C' }}>Overview</h2>
        <CRow>
          <CCol sm={6} lg={3}>
            <CCard className="mb-4 dashbox text-center shadow-sm" style={{ borderRadius: '15px' }}>
              <CCardBody>
                <div className="fs-1 fw-bold" style={{ color: '#C9A84C' }}>
                  {loading ? '...' : <CountUp end={stats.estatesCount} />}
                </div>
                <div className="text-uppercase fw-semibold mt-2" style={{ color: '#EDE8DF' }}>Total Estates</div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6} lg={3}>
            <CCard className="mb-4 dashbox text-center shadow-sm" style={{ borderRadius: '15px' }}>
              <CCardBody>
                <div className="fs-1 fw-bold" style={{ color: '#C9A84C' }}>
                  {loading ? '...' : <CountUp end={stats.spicesCount} />}
                </div>
                <div className="text-uppercase fw-semibold mt-2" style={{ color: '#EDE8DF' }}>Total Spices</div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6} lg={3}>
            <CCard className="mb-4 dashbox text-center shadow-sm" style={{ borderRadius: '15px' }}>
              <CCardBody>
                <div className="fs-1 fw-bold" style={{ color: '#C9A84C' }}>
                  {loading ? '...' : <CountUp end={stats.staysCount} />}
                </div>
                <div className="text-uppercase fw-semibold mt-2" style={{ color: '#EDE8DF' }}>Total Stays</div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6} lg={3}>
            <CCard className="mb-4 dashbox text-center shadow-sm" style={{ borderRadius: '15px' }}>
              <CCardBody>
                <div className="fs-1 fw-bold" style={{ color: '#C9A84C' }}>
                  {loading ? '...' : <CountUp end={stats.enquiriesCount} />}
                </div>
                <div className="text-uppercase fw-semibold mt-2" style={{ color: '#EDE8DF' }}>Total Enquiries</div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </section>

      <section>
        <CCard className="mb-4 shadow-sm" style={{ borderRadius: '15px', border: 'none' }}>
          <CCardHeader className="border-bottom-0 pt-4 pb-0" style={{ background: 'transparent' }}>
            <h4 className="fw-semibold" style={{ color: '#EDE8DF' }}>Recent Enquiries</h4>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="6" className="text-center">Loading...</td></tr>
                  ) : stats.recentEnquiries.length > 0 ? (
                    stats.recentEnquiries.map((enquiry) => (
                      <tr key={enquiry._id}>
                        <td className="fw-semibold">{enquiry.name}</td>
                        <td>{enquiry.email}</td>
                        <td>{enquiry.phone || 'N/A'}</td>
                        <td>{enquiry.subject || 'General Enquiry'}</td>
                        <td>
                          <span className={`badge bg-${enquiry.status === 'New' ? 'danger' : enquiry.status === 'Contacted' ? 'warning' : 'success'}`}>
                            {enquiry.status || 'New'}
                          </span>
                        </td>
                        <td>{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="6" className="text-center py-4 text-muted">No recent enquiries found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CCardBody>
        </CCard>
      </section>
    </>
  );
};

export default Dashboard;
