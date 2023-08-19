export const times = [
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
  { time: "10:00" },
];
export const dayanddates = [
  { day: "MON", date: "20" },
  { day: "TUE", date: "21" },
  { day: "WED", date: "22" },
  { day: "THU", date: "23" },
  { day: "FRI", date: "24" },
  { day: "SAT", date: "25" },
  { day: "SUN", date: "26" },
];
export const otpmessage = [
  { message: "OTP Verify", messagenext: "Resend OTP" },
];

export const stringes = {
  submit: "Submit",
  addPet: "Add Pet",
  noSlot: "No Slot",
  time: "Time",
  invalidDate: "Invalid Date",
  invalidMonth: "Invalid Month",
  invalidcity: "Invalid City",
};


const loadRazorpay = async () => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.body.appendChild(script);

  return new Promise((resolve) => {
    script.onload = () => {
      resolve();
    };
  });
};

export { loadRazorpay };
