const paymentForm = document.getElementById('paymentForm');
    const submitButton = document.getElementById('submitButton');
    const summaryTable = document.getElementById('summaryTable');
    const payButton = document.getElementById('payButton');

    paymentForm.addEventListener('input', function() {
      submitButton.disabled = !checkFormFields();
    });

    paymentForm.addEventListener('submit', function(event) {
      event.preventDefault();

      if (checkFormFields()) {
        const paymentData = {
          cardNumber: document.getElementById('card_number').value,
          expiryDate: document.getElementById('Expiry_date').value,
          cvcCvv: document.getElementById('cvc_cvv').value,
          nameOnCard: document.getElementById('name_on_card').value
        };

        // Store data in local storage
        localStorage.setItem('paymentDetails', JSON.stringify(paymentData));

        // Display summary table
        displaySummary(paymentData);

        // Enable the payButton
        payButton.disabled = false;
      }
    });

    function checkFormFields() {
      const cardNumber = document.getElementById('card_number').value;
      const expiryDate = document.getElementById('Expiry_date').value;
      const cvcCvv = document.getElementById('cvc_cvv').value;
      const nameOnCard = document.getElementById('name_on_card').value;
    
      return cardNumber && expiryDate && cvcCvv && nameOnCard;
    }
    

    function displaySummary(paymentData) {
      // Add rows to the summary table with payment data
      for (const key in paymentData) {
        const newRow = summaryTable.insertRow();
        const fieldCell = newRow.insertCell(0);
        const valueCell = newRow.insertCell(1);
        fieldCell.textContent = key;
        valueCell.textContent = paymentData[key];
      }
    }

    payButton.addEventListener("click", function() {
      window.location.href = "./confirmation.html";
    });

    //TO GET DATA FROM LOCAL STROGE//

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