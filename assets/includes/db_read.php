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
  
  // $query_string = " WHERE 1=1 ";
  $verify_password = false;
  $predicate = "";
  foreach($json_input['where'] as $key => $val) {
    if (strlen($predicate) > 0) {
      $predicate = $predicate . " AND ";
    }
    if ($key == 'password') {
      $verify_password = true;
    } else {
      $predicate = $predicate . " " . $key . "='" . $val . "'";
    }
  }

  try {
    $query = "SELECT * FROM " . $json_input['table'] . " WHERE 1=1 AND " . $predicate;
    $resp['rows'] = DB::query($query);
  } catch (MeekroDBException $e) {
    $resp['status'] = 'fail';
    $resp['failType'] = 'db';
    $resp['message'] = $e->getMessage();
    $resp['query'] = $e->getQuery();
  }
  
  $resp['query'] = $query;
   
  function getUserForLogin () 

 //convert the php array to json
  echo json_encode($resp);

?>