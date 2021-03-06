<?php
 require_once('db_connect.php');

/*
  find all the people the loggedin user is following
  find all the people the loggedin user is not following
*/
 function selectFollowingAndToFollower($loggedIn) {
   $resp = [];
   $resp['echo'] = loggedIn;
   try {
     $query = "SELECT username_poster AS username FROM following WHERE username_follower = %s";
     $resp['rows_following'] = DB::query($query, $loggedIn);
     $query = "SELECT username FROM user
              WHERE username != %s
              AND username NOT IN (" . $query . ")";
     $resp['rows_not_following'] = DB::query($query, $loggedIn, $loggedIn);
   } catch (MeekroDBException $e) {
     $resp['status'] = 'fail';
     $resp['failType'] = 'db';
     $resp['message'] = $e->getMessage();
     $resp['query'] = $e->getQuery();
   }
   return $resp;
 }

/*

*/
 function selectPostsAndVotes() {
    $resp = [];

    try {
      $query = "SELECT post.*, COALESCE(SUM(vote.direction),0) as voteTotal ";
      $query = $query . " FROM post LEFT JOIN vote ON post.id = vote.postId ";
      $query = $query . "   GROUP BY post.id ORDER BY post.create_date DESC";

      $resp['rows'] = DB::query($query);
      $resp['query'] = $query;
      $resp['status'] = 'success';
    } catch (MeekroDBException $e) {
      $resp['status'] = 'fail';
      $resp['failType'] = 'db';
      $resp['message'] = $e->getMessage();
      $resp['query'] = $e->getQuery();
    }

    return $resp;
 }


 function selectPostsVotesFollowing($loggedInUserName) {
    $resp = [];

    try {
      $query = "SELECT b.*, a.username_poster AS following, CASE WHEN a.username_poster IS NULL THEN 0 ELSE 1 END AS following_flag FROM
          ( SELECT post.*, COALESCE(SUM(vote.direction),0) as voteTotal
            FROM post LEFT JOIN vote ON post.id = vote.postId
      	     GROUP BY post.id ORDER BY post.create_date DESC ) b
             LEFT JOIN
              (SELECT username_poster FROM following WHERE username_follower = %s) a
             ON  b.username = a.username_poster ";

      // $query = "SELECT post.*, COALESCE(SUM(vote.direction),0) as voteTotal ";
      // $query = $query . " FROM post LEFT JOIN vote ON post.id = vote.postId ";
      // $query = $query . "   GROUP BY post.id ORDER BY post.create_date DESC";

      $resp['rows'] = DB::query($query, $loggedInUserName);
      $resp['query'] = $query;
      $resp['status'] = 'success';
    } catch (MeekroDBException $e) {
      $resp['status'] = 'fail';
      $resp['failType'] = 'db';
      $resp['message'] = $e->getMessage();
      $resp['query'] = $e->getQuery();
    }

    return $resp;
 }

  function select($input) {
    $resp = [];
    $resp['echo'] = $input;
    $predicate = "";
    if (!empty($input['where'])) {
      $predicate = $predicate . " AND ";
      foreach($input['where'] as $key => $val) {
        if ($key == 'password') {
            continue;
        } else {
             if (is_numeric($val)) {
                $predicate = $predicate . " " . $key . "'" . $val . "'";
             } else {
               $predicate = $predicate . " " . $key . "'" . $val . "'";  //key will also contain the operator like "=", "<", ">"
            }
        }
      }
    }
    if (!empty($input['order'])) {
      $predicate = $predicate . " ORDER BY " . $input['order'];
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


	function getUserIP()
	{
    	$client  = @$_SERVER['HTTP_CLIENT_IP'];
    	$forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    	$remote  = $_SERVER['REMOTE_ADDR'];

    	if(filter_var($client, FILTER_VALIDATE_IP))
    	{
      	  $ip = $client;
    	}
    	else if(filter_var($forward, FILTER_VALIDATE_IP))
    	{
      	  $ip = $forward;
    	}
    	else
    	{
      	  $ip = $remote;
    	}

  	  return $ip;
	}

?>
