<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $telephone = isset($_POST['telephone']) ? htmlspecialchars($_POST['telephone']) : '';

    // Read existing data from the file, if any
    $filename = 'data.json';

    // Check if the file exists
    if (file_exists($filename)) {
        // Read existing data from the file
        $existingData = file_get_contents($filename);

        // Decode existing JSON data
        $existingArray = json_decode($existingData, true);
    } else {
        // If the file doesn't exist, initialize an empty array
        $existingArray = array();
    }

    // Append new data to the existing array
    $newData = array(
        'name' => $name,
        'email' => $email,
        'telephone' => $telephone
    );

    $existingArray[] = $newData;

    // Convert the updated array to JSON format
    $updatedData = json_encode($existingArray, JSON_PRETTY_PRINT);

    // Save the updated JSON data to the file
    file_put_contents($filename, $updatedData);

    echo 'Form data added successfully!';
} else {
    echo 'Invalid request!';
}
?>