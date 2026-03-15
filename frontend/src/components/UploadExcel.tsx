import { useState } from "react";
import { uploadExcelApi } from "../api/candidateApi";
import { useNavigate } from "react-router-dom";

const UploadExcel = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      setLoading(true);
    }

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
    <div className="pt-4 flex gap-3 flex-col">
      <h2 className="text-lg font-bold py-4">Import Data by Excel</h2>

      <form
        onSubmit={handleFileSubmit}
        className="flex flex-col  bg-white rounded-2xl py-6 px-3 gap-3"
      >
        <input
          className="border rounded py-2 px-2"
          type="file"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 text-white"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadExcel;
