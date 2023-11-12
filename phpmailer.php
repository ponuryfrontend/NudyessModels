<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include the PHPMailer Autoload and other necessary files
require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validation code

    $requiredFields = ['name', 'phone', 'age', 'height', 'city', 'instagram', 'email'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            http_response_code(400);
            echo "Missing required field: $field";
            exit;
        }
    }

    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $age = $_POST["age"];
    $height = $_POST['height'];
    $city = $_POST['city'];
    $instagram = $_POST['instagram'];
    $from = $_POST["email"];
    $to = "bookings@nudyess.com";
    $subject = "$name $height - zgłoszenie na modelkę Nudyess Models";

    // Generowanie unikalnego hasha
    $random_hash = md5(date('r', time()));

    // Set up PHPMailer
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'imap.hostinger.com'; // Your SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'bookings@nudyessmodels.com'; // Your SMTP username
        $mail->Password   = 'Agasandratomasz1!'; // Your SMTP password
        $mail->SMTPSecure = 'ssl'; // Use 'tls' or 'ssl' depending on your server configuration
        $mail->Port       = 993; // Adjust the port according to your server

        // Sender and recipient settings
        $mail->setFrom($from, '$name');
        $mail->addAddress($to, 'Recipient Name');

        // Email content
        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body    = $output;

        // Attach files
        foreach ($_FILES['file']['name'] as $key => $name) {
            $fileTmpName = $_FILES['file']['tmp_name'][$key];
            $mail->addAttachment($fileTmpName, $name);
        }

        // Send the email
        $mail->send();
        header("Location: /casting.html?mail_status=sent");
    } catch (Exception $e) {
        header("Location: /casting.html?mail_status=error");
    }
} else {
    http_response_code(400);
    echo 'Invalid request.';
}
?>
