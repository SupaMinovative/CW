<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") { 

    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);
    $sender = htmlspecialchars($_POST["sender"]);
    $tel = htmlspecialchars($_POST["tel"]);
    $num = htmlspecialchars($_POST["num"]);
    $location = htmlspecialchars($_POST["location"]);
    $postal = htmlspecialchars($_POST["postal"]);
    $date = htmlspecialchars($_POST["date"]);
    $person = htmlspecialchars($_POST["person"]); 
    $to = "info@xx.com";  
 
    $headers = "Sender: $sender\r\n";
    $headers .= "Reply-To: $sender\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    $message .= "\nFrom: $sender";
    $message .= "\nContact Person: $person";
    $message .= "\n\nTel: $tel";
    $message .= "\nGuest No.: $num";
    $message .= "\nLocation: $location";
    $message .= "\nZIP code: $postal";
    $message .= "\nContact Person: $person";
    $message .= "\nDate: $date";

     
    if (mail($to, $subject, $message, $headers)) {
        $response = '
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vielen Dank!</title>
    <style>
        body {
            margin: auto;
            background-color: rgb(242, 162, 71);
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
          .message {
        top: 50%;
        left: 50%;
        text-align: center;
        position: absolute;
        padding: 20px;
        margin: auto;
        background-color: #fff;
        border: 1px solid #ddd;
        font-size: 18px;
        border-radius: 5px;
        display: block;
        transform: translate(-50%, -50%);
      }

        a {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="message">
        <p>Hallo, ' . htmlspecialchars($person) . '! Vielen Dank für Ihre Kontaktaufnahme.</p>
        <p>Ihre E-Mail wurde erfolgreich versendet, und wir werden uns bald bei Ihnen melden.</p>
        <p><a href="index.html">Zurück zur Startseite</a></p>
    </div>
</body>
</html>
'; echo $response;
    } else {
        echo "Beim Senden der E-Mail ist ein Fehler aufgetreten.";
    }
}  
 
