<?php 

//path, username, password, dbname
$conn = new mysqli("localhost", "admin", "", "mummypedia");

if($conn->connect_error) {
	die("COULD NOT CONNECT TO THE SERVER");
}

$res = array('error' => false);

$action = 'read_users';

if (isset($_GET['action'])) {
	$action = $_GET['action'];
}

//get data from users
if ($action == 'read_users') {
	$result = $conn->query("SELECT * FROM `users`");
	$users = array();

	while($row = $result->fetch_assoc()){
		array_push($users, $row);
	}
	$res['users'] = $users;
}
//get data from question
if ($action == 'read_question') {
	$result = $conn->query("SELECT * FROM `question`");
	$question = array();

	while($row = $result->fetch_assoc()){
		array_push($question, $row);
	}
	$res['question'] = $question;
}

// register
if($action == 'register_user') {

	$username = $_POST['username'];
	$mobile = $_POST['mobile'];
	$email = $_POST['email'];
	$address = $_POST['address'];

	$result = $conn->query("SELECT * FROM `users` WHERE `email` = '$email'");
	$users = array();

	if ($result->num_rows == 0) {
	 	
		$result = $conn->query("INSERT INTO `users` (`username`, `mobile`, `address`, `email`) VALUES ('$username', '$mobile', '$address', '$email')");

		if($result){
			$tip = $_POST['tip'];
			$emailTip = preg_replace('!\s+!', ' ',$_POST['emailTip']);

			$result = $conn->query("INSERT INTO `tips` (`tip`, `email`) VALUES ('$tip', '$emailTip')");

			if ($result) {
				$res['message'] = "User has been registered, successfully";
			} else {
				$res['error'] = true;
				$res['message'] = "Could not add user";
			}
		} 

	} 
	else {
		$res['message'] = "You have registered already you might want to login instead";
	}

}

if ($action == 'create') {
	
	$username = $_POST['username'];
	$email = $_POST['email'];
	$mobile = $_POST['mobile'];
	$address = $_POST['address'];

	$result = $conn->query("INSERT INTO `users` (`username`, `email`, `mobile`, `address`) VALUES ('$username', '$email', '$mobile', '$address' ) ");

	if ($result) {
		$res['message'] = "User addeded successfully";
	} else {
		$res['error'] = true;
		$res['message'] = "Could not add user";
	}

}

$conn->close();

header("Content-type: application/json");
echo json_encode($res);
die();