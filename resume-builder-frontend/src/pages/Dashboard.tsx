import { uploadResumePDF } from "../services/pdfService";

import {
  CheckCircle2,
  FilePenIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XCircle,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteJson, getJson, postJson, putJson } from "../services/api.ts";

type Resume = {
  _id: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
  personalInfo?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const colors = [
    "#9333ea",
    "#3b82f6",
    "#ef4444",
    "#f97316",
    "#14b8a6",
    "#eab308",
    "#10b981",
    "#8b5cf6",
  ];
  const [allResumes, setAllResumes] = useState<Resume[]>([]);
  const [showCreateResume, setShowCreateResume] = useState<boolean>(false);
  const [showUploadResume, setShowUploadResume] = useState<boolean>(false);
  const [titlee, setTitlee] = useState("");
  // const [resume, setResume] = useState<File | null>(null);
  const [editResumeId, setEditResumeId] = useState<string>("");
  // const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [resume, setResume] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string} | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string>("");
  const [titleError, setTitleError] = useState("");

  useEffect(() =>{
    if(!toast) return;
    const timer = setTimeout(() => setToast(null),3000);
    return () => clearTimeout(timer);
  },[toast]);

  const loadAllResumes = async () => {
    try {
      const data = await getJson<{ resumes: Resume[] }>("/api/resume");
      setAllResumes(data.resumes || []);
    } catch (error) {
      console.error(error);
    }
  };

  const createResume = async (event: React.ChangeEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!titlee.trim()) {
    setTitleError("Title is required");
    return;
  }

  try {
    const data = await postJson<{ resume: Resume }>("/api/resume", {
      title: titlee,
      personalInfo: {},
    });

    setShowCreateResume(false);
    setTitlee("data.resume.title");
    navigate(`/app/builder/${data.resume._id}`);
  } catch (error) {
    console.error(error);
  }
};

  // const uploadResume = async (event: React.ChangeEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setShowUploadResume(false);
  //   navigate(`/app/builder/res123`);
  // };

  const uploadResume = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resume) {
      setToast({ type: "error", message: "Please select a resume file to upload."});
      return;
    }

    setIsUploading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setToast({ type: "error", message: "User not authenticated. Please log in."});
        return;
      }

      const data = await uploadResumePDF(resume, token);

      setShowUploadResume(false);

      navigate(`/app/builder/${data.resume._id}`);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      setToast({ type: "error", message: "Failed to upload resume. Please try again."});
    }
  };

  const editTitle = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editResumeId) return;
    try {
      await putJson(`/api/resume/${editResumeId}`, { title: titlee });
      setEditResumeId("");
      setTitlee("");
      loadAllResumes();
    } catch (error) {
      console.error(error);
    }
  };

  const requestDeleteResume = (resumeId: string) => {
  setConfirmDeleteId(resumeId);
};

