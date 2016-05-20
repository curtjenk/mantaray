<?php

  require_once('db_connect.php');

  $data = file_get_contents("php://input");
  $input = json_decode($data, TRUE);
  $resp = [];
  $resp['echo'] = $input;
  try {
    DB::delete('following', 'username_follower = %s AND username_poster=%s', $input['username_follower'], $input['username_poster']);
    $resp['status'] = 'success';
  } catch (MeekroDBException $e){
    $resp['status'] = 'fail';
    $resp['failType'] = 'db';
    $resp['message'] = $e->getMessage();
    $resp['query'] = $e->getQuery();
  }

  echo json_encode($resp);

?>
