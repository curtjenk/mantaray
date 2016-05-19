<?php
  require('db_connect.php');
   $resp = [];
  // header('Content-type:application/json');
  $post_data = file_get_contents("php://input");
  if ( !empty($post_data) ) {
      $json_input = json_decode($post_data, TRUE);
      $resp['echo'] = $json_input;
      $func = $json_input['func'];
      if ($func == 'update_vote_count')  {
         //request should have a func and vote ('up' or 'down')
         $resp['results'] = updateVoteCount($postId, $vote);
      }
  }

  function updateVoteCount($input) {
    $resp = [];
    $resp['status'] = 'success';
    $vote = $input['vote'];
    $postId = $input['id'];

    // 1) Read the vote(s) for this post id
    // 2) increment or decement
    // 3) update the vote
  
    if ($vote == 'up') {
        $val = 1;
    } else if ($vote == 'down') {
       $val = -1;
    } else
       $val = 0; 


    // try {
    //   $query = "SELECT * FROM " . $input['table'] . " WHERE 1=1 " . $predicate;
    //   $resp['status'] = 'success';
    //   $resp['rows'] = DB::query($query);
    //   $resp['query'] = $query;
    // } catch (MeekroDBException $e) {
    //   $resp['status'] = 'fail';
    //   $resp['failType'] = 'db';
    //   $resp['message'] = $e->getMessage();
    //   $resp['query'] = $e->getQuery();
    // }

    return $resp;
  }

  echo json_encode($resp);

?>