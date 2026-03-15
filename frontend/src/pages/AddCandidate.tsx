import { useState } from "react";
import { type CandidateFormData } from "../types/candidate";
import { candidateAddApi } from "../api/candidateApi";
import { useNavigate } from "react-router-dom";
import UploadExcel from "../components/UploadExcel";

const VITE_API_URL = import.meta.env.VITE_API_URL
const AddCandidate = () => {
  const [formData, setFormData] = useState<CandidateFormData>({
    name: "",
    email: "",
    phone: "",
    linkedInProfile: "",
    linkedInAge: undefined,
    linkedinURL: "",
    status: "",
    joiningDate: "",
    duration: "",
    jobBoard: "",
    jobPostedDate: "",
    appliedDate: "",
    jobPostedBy: "",
    offerLetterSent: "",
    offerLetterAccepted: "",
    candidateEnrolled: "",
    fieldType: "",
    comment: "",
    company: "",
    jobTitle: "",
    interviewedBy: ""
  });

  const navigate = useNavigate();
  const [mailValidity, setMailValidity] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof typeof prev]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const data = await candidateAddApi(formData);
      alert(data.message);

      navigate("/all-candidate");
    } catch (error: any) {
      alert(error.response?.data?.error);
    }
  };

  const checkMail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${VITE_API_URL}/admin/check-mail?email=${formData.email.trim()}`, {
        method: "GET",
        credentials: "include",

      });


      const res = await response.json();
      setMailValidity(res.message);

    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="w-full flex flex-col items-center">
      <UploadExcel></UploadExcel>

      <div className="flex flex-row w-full items-center justify-center">
        <hr className="h-px my-8 bg-neutral-quaternary border max-w-sm w-full" />
        <p className="p-2">OR</p>
        <hr className="h-px my-8 bg-neutral-quaternary border max-w-sm w-full" />
      </div>

      <div className="flex flex-col bg-white shadow-xl px-10 py-4 rounded-2xl w-full  max-w-3xl my-3 justify-center items-center">
        <div className="text-center pb-6">
          <h2 className="text-3xl font-bold">Add Candidate</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full  max-w-xl "
        >
          <div className="flex flex-col">
            <label className="subpixel-antialiased text-lg font-stretch-expanded">
              Name
            </label>
            <input
              required
              type="text"
              placeholder="Enter candidate name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded "
            />
          </div>

          <div className="flex flex-col  ">
            <label className="subpixel-antialiased text-lg font-stretch-expanded">
              Email
            </label>
            <input
              required
              type="email"
              placeholder="Enter candidate email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          {mailValidity}

          <div>
            <button
              type="button"
              className="p-3 bg-blue-600 rounded-md cursor-pointer text-white hover:bg-blue-500"
              onClick={checkMail}
            >Verify mail</button>
          </div>

          <div className="flex flex-col ">
            <label className="subpixel-antialiased text-lg font-stretch-expanded ">
              Phone
            </label>
            <input
              required
              type="tel"
              placeholder="Enter candidate phone no."
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded "
            />
          </div>

          <div className="flex flex-col">
            <label className="subpixel-antialiased text-lg font-stretch-expanded ">
              LinkedIn URL
            </label>
            <input
              type="text"
              placeholder="linkedin.com"
              name="linkedinURL"
              value={formData.linkedinURL}
              onChange={handleChange}
              className="border p-2 rounded "
            />
          </div>

          <div className="flex flex-col ">
            <label className="subpixel-antialiased text-lg font-stretch-expanded ">
              Job board
            </label>
            <input
              required
              type="text"
              placeholder="Enter job board name"
              name="jobBoard"
              value={formData.jobBoard}
              onChange={handleChange}
              className="border p-2 rounded "
            />
          </div>

          <div className="flex flex-col ">
            <label className="subpixel-antialiased text-lg font-stretch-expanded ">
              Job posted Date
            </label>
            <input
              required
              type="date"
              name="jobPostedDate"
              value={formData.jobPostedDate.slice(0, 10)}
              onChange={handleChange}
              className="border p-2 rounded "
            />
          </div>

          <div className="flex flex-col ">
            <label className="subpixel-antialiased text-lg font-stretch-expanded ">
              Applied Date
            </label>
            <input
              required
              type="date"
              name="appliedDate"
              value={formData.appliedDate.slice(0, 10)}
              onChange={handleChange}
              className="border p-2 rounded "
            />
          </div>

          <div className="flex flex-col ">
            <label className="subpixel-antialiased text-lg font-stretch-expanded ">
              Job Posted By
            </label>
            <input
              required
              type="text"
              placeholder="posted by"
              name="jobPostedBy"
              value={formData.jobPostedBy}
              onChange={handleChange}
              className="border p-2 rounded "
            />
          </div>

          <div className="flex flex-col ">
            <label className="subpixel-antialiased text-lg font-stretch-expanded ">
              Company
            </label>
            <input
              required
              type="text"
              placeholder="Enter Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="border p-2 rounded "
            />
          </div>

          <div className="flex flex-col ">
            <label className="subpixel-antialiased text-lg font-stretch-expanded ">
              Job Title
            </label>
            <input
              required
              type="text"
              placeholder="Enter job title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="border p-2 rounded "
            />
          </div>

          <div className="flex flex-col ">
            <label className="subpixel-antialiased text-lg font-stretch-expanded">
              Interviewed by
            </label>
            <input
              required
              type="text"
              placeholder="interviewed by"
              name="interviewedBy"
              value={formData.interviewedBy}
              onChange={handleChange}
              className="border p-2 rounded "
            />
          </div>

          <div className="flex lg:mt-6 w-full justify-center">
            <button
              type="submit"
              className="bg-cyan-600 px-6 py-3  rounded-lg text-white text-lg hover:cursor-pointer hover:bg-cyan-500"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
