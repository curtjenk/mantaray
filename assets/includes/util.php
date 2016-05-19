<?php
 require_once('db_connect.php');

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

 function select($input) {
    $resp = [];   
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
    if (!empty($input['order'])) {
      $predicate = $predicate . " " . $input['order'];
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





