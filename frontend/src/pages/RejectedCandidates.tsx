import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { candidateDeleteApi, candidateGetRejectedApi } from "../api/candidateApi";
import { type Pagination, type Candidate } from "../types/candidate";
import Loading from "../components/Loading";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";
import React from "react";

const RejectedCandidates = () => {
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
        const data = await candidateGetRejectedApi(page, limit, search, jobPostedFrom);

        const candidates = data?.candidate || [];
        const pagination = data?.pagination || {};

        setCandidates(candidates)
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

      const newCandidates = candidates.filter(
        (candidate) => candidate._id != id,
      );
      setCandidates(newCandidates);
    } catch (error: any) {
      alert(error.response?.data?.error);
    }
  };

  const handleEditClick = (candidate: Candidate): void => {
    setEditCandidateId(candidate._id);
  };

  const handleCandidateUpdate = (updateCandidate: Candidate): void => {
    setCandidates((prev) =>
      prev.map((candidat) =>
        candidat._id === updateCandidate._id ? updateCandidate : candidat,
      ),
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center px-4 ">
      <div className="p-4 overflow-x-auto w-full  bg-white shadow-lg rounded-lg  flex flex-col my-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <div className="flex gap-5 items-center">
            <Link to="/all-candidate">
              <button className="bg-blue-500 text-white p-3 rounded-xl  font-semibold hover:bg-blue-400">
                All Candidates
              </button>
            </Link>
            <h2 className="text-xl font-semibold text-gray-800">
              Rejected Candidates

            </h2>

          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            {/* Search */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Search</label>
              <input
                type="text"
                placeholder="Name or Email"
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* From Date */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Job Posted</label>
              <input
                type="date"
                value={jobPostedFrom}
                onChange={(e) => {
                  setPage(1);
                  setJobPostedFrom(e.target.value);
                }}
                className="px-3 py-2 border rounded-lg"
              />
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setSearch("");
                setJobPostedFrom("");
                // setJobPostedTo("");
                setPage(1);
              }}
              className="h-10.5 px-4 bg-gray-100 border rounded-lg text-sm hover:bg-gray-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-cyan-600 text-white">
                  <th className="p-3">Actions</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">status</th>
                  <th className="p-3">Comment</th>
                  {/* <th className="p-3">LinkedIn Age</th> */}
                  <th className="p-3">Joining Date</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Contact Duration</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Offer Letter Sent</th>
                  <th className="p-3">Offer Letter Accepted</th>
                  <th className="p-3">Candidate Enrolled</th>

                  <th className="p-3">LinkedIn Profile</th>
                  <th className="p-3">LinkedIn URL</th>
                  <th className="p-3">Job Board</th>
                  <th className="p-3">Job Posted Date</th>
                  <th className="p-3">Posted By</th>
                  <th className="p-3">Applied Date</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Job Title</th>
                  <th className="p-3">Interviewed By</th>
                </tr>
              </thead>

              <tbody>
                {candidates?.length > 0 ? (
                  candidates.map((candidate) =>
                  (
                    <React.Fragment key={candidate._id}>
                      {editCandidateId === candidate._id ? (
                        <EditableRow
                          candidat={candidate}
                          setEditCandidateId={setEditCandidateId}
                          onUpdate={handleCandidateUpdate}
                        ></EditableRow>
                      ) : (
                        <ReadOnlyRow
                          key={candidate._id}
                          candidate={candidate}
                          onDelete={handleDelete}
                          onEdit={handleEditClick}
                        ></ReadOnlyRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center p-3 text-gray-500">
                      No candidates found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </form>
        </div>

        {/* Pagination */}

        <div className="w-full mt-4 flex justify-center">
          <div className="flex border rounded-lg overflow-hidden">
            <button
              className="px-4 py-2 bg-gray-200 disabled:opacity-50 border-r"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              «
            </button>

            <button className="px-4 py-2 bg-gray-100 text-sm font-medium">
              Page {page} of {totalPages}
            </button>

            <button
              className="px-4 py-2 bg-gray-200 disabled:opacity-50 border-l"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectedCandidates;
