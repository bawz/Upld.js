var Upld = function (path) {
	window.upld = {};
	window.upld.path = path;
	this.init();
	document.getElementById('upld_submit').addEventListener('click', this.send);
};

Upld.prototype = {
	init : function () {
		var add = document.getElementById('start_upld'), form = document.createElement('form'), links = document.createElement('div'), holder = document.createElement('div'), span = document.createElement('span'), input = document.createElement('input'), button = document.createElement('button');
		form.setAttribute('action', ''); form.setAttribute('method', 'post'); form.setAttribute('enctype', 'multipart/form-data'); form.setAttribute('id', 'upld_form');
		links.setAttribute('id', 'upld_links');
		holder.setAttribute('id', 'upld_holder');
		span.setAttribute('id', 'upld_wait'); span.appendChild(document.createTextNode('Waiting...'));
		input.setAttribute('type', 'file'); input.setAttribute('name', 'files[]'); input.setAttribute('id', 'upld_files'); input.setAttribute('multiple', 'multiple');
		button.setAttribute('id', 'upld_submit'); button.setAttribute('type', 'submit'); button.setAttribute('name', 'submit'); button.appendChild(document.createTextNode('Upload'));
		holder.appendChild(span);
		form.appendChild(links);
		form.appendChild(holder);
		form.appendChild(input);
		form.appendChild(button);
		add.appendChild(form);
	},
	send : function (er) {
		er.preventDefault();
		er.stopPropagation();
		
		var file = document.getElementById('upld_files'), data = new FormData(), xml = new XMLHttpRequest(), form = document.getElementById('upld_form'), links = document.getElementById('upld_links'), holder = document.getElementById('upld_holder');
		
		var pisg = document.createElement('span');
		pisg.setAttribute('id', 'upld_prg');
		pisg.style.width = '0%';
		holder.innerHTML = '';
		holder.appendChild(pisg);
		var prg = document.getElementById('upld_prg');
		
		data.append('ajax', true);
		
		for (var i = 0; i < file.files.length; i++) {
			if (!(file.files[i] === '')) {
				data.append('files[]', file.files[i]);
			}
		}
		
		xml.upload.addEventListener('progress', function (e) {
			if (e.lengthComputable) {
				var percent = e.loaded / e.total;
				
				while (prg.hasChildNodes()) {
					prg.removeChild(prg.firstChild);
				}
				prg.appendChild(document.createTextNode(Math.round(percent * 100) + '%'));
				prg.style.width = Math.round(percent * 100) + '%';
			}
		});
		
		xml.upload.addEventListener('error', function (e) {
			alert('Upload Failed');
		});
		
		xml.addEventListener('readystatechange', function (e) {
			if (this.readyState == 4) {
				if (this.status == 200) {
					var uploaded = eval(this.response), div, a, input, span;
					for (var i = 0; i < uploaded.length; i++) {
						div = document.createElement('div');
						a = document.createElement('a');
						a.setAttribute('href', 'files/' + uploaded[i]);
						a.setAttribute('target', '_blank');
						a.appendChild(document.createTextNode(uploaded[i]));
						div.appendChild(a);
						links.appendChild(div);
					}
					document.getElementById('upld_form').removeChild(document.getElementById('upld_files'));
					input = document.createElement('input');
					input.setAttribute('type', 'file');
					input.setAttribute('name', 'files[]');
					input.setAttribute('id', 'upld_files');
					input.setAttribute('multiple', 'multiple');
					document.getElementById('upld_form').insertBefore(input, document.getElementById('upld_submit'));
					setTimeout(function () {
						prg.style.width = '0%';
						span = document.createElement('span');
						span.setAttribute('id', 'upld_wait');
						span.appendChild(document.createTextNode('Waiting..'));
						holder.innerHTML = '';
						holder.appendChild(span);
					}, 1500);
				} else {
					console.log('Server Replied with http status code: ' + this.status);
				}
			}
		});
		xml.open('POST', 'upld.php');
		xml.setRequestHeader('Cache-Control', 'no-chache');
		xml.setRequestHeader('Save-Path', window.upld.path);
		prg.style.display = 'block';
		holder.style.display = 'block';
		if (!(data === '')) {
			xml.send(data);
		}
	}
};