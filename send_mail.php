<?php
// send_mail.php

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize it
    $name = htmlspecialchars(trim($_POST['name']));
    $brand = htmlspecialchars(trim($_POST['brand']));
    $whatsapp = htmlspecialchars(trim($_POST['whatsapp']));
    $email = htmlspecialchars(trim($_POST['email']));

    // Basic validation
    if (empty($name) || empty($brand) || empty($whatsapp) || empty($email)) {
        // Redirect back with an error if fields are missing
        header("Location: index.html?status=error&message=Please+fill+all+fields");
        exit;
    }

    // Email configuration
    $to = "[EMAIL_ADDRESS]"; // REPLACE WITH YOUR EMAIL ADDRESS
    $subject = "New Lead from AI Virtual Studio: $brand";
    
    // Email Header
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Email Body
    $message = "
    <html>
    <head>
        <title>New Lead</title>
    </head>
    <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Brand:</strong> $brand</p>
        <p><strong>WhatsApp:</strong> $whatsapp</p>
        <p><strong>Email:</strong> $email</p>
    </body>
    </html>
    ";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        // Redirect to a thank you page or back to index with success message
        header("Location: index.html?status=success");
    } else {
        // Redirect back with error
        header("Location: index.html?status=error&message=Failed+to+send+email");
    }
} else {
    // If accessed directly without POST, redirect home
    header("Location: index.html");
    exit;
}
?>
