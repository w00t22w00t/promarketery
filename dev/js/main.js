$(function () {
  const dropdownBttn = document.querySelector(".dropdown-bttn");
  const form = document.querySelector("#myForm");

  $("#bttn-modal").on("click", function () {
    $("#myModal").modal("show");
  });

  dropdownBttn.addEventListener("click", function () {
    document.querySelector(".animated-icon").classList.toggle("open");
    $(".collapse").toggleClass("show");
    $('body').toggleClass('overflow-hidden')
  });

  $('.close').on('click', function () {
    $("#myModal").modal("hide");
  })


  function validateForm() {
    const name = document.querySelector("#name");
    const telephone = document.querySelector('#telephone');
    const email = document.querySelector("#email");

    // Validation checks
    let isValid = true;

    // Check if name is filled
    if (name.value <= 2) {
      name.classList.add('is-invalid');
      isValid = false;
    } else {
      name.classList.remove('is-invalid');
    }

    // Check if telephone is filled
    if (telephone.value.length < 16) {
      telephone.classList.add('is-invalid');
      isValid = false;
    } else {
      telephone.classList.remove('is-invalid');
    }

    // Check if email is filled and valid format
    if (!isValidEmail(email.value)) {
      email.classList.add('is-invalid');
      isValid = false;
    } else {
      email.classList.remove('is-invalid');
    }

    return isValid;
  }

  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }


  function masktelephone(e) {
    let phoneNumber = telephone.value.replace(/\D/g, '');

    const countryCode = '+';
    if (phoneNumber.startsWith(countryCode)) {
      phoneNumber = phoneNumber.substring(1);
    }

    const maxLength = 12;
    if (phoneNumber.length > maxLength) {
      phoneNumber = phoneNumber.substring(0, maxLength);
    }


    let formattedNumber = phoneNumber.replace(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,3})/, '$1 $2 $3 $4');

    formattedNumber = countryCode + formattedNumber;

    if (e.inputType !== "deleteContentBackward") {
      telephone.value = formattedNumber;
    }
    
  }

  telephone.addEventListener('input', masktelephone);

  $(form).on("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
      console.log('false')
      return false;
    }

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Form submitted. Response:", data);
        $('#myForm input[type="text"]').val('');
        $("#myModal").modal("hide");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
