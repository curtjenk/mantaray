<?php
  require_once "../libs/meekrodb.2.3.class.php";
  DB::$error_handler = false; // since we're catching errors, don't need error handler
  DB::$throw_exception_on_error = true;
  DB::$host = '127.0.0.1';
  DB::$dbName= 'mantaray';
  DB::$user = 'x';
  DB::$password = 'x';
?>





