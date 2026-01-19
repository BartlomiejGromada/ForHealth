import { FIREBASE_UNKNOWN_ERROR_CODE, FIREBASE_UNKNOWN_ERROR_MESSAGE } from "@/constants/Firebase";
import { visitByIdDoc } from "@/firebase/firestore/documents";
import { FirebaseReponse, FirebaseReponseWithoutPayload, ResponseStatus } from "@/types/Firebase";
import { VisitStatus } from "@/types/Visit";
import { updateDoc } from "firebase/firestore";

type updateVisitStatusRequestProps = {
  userId: string;
  visitId: string;
  newStatus: VisitStatus;
};

export async function updateVisitStatusRequest({
  userId,
  visitId,
  newStatus,
}: updateVisitStatusRequestProps): Promise<FirebaseReponse<VisitStatus>> {
  try {
    await updateDoc(visitByIdDoc(userId, visitId), {
      status: newStatus,
    });

    return {
      status: ResponseStatus.SUCCESS,
      payload: newStatus,
    };
  } catch (error: any) {
    const reponseError: FirebaseReponseWithoutPayload = {
      status: ResponseStatus.ERROR,
      error: {
        code: (error.code as string) ?? FIREBASE_UNKNOWN_ERROR_CODE,
        message: (error.message as string) ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
      },
    };

    return reponseError;
  }
}
