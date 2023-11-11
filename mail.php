<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $age = $_POST["age"];
    $height = $_POST['height'];
    $city = $_POST['city'];
    $instagram = $_POST['instagram'];

    $from = $_POST["email"];
    $to = "faktury@nudyess.com";
    $subject = "Zgłoszenie na modelkę Nudyess Models";

    $message_body = "Name: $name\nEmail: $email\nPhone Number: $phone\nAge: $age\nHeight: $height m\nCity: $city\nInstagram ID: $instagram";

    $headers = "From: " . $from . "\r\n";
    $headers .= "Reply-To: " . $from . "\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"PHP-mixed-".$random_hash."\"";

    $random_hash = md5(date('r', time()));

    $output = "--PHP-mixed-$random_hash\n";
    $output .= "Content-Type: multipart/alternative; boundary=\"PHP-alt-$random_hash\"\n\n";
    $output .= "--PHP-alt-$random_hash\n";
    $output .= "Content-Type: text/plain; charset=\"iso-8859-1\"\n";
    $output .= "Content-Transfer-Encoding: 7bit\n\n";
    $output .= $message_body;
    $output .= "\n\n--PHP-alt-$random_hash--\n\n";

    foreach ($_FILES['file']['name'] as $key => $name) {
        $fileTmpName = $_FILES['file']['tmp_name'][$key];
        $fileType = $_FILES['file']['type'][$key];
        $output .= "--PHP-mixed-$random_hash\n";
        $output .= "Content-Type: $fileType; name=\"$name\"\n";
        $output .= "Content-Disposition: attachment\n";
        $output .= "Content-Transfer-Encoding: base64\n\n";
        $output .= chunk_split(base64_encode(file_get_contents($fileTmpName)));
        $output .= "\n\n";
    }

    $output .= "--PHP-mixed-$random_hash--";

    $mail_status = mail($to, $subject, $output, $headers);

    if ($mail_status) {
        header("Location: /casting.html?mail_status=sent");
    } else {
        header("Location: /casting.html?mail_status=error");
    }
} else {
    http_response_code(400);
    echo 'Invalid request.';
}
?>
