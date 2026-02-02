export type User = {
  uid: string;
  email: string;
  details: UserDetails;
};

export type UserDetails = {
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  height: number | null;
  weight: number | null;
};
