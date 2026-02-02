export const formatDateTime = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0"); // Day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month (starts from 0)
  const year = date.getFullYear(); // Rok

  const hours = String(date.getHours()).padStart(2, "0"); // Hour
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Minute

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const todayDateTime = () => {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    0
  );
};

export const calculateAge = (dateOfBirth: Date | string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
};
