import { useState } from "react";
import { uploadExcelApi } from "../api/candidateApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import * as XLSX from "xlsx";

interface PreviewRow {
  [key: string]: any;
}

const ImportCandidate = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<PreviewRow[]>([]);
  const [previewHeaders, setPreviewHeaders] = useState<string[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Parse and generate instant preview
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target?.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data: PreviewRow[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

          if (data && data.length > 0) {
            setTotalRows(data.length);
            const headers = Object.keys(data[0]);
            setPreviewHeaders(headers);
            // Show up to the first 10 rows in preview
            setPreviewData(data.slice(0, 10));
          } else {
            setPreviewHeaders([]);
            setPreviewData([]);
            setTotalRows(0);
          }
        } catch (err) {
          console.error("Preview parse error:", err);
          setPreviewHeaders([]);
          setPreviewData([]);
        }
      };
      reader.readAsBinaryString(selectedFile);
    } else {
      setFile(null);
      setPreviewData([]);
      setPreviewHeaders([]);
      setTotalRows(0);
    }
  };

  const handleDownloadTemplate = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Status",
      "joiningDate",
      "Duration",
      "Date Applied",
      "Interviewer",
      "Offer letter Send",
      "Accepted Offer Letter",
      "Candidates Enrolled",
      "Company"
    ];

    const sampleRow = [
      "John Doe",
      "john.doe@example.com",
      "9876543210",
      "interested",
      "2026-09-01",
      "3 months",
      "2026-08-14",
      "Sarah Connor",
      "yes",
      "yes",
      "yes",
      "Centennial Infotech"
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), sampleRow.join(",")].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "candidate_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an Excel or CSV file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const data = await uploadExcelApi(formData);
      toast.success(data.message || "Upload completed successfully!");
      setFile(null);
      setPreviewData([]);
      navigate("/all-candidate");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "-8px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <button
          type="button"
          className="btn-nav-outline"
          onClick={handleDownloadTemplate}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Template
        </button>

        <Link to="/add-candidate">
          <button className="btn-nav-outline">
            ← Manual Entry
          </button>
        </Link>
      </div>

      {/* Upload Card */}
      <div className="upload-card" style={{ maxWidth: "1100px" }}>
        <h2 className="upload-card-title">Import Candidates via Excel / CSV</h2>
        <p style={{ color: "#ffffff", fontSize: "14px", textAlign: "center", marginBottom: "8px", opacity: 0.85 }}>
          Upload an Excel (.xlsx, .xls) or CSV (.csv) file. Preview the data below before confirming upload.
        </p>

        <form onSubmit={handleFileSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            className="upload-input"
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            required
          />

          {file && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <p style={{ color: "var(--accent-green)", fontSize: "13.5px", margin: "0" }}>
                ✓ Selected: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB) — <strong>{totalRows}</strong> {totalRows === 1 ? "record" : "records"} found
              </p>
            </div>
          )}

          {/* Data Preview Table */}
          {previewData.length > 0 && (
            <div style={{ marginTop: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "16px", fontWeight: 700 }}>
                  Data Preview {totalRows > 10 ? `(Showing first 10 of ${totalRows} rows)` : `(${totalRows} rows)`}
                </h3>
              </div>

              <div className="data-table-wrap" style={{ maxHeight: "360px", overflowY: "auto", border: "1px solid var(--border)", borderRadius: "8px" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: "40px" }}>#</th>
                      {previewHeaders.map((header, idx) => (
                        <th key={idx}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        <td style={{ color: "var(--text-muted)", fontSize: "12px" }}>{rowIdx + 1}</td>
                        {previewHeaders.map((header, colIdx) => (
                          <td key={colIdx}>
                            {String(row[header] !== undefined && row[header] !== null ? row[header] : "")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !file}
            className="upload-btn"
            style={{
              opacity: loading || !file ? 0.5 : 1,
              cursor: loading || !file ? "not-allowed" : "pointer",
              marginTop: "8px",
            }}
          >
            {loading ? "Uploading & Processing..." : `Upload & Import ${totalRows > 0 ? `(${totalRows} Records)` : ""}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImportCandidate;
