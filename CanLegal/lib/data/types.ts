export type LegalStatus =
  | 'legalized'
  | 'medical_only'
  | 'decriminalized'
  | 'illegal'
  | 'restricted'
  | 'unknown';

export type VerificationStatus = 'verified' | 'source-linked' | 'needs-review';

export type SourceRef = {
  name: string;
  url: string;
  type?: 'government' | 'international' | 'regulator' | 'research' | 'other';
};

export type Country = {
  code: string;
  name: string;
  continent: string;
  region: string;
  status: LegalStatus;
  medical: boolean;
  recreational: boolean;
  decriminalized: boolean;
  industrialHemp: boolean;
  cultivationAllowed: boolean;
  possessionLimitGrams: number | null;
  minimumAge: number | null;
  yearOfLegalization: number | null;
  regulatoryAgency: string | null;
  sources: SourceRef[];
  lastUpdated: string;
  summary: string;
  medicalNotes: string[];
  restrictions: string[];
  policyNotes: string[];
  timelineEventIds: string[];
  verificationStatus: VerificationStatus;
};

export type TimelineEvent = {
  id: string;
  year: number;
  title: string;
  summary: string;
  status: LegalStatus;
  region: string;
  countryCodes: string[];
  sources: SourceRef[];
  verificationStatus: VerificationStatus;
};

export type Statistic = {
  id: string;
  label: string;
  value: number;
  unit: string;
  description: string;
};

export type Highlight = {
  id: string;
  title: string;
  summary: string;
  region: string;
  status: LegalStatus;
  date: string;
  sources: SourceRef[];
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  sources?: SourceRef[];
};

export type GeoFeature = {
  type: 'Feature';
  id: string;
  properties: {
    name: string;
    code?: string;
    kind: 'base' | 'country';
  };
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
};

export type GeoCollection = {
  type: 'FeatureCollection';
  features: GeoFeature[];
};
