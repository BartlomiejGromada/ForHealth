import { FIREBASE_UNKNOWN_ERROR_CODE, FIREBASE_UNKNOWN_ERROR_MESSAGE } from "@/constants/Firebase";
import { visitsByUserIdQuery } from "@/firebase/firestore/queries";
import { FirebaseReponse, ResponseStatus } from "@/types/Firebase";
import { Visit } from "@/types/Visit";
import { getDocs } from "firebase/firestore";

type visitsByUserIdRequestProps = {
  userId: string;
};

export async function visitsByUserIdRequest({
  userId,
}: visitsByUserIdRequestProps): Promise<FirebaseReponse<Visit[] | null>> {
  try {
    const doc = await getDocs(visitsByUserIdQuery(userId));

    if (doc === undefined) {
      return {
        status: ResponseStatus.SUCCESS,
        payload: null,
      };
    }

    // const visit: Visit = {
    //   id: doc.id,
    //   doctor: {
    //     name: doc.data()!.doctor.name,
    //     profession: doc.data()!.doctor.profession,
    //   },
    //   date: doc.data()!.date.toDate(),
    //   createdAt: doc.data()!.createdAt.toDate(),
    //   location: doc.data()!.location,
    //   comment: doc.data()!.comment,
    // };

    return {
      status: ResponseStatus.SUCCESS,
      payload: [],
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