const confirmDeleteResume = async () => {
  if (!confirmDeleteId) return;
  try {
    await deleteJson(`/api/resume/${confirmDeleteId}`);
    setAllResumes((prev) => prev.filter((resume) => resume._id !== confirmDeleteId));
    setToast({ type: "success", message: "Resume deleted successfully." });
  } catch (error) {
    console.error(error);
    setToast({ type: "error", message: "Failed to delete resume." });
  } finally {
    setConfirmDeleteId("");
  }
};
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="flex text-2xl font-medium mb-6 bg-linear-to-r from-yellow-600 to-slate-700 bg-clip-text text-transparent ">
          Welcome to Dashboard !
        </p>

        <div className="flex  gap-4 ">
          <button
            onClick={() => setShowCreateResume(true)}
            className=" w-full
            bg-white
            sm:max-w-36
            h-48
            flex
            flex-col
            items-center
            justify-center
            rounded-lg
            gap-2
            text-slate-600
            border-slate-300
            hover:border-indigo-500
            hover:shadow-lg
            transition-all
            duration-300
            cursor-pointer
            border"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full cursor-pointer" />
            <p className="text-sm group-hover;text-indigo-600 transition-all duration-300">
              {" "}
              Create Resume
            </p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className="
            flex
            justify-center
            w-full
            bg-white
            sm:max-w-36
            h-48
            flex-col
            items-center
            rounded-lg
            gap-2
            text-slate-600
            border-slate-300
            hover:border-purple-500
            hover:shadow-lg
            transition-all
            duration-300
            cursor-pointer
            border"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full cursor-pointer" />
            <p className="text-sm group-hover;text-purple-600 transition-all duration-300">
              {" "}
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="my-6 border-slate-300  sm:w-76.25" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={resume._id || index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenIcon
                  className="size-11 transition-all group-hover:scale-105"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title || "Untittle"}
                </p>
                <p
                  className="absolute bottom-2 text-xs text-slate-400 group-hover:scale-105 transition-all px-2 duration-300 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <TrashIcon
                    onClick={() => requestDeleteResume(resume._id)}
                    className="size-7  p-1.5 hover:bg-white/50 rounded  transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitlee(resume.title || "");
                    }}
                    className="size-7 text-slate-700 p-1.5 hover:bg-white/50 rounded transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            noValidate
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 p-4">Create Resume</h2>
                <input
                onChange={(e) => {
                setTitlee(e.target.value);
                if (titleError) setTitleError("");
                }}
                value={titlee}
                type="text"
                placeholder="Enter resume title"
                className={`w-full px-4 py-2 rounded ${
                titleError
                  ? "border border-red-400 focus:ring-2 focus:ring-red-300"
                  : "border border-gray-300"
                }`}
                />
                {titleError ? (
                <p className="text-xs text-red-500 mt-1 mb-3">{titleError}</p>
                ) : (
                <div className="mb-4" />
                )}
                <button className="w-full mb-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
                </button>
              <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
              setShowCreateResume(false);
              setTitlee("");
              setTitleError("");
              }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 p-4">Upload Resume</h2>
              <input
                onChange={(e) => setTitlee(e.target.value)}
                value={titlee}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus:border-green-100 ring-green-500"
                required
              />
              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select Resume file
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-green-700">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloudIcon className="size-14 stroke-1" />
                        <p>Upload resume</p>
                      </>
                    )}
                  </div>
                </label>
                {/* <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setResume(file);
                    }
                  }}
                /> */}

                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setResume(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isUploading}
                className={`w-full mb-4 py-2 rounded text-white flex items-center justify-center gap-2 transition-colors ${
                  isUploading
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isUploading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}

                {isUploading ? "Uploading..." : "Upload Resume"}
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitlee("");
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 p-4">Edit Resume Title</h2>
              <input
                onChange={(e) => setTitlee(e.target.value)}
                value={titlee}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus:border-green-100 ring-green-500"
                required
              />
              <button className="w-full mb-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitlee("");
                }}
              />
            </div>
          </form>
        )}

        {toast && (
          <div className = "fixed top-6 left-1/3 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div
              className = {`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border min-w-70 max-w-70 ${
                toast.type === "success"
                  ? "bg-green-5 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
        >
          {toast.type === "success" ?  (
            <CheckCircle2 className = "size-5 shrink-0 text-green-600"/>
          ) : (
            <XCircle className = "size-5 shrink-0 text-red-600"/>
          )}
          <p className = "text-sm font-medium flex-1">{toast.message}</p>
          <button
            onClick={()=> setToast(null)}
            className = "text-xs opacity-60 hover:opacity-100 transition-opacity"
            >
              X
              </button>
            </div>
          </div>
        )}

        {/* Delete confirmation toast */}
                    {confirmDeleteId && (
                    <div className="fixed top-6 left-1/3 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col gap-3 px-4 py-3 rounded-lg shadow-lg border min-w-70 max-w-sm bg-white border-slate-200">
                    <p className="text-sm font-medium text-slate-700">
                    Are you sure you want to delete this resume?
                    </p>
                    <div className="flex justify-end gap-2">
                    <button
                    onClick={() => setConfirmDeleteId("")}
                    className="px-3 py-1.5 text-xs rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={confirmDeleteResume}
                    className="px-3 py-1.5 text-xs rounded-md bg-red-600 hover:bg-red-500 text-white transition-colors"
                    >
                    Delete
                    </button>
                    </div>
                    </div>
                    </div>
                    )}
      </div>
    </div>
  );
};

export default Dashboard;
