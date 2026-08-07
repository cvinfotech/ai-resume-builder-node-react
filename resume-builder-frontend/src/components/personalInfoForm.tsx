import { getImageUrl } from "../utils/image";

import {
  Briefcase,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import React, { useState } from "react";

type PersonalInfoData = {
  full_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  profession?: string;
  linkedin?: string;
  website?: string;
  image?: File | string;
};

type PersonalInfoFormProps = {
  data: PersonalInfoData;
  onChange: (value: PersonalInfoData) => void;
  onToast: (toast: { type: "success" | "error"; message: string }) => void;
  showErrors: boolean; // NEW: parent flips this true on failed Next/Save
};

const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const personalInfoForm = ({ data, onChange, onToast, showErrors }: PersonalInfoFormProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [emailError, setEmailError] = useState(""); // live format error (on blur)

  const handleChange = (
    field: keyof PersonalInfoData,
    value: string | File,
  ) => {
    onChange({ ...data, [field]: value });
  };

  const removeImage = () => {
    onChange({ ...data, image: undefined });
  };

  const fields: Array<{
    key: Exclude<keyof PersonalInfoData, "image">;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    type: string;
    required?: boolean;
  }> = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "text" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: Briefcase, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: BriefcaseBusiness, type: "url" },
    { key: "website", label: "Personal Website", icon: User, type: "url" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <p className="text-sm text-gray-600">Get Started with the personal information</p>

      <div className="flex items-center gap-2">
        <label>
          {data.image ? (
            <img
              src={getImageUrl(data.image)}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300"
            />
          ) : (
            <div>
              <User className="size-10 p-2.5 border rounded-full" />
              upload user image
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={async (e) => {
              if (!e.target.files?.[0]) return;

              const file = e.target.files[0];
              const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

              if (file.size > MAX_IMAGE_SIZE) {
                onToast({ type: "error", message: "Image size should not exceed 2 MB." });
                e.target.value = "";
                return;
              }

              const formData = new FormData();
              formData.append("image", file);
              const token = localStorage.getItem("token");

              try {
                const response = await fetch("http://localhost:5000/api/upload/profile", {
                  method: "PUT",
                  headers: { Authorization: `Bearer ${token}` },
                  body: formData,
                });

                if (!response.ok) {
                  onToast({ type: "error", message: "Failed to upload image. Try again." });
                  return;
                }

                const result = await response.json();
                handleChange("image", result.image);
                onToast({ type: "success", message: "Image uploaded successfully." });
              } catch (error) {
                console.log(error);
                onToast({ type: "error", message: "An error occurred while uploading the image." });
              }
            }}
          />
        </label>
        {data.image && (
          <button
            type="button"
            onClick={removeImage}
            className="px-3 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;
       const isEmpty = !(data[field.key] as string)?.trim();

const isTooShort =
  field.key === "full_name" &&
  !isEmpty &&
  (data.full_name || "").trim().length < 2;

const requiredError =
  showErrors && field.required && isEmpty
    ? `${field.label} is required`
    : showErrors && isTooShort
      ? "Full name must be at least 2 characters"
      : "";

        // Email format error: only shows after leaving the field (onBlur), separate from requiredError
       const liveFormatInvalid =
  field.key === "email" &&
  (data.email || "").trim() &&
  !emailFormatRegex.test((data.email || "").trim());

const formatError =
  field.key === "email"
    ? emailError || (showErrors && liveFormatInvalid ? "Enter a valid email address" : "")
    : "";

        const fieldError = requiredError || formatError; // NEW: combined, required wins if both apply

        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              inputMode={field.key === "phone" ? "numeric" : undefined}
              value={(data[field.key] as string) || ""}
              onChange={(e) => {
                let value = e.target.value;

                if(field.key === "full_name") {
                  value = value.replace(/[^a-zA-Z\s]/g, "");
                }

                if (field.key === "email") {
                  value = value.replace(/[^a-zA-Z0-9@._+-]/g, "");
                  if (emailError) setEmailError("");
                }

                if (field.key === "phone") {
                  value = value.replace(/\D/g, "").slice(0, 10);
                }

                handleChange(field.key, value);
              }}
              onBlur={(e) => {
                if (field.key === "email") {
                  const trimmed = e.target.value.trim();
                  if (trimmed && !emailFormatRegex.test(trimmed)) {
                    setEmailError("Enter a valid email address");
                  } else {
                    setEmailError("");
                  }
                }
              }}
              className={`mt-1 w-full px-3 py-2 border rounded-lg focus:ring outline-none transition-colors text-sm ${
                fieldError
                  ? "border-red-400 focus:ring-red-300 focus:border-red-400"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              maxLength={field.key === "phone" ? 10 : undefined}
              required={field.required}
            />
            {fieldError && <p className="text-xs text-red-500">{fieldError}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default personalInfoForm;