<?php
 
//connect to MySql database
try {
    $dbc=new PDO("mysql:host=localhost;dbname=Red social","root","12345") 
     or die("Unable to connect.");
}
catch(PDOException $e)
    {
      echo "Error: " . $e->getMessage();
    }
 
?>
