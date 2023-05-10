<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require 'vendor/autoload.php';
require 'src/PHPMailer-5.2.28/src/Exception.php';
require 'src/PHPMailer-5.2.28/src/PHPMailer.php';
require 'src/PHPMailer-5.2.28/src/SMTP.php';

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$mail = new PHPMailer(true);
$mail_to_email = 'bhavuk.arora03@gmail.com'; // your email
$mail_to_name = 'Bhavuk Arora';

try {

    $mail_from_name = isset($_POST['name']) ? $_POST['name'] : '';
    $mail_from_email = isset($_POST['email']) ? $_POST['email'] : '';
    $mail_message = isset($_POST['message']) ? $_POST['message'] : '';

    // Server settings
    $mail->isSMTP(); // Send using SMTP
    $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->Username = 'bhavuk.arora03@gmail.com'; // SMTP username
    $mail->Password = $_SERVER['SMTP_PASSWORD']; // SMTP password
    $mail->SMTPSecure = 'tls'; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port = 587; // TCP port to connect to, use 587 for `PHPMailer::ENCRYPTION_STARTTLS` above

    $mail->setFrom($mail_from_email, $mail_from_name); // Your email
    $mail->addAddress($mail_to_email, $mail_to_name); // Add a recipient

    // Content
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = 'New Contact Form Submission';
    $mail->Body = '
        <strong>Name:</strong> ' . $mail_from_name . '<br>
        <strong>Email:</strong> ' . $mail_from_email . '<br>
        <strong>Message:</strong> ' . $mail_message;

    $mail->send();
    echo 'Message has been sent';

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
