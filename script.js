//get elements
const inputs = document.querySelectorAll("input");
const inputDays = document.querySelector(".days__input");
const inputMonths = document.querySelector(".months__input");
const inputYears = document.querySelector(".years__input");
const daysTitle = document.querySelector(".days__title");
const monthsTitle = document.querySelector(".months__title");
const yearsTitle = document.querySelector(".years__title");
const htmlYears = document.querySelector(".user__years");
const htmlMonths = document.querySelector(".user__months");
const htmlDays = document.querySelector(".user__days");
const daysAlert = document.querySelector(".alert__days");
const monthsAlert = document.querySelector(".alert__months");
const yearsAlert = document.querySelector(".alert__years");
const button = document.querySelector(".arrow");

//functions
//wrong data function
const alertWrongData = function (input, title, alert, alertText) {
  input.style.borderColor = "red";
  title.style.color = "red";
  alert.textContent = alertText;
};
//empty imput function
const emptyInputAlert = function (input, title, alert) {
  input.style.borderColor = "red";
  title.style.color = "red";
  alert.textContent = "This is required";
};
//empty html(--) function
const emptyHtml = function () {
  htmlDays.textContent = "--";
  htmlMonths.textContent = "--";
  htmlYears.textContent = "--";
};

//listeners
//hitting enter listener
for (const i of inputs) {
  i.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      button.click();
    }
  });
}
//clicking listener
button.addEventListener("click", function () {
  //variables
  //inputs
  let userDays = Number(inputDays.value);
  let userMonths = Number(inputMonths.value);
  let userYears = Number(inputYears.value);
  //current Year
  const curYear = new Date().getFullYear();
  //user Date from inputs
  let userDate = new Date(`${userMonths}/${userDays}/${userYears}`);
  //current Date
  const curDate = new Date();
  //time difference between dates in miliseconds
  let timeDifference = userDate.getTime() - curDate.getTime();
  //   console.log(timeDifference);
  //time difference between dates in days
  let timeDifferenceInDays = Math.round(
    Math.abs(timeDifference / (1000 * 3600 * 24))
  );

  //function reset
  const resetValues = function (color) {
    //reset inputs

    inputDays.style.borderColor = color;
    inputMonths.style.borderColor = color;
    inputYears.style.borderColor = color;
    daysTitle.style.color = color;
    monthsTitle.style.color = color;
    yearsTitle.style.color = color;
    daysAlert.textContent = "";
    monthsAlert.textContent = "";
    yearsAlert.textContent = "";
  };
  //calc function
  const calcAge = function (days) {
    let calcYears = Math.floor(days / 365);
    // console.log(calcYears);
    let calcMonths = Math.floor((days % 365) / 30);
    // console.log(calcMonths);
    let calcDays = Math.floor((days % 365) % 30);
    // console.log(calcDays);
    //add calc values to html
    htmlDays.textContent = calcDays;
    htmlMonths.textContent = calcMonths;
    htmlYears.textContent = calcYears;
    //reset values
    resetValues("rgba(113, 111, 111, 1)");
  };
  //when all is good

  calcAge(timeDifferenceInDays);

  //cases when value is wrong
  if (
    inputDays.value > 31 ||
    inputMonths.value > 12 ||
    inputYears.value > curYear ||
    inputDays.value === "" ||
    inputMonths.value === "" ||
    inputYears.value === ""
  ) {
    emptyHtml();
  }
  //when day input is bigger then 31

  if (inputDays.value > 31) {
    alertWrongData(inputDays, daysTitle, daysAlert, "Must be a valid day");
  }
  //when month input is bigger then 12
  if (inputMonths.value > 12) {
    alertWrongData(
      inputMonths,
      monthsTitle,
      monthsAlert,
      "Must be a valid month"
    );
  }
  //when years input is in future
  if (inputYears.value > curYear) {
    alertWrongData(inputYears, yearsTitle, yearsAlert, "Must be in the past");
  }
  //when inputDays is empty
  if (inputDays.value === "") {
    emptyInputAlert(inputDays, daysTitle, daysAlert);
  }
  //when inputMonths is empty
  if (inputMonths.value === "") {
    emptyInputAlert(inputMonths, monthsTitle, monthsAlert);
  }
  //when inputYears is empty
  if (inputYears.value === "") {
    emptyInputAlert(inputYears, yearsTitle, yearsAlert);
  }
});

button.addEventListener("click", function () {
  inputDays.value = "";
  inputMonths.value = "";
  inputYears.value = "";
});
