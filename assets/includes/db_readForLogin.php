<?php
 require_once('db_connect.php');
 
  // file_get_contents is needed for POST requests data
  $post_data = file_get_contents("php://input");
  $json_input = json_decode($post_data, TRUE);
  $resp = [];
  $resp['echo'] = $json_input;
  $resp['status'] = 'success';
  $resp['failType'] = '';
  $resp['message'] = '';
  
  $username = $json_input['username'];
  $password = $json_input['password'];
  
  try {
    $result = DB::query("SELECT * FROM user WHERE username = %s", $username);

    if (!password_verify($password, $result[0]['password'])) {
      $resp['status'] = 'fail';
      $resp['failType'] = 'app';
      $resp['message'] = 'Confirm Username and Password combination';
      //testing only
      // $resp['password'] = $password;
      // $resp['hash'] = $hashed_password = password_hash($password, PASSWORD_DEFAULT);
      // $resp['db'] = $result;
    }
   
    
  } catch (MeekroDBException $e) {
    $resp['status'] = 'fail';
    $resp['failType'] = 'db';
    $resp['message'] = $e->getMessage();
    $resp['query'] = $e->getQuery();
  }
  
  // $resp['query'] = $query;

 //convert the php array to json
  echo json_encode($resp);

?>