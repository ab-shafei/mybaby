import { db } from "../utils/firebase";

export const createAppointment = async ({
  doctorId,
  childName,
  guardianName,
  childAge,
  guardianPhone,
  date,
  time,
  childGender,
}: {
  doctorId: string;
  childName: string;
  guardianName: string;
  childAge: number;
  guardianPhone: string;
  date: Date;
  time: string;
  childGender: string;
}) => {
  const appointmenmtRecord = db.collection("appointments").add({
    doctorId,
    childName,
    guardianName,
    childAge,
    guardianPhone,
    date,
    time,
    childGender,
  });

  return appointmenmtRecord;
};

export const deleteAppointment = async ({
  appointmentId,
}: {
  appointmentId: string;
}) => {
  const appointmenmtRecord = db
    .collection("appointments")
    .doc(appointmentId)
    .delete();

  return appointmenmtRecord;
};
