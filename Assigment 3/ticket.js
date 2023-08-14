const monthYear = document.getElementById("monthYear");
const calendar = document.getElementById("calendar");
const selectedDateText = document.getElementById("selectedDate");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentDate = new Date();
let selectedDate = null;

function generateCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  monthYear.textContent = `${new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(firstDay)}`;

  calendar.innerHTML = "";

  for (let i = 0; i < startingDay; i++) {
    const emptyCell = document.createElement("div");
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.addEventListener("click", () => selectDate(year, month, day));
    calendar.appendChild(cell);
  }
}

function selectDate(year, month, day) {
  selectedDate = new Date(year, month, day);
  selectedDateText.textContent = selectedDate.toDateString();
  
}

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

const storedDate = localStorage.getItem("selectedDate");
if (storedDate) {
  visitDateInput.value = storedDate;
}


//------------------ Guests------------------  //

document.addEventListener("DOMContentLoaded", function() {
  const selectedDateInput = document.getElementById("selected-date");
  const ticketsTable = document.getElementById("tickets-table");
  const totalPayable = document.getElementById("total-paypal");
  const continueButton = document.getElementById("continue-button");


  // Sample pricing data
  const prices = {
    "Foreigner Adult": { normal: 10, peak: 13 },
    "Foreigner Child": { normal: 5, peak: 8 },
    "SL Adult": { normal: 4, peak: 6 },
    "SL Child": { normal: 2, peak: 3 },
    "Infant": { normal: 0, peak: 0 } //infants are free
  };

  // Sample peak hours
  const peakHours = [4, 5, 6, 9, 10, 11];

  // Function to update tickets table and total payable
  function updateSummary() {
    const date = selectedDateInput.value;
    const duration = parseInt(document.getElementById("duration").value);

    const ticketData = [
     
      ["Foreigner Adult", parseInt(document.getElementById("foreigner-adult").value)],
      ["Foreigner Child", parseInt(document.getElementById("foreigner-child").value)],
      ["SL Adult", parseInt(document.getElementById("sl-adult").value)],
      ["SL Child", parseInt(document.getElementById("sl-child").value)],
      ["Infant", parseInt(document.getElementById("infant").value)]
      
    ];

    const tableBody = document.getElementById("tickets-table");
    tableBody.innerHTML = "";

    // Calculate total payable
    let total = 0;

    // Create an array to store ticket data
    const ticketDataArray = [];

    // Create and populate the tickets table
    for (const [category, quantity] of ticketData) {
      if (quantity > 0) {
        const row = tableBody.insertRow();
        const cellCategory = row.insertCell();
        const cellDate = row.insertCell();
        const cellTime = row.insertCell();
        const cellDuration = row.insertCell();
        const cellQuantity = row.insertCell();
        const cellPrice = row.insertCell();

        const price = peakHours.includes(duration) ? prices[category].peak * quantity : prices[category].normal * quantity;

        cellCategory.innerHTML = category;
        cellDate.innerHTML = date;
        cellTime.innerHTML = document.getElementById("duration").options[duration - 1].text;
        cellDuration.innerHTML = `${1} hour(s)`;
        cellQuantity.innerHTML = quantity;
        cellPrice.innerHTML = `$${price}`;

        total += price;

        // Push ticket data to the array
        ticketDataArray.push({
          category: category,
          date: date,
          time: document.getElementById("duration").options[duration - 1].text,
          duration: `${1} hour(s)`,
          quantity: quantity,
          price: price
        });
      }
    }

    // Store ticket data array in local storage
    localStorage.setItem("ticketData", JSON.stringify(ticketDataArray));

    totalPayable.innerHTML = `$${total}`;
    continueButton.disabled = total === 0;
  }

  // Add event listeners
  selectedDateInput.addEventListener("change", updateSummary);
  document.getElementById("duration").addEventListener("change", updateSummary);
  document.getElementById("foreigner-adult").addEventListener("change", updateSummary);
  document.getElementById("foreigner-child").addEventListener("change", updateSummary);
  document.getElementById("sl-adult").addEventListener("change", updateSummary);
  document.getElementById("sl-child").addEventListener("change", updateSummary);
  document.getElementById("infant").addEventListener("change", updateSummary);

  continueButton.addEventListener("click", function() {
    window.location.href = "./Detail.html";
  });



  // Enable continue button
  continueButton.removeAttribute("disabled");

  updateSummary();
});

      
  
  

