import { FIREBASE_UNKNOWN_ERROR_CODE, FIREBASE_UNKNOWN_ERROR_MESSAGE } from "@/constants/Firebase";
import { profileDetailsDoc } from "@/firebase/firestore/documents";
import { FirebaseReponse, ResponseStatus } from "@/types/Firebase";
import { UserDetails } from "@/types/User";
import { getDoc } from "firebase/firestore";

type userDetailsRequestProps = {
  userId: string;
};

export async function userDetailsRequest({
  userId,
}: userDetailsRequestProps): Promise<FirebaseReponse<UserDetails | null>> {
  try {
    const doc = await getDoc(profileDetailsDoc(userId));

    if (!doc.exists()) {
      return {
        status: ResponseStatus.SUCCESS,
        payload: null,
      };
    }

    const userDetails: UserDetails = {
      firstName: doc.data()!.firstName,
      lastName: doc.data()!.lastName,
      dateOfBirth: doc.data()!.dateOfBirth,
      height: doc.data()!.height,
      weight: doc.data()!.weight,
    };

    return {
      status: ResponseStatus.SUCCESS,
      payload: userDetails,
    };
  } catch (error: any) {
    const reponseError: FirebaseReponse<UserDetails[]> = {
      status: ResponseStatus.ERROR,
      error: {
        code: (error.code as string) ?? FIREBASE_UNKNOWN_ERROR_CODE,
        message: (error.message as string) ?? FIREBASE_UNKNOWN_ERROR_MESSAGE,
      },
    };

    return reponseError;
  }
}
