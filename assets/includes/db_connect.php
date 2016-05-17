<?php
  require_once "../libs/meekrodb.2.3.class.php";
  DB::$error_handler = false; // since we're catching errors, don't need error handler
  DB::$throw_exception_on_error = true;
  DB::$host = '127.0.0.1';
  DB::$dbName= 'mantaray';
  DB::$user = 'x';
  DB::$password = 'x';

//Determine if we are to test if we can successfully conntect to the DB
   // if (isset($_GET['test']) && $_GET['test'] == 'true') {
   //     $dbStatus = openDBConnection();
   //     echo json_encode($dbStatus);
   //     exit;
   // }
       
  //  $dbStatus = openDBConnection();

  
  // function openDBConnection() {
  //     $rtn = [];
  //     $rtn['status'] = 'success';

  //     $link = @mysql_connect('127.0.0.1', 'x', 'x');

  //     if(!$link){
  //       $rtn['status'] = 'fail';
  //       $rtn['reason'] = 'Not Connected';
  //       return $rtn;
  //     } 
      
  //     $db_selected = @mysql_select_db('bookmarks', $link);
  //     if(!$db_selected){
  //       $rtn['status'] = "fail";
  //       $rtn['reason'] = "Cannot use database bookmarks";
        
  //    } 
    
  //    return $rtn;
  // }	

?>





