import { db } from "../utils/firebase";

export const createComplaint = async ({
  topic,
  subject,
  name,
  lastName,
  email,
  userId,
}: {
  topic: string;
  subject: string;
  name: string;
  lastName: string;
  email: string;
  userId: string;
}) => {
  const complaintRecord = await db.collection("complaints").add({
    topic,
    subject,
    name,
    lastName,
    email,
    userId,
    createdAt: new Date(),
  });

  return complaintRecord;
};
