document.addEventListener("DOMContentLoaded", function() {
    const confirmationTable = document.getElementById("confirmation-summary-table");

    // Retrieve ticket data from local storage
    const ticketDataArray = JSON.parse(localStorage.getItem("ticketData"));
    const formDataArray=JSON.parse(localStorage.getItem("formData"));


//TO GET THE DATA FROM LOCAL STORAGE//

   /* if (formDataArray) {
        // Create table header
        const headerRow = confirmationTable.insertRow();
        for (const field of ["confirmEmail", "email", "fullName", "gender", "phone"]) {
            const headerCell = document.createElement("th");
            headerCell.textContent = field;
            headerRow.appendChild(headerCell);
        }

        // Create table rows
        for (const formData of formDataArray) {
            const row = confirmationTable.insertRow();
            for (const field of ["confirmEmail", "email", "fullName", "gender", "phone"]) {
                const cell = row.insertCell();
                cell.textContent = formData[field];
            }
        }

        // Add a row for the total amount
        const totalRow = confirmationTable.insertRow();
        totalRow.insertCell(); 
        totalRow.insertCell(); 
        totalRow.insertCell(); 
        totalRow.insertCell(); 
        const totalGuestsCell = totalRow.insertCell();
        totalGuestsCell.textContent = "Total Guests:";
        const totalAmountCell = totalRow.insertCell();
        totalAmountCell.textContent = "Total Amount:";
        totalRow.insertCell(); 


    }*/




   if (ticketDataArray) {
        // Create table header
        const headerRow = confirmationTable.insertRow();
        for (const field of ["Category", "Date", "Time", "Duration", "Quantity", "Price"]) {
            const headerCell = document.createElement("th");
            headerCell.textContent = field;
            headerRow.appendChild(headerCell);
        }

        // Create table rows
        for (const ticketData of ticketDataArray) {
            const row = confirmationTable.insertRow();
            for (const field of ["category", "date", "time", "duration", "quantity", "price"]) {
                const cell = row.insertCell();
                cell.textContent = ticketData[field];
            }
        }

        // Add a row for the total amount
        const totalRow = confirmationTable.insertRow();
        totalRow.insertCell(); 
        totalRow.insertCell(); 
        totalRow.insertCell(); 
        totalRow.insertCell(); 
        const totalGuestsCell = totalRow.insertCell();
        totalGuestsCell.textContent = "Total Guests:";
        const totalAmountCell = totalRow.insertCell();
        totalAmountCell.textContent = "Total Amount:";
        totalRow.insertCell(); 

        // Calculate total guests and total amount
        let totalGuests = 0;
        let totalAmount = 0;
        for (const ticketData of ticketDataArray) {
            totalGuests += ticketData.quantity;
            totalAmount += ticketData.price;
        }

        // Add the calculated values to the total row
        totalGuestsCell.textContent = `Total Guests: ${totalGuests}`;
        totalAmountCell.textContent = `Total Amount: $${totalAmount}`;
    }



document.addEventListener("DOMContentLoaded", function() {
    const detailsTable = document.getElementById("detailsTable");

    // Retrieve user details from local storage
    const formData = JSON.parse(localStorage.getItem("formData"));

    if (formData) {
        // Create table rows for each user detail
        for (const field in formData) {
            const row = detailsTable.insertRow();
            const cellField = row.insertCell();
            const cellValue = row.insertCell();

            cellField.textContent = field;
            cellValue.textContent = formData[field];
        }
    }
});
document.addEventListener("DOMContentLoaded",function(){
    const table=localStorage.getItem("formData");
    const other=JSON.parse(table);
  
    if (other){
      for(const key in other){
        const tab =`<tr> <th>${key}</th><td>${other[key]}</td></tr>`;
        document.getElementById("confirmation-summary-table").innerHTML += other;
        console.log(other);
      }
    }
  });
   document.addEventListener("DOMContentLoaded", function() {
    const detailsTable = document.getElementById("detailsTable");
    
    // Retrieve user details from local storage
    const formData = localStorage.getItem("formData") ? JSON.parse(localStorage.getItem("formData")) : {};
    
    if (formData) {
        // Create table rows for each user detail
        for (const key in formData) {
            const row = detailsTable.insertRow();
            const cellField = row.insertCell();
            const cellValue = row.insertCell();
    
            cellField.textContent = key;
            cellValue.textContent = formData[key];
        }
    }
    });

});