import { db } from "../utils/firebase";

export const createDoctor = async (data: any) => {
  const doctor = await db.collection("doctors").add({
    ...data,
    createdAt: new Date(),
  });
  return doctor;
};

export const updateDoctor = async ({
  doctorId,
  doctorName,
  nationalID,
  birthDate,
  field,
  description,
  image,
  doctorGender,
}: any) => {
  const doctorRef = db.collection("doctors").doc(doctorId);

  await doctorRef.update({
    ...(doctorName && { doctorName }),
    ...(nationalID && { nationalID }),
    ...(birthDate && { birthDate }),
    ...(field && { field }),
    ...(description && { description }),
    ...(image && { image }),
    ...(doctorGender && { doctorGender }),
  });

  return doctorRef;
};

export const getDoctorById = async (doctorId: string) => {
  const doc = await db.collection("doctors").doc(doctorId).get();
  if (!doc.exists) throw new Error("Doctor not found");
  return { id: doc.id, ...doc.data() };
};

export const getAllDoctors = async () => {
  const snapshot = await db.collection("doctors").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const searchDoctors = async (search: string) => {
  const doctorsRef = db.collection("doctors");

  const nameQuery = doctorsRef
    .where("doctorName", ">=", search)
    .where("doctorName", "<=", search + "\uf8ff");

  const fieldQuery = doctorsRef.where("field", "==", search);

  // Run both queries separately
  const [nameSnapshot, fieldSnapshot] = await Promise.all([
    nameQuery.get(),
    fieldQuery.get(),
  ]);

  const allDocs = [...nameSnapshot.docs, ...fieldSnapshot.docs];

  // Eliminate duplicates (if a doctor matches both queries)
  const uniqueMap = new Map();
  allDocs.forEach((doc) =>
    uniqueMap.set(doc.id, { id: doc.id, ...doc.data() })
  );

  return Array.from(uniqueMap.values());
};
