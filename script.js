document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Form validation
    const isValid = validateForm();
    if (!isValid) return;

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Display confirmation message
    alert(`Thank you, ${name}! Your donation of ₹${amount} via ${paymentMethod} has been received.`);

    // Redirect to Thank You page (optional)
    window.location.href = "thankyou.html";

    // Reset the form
    document.getElementById('donationForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
});

document.getElementById('image').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('payment-method').addEventListener('change', function() {
    const paymentMethod = this.value;
    const paymentDetails = document.getElementById('paymentDetails');
    const paymentOptions = document.getElementById('paymentOptions');
    let details = '';

    if (paymentMethod === 'paytm') {
        details = 'Pay via Paytm using this number: 1234567890';
    } else if (paymentMethod === 'phonepe') {
        details = 'Pay via PhonePe using this number: 0987654321';
    } else if (paymentMethod === 'gpay') {
        details = 'Pay via Google Pay using this number: 1122334455';
    } else if (paymentMethod === 'netbanking') {
        details = 'Please enter your net banking details in the following secure portal.';
    }

    paymentDetails.textContent = details;
    paymentOptions.style.display = 'block';
});

function validateForm() {
    let isValid = true;
    clearErrors();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value;

    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    }
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Enter a valid email';
        isValid = false;
    }
    if (phone === '') {
        document.getElementById('phoneError').textContent = 'Phone number is required';
        isValid = false;
    }
    if (amount < 10) {
        document.getElementById('amountError').textContent = 'Minimum donation is ₹10';
        isValid = false;
    }

    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function clearErrors() {
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('amountError').textContent = '';
}


document.getElementById('payment-method').addEventListener('change', function() {
    const paymentMethod = this.value;
    const qrScanner = document.getElementById('qrScanner');
    
    if (paymentMethod === 'scanner') {
        qrScanner.style.display = 'block';
    } else {
        qrScanner.style.display = 'none';
    }
});

document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const paymentMethod = document.getElementById('payment-method').value;

    if (paymentMethod === 'scanner') {
        alert('Please complete the payment by scanning the QR code.');
    } else {
        // Process the payment using the selected method
        alert('Thank you for your donation!');
    }
});
