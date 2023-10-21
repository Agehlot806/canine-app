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
// *******************************************************
// Mobile Number validation
export function mobileNumberValid(MobileNumber) {
  var mob = /^[6-9]{1}[0-9]{9}$/;
  if (mob.test(MobileNumber) === false) {
    return false;
  }
  return true;
}

// Hide Mobile Number
export function hideMobileNumber(MobileNumber) {
  if (MobileNumber.length === 10) {
    return (
      MobileNumber.slice(0, 2) + MobileNumber.slice(2).replace(/.(?=...)/g, "*")
    );
  }
  return null;
}

// email address vaildation
export function emailAddressValid(emailAddress) {
  return emailAddress.match(
    /^([A-Z?a-z0-9_\-\.])+\@([A-Za-z_\-\.])+\.([A-Za-z]{2,4})$/
  );
}

// Aadhar validation
// export function validateAadhaar(ano) {
//   var regexp = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
//   if (regexp.test(ano)) {
//     return true;
//   } else {
//     return false;
//   }
// }

// Pancard validation
// export const pancardValidation = (text) => {
//   let regex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
//   if (regex.test(text)) {
//     return true;
//   }

//   return false;
// };

// name validation
export function nameValid(name) {
  // return name.match(/^[a-zA-Z ]{2,30}$/);
  return name.match(/^[A-Za-z0-9\s]{1,30}$/);
}


// GST_number_validation
export function gstNumberValid(gstNumber) {
  return gstNumber.match(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  );
}
// *******************************************************


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
