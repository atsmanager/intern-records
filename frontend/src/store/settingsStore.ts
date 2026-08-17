import { create } from 'zustand';

export type FieldSetting = {
  enabled: boolean;  // if false → field is hidden/not collected
  required: boolean; // if true → field is required in the form
};

export type FieldKey =
  | 'linkedinURL'
  | 'jobBoard'
  | 'jobPostedDate'
  | 'appliedDate'
  | 'jobPostedBy'
  | 'company'
  | 'jobTitle'
  | 'interviewedBy';

export const FIELD_LABELS: Record<FieldKey, string> = {
  linkedinURL: 'LinkedIn URL',
  jobBoard: 'Job Board',
  jobPostedDate: 'Job Posted Date',
  appliedDate: 'Applied Date',
  jobPostedBy: 'Job Posted By',
  company: 'Company',
  jobTitle: 'Job Title',
  interviewedBy: 'Interviewed By',
};

export const DEFAULT_SETTINGS: Record<FieldKey, FieldSetting> = {
  linkedinURL:    { enabled: true, required: false },
  jobBoard:       { enabled: true, required: true  },
  jobPostedDate:  { enabled: true, required: true  },
  appliedDate:    { enabled: true, required: true  },
  jobPostedBy:    { enabled: true, required: true  },
  company:        { enabled: true, required: true  },
  jobTitle:       { enabled: true, required: true  },
  interviewedBy:  { enabled: true, required: true  },
};

const STORAGE_KEY = 'ats_field_settings';

function loadSettings(): Record<FieldKey, FieldSetting> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge with defaults so new fields always appear
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch {/* ignore */}
  return { ...DEFAULT_SETTINGS };
}

function saveSettings(settings: Record<FieldKey, FieldSetting>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {/* ignore */}
}

type SettingsStore = {
  fieldSettings: Record<FieldKey, FieldSetting>;
  updateField: (key: FieldKey, patch: Partial<FieldSetting>) => void;
  resetSettings: () => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  fieldSettings: loadSettings(),

  updateField: (key, patch) =>
    set((state) => {
      const updated = {
        ...state.fieldSettings,
        [key]: { ...state.fieldSettings[key], ...patch },
      };
      saveSettings(updated);
      return { fieldSettings: updated };
    }),

  resetSettings: () => {
    saveSettings({ ...DEFAULT_SETTINGS });
    set({ fieldSettings: { ...DEFAULT_SETTINGS } });
  },
}));
