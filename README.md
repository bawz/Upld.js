#Upld.js
###A simple javascript multiple file upload plugin

Upld.js is very simple to use to use. Just simply download two files, the upld.js file of your choice and the upld.php file. Now just make sure to have those two files in the same directory. Then include the `upld.js` file.

```html
<script src="path/to/upld/upld.js"></script>
```

Now just create an instance of the Upld object.

```html
<script>
	window.addEventListener('load', function () {
		var go = new Upld('path/to/save/files/');
	});
</script>
```

The argument we pass in is the local path we want the files to be stored. Just make sure it ends with `/`.
Then create a div with the id of `start_upld`.

```html
<div id="start_upld"></div>
```

That's all we have to do, the script will do the rest.
