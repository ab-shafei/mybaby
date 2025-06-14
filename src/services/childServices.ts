import { db } from "../utils/firebase";

// Create a new child
export const createChild = async ({
  userId,
  childName,
  guardianName,
  nationalID,
  childAge,
  birthDate,
  bloodType,
  childHealthStatus,
  childChronicDiseases,
  childGender,
}: {
  userId: string;
  childName: string;
  guardianName: string;
  nationalID: string;
  childAge: string;
  birthDate: Date;
  bloodType: string;
  childHealthStatus: string;
  childChronicDiseases: string;
  childGender: string;
}) => {
  const childRecord = await db.collection("children").add({
    userId,
    childName,
    guardianName,
    nationalID,
    childAge,
    birthDate,
    bloodType,
    childHealthStatus,
    childChronicDiseases,
    childGender,
  });

  return childRecord;
};

// Update an existing child
export const updateChild = async ({
  childId,
  childName,
  guardianName,
  nationalID,
  childAge,
  birthDate,
  bloodType,
  childHealthStatus,
  childChronicDiseases,
  childGender,
}: {
  childId: string;
  childName?: string;
  guardianName?: string;
  nationalID?: string;
  childAge?: string;
  birthDate?: Date;
  bloodType?: string;
  childHealthStatus?: string;
  childChronicDiseases?: string;
  childGender?: string;
}) => {
  const childRef = db.collection("children").doc(childId);

  await childRef.update({
    ...(childName && { childName }),
    ...(guardianName && { guardianName }),
    ...(nationalID && { nationalID }),
    ...(childAge && { childAge }),
    ...(birthDate && { birthDate }),
    ...(bloodType && { bloodType }),
    ...(childHealthStatus && { childHealthStatus }),
    ...(childChronicDiseases && { childChronicDiseases }),
    ...(childGender && { childGender }),
  });

  return childRef;
};

// Delete a child
export const deleteChild = async ({ childId }: { childId: string }) => {
  const childRef = db.collection("children").doc(childId);

  await childRef.delete();

  return childRef;
};

// Get all children for a user
export const getAllChildren = async ({ userId }: { userId: string }) => {
  const snapshot = await db
    .collection("children")
    .where("userId", "==", userId)
    .get();

  const childrenList = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return childrenList;
};

// Get one child by ID
export const getChildById = async ({ childId }: { childId: string }) => {
  const childDoc = await db.collection("children").doc(childId).get();

  if (!childDoc.exists) {
    throw new Error("Child not found");
  }

  return {
    id: childDoc.id,
    ...childDoc.data(),
  };
};
