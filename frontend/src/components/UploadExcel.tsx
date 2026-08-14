import { useState } from "react";
import { uploadExcelApi } from "../api/candidateApi";
import { useNavigate } from "react-router-dom";

const UploadExcel = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) { formData.append("file", file); setLoading(true); }
    try {
      const data = await uploadExcelApi(formData);
      alert(data.message);
      setFile(null);
      navigate("/all-candidate");
    } catch (error: any) {
      alert(error.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <div className="upload-card">
      <h2 className="upload-card-title">Import Data by Excel</h2>
      <form onSubmit={handleFileSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          className="upload-input"
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={loading} className="upload-btn">
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </form>
    </div>
  );
};

export default UploadExcel;
