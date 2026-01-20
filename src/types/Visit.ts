export enum DoctorProfession {
  Pediatrician = "pediatrician",
  Cardiologist = "cardiologist",
  Dermatologist = "dermatologist",
  FamilyDoctor = "family_doctor",
  Physiotherapist = "physiotherapist",
  Neurologist = "neurologist",
  Orthopaedist = "orthopaedist",
}

export enum VisitStatus {
  New = "new",
  Canceled = "canceled",
  Finished = "finished",
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
