<?php
 require_once('db_connect.php');
 
  // file_get_contents is needed for POST requests data
  $post_data = file_get_contents("php://input");
  $json_input = json_decode($post_data, TRUE);
  $resp = [];
  $resp['echo'] = $json_input;
  $resp['status'] = 'success';
  $resp['failType'] = 'app';
  $resp['message'] = '';
  
  $username = $json_input['username'];
  
  try {
    $query = "SELECT * FROM user WHERE username =%s";
    $resp['rows'] = DB::query($query, $username);
    
  } catch (MeekroDBException $e) {
    $resp['status'] = 'fail';
    $resp['failType'] = 'db';
    $resp['message'] = $e->getMessage();
    $resp['query'] = $e->getQuery();
  }
  
  $resp['query'] = $query;

 //convert the php array to json
  echo json_encode($resp);

?>