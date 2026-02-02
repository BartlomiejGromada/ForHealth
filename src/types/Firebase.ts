export enum ResponseStatus {
  SUCCESS,
  ERROR,
}

export type BaseFirebaseReponse = {
  status: ResponseStatus;
};

export type FirebaseReponse<T> =
  | (BaseFirebaseReponse & { status: ResponseStatus.SUCCESS; payload: T })
  | (BaseFirebaseReponse & { status: ResponseStatus.ERROR; error: FirebaseError });

export type FirebaseReponseWithoutPayload =
  | (BaseFirebaseReponse & { status: ResponseStatus.SUCCESS })
  | (BaseFirebaseReponse & { status: ResponseStatus.ERROR; error: FirebaseError });

export type FirebaseError = { code: string; message: string };
