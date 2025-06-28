// After generating the OTP
$to = $_SESSION['email'];
$subject = "Your OTP for Registration";
$message = "Your OTP is: " . $_SESSION['otp'];
$headers = "From: noreply@yourwebsite.com";

// Send OTP via email
if (mail($to, $subject, $message, $headers)) {
    echo "An OTP has been sent to your email.";
} else {
    echo "Error sending OTP.";
}
