<?php


// Show all information, defaults to INFO_ALL


// Fetching Values From URL
$ID2 = $_POST['ID1'];
$name2 = $_POST['name1'];
$cname2 = $_POST['cname1'];
$CID2 = $_POST['CID1'];
$MS2 = $_POST['MS1'];
$ME2 = $_POST['ME1'];
$TS2 = $_POST['TS1'];
$TE2 = $_POST['TE1'];
$WS2 = $_POST['WS1'];
$WE2 = $_POST['WE1'];
$THS2 = $_POST['THS1'];
$THE2 = $_POST['THE1'];
$FS2 = $_POST['FS1'];
$FE2 = $_POST['FE1'];
$ML2 = $_POST['ML1'];
$TL2 = $_POST['TL1'];
$WL2 = $_POST['WL1'];
$THL2 = $_POST['THL1'];
$FL2 = $_POST['FL1'];
$connection = sqlsrv_connect("sdassistants.database.windows.net", "site", "Software1853920!"); // Establishing Connection with Server..
$db = mssql_select_db("SDAssistants", $connection); // Selecting Database
if (isset($_POST['ID1'])) {
$query = mssql_query("delete from assistants where id = '$ID2'");
$query = mssql_query("insert into assistants (id,cid,full_name,class,MondayS,TuesdayS,WednesdayS,ThursdayS,FridayS,MondayE,TuesdayE,WednesdayE,ThursdayE,FridayE,Mlocation,Tlocation,Wlocation,THlocation,Flocation) values('$ID2', '$CID2', '$name2','$cname2', '$MS2', '$TS2', '$WS2','$THS2', '$FS2', '$ME2', '$TE2','$WE2', '$THE2', '$FE2', '$ML2','$TL2', '$WL2', '$THL2', '$FL2')"); //Insert Query
echo "Form Submitted succesfully";
}
mssql_close($connection); // Connection Closed
?>