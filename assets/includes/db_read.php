<?php
 require_once('db_connect.php');
 require_once('util.php');
   $resp = [];
  // file_get_contents is needed for POST requests data
  $post_data = file_get_contents("php://input");
  if ( !empty($post_data) ) {
      $json_input = json_decode($post_data, TRUE);
      if ($json_input['table'] == 'postAndVote') {
        $resp['dbRead'] = selectPostsAndVotes();
      } else if ($json_input['table'] == 'followingAndToFollower') {
        $resp['dbRead'] = selectFollowingAndToFollower($json_input['username']);
      } else {
        //generic read function
        $resp['dbRead'] = select($json_input);
      }
  }
  echo json_encode($resp, JSON_NUMERIC_CHECK);
?>
