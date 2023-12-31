<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Walidacja danych wejściowych
    $requiredFields = ['name', 'phone', 'age', 'height', 'city', 'instagram', 'email'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
            exit;
        }
    }

    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $age = $_POST["age"];
    $height = $_POST["height"];
    $city = $_POST["city"];
    $instagram = $_POST["instagram"];
    $from = $_POST["email"];
    $replyTo = $_POST["email"];
    $to = "casting@nudyess.com";
    $subject = "$name $age - zgłoszenie na modelkę Nudyess Models";

    // Generowanie unikalnego hasha
    $random_hash = md5(date('r', time()));

    // Tworzenie nagłówków
    $headers = "From: " . mb_encode_mimeheader($from) . "\r\n";
    $headers .= "Reply-To: " . mb_encode_mimeheader($replyTo) . "\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"PHP-mixed-$random_hash\"";

    // Tworzenie treści wiadomości
    $output = "--PHP-mixed-$random_hash\n";
    $output .= "Content-Type: multipart/alternative; boundary=\"PHP-alt-$random_hash\"\n\n";
    $output .= "--PHP-alt-$random_hash\n";
    $output .= "Content-Type: text/plain; charset=\"iso-8859-1\"\n";
    $output .= "Content-Transfer-Encoding: 7bit\n\n";
    $output .= "Name: $name\nEmail: $from\nPhone Number: $phone\nAge: $age\nHeight: $height m\nCity: $city\nInstagram ID: $instagram";
    $output .= "\n\n--PHP-alt-$random_hash--\n\n";

    // Dodawanie załączników
    if (!empty($_FILES['file']['name'])) {
        foreach ($_FILES['file']['name'] as $key => $name) {
            $fileTmpName = $_FILES['file']['tmp_name'][$key];
            $fileType = $_FILES['file']['type'][$key];

            // Sprawdzanie rozmiaru pliku
            if ($_FILES['file']['size'][$key] > 1024 * 1024 * 5) {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'File size exceeds the limit (5MB)']);
                exit;
            }

            $output .= "--PHP-mixed-$random_hash\n";
            $output .= "Content-Type: $fileType; name=\"$name\"\n";
            $output .= "Content-Disposition: attachment\n";
            $output .= "Content-Transfer-Encoding: base64\n\n";
            $output .= chunk_split(base64_encode(file_get_contents($fileTmpName)));
            $output .= "\n\n";
        }
    }

    $output .= "--PHP-mixed-$random_hash--";

    // Wysyłanie e-maila
    $mail_status = mail($to, mb_encode_mimeheader($subject), $output, $headers);

    // Sprawdzanie statusu wysyłki
    if ($mail_status) {
        http_response_code(200);
        echo json_encode(['status' => 'sent']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error sending email']);
    }

} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
}
?>
