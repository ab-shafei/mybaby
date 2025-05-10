import { db } from "../utils/firebase";

export const createClinic = async ({
  clinicName,
  clinicAddress,
  field,
  description,
  image,
  phone,
}: {
  clinicName: string;
  clinicAddress: string;
  field: string;
  description: string;
  image: string;
  phone: string;
}) => {
  const clinicRef = await db.collection("clinics").add({
    clinicName,
    clinicAddress,
    field,
    description,
    image,
    phone,
  });

  return clinicRef;
};

export const getAllClinics = async () => {
  const snapshot = await db.collection("clinics").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const searchClinics = async (search: string) => {
  const snapshot = await db
    .collection("clinics")
    .where("clinicName", ">=", search)
    .where("clinicName", "<=", search + "\uf8ff")
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
