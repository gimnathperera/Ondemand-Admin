export type CustomerRegisterPayload = {
  firebaseUID?: string;
  ndis: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  dob: string;
  gender: string;
  telephone: string;
  email: string;
  favourite_things?: string;
  goals?: string;
  disability?: string;
  medication?: string;
  impact_of_disability?: string;
  support: string;
  other_note?: string;
  address: {
    address_line_1?: string;
    address_line_2?: string;
    house_no?: string;
    street_name: string;
    city: string;
    zip_code: string;
    suburb?: string;
    state?: string;
    country?: string;
  };
  additional_address?: string;
  account_for: string;
  contact_person?: {
    relationship: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    address: {
      address_line_1?: string;
      address_line_2?: string;
      house_no?: string;
      street_name: string;
      city: string;
      zip_code: string;
      suburb?: string;
      state?: string;
      country?: string;
    };
    contact_number: string;
    email: string;
  };
  geo_location?: {
    type: string;
    coordinates: Array<number>;
  };
};

export type ProfessionalRegisterPayload = {
  firebaseUID?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  abn: string;
  website?: string;
  telephone: string;
  email: string;
  address: {
    address_line_1?: string;
    address_line_2?: string;
    house_no?: string;
    street_name: string;
    city: string;
    zip_code: string;
    suburb?: string;
    state?: string;
    country?: string;
  };
  additional_address?: string;
  geo_location?: {
    type: string;
    coordinates: Array<number>;
  };
  hourly_rate?: number;
  experience?: string;
  service_area?: Array<string>;
  category?: [
    {
      _id: string;
      name: string;
      updatedAt?: string;
      createdAt?: string;
    }
  ];
};

export type OrganizationRegisterPayload = {
  company_name: string;
  slogan?: string;
  acn: string;
  website?: string;
  telephone: string;
  email: string;
  address: {
    address_line_1?: string;
    address_line_2?: string;
    house_no?: string;
    street_name: string;
    city: string;
    zip_code: string;
    suburb?: string;
    state?: string;
    country?: string;
  };
  geo_location?: {
    type: string;
    coordinates: Array<number>;
  };
  service_area?: Array<string>;
  category?: [
    {
      _id: string;
      name: string;
      updatedAt?: string;
      createdAt?: string;
    }
  ];
  contact_person: {
    designation: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    address: {
      address_line_1?: string;
      address_line_2?: string;
      house_no?: string;
      street_name: string;
      city: string;
      zip_code: string;
      suburb?: string;
      state?: string;
      country?: string;
    };
    contact_number?: string;
    email?: string;
  };
};

export type CurrentUser = {
  email: string | null;
  firebaseUID: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  platform: string | null;
  isNew: boolean | null;
};

export type RegisterPayload = {
  email: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};
