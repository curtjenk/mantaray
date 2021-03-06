<?php
  require_once('db_connect.php');
  require_once('util.php');
  // file_get_contents is needed for POST requests data
  // plus json_decode since I'm posting json_format
  $post_data = file_get_contents("php://input");
  $json_input = json_decode($post_data, TRUE);
  $resp = [];

  $func = $json_input['func'];

  if ($func == 'create_user') {
      $resp = createUser($json_input);
  } else
  if ($func == 'create_post') {
      $resp = createPost($json_input);
  } else
  if ($func == 'create_vote') {
      $resp = createVote($json_input);
  } else
  if ($func == 'create_follower') {
      $resp = createFollower($json_input);
  }

  //$resp['echo'] = $json_input;
  echo json_encode($resp, JSON_NUMERIC_CHECK);

  function createFollower ($input) {
      $resp = [];
      $resp['status'] = 'success';
      $resp['echo'] = $input;

      $text = $input['postText'];
      $username_poster = $input['username_poster'];
      $username_follower = $input['username_follower'];
      $postId = $input['postId'];

      try {
          DB::insert('following', array(
            'postId' => $postId,
            'username_follower' => $username_follower,
            'username_poster' => $username_poster
          ));
      } catch (MeekroDBException $e) {
          $resp['status'] = 'fail';
          $resp['failType'] = 'db';
          $resp['message'] = $e->getMessage();
          $resp['query'] = $e->getQuery();
      }

      return $resp;
  }

function createVote ($input) {
    $resp = [];
    $resp['status'] = 'success';
    $resp['echo'] = $input;

    $text = $input['postText'];
    $username = $input['username'];
    $postId = $input['postId'];
    $direction = $input['direction'];

      try {
        DB::insert('vote', array(
          'username' => $username,
          'postId' => $postId,
          'direction' => $direction
        ));

        $dbResults = DB::query("SELECT SUM(direction) AS voteTotal FROM vote WHERE postId = %i", $postId);
        $resp['voteTotal'] = $dbResults[0]['voteTotal'];

      } catch (MeekroDBException $e) {
        $resp['status'] = 'fail';
        $resp['failType'] = 'db';
        $resp['message'] = $e->getMessage();
        $resp['query'] = $e->getQuery();
      }


    return $resp;
}

function createPost ($input) {
    $resp = [];
    $resp['echo'] = $input;
    $resp['status'] = 'success';

    $text = $input['postText'];
    $username = $input['username'];

      try {
        DB::insert('post', array(
          'username' => $username,
          'text' => $text
        ));

        if ($input['returnAll']) {
          $i = [];
          $resp['returnAll'] = selectPostsAndVotes();
        }
      } catch (MeekroDBException $e) {
        $resp['status'] = 'fail';
        $resp['failType'] = 'db';
        $resp['message'] = $e->getMessage();
        $resp['query'] = $e->getQuery();
      }


    return $resp;
  }

  function createUser ($input) {
    $resp = [];
    $resp['status'] = 'success';
    $password = $input['password'];
    $username = $input['username'];
    $name = $input['name'];
    $email = $input['email'];
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $result = DB::query("select * from user where username = %s", $username);

    if ($result) {  //something was returned
      $resp['status'] = 'fail';
      $resp['failType'] = 'app';
      $resp['message'] = 'User Already Exists';
    } else {
      try {
        DB::insert('user', array(
          'username' => $username,
          'password' => $hashed_password,
          'email' => $email,
          'name' => $name
        ));
      } catch (MeekroDBException $e) {
        $resp['status'] = 'fail';
        $resp['failType'] = 'db';
        $resp['message'] = $e->getMessage();
        $resp['query'] = $e->getQuery();
      }
    }

    return $resp;
  }

?>
