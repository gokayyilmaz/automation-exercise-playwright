export type UserData = {
  seed: string;
  email: string;
  days: string;
  months: string;
  years: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export function createRandomUser(): UserData {
  const randText = `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
  return {
    seed: randText,
    email: `user_${randText}@testmail.com`,
    days: "26",
    months: "7",
    years: "1996",
    country: "United States",
    state: "California",
    city: "San Francisco",
    zipcode: "11111",
    mobileNumber: "5995555555",
  };
}
