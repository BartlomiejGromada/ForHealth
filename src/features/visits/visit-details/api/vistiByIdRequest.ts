import { FIREBASE_UNKNOWN_ERROR_CODE, FIREBASE_UNKNOWN_ERROR_MESSAGE } from "@/constants/Firebase";
import { visitByIdDoc } from "@/firebase/firestore/documents";
import { FirebaseReponse, ResponseStatus } from "@/types/Firebase";
import { Visit } from "@/types/Visit";
import { getDoc } from "firebase/firestore";

type visitByIdRequestProps = {
  userId: string;
  visitId: string;
};

export async function visitByIdRequest({
  userId,
  visitId,
}: visitByIdRequestProps): Promise<FirebaseReponse<Visit | null>> {
  try {
    const doc = await getDoc(visitByIdDoc(userId, visitId));

    if (doc === undefined) {
      return {
        status: ResponseStatus.SUCCESS,
        payload: null,
      };
    }

    const visit: Visit = {
      id: doc.id,
      status: doc.data()!.status,
      doctor: {
        name: doc.data()!.doctor.name,
        profession: doc.data()!.doctor.profession,
      },
      date: doc.data()!.date.toDate(),
      createdAt: doc.data()!.createdAt.toDate(),
      location: doc.data()!.location,
      comment: doc.data()!.comment,
    };

    return {
      status: ResponseStatus.SUCCESS,
      payload: visit,
    };
  } catch (error: any) {
    const reponseError: FirebaseReponse<Visit[]> = {
      status: ResponseStatus.ERROR,
      error: {
        code: (error.code as string) ?? FIREBASE_UNKNOWN_ERROR_CODE,
        message: (error.message as string) ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
      },
    };

    return reponseError;
  }
}
