import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { candidateGetApi, candidateDeleteApi, getJobTitlesApi } from "../api/candidateApi";
import { type Pagination, type Candidate } from "../types/candidate";
import Loading from "../components/Loading";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditModal from "../components/EditModal";
import { toast } from 'react-hot-toast';

const AllCandidate = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [search, setSearch] = useState<string>("");
  const [jobPostedFrom, setJobPostedFrom] = useState<string>("");
  const [jobTitlesList, setJobTitlesList] = useState<string[]>([]);
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);
  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState<boolean>(false);

  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    search: "",
  });
  const [editCandidate, setEditCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.job-title-dropdown')) {
        setJobTitleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const titles = await getJobTitlesApi();
        setJobTitlesList(titles);
      } catch (error) {
        console.error("Error fetching job titles", error);
      }
    };
    fetchJobTitles();
  }, []);

  const totalPages =
    Number.isInteger(pagination.totalPages) && pagination.totalPages > 0
      ? pagination.totalPages
      : 1;

  useEffect(() => {
    const fetchCandidate = async (): Promise<void> => {
      try {
        const data = await candidateGetApi(page, limit, search, jobPostedFrom, undefined, selectedJobTitles);
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
  }, [page, search, limit, jobPostedFrom, selectedJobTitles]);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const data = await candidateDeleteApi(id);
      toast.success(data.message);
      setCandidates(candidates.filter((c) => c._id !== id));
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error taking action");
    }
  };

  const handleEditClick = (candidate: Candidate): void => {
    setEditCandidate(candidate);
  };

  const handleCandidateUpdate = (updateCandidate: Candidate): void => {
    setCandidates((prev) =>
      prev.map((c) => (c._id === updateCandidate._id ? updateCandidate : c))
    );
  };

  if (loading) return <Loading />;

  return (
    <>
    {editCandidate && (
      <EditModal
        candidate={editCandidate}
        onClose={() => setEditCandidate(null)}
        onUpdate={handleCandidateUpdate}
      />
    )}
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
              <div className="filter-group job-title-dropdown" style={{ position: "relative" }}>
                <span className="filter-label">Job Title</span>
                <div 
                  className="filter-input" 
                  style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  onClick={() => setJobTitleDropdownOpen(!jobTitleDropdownOpen)}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "120px" }}>
                    {selectedJobTitles.length > 0 ? selectedJobTitles.join(', ') : "Select"}
                  </span>
                  <span style={{ marginLeft: "8px", fontSize: "10px" }}>▼</span>
                </div>
                {jobTitleDropdownOpen && (
                  <div style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    marginTop: "4px",
                    maxHeight: "200px",
                    overflowY: "auto",
                    zIndex: 50,
                    display: "flex",
                    flexDirection: "column",
                    padding: "8px",
                    boxShadow: "var(--shadow-card)"
                  }}>
                    {jobTitlesList.map(title => (
                      <label key={title} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 4px", cursor: "pointer" }}>
                        <input 
                          type="checkbox" 
                          checked={selectedJobTitles.includes(title)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedJobTitles([...selectedJobTitles, title]);
                              setPage(1);
                            } else {
                              setSelectedJobTitles(selectedJobTitles.filter(t => t !== title));
                              setPage(1);
                            }
                          }}
                        />
                        <span style={{ color: "#ffffff", fontSize: "13px" }}>{title}</span>
                      </label>
                    ))}
                    {jobTitlesList.length === 0 && <span style={{ color: "var(--text-muted)", fontSize: "12px", padding: "4px" }}>No job titles available</span>}
                  </div>
                )}
              </div>
              <button
                className="btn-reset"
                onClick={() => { setSearch(""); setJobPostedFrom(""); setSelectedJobTitles([]); setPage(1); }}
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
                      <ReadOnlyRow
                        key={candidate._id}
                        candidate={candidate}
                        onDelete={handleDelete}
                        onEdit={handleEditClick}
                      />
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
    </>
  );
};

export default AllCandidate;
