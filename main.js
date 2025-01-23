document.addEventListener("DOMContentLoaded", function () {
  console.log("sa");

  const menuLinks = document.querySelectorAll("nav a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});

let updateInterval;

function age() {
  const birthDateInput = document.getElementById("birthDate");
  const birthDate = birthDateInput.value
    ? new Date(birthDateInput.value)
    : new Date(2009, 10, 20);

  const digits = document.getElementById("digitSlider").value;
  var t = new Date() - birthDate;
  t /= 1000 * 60 * 60 * 24 * 365;
  document.getElementById("data").innerHTML =
    "<span>" + Math.floor(t) + "</span>." + (t % 1).toFixed(digits).substr(2);
}

function updateRefreshRate() {
  const digits = parseInt(document.getElementById("digitSlider").value);
  clearInterval(updateInterval);

  let refreshRate = 300;
  if (digits > 8) {
    refreshRate = 300 / Math.pow(1.5, digits - 8);
  }

  updateInterval = setInterval(age, refreshRate);
}

document.getElementById("birthDate").addEventListener("change", age);
document.getElementById("digitSlider").addEventListener("input", function (e) {
  document.getElementById("digitCount").innerHTML =
    "<span>" + e.target.value + "</span> digits";
  age();
  updateRefreshRate();
});

age();
updateRefreshRate();
