 <?php
 if(isset($_POST)){
	//Site Url
	$url = 'http://servermaintain.com/contact/';
	//==========================
	//   mail to admin start  //
	//==========================
	//Change your site name
	$site_name    		='Demo';
	//Change admin email
	$site_email 		= 'graphicrajkumar@gmail.com';
	$body               = file_get_contents($url.'email_template/contact.html');
	$body			    = str_replace("{SITE_URL}", $url, $body);
	$body			    = str_replace("{SITE_LOGO}", '<img src="'.$url.'images/logo.png border="0"/>', $body);
	$body			    = str_replace("{SITE_NAME}", $site_name, $body);
	$body			    = str_replace("{Form}", "Contact Us", $body);
	$body			    = str_replace("{Name}", $_POST['name'], $body);
	$body			    = str_replace("{Email}", $_POST['email'], $body);
	$body			    = str_replace("{Phone}", $_POST['phone'], $body);
	$body			    = str_replace("{Comments}", $_POST['message'], $body);
	$subject = 'New Contact Form Submitted From '.$site_name;
	$headers = "From: info@servermaintain.com\r\n";// change this with sender email
	$headers .= "Reply-To: ". strip_tags($_POST['email']) . "\r\n"; 
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	//send the message, check for errors
	try{
		if (mail($site_email, $subject, $body, $headers)){		
			// Auto responder to client
			$bodyuser               = file_get_contents($url.'email_template/auto_responder.html');
			$bodyuser			    = str_replace("{SITE_URL}", $url, $bodyuser);
			$bodyuser			    = str_replace("{SITE_LOGO}", '<img src="'.$url.'images/logo.png border="0"/>', $bodyuser);
			$bodyuser			    = str_replace("{SITE_NAME}", $store_name, $bodyuser);
			$bodyuser			    = str_replace("{Name}", $_POST['name'], $bodyuser);
			mail($_POST['email'], 'Thank you for submitting contact form', $bodyuser, $headers);
			echo '<div class="alert alert-success">Message has been sent.<button type="button" class="close" data-dismiss="alert">&times;</button></div>';
		}else{
			echo '<div class="alert alert-warning">Message can not sent. Try again another time.<button type="button" class="close" data-dismiss="alert">&times;</button></div>';
		}				
	}catch(Exception $e){
		echo '<div class="alert alert-warning">Message can not sent. Try again another time.<button type="button" class="close" data-dismiss="alert">&times;</button></div>';
	}
}
		