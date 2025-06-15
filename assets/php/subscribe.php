<?php
header('Content-Type: application/json');

// Get and validate email
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);

if (!$email) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

$file = __DIR__.'/../private/subscribers.txt';

// Verify file is writable or can be created
if (!is_writable(dirname($file))) {
    echo json_encode([
        'success' => false,
        'message' => 'Directory not writable',
        'debug' => 'Check folder permissions'
    ]);
    exit;
}

// Try writing with error handling
try {
    $result = file_put_contents($file, $email.PHP_EOL, FILE_APPEND | LOCK_EX);
    
    if ($result === false) {
        throw new Exception('File write failed');
    }
    
    echo json_encode(['success' => true, 'message' => 'Thank you for subscribing!']);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save subscription',
        'debug' => $e->getMessage()
    ]);
}