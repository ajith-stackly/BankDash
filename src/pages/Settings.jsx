import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCircleCheck, faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../context/UserContext";
const tabs = ["Edit Profile", "Preferences", "Security"];
const defaultSecurity = {
  twoFactorEnabled: true,
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
};
const INITIAL_STORED_PASSWORD = "password123";
const CURRENCY_CODES = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD"];
function formatDisplayDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function validateProfile(profile) {
  const errors = {};
  if (!profile.yourName?.trim()) errors.yourName = "Name is required.";
  if (!profile.userName?.trim()) errors.userName = "Username is required.";
  if (!profile.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(profile.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!profile.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required.";
  } else if (new Date(profile.dateOfBirth) > new Date()) {
    errors.dateOfBirth = "Date of birth can't be in the future.";
  }
  if (!profile.presentAddress?.trim()) errors.presentAddress = "Present address is required.";
  if (!profile.permanentAddress?.trim()) errors.permanentAddress = "Permanent address is required.";
  if (!profile.city?.trim()) errors.city = "City is required.";
  if (!profile.postalCode?.trim()) {
    errors.postalCode = "Postal code is required.";
  } else if (!/^[A-Za-z0-9\- ]{3,10}$/.test(profile.postalCode.trim())) {
    errors.postalCode = "Enter a valid postal code.";
  }
  if (!profile.country?.trim()) errors.country = "Country is required.";
  return errors;
}
function validatePreferences(preferences) {
  const errors = {};
  if (!preferences.currency?.trim()) {
    errors.currency = "Currency is required.";
  } else if (!/^[A-Za-z]{3}$/.test(preferences.currency.trim())) {
    errors.currency = "Use a 3-letter currency code, e.g. USD.";
  }
  if (!preferences.timeZone?.trim()) errors.timeZone = "Time zone is required.";
  return errors;
}
function validateSecurity(security, storedPassword) {
  const errors = {};
  if (!security.currentPassword) {
    errors.currentPassword = "Enter your current password.";
  } else if (security.currentPassword !== storedPassword) {
    errors.currentPassword = "Current password is incorrect.";
  }
  if (!security.newPassword) {
    errors.newPassword = "Enter a new password.";
  } else if (security.newPassword.length < 8) {
    errors.newPassword = "New password must be at least 8 characters.";
  } else if (!/[A-Za-z]/.test(security.newPassword) || !/[0-9]/.test(security.newPassword)) {
    errors.newPassword = "Password must contain at least one letter and one number.";
  } else if (security.newPassword === security.currentPassword) {
    errors.newPassword = "New password must be different from the current password.";
  }
  if (!security.confirmPassword) {
    errors.confirmPassword = "Confirm your new password.";
  } else if (!errors.newPassword && security.confirmPassword !== security.newPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
}
function Field({
  label,
  error,
  children
}) {
  return <div className="min-w-0">
      <label className="block font-[Inter] text-[13px] leading-[16px] xl:text-[16px] xl:leading-[19px] text-[#232323] mb-2 xl:mb-3">
        {label}
      </label>
      {children}
      {error && <p className="m-0 mt-1.5 font-[Inter] text-[11px] xl:text-[13px] text-[#FE5C73]">{error}</p>}
    </div>;
}
function getInputClass(hasError) {
  return `w-full h-10 xl:h-[50px] rounded-[10px] xl:rounded-[15px] border bg-white px-4 font-[Inter] text-[12px] xl:text-[15px] text-[#718EBF] focus:outline-none transition-colors ${hasError ? "border-[#FE5C73] focus:border-[#FE5C73]" : "border-[#DFEAF2] focus:border-[#1814F3]"}`;
}
function Toast({
  message,
  type,
  onClose
}) {
  if (!message) return null;
  const isError = type === "error";
  return <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-white shadow-lg px-5 py-3 font-[Inter] max-w-[90vw]">
      <FontAwesomeIcon icon={isError ? faCircleExclamation : faCircleCheck} className={`text-[20px] shrink-0 ${isError ? "text-[#FE5C73]" : "text-[#16DBAA]"}`} />
      <span className="text-[12px] sm:text-[13px] text-[#232323]">{message}</span>
      <button onClick={onClose} className="cursor-pointer text-[#718EBF] ml-2 shrink-0 hover:text-[#232323] transition-colors" aria-label="Close">
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>;
}
function Toggle({
  checked,
  onChange
}) {
  return <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="cursor-pointer relative shrink-0 w-[44px] h-[24px] xl:w-[56px] xl:h-[30.71px] rounded-full transition-colors" style={{
    background: checked ? "#16DBCC" : "#DFEAF2"
  }}>
      <span className="absolute top-[2px] w-[21px] h-[21px] xl:w-[27px] xl:h-[27px] rounded-full bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] transition-all" style={{
      left: checked ? "calc(100% - 23px)" : "2px"
    }} />
    </button>;
}
function NotificationRow({
  label,
  checked,
  onChange
}) {
  return <div className="flex items-center gap-4 xl:gap-[27px]">
      <Toggle checked={checked} onChange={onChange} />
      <span className="font-[Inter] text-[13px] leading-[16px] xl:text-[16px] xl:leading-[19px] text-[#232323]">
        {label}
      </span>
    </div>;
}
function SettingsPage({
  security: initialSecurity,
  onSecurityUpdate
} = {}) {
  const {
    profile,
    preferences,
    updateProfile,
    updatePreferences,
    updateAvatar,
    defaultAvatar
  } = useUser();
  const [activeTab, setActiveTab] = useState("Edit Profile");
  const [profileDraft, setProfileDraft] = useState(profile);
  const [preferencesDraft, setPreferencesDraft] = useState(preferences);
  const [security, setSecurity] = useState(initialSecurity || defaultSecurity);
  React.useEffect(() => setProfileDraft(profile), [profile]);
  React.useEffect(() => setPreferencesDraft(preferences), [preferences]);
  const [profileErrors, setProfileErrors] = useState({});
  const [preferencesErrors, setPreferencesErrors] = useState({});
  const [securityErrors, setSecurityErrors] = useState({});
  const [storedPassword, setStoredPassword] = useState(INITIAL_STORED_PASSWORD);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");
  const fileInputRef = useRef(null);
  function showToast(message, type = "success") {
    setToast(message);
    setToastType(type);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 3500);
  }
  function updateField(key, value) {
    setProfileDraft(prev => ({
      ...prev,
      [key]: value
    }));
    if (profileErrors[key]) {
      setProfileErrors(prev => ({
        ...prev,
        [key]: undefined
      }));
    }
  }
  function handleDateChange(e) {
    const value = e.target.value;
    updateField("dateOfBirth", value);
  }
  function handleAvatarClick() {
    fileInputRef.current?.click();
  }
  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please choose an image file.", "error");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      showToast("Image is too large. Please choose a photo under 8MB.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIMENSION = 320;
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", 0.85);
        const nextProfile = {
          ...profileDraft,
          avatarUrl: compressed
        };
        setProfileDraft(nextProfile);
        const persisted = updateAvatar(compressed);
        if (persisted === false) {
          showToast("Photo updated, but couldn't be saved for next visit (storage full). Try a smaller image.", "error");
        } else {
          showToast("Profile photo updated");
        }
      };
      img.onerror = () => showToast("Couldn't read that image. Try a different file.", "error");
      img.src = reader.result;
    };
    reader.onerror = () => showToast("Couldn't read that image. Try a different file.", "error");
    reader.readAsDataURL(file);
  }
  function handleSaveProfile() {
    const errors = validateProfile(profileDraft);
    setProfileErrors(errors);
    if (Object.keys(errors).length > 0) {
      showToast("Please fix the highlighted fields.", "error");
      return;
    }
    const persisted = updateProfile(profileDraft);
    if (persisted === false) {
      showToast("Saved for now, but couldn't be stored for next visit (storage full).", "error");
    } else {
      showToast("Profile updated successfully");
    }
  }
  function updatePreference(key, value) {
    setPreferencesDraft(prev => ({
      ...prev,
      [key]: value
    }));
    if (preferencesErrors[key]) {
      setPreferencesErrors(prev => ({
        ...prev,
        [key]: undefined
      }));
    }
    console.log("Preference changed:", key, "->", value);
  }
  function handleSavePreferences() {
    const errors = validatePreferences(preferencesDraft);
    setPreferencesErrors(errors);
    if (Object.keys(errors).length > 0) {
      showToast("Please fix the highlighted fields.", "error");
      return;
    }
    updatePreferences(preferencesDraft);
    showToast("Preferences updated successfully");
  }
  function updateSecurity(key, value) {
    setSecurity(prev => ({
      ...prev,
      [key]: value
    }));
    if (securityErrors[key]) {
      setSecurityErrors(prev => ({
        ...prev,
        [key]: undefined
      }));
    }
  }
  function handleTwoFactorToggle(value) {
    updateSecurity("twoFactorEnabled", value);
    console.log("Two-factor authentication:", value ? "enabled" : "disabled");
    showToast(`Two-factor authentication ${value ? "enabled" : "disabled"}`);
  }
  function handleSaveSecurity() {
    const errors = validateSecurity(security, storedPassword);
    setSecurityErrors(errors);
    if (Object.keys(errors).length > 0) {
      console.log("Password change blocked — validation errors:", errors);
      showToast(Object.values(errors)[0], "error");
      return;
    }
    setStoredPassword(security.newPassword);
    setSecurity(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
    onSecurityUpdate?.(security);
    showToast("Password changed successfully");
  }
  return <div className="w-full bg-[#F5F7FA]">
      <div className="xl:mx-4">
        <div className="bg-white rounded-[15px] xl:rounded-[25px] p-5 sm:p-8 xl:p-10">
          {}
          <div className="flex gap-6 sm:gap-10 xl:gap-[38px] border-b border-[#F4F5F7] mb-8 xl:mb-[47px] overflow-x-auto">
            {tabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`cursor-pointer pb-3 font-[Inter] font-medium text-[13px] xl:text-[16px] whitespace-nowrap transition-colors ${activeTab === tab ? "text-[#1814F3] border-b-[3px] border-[#1814F3]" : "text-[#718EBF] border-b-[3px] border-transparent"}`}>
                {tab}
              </button>)}
          </div>

          {}
          {activeTab === "Edit Profile" && <>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 xl:gap-[80px]">
                {}
                <div className="flex sm:block justify-center">
                  <div className="relative w-[110px] h-[110px] xl:w-[130px] xl:h-[130px] shrink-0">
                    <img src={profileDraft.avatarUrl || defaultAvatar} onError={e => {
                  if (e.target.src !== defaultAvatar) e.target.src = defaultAvatar;
                }} alt="Profile avatar" className="w-full h-full rounded-full object-cover bg-[#C4C4C4]" />
                    <button onClick={handleAvatarClick} className="cursor-pointer absolute bottom-1 right-1 w-[25px] h-[25px] xl:w-[30px] xl:h-[30px] rounded-full bg-[#1814F3] flex items-center justify-center text-white hover:bg-[#1210c9] transition-colors" aria-label="Edit avatar">
                      <FontAwesomeIcon icon={faPen} className="text-[11px] xl:text-[13px]" />
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </div>
                </div>

                {}
                <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-x-8 xl:gap-x-[27px] gap-y-6 xl:gap-y-8">
                  <Field label="Your Name" error={profileErrors.yourName}>
                    <input className={getInputClass(!!profileErrors.yourName)} value={profileDraft.yourName} onChange={e => updateField("yourName", e.target.value)} />
                  </Field>

                  <Field label="User Name" error={profileErrors.userName}>
                    <input className={getInputClass(!!profileErrors.userName)} value={profileDraft.userName} onChange={e => updateField("userName", e.target.value)} />
                  </Field>

                  <Field label="Email" error={profileErrors.email}>
                    <input type="email" className={getInputClass(!!profileErrors.email)} value={profileDraft.email} onChange={e => updateField("email", e.target.value)} />
                  </Field>

                  <Field label="Date of Birth" error={profileErrors.dateOfBirth}>
                    <input type="date" className={`${getInputClass(!!profileErrors.dateOfBirth)} appearance-none pr-9`} value={profileDraft.dateOfBirth} onChange={handleDateChange} max={new Date().toISOString().split("T")[0]} style={{
                  colorScheme: "light"
                }} />
                  </Field>

                  <Field label="Present Address" error={profileErrors.presentAddress}>
                    <input className={getInputClass(!!profileErrors.presentAddress)} value={profileDraft.presentAddress} onChange={e => updateField("presentAddress", e.target.value)} />
                  </Field>

                  <Field label="Permanent Address" error={profileErrors.permanentAddress}>
                    <input className={getInputClass(!!profileErrors.permanentAddress)} value={profileDraft.permanentAddress} onChange={e => updateField("permanentAddress", e.target.value)} />
                  </Field>

                  <Field label="City" error={profileErrors.city}>
                    <input className={getInputClass(!!profileErrors.city)} value={profileDraft.city} onChange={e => updateField("city", e.target.value)} />
                  </Field>

                  <Field label="Postal Code" error={profileErrors.postalCode}>
                    <input className={getInputClass(!!profileErrors.postalCode)} value={profileDraft.postalCode} onChange={e => updateField("postalCode", e.target.value)} />
                  </Field>

                  <Field label="Country" error={profileErrors.country}>
                    <input className={getInputClass(!!profileErrors.country)} value={profileDraft.country} onChange={e => updateField("country", e.target.value)} />
                  </Field>
                </div>
              </div>

              <div className="flex justify-center sm:justify-end mt-8 xl:mt-10">
                <button onClick={handleSaveProfile} className="cursor-pointer w-full sm:w-[130px] xl:w-[190px] h-10 xl:h-[50px] rounded-[9px] xl:rounded-[15px] bg-[#1814F3] text-white font-[Inter] font-medium text-[15px] xl:text-[18px] hover:bg-[#1210c9] transition-colors">
                  Save
                </button>
              </div>
            </>}

          {}
          {activeTab === "Preferences" && <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 xl:gap-x-[30px] gap-y-6 xl:gap-y-8">
                <Field label="Currency" error={preferencesErrors.currency}>
                  <input className={getInputClass(!!preferencesErrors.currency)} value={preferencesDraft.currency} onChange={e => updatePreference("currency", e.target.value.toUpperCase())} maxLength={3} list="currency-codes" />
                  <datalist id="currency-codes">
                    {CURRENCY_CODES.map(c => <option key={c} value={c} />)}
                  </datalist>
                </Field>

                <Field label="Time Zone" error={preferencesErrors.timeZone}>
                  <input className={getInputClass(!!preferencesErrors.timeZone)} value={preferencesDraft.timeZone} onChange={e => updatePreference("timeZone", e.target.value)} />
                </Field>
              </div>

              <div className="mt-8 xl:mt-10">
                <h3 className="m-0 mb-4 xl:mb-6 font-[Inter] font-medium text-[14px] leading-[17px] xl:text-[17px] xl:leading-[21px] text-[#333B69]">
                  Notification
                </h3>

                <div className="flex flex-col gap-4 xl:gap-6">
                  <NotificationRow label="I send or receive digital currency" checked={preferencesDraft.notifyDigitalCurrency} onChange={v => updatePreference("notifyDigitalCurrency", v)} />
                  <NotificationRow label="I receive merchant order" checked={preferencesDraft.notifyMerchantOrder} onChange={v => updatePreference("notifyMerchantOrder", v)} />
                  <NotificationRow label="There are recommendations for my account" checked={preferencesDraft.notifyRecommendations} onChange={v => updatePreference("notifyRecommendations", v)} />
                </div>
              </div>

              <div className="flex justify-center sm:justify-end mt-8 xl:mt-10">
                <button onClick={handleSavePreferences} className="cursor-pointer w-full sm:w-[130px] xl:w-[190px] h-10 xl:h-[50px] rounded-[9px] xl:rounded-[15px] bg-[#1814F3] text-white font-[Inter] font-medium text-[15px] xl:text-[18px] hover:bg-[#1210c9] transition-colors">
                  Save
                </button>
              </div>
            </>}

          {}
          {activeTab === "Security" && <>
              <h3 className="m-0 mb-4 xl:mb-6 font-[Inter] font-medium text-[14px] leading-[17px] xl:text-[17px] xl:leading-[21px] text-[#333B69]">
                Two-factor Authentication
              </h3>

              <NotificationRow label="Enable or disable two factor authentication" checked={security.twoFactorEnabled} onChange={handleTwoFactorToggle} />

              <h3 className="m-0 mt-8 xl:mt-10 mb-4 xl:mb-6 font-[Inter] font-medium text-[14px] leading-[17px] xl:text-[17px] xl:leading-[21px] text-[#333B69]">
                Change Password
              </h3>

              <p className="m-0 mb-4 font-[Inter] text-[11px] xl:text-[13px] text-[#718EBF]">
                Demo current password: <strong>password123</strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 xl:gap-x-[30px] gap-y-6 xl:gap-y-8 max-w-full sm:max-w-[calc(50%-16px)] xl:max-w-[510px]">
                <Field label="Current Password" error={securityErrors.currentPassword}>
                  <input type="password" className={getInputClass(!!securityErrors.currentPassword)} value={security.currentPassword} onChange={e => updateSecurity("currentPassword", e.target.value)} />
                </Field>

                <Field label="New Password" error={securityErrors.newPassword}>
                  <input type="password" className={getInputClass(!!securityErrors.newPassword)} value={security.newPassword} onChange={e => updateSecurity("newPassword", e.target.value)} />
                </Field>

                <Field label="Confirm New Password" error={securityErrors.confirmPassword}>
                  <input type="password" className={getInputClass(!!securityErrors.confirmPassword)} value={security.confirmPassword} onChange={e => updateSecurity("confirmPassword", e.target.value)} />
                </Field>
              </div>

              <div className="flex justify-center sm:justify-end mt-8 xl:mt-10">
                <button onClick={handleSaveSecurity} className="cursor-pointer w-full sm:w-[130px] xl:w-[190px] h-10 xl:h-[50px] rounded-[9px] xl:rounded-[15px] bg-[#1814F3] text-white font-[Inter] font-medium text-[15px] xl:text-[18px] hover:bg-[#1210c9] transition-colors">
                  Save
                </button>
              </div>
            </>}
        </div>
      </div>

      <Toast message={toast} type={toastType} onClose={() => setToast("")} />
    </div>;
}
export default SettingsPage;
