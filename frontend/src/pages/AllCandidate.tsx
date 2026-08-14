import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { candidateGetApi, candidateDeleteApi } from "../api/candidateApi";
import { type Pagination, type Candidate } from "../types/candidate";
import Loading from "../components/Loading";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";
import React from "react";

const AllCandidate = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [search, setSearch] = useState<string>("");
  const [jobPostedFrom, setJobPostedFrom] = useState<string>("");

  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    search: "",
  });
  const [editCandidateId, setEditCandidateId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const totalPages =
    Number.isInteger(pagination.totalPages) && pagination.totalPages > 0
      ? pagination.totalPages
      : 1;

  useEffect(() => {
    const fetchCandidate = async (): Promise<void> => {
      try {
        const data = await candidateGetApi(page, limit, search, jobPostedFrom);
        const candidates = data?.candidate || [];
        const pagination = data?.pagination || {};
        setCandidates(candidates);
        setPagination((prev) => ({
          ...prev,
          page: Number(pagination?.page) || 1,
          limit: Number(pagination?.limit) || limit,
          totalPages: Number(pagination?.totalPages) || 1,
          total: Number(pagination?.total) || 0,
          search,
        }));
      } catch (error) {
        console.error("Error fetching candidate", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [page, search, limit, jobPostedFrom]);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const data = await candidateDeleteApi(id);
      alert(data.message);
      setCandidates(candidates.filter((c) => c._id !== id));
    } catch (error: any) {
      alert(error.response?.data?.error);
    }
  };

  const handleEditClick = (candidate: Candidate): void => {
    setEditCandidateId(candidate._id);
  };

  const handleCandidateUpdate = (updateCandidate: Candidate): void => {
    setCandidates((prev) =>
      prev.map((c) => (c._id === updateCandidate._id ? updateCandidate : c))
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="app-page">
      <div className="app-page-inner">
        <div className="panel">
          {/* Header */}
          <div className="panel-header">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <h2 className="panel-title">All Candidates</h2>
              <Link to="/rejected-candidates">
                <button className="btn-nav-outline">Rejected Candidates</button>
              </Link>
            </div>
            <div className="filter-bar">
              <div className="filter-group">
                <span className="filter-label">Search</span>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Name, Email, Company, Job Title"
                  value={search}
                  onChange={(e) => { setPage(1); setSearch(e.target.value); }}
                />
              </div>
              <div className="filter-group">
                <span className="filter-label">Job Posted</span>
                <input
                  type="date"
                  className="filter-input"
                  value={jobPostedFrom}
                  onChange={(e) => { setPage(1); setJobPostedFrom(e.target.value); }}
                />
              </div>
              <button
                className="btn-reset"
                onClick={() => { setSearch(""); setJobPostedFrom(""); setPage(1); }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="data-table-wrap">
            <form onSubmit={(e) => e.preventDefault()}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Actions</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>LinkedIn Profile</th>
                    <th>Interview Status</th>
                    <th>Comment</th>
                    <th>Joining Date</th>
                    <th>Duration</th>
                    <th>Contact Duration</th>
                    <th>Offer Letter Sent</th>
                    <th>Offer Letter Accepted</th>
                    <th>Candidate Enrolled</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Job Board</th>
                    <th>Job Posted Date</th>
                    <th>Posted By</th>
                    <th>Applicant Applied Date</th>
                    <th>Interviewed By</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates?.length > 0 ? (
                    candidates.map((candidate) => (
                      <React.Fragment key={candidate._id}>
                        {editCandidateId === candidate._id ? (
                          <EditableRow
                            candidat={candidate}
                            setEditCandidateId={setEditCandidateId}
                            onUpdate={handleCandidateUpdate}
                          />
                        ) : (
                          <ReadOnlyRow
                            key={candidate._id}
                            candidate={candidate}
                            onDelete={handleDelete}
                            onEdit={handleEditClick}
                          />
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={20} style={{ textAlign: "center", padding: "48px", color: "#ffffff" }}>
                        No candidates found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </form>
          </div>

          {/* Pagination */}
          <div style={{ padding: "16px 24px" }}>
            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>«</button>
              <span className="page-info">Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCandidate;
