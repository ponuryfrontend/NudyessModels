<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
</head>
<body>

    <h2>Contact Form</h2>

    <form action="testfile.php" method="post" enctype="multipart/form-data">
        <!-- First Name Input -->
        <label for="first_name">First Name:</label>
        <input type="text" id="first_name" name="first_name" required>

        <!-- Last Name Input -->
        <label for="last_name">Last Name:</label>
        <input type="text" id="last_name" name="last_name" required>

        <!-- File Input for Attachment -->
        <label for="attachment">Attachment:</label>
        <input type="file" id="attachment" name="attachment" accept=".pdf, .doc, .docx">

        <!-- Submit Button -->
        <button type="submit">Submit</button>
    </form>
<pre><?php 
echo "files: \n";
var_dump($_FILES);
echo "post: \n";
var_dump($_POST);

echo "server";
var_dump($_SERVER);

?><pre>

</body>
</html>
