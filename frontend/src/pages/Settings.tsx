import { useSettingsStore, FIELD_LABELS, type FieldKey } from "../store/settingsStore";
import { toast } from "react-hot-toast";

const FIELD_DESCRIPTIONS: Record<FieldKey, string> = {
  linkedinURL:   "Candidate's LinkedIn profile URL",
  jobBoard:      "Platform where the job was posted (e.g. Naukri, LinkedIn)",
  jobPostedDate: "Date the job listing was published",
  appliedDate:   "Date the applicant submitted their application",
  jobPostedBy:   "Team member who posted the job opening",
  company:       "Organisation or client name for the role",
  jobTitle:      "Designation or role title being hired for",
  interviewedBy: "Team member who conducted the interview",
};

const FIELD_ICONS: Record<FieldKey, string> = {
  linkedinURL:   "🔗",
  jobBoard:      "📋",
  jobPostedDate: "📅",
  appliedDate:   "📆",
  jobPostedBy:   "👤",
  company:       "🏢",
  jobTitle:      "💼",
  interviewedBy: "🎙️",
};

const Settings = () => {
  const { fieldSettings, updateField, resetSettings } = useSettingsStore();

  const fieldKeys = Object.keys(FIELD_LABELS) as FieldKey[];

  const enabledCount = fieldKeys.filter(k => fieldSettings[k].enabled).length;
  const requiredCount = fieldKeys.filter(k => fieldSettings[k].enabled && fieldSettings[k].required).length;

  const handleReset = () => {
    resetSettings();
    toast.success("Settings reset to defaults");
  };

  return (
    <div className="settings-page">
      {/* Page header */}
      <div className="settings-header">
        <div className="settings-header-content">
          <div className="settings-header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <div>
            <h1 className="settings-title">Form Field Settings</h1>
            <p className="settings-subtitle">
              Control which fields appear on the Add Candidate form and whether they are required or optional.
            </p>
          </div>
        </div>

        {/* Summary chips */}
        <div className="settings-summary">
          <div className="settings-chip settings-chip--active">
            <span className="settings-chip-dot settings-chip-dot--green" />
            {enabledCount} Enabled
          </div>
          <div className="settings-chip settings-chip--required">
            <span className="settings-chip-dot settings-chip-dot--purple" />
            {requiredCount} Required
          </div>
          <div className="settings-chip settings-chip--optional">
            <span className="settings-chip-dot settings-chip-dot--gray" />
            {fieldKeys.filter(k => fieldSettings[k].enabled && !fieldSettings[k].required).length} Optional
          </div>
        </div>
      </div>

      {/* Column labels */}
      <div className="settings-col-labels">
        <span>Field</span>
        <span>Show in Form</span>
        <span>Required / Optional</span>
      </div>

      {/* Field rows */}
      <div className="settings-field-list">
        {fieldKeys.map((key) => {
          const setting = fieldSettings[key];
          return (
            <div key={key} className={`settings-field-row${!setting.enabled ? " settings-field-row--disabled" : ""}`}>
              {/* Field info */}
              <div className="settings-field-info">
                <span className="settings-field-icon">{FIELD_ICONS[key]}</span>
                <div>
                  <div className="settings-field-name">{FIELD_LABELS[key]}</div>
                  <div className="settings-field-desc">{FIELD_DESCRIPTIONS[key]}</div>
                </div>
              </div>

              {/* Enable/Disable toggle */}
              <div className="settings-toggle-wrap">
                <button
                  className={`settings-toggle${setting.enabled ? " settings-toggle--on" : ""}`}
                  onClick={() => {
                    updateField(key, { enabled: !setting.enabled });
                    toast.success(`${FIELD_LABELS[key]} ${!setting.enabled ? "enabled" : "disabled"}`);
                  }}
                  aria-label={`Toggle ${FIELD_LABELS[key]}`}
                  title={setting.enabled ? "Enabled — click to disable" : "Disabled — click to enable"}
                >
                  <span className="settings-toggle-knob" />
                </button>
                <span className={`settings-toggle-label${setting.enabled ? " settings-toggle-label--on" : ""}`}>
                  {setting.enabled ? "On" : "Off"}
                </span>
              </div>

              {/* Required / Optional pill selector */}
              <div className="settings-req-wrap">
                {setting.enabled ? (
                  <div className="settings-req-pills">
                    <button
                      className={`settings-req-pill${setting.required ? " settings-req-pill--active-req" : ""}`}
                      onClick={() => {
                        if (!setting.required) {
                          updateField(key, { required: true });
                          toast.success(`${FIELD_LABELS[key]} set to Required`);
                        }
                      }}
                    >
                      Required
                    </button>
                    <button
                      className={`settings-req-pill${!setting.required ? " settings-req-pill--active-opt" : ""}`}
                      onClick={() => {
                        if (setting.required) {
                          updateField(key, { required: false });
                          toast.success(`${FIELD_LABELS[key]} set to Optional`);
                        }
                      }}
                    >
                      Optional
                    </button>
                  </div>
                ) : (
                  <span className="settings-req-na">— Disabled —</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer actions */}
      <div className="settings-footer">
        <p className="settings-footer-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Settings are saved automatically and stored locally in this browser.
        </p>
        <button className="settings-reset-btn" onClick={handleReset}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
          </svg>
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default Settings;
