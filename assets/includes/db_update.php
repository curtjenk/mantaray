<?php

  require('includes/db_connect.php');
   $resp = [];
  // header('Content-type:application/json');
  $post_data = file_get_contents("php://input");
  if ( !empty($post_data) ) {
      $json_input = json_decode($post_data, TRUE);
      $resp['echo'] = $json_input;
      $func = $json_input['func'];
      $vote = $json_input['vote'];

      if ($func == 'update_vote_count' && ($vote == 'up' || $vote == 'down'))  {
         //request should have a func and vote ('up' or 'down')
        $postId = $json_input['postId'];
        $resp = updateVoteCount($postId, $vote);
      }
      
   //convert the php array to json

  }

  function updateVoteCount($postId, $vote) {
    $resp = [];
   
    // Read the vote(s) for this post id
    // increment or
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

  echo json_encode($resp);

?>