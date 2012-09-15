<?
/* Upld.js by @jzn99 */
if (!empty($_FILES['files'])) {
	$uploaded = array();
	$saveto = getallheaders();
	$saveto = $saveto['Save-Path'];
	foreach ($_FILES['files']['name'] as $k => $v) {
		if ($_FILES['files']['error'][$k] == 0 && move_uploaded_file($_FILES['files']['tmp_name'][$k], "{$saveto}/{$v}")) {
			$uploaded[] = $v;
		}
	}
	
	if (!empty($_POST['ajax'])) {
		die(json_encode($uploaded));
	}
	
}

?>