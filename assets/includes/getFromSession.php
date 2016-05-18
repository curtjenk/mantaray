<?php
  session_start($_GET['session_id']);
  $key = $_GET['key'];
  echo json_encode($_SESSION[$key]);
?>





