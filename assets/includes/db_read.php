<?php
 require_once('db_connect.php');
 
  // file_get_contents is needed for POST requests data
  if ( !empty($_POST) ) {
      $post_data = file_get_contents("php://input");
      $json_input = json_decode($post_data, TRUE);
      $resp = [];
      $resp = select($json_input);
   //convert the php array to json
      echo json_encode($resp);
  }

  function select($input) {
    $resp = [];
    $resp['echo'] = $input;
    $resp['func'] = 'db_read-select';
    // $resp['failType'] = '';
    // $resp['message'] = '';
  
    $predicate = "";
    if (!empty($input['where'])) {
      foreach($input['where'] as $key => $val) {
        if (strlen($predicate) > 0) {
            $predicate = $predicate . " AND ";
        }
        if ($key == 'password') {
            continue;
        } else {
            $predicate = $predicate . " " . $key . "='" . $val . "'";
        }
      }
    }

    try {
      $query = "SELECT * FROM " . $input['table'] . " WHERE 1=1 " . $predicate;
      $resp['status'] = 'success';
      $resp['rows'] = DB::query($query);
      $resp['query'] = $query;
    } catch (MeekroDBException $e) {
      $resp['status'] = 'fail';
      $resp['failType'] = 'db';
      $resp['message'] = $e->getMessage();
      $resp['query'] = $e->getQuery();
    }

    return $resp;
  }

   
 

?>