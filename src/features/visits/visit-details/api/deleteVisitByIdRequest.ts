import { visitByIdDoc } from "@/firebase/firestore/documents";
import { FirebaseReponseWithoutPayload, ResponseStatus } from "@/types/Firebase";
import { deleteDoc, getDoc } from "firebase/firestore";

type deleteVisitByIdRequestProps = {
  userId: string;
  visitId: string;
};
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function deleteVisitByIdRequest({
  userId,
  visitId,
}: deleteVisitByIdRequestProps): Promise<FirebaseReponseWithoutPayload> {
  const doc = await getDoc(visitByIdDoc(userId, visitId));

  if (!doc.exists()) {
    return {
      status: ResponseStatus.ERROR,
      error: {
        code: "visits/not-found",
        message: "visit-to-delete-was-not-found",
      },
    };
  }

  await delay(5000);

  // await deleteDoc(doc.ref);

  return {
    status: ResponseStatus.SUCCESS,
  };
}
