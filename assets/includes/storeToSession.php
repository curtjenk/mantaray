<?php
 session_start($_GET['session_id']);
$key = $_GET['key'];
$value = $_GET['value'];
$_SESSION[$key] = $value;

?>





