export type Post = {
  id: number;
  source: string;
  description: string;
  tags: Tag[];
  date: string;
  title: string;
};

export type PostDto = {
  source: string;
  description?: string;
  tags: string[];
  date: string;
  title: string;
};

export type PostFormData = {
  title: string;
  description?: string;
  tags: string[];
  images: FileList;
  blueSky: boolean;
  twitter: boolean;
  uploadText?: string;
};

export type Tag = {
  name: string;
};

export type Commission = {
  id: number;
  description: string;
  tier: string;
  completed: boolean;
};

export type CommissionDto = {
  description: string;
  tier: string;
  completed: boolean;
};

export type CommissionTier = {
  id: string;
  label: string;
  count: number;
  cost: number;
  details: string[];
};

export type CommissionRequest = {
  contactHandle: string;
  paypal: string;
  commissionTier: string;
  private: boolean;
  termsOfService: boolean;
  description: string;
};

export type OC = {
  name: string;
  tag: Tag;
  description: string;
  descriptionImg: string;
  headerImg: string;
};

export type OCFormData = {
  name: string;
  tag: string;
  description: string;
  descriptionImg: File;
  headerImg: File;
};
