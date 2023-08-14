var input = document.querySelector("#phone");
window.intlTelInput(input, {
  separateDialCode: true
});
document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const confirmEmail = document.getElementById('confirmEmail').value;
  const gender = document.getElementById('gender').value;
  const detailsTable=document.getElementById('detailsTable');
  

  if (email !== confirmEmail) {
    alert("Emails do not match");
    return;
  }

  //create an object to store form data
  const formData={
    fullName: fullName,
    phone: phone,
    email: email,
    confirmEmail: confirmEmail,
    gender: gender
  };

  //save form data to local storage
  localStorage.setItem('formData', JSON.stringify(formData));

  

  //update summary table

  detailsTable.innerHTML = `
  <tr>
    <th>Field</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Name</td>
    <td>${fullName}</td>
  </tr>
  <tr>
    <td>Mobile Number</td>
    <td>${phone}</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>${email}</td>
  </tr>
  <tr>
    <td>Confirm Email</td>
    <td>${confirmEmail}</td>
  </tr>
  <tr>
    <td>Gender</td>
    <td>${gender}</td>
  </tr>
`;

  const summaryDiv = document.querySelector('.summary');
  summaryDiv.style.display = 'block';

  const purchaseButton = document.getElementById('purchaseButton');
  purchaseButton.style.display = 'block';

  document.getElementById('myForm').reset();
});

document.getElementById('purchaseButton').addEventListener('click', function() {
  // Redirect to the payment page
  window.location.href = "payment.html";
});

//Check if there is saved form data in local storage

const savedFormData=localStorage.getItem('formData');
if(savedFormData){
  const formData=JSON.parse(savedFormData);
  fullName.value=formData.fullName;
  phone.value=formData.phone;
  email.value=formData.email;
  confirmEmail.value=formData.confirmEmail;
  gender.value=formData.gender;
}

// Retrieve the data from localStorage
const storedTicketData = localStorage.getItem("ticketData");
const ticketData = JSON.parse(storedTicketData);

// Reference to the details page's summary table
const detailsTable = document.getElementById("detailsTable");

// Populate the details page's summary table
if (ticketData) {
  const tableBody = detailsTable.querySelector("tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  for (const ticket of ticketData) {
    const newRow = tableBody.insertRow();
    const fieldCell = newRow.insertCell(0);
    const valueCell = newRow.insertCell(1);

    fieldCell.textContent = ticket.fieldName; 
    valueCell.textContent = ticket.fieldValue; 
  }
}


myForm.reset();
// get item s frm local storage
document.addEventListener("DOMContentLoaded",function(){
  const table=localStorage.getItem("ticketData");
  const other=JSON.parse(table);

  if (other){
    for(const key in other){
      const tab =`<tr> <th>${key}</th><td>${obj[key]}</td></tr>`;
      document.getElementById("details").innerHTML += other;
    }
  }
})