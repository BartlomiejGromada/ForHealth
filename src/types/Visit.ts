export enum DoctorProfession {
  Pediatrician = 0,
  Cardiologist = 1,
  Dermatologist = 2,
  FamilyDoctor = 3,
  Physiotherapist = 4,
  Neurologist = 5,
  Orthopaedist = 6,
}

export enum VisitStatus {
  New = 0,
  Canceled = 1,
  Finished = 2,
}

export type Visit = {
  id: string;
  status: VisitStatus;
  doctor: {
    name: string;
    profession: DoctorProfession;
  };
  date: Date;
  createdAt: Date;
  location: string;
  comment: string;
};
