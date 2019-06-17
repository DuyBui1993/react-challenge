export const summaryDonations = (donation) => (
  donation.reduce((accumulator, value) => (accumulator + value))
);
