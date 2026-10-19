<?php
/**
 * GCC Enable: optional contact handler using PHP mail() on Hostinger.
 *
 * DISABLED BY DEFAULT. To use it instead of Web3Forms:
 *   1. Set $ENABLED = true and update $TO_EMAIL / $FROM_EMAIL below.
 *      $FROM_EMAIL must be a mailbox on your own domain (create it in Hostinger > Emails).
 *   2. In src/config/site.ts set formHandler: 'php'.
 *   3. Rebuild (npm run build) and upload dist/ again.
 */

$ENABLED    = false;
$TO_EMAIL   = 'hello@gccenable.com';      // where enquiries are delivered
$FROM_EMAIL = 'website@gccenable.com';    // must exist on your domain
$ALLOWED_ORIGINS = ['https://gccenable.com', 'https://www.gccenable.com'];

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

function respond($code, $ok, $message) {
    http_response_code($code);
    echo json_encode(['success' => $ok, 'message' => $message]);
    exit;
}

if (!$ENABLED) respond(503, false, 'PHP form handler is disabled.');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, false, 'Method not allowed.');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && !in_array($origin, $ALLOWED_ORIGINS, true)) respond(403, false, 'Origin not allowed.');

// Honeypot
if (!empty($_POST['botcheck'])) respond(200, true, 'Thanks.');

// Simple rate limit: one submission per IP every 30 seconds
session_start();
if (isset($_SESSION['last_submit']) && time() - $_SESSION['last_submit'] < 30) {
    respond(429, false, 'Please wait a moment before sending again.');
}

function clean($key, $max = 2000) {
    $v = isset($_POST[$key]) ? trim((string) $_POST[$key]) : '';
    $v = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $v);
    return mb_substr(strip_tags($v), 0, $max);
}

$type  = clean('form_type', 40) ?: 'Contact';
$email = filter_var(clean('email', 200), FILTER_VALIDATE_EMAIL);
if (!$email) respond(422, false, 'Please provide a valid email address.');

$fields = [
    'Name'             => clean('name', 200),
    'Email'            => $email,
    'Company / GCC'    => clean('company', 200),
    'Role'             => clean('role', 200),
    'City'             => clean('city', 100),
    'Team size'        => clean('team_size', 100),
    'Area of interest' => clean('interest', 1000),
    'LinkedIn'         => clean('linkedin', 300),
    'Consent'          => clean('consent', 10),
];
$message = isset($_POST['message']) ? mb_substr(strip_tags(trim((string) $_POST['message'])), 0, 5000) : '';

if ($type === 'Contact' && (!$fields['Name'] || !$fields['Company / GCC'] || !$message)) {
    respond(422, false, 'Please complete the required fields.');
}

$body = "New {$type} submission from gccenable.com\n\n";
foreach ($fields as $label => $value) {
    if ($value !== '') $body .= "{$label}: {$value}\n";
}
if ($message) $body .= "\nMessage:\n{$message}\n";

$subject = $type === 'Newsletter' ? 'New newsletter signup: GCC Enable' : 'New discovery call request: GCC Enable website';
$headers = [
    'From: GCC Enable website <' . $FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

if (mail($TO_EMAIL, $subject, $body, implode("\r\n", $headers))) {
    $_SESSION['last_submit'] = time();
    respond(200, true, 'Thanks, your message has been sent.');
}
respond(500, false, 'Sorry, the message could not be sent.');
