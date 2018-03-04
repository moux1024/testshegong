const imgFile = {};
const date = document.querySelector('.date')
const ifsw = Date.parse('2018/3/20')

document.ontouchmove = function(event) {
	event.preventDefault();
}

document.querySelector('#file-input').onchange = function(event) {
	const file = event.target.files[0];
	transformFileToDataUrl(file)
}


function transformFileToDataUrl(file) {
	var cut = document.querySelector('.cut')
	cut.style.display = 'block'
	var pc = new PhotoClip('.cut', {
		adaptive: ['100%', '50%'],
		img: file,
		outputQuality: 1,
		ok: '#ok',
		maxZoom: 0,
		lrzOption: {
			quality: 1
		},
		style: {
			maskColor: 'rgba(0,0,0,1)'
		},
		done: function(dataURL) {
			pc.clear()
			cut.style.display = 'none'
			document.querySelector('.shu').style.display = 'none'
			document.querySelector('.heng').style.display = 'none'
			const img = document.querySelector('.img')
			if (img.querySelectorAll('img').item(0) == null) {
				const setImg = document.createElement('img')
				setImg.src = dataURL
				img.append(setImg)
			} else {
				img.querySelectorAll('img').item(0).src = dataURL
			}
		}
	});
	document.querySelector('.close').ontouchend = function() {
		cut.style.display = 'none'
		pc.destroy();
	}
	/*let Orientation = null
	let ImageWidth = null
	EXIF.getData(file, function() {
		EXIF.getAllTags(this);
		Orientation = EXIF.getTag(this, 'Orientation');
		ImageWidth = EXIF.getTag(this, 'ImageWidth');
	});
	const reader = new FileReader();
	reader.onload = function(e) {
		var image = new Image();
		image.src = e.target.result;
		image.onload = function() {
			var expectWidth = this.naturalWidth;
			var expectHeight = this.naturalHeight;

			if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
				expectWidth = 800;
				expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
			} else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
				expectHeight = 1200;
				expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
			}
			var canvas1 = document.createElement("canvas");
			var ctx = canvas1.getContext("2d");
			canvas1.width = expectWidth;
			canvas1.height = expectHeight;
			ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
			var base64 = null;
			if (navigator.userAgent.match(/iphone/i)) {
				if (Orientation != "" && Orientation != 1) {
					switch (Orientation) {
						case 6:
							rotateImg(this, 'left', canvas1);
							break;
						case 8:
							rotateImg(this, 'right', canvas1);
							break;
						case 3:
							rotateImg(this, 'right', canvas1);
							rotateImg(this, 'right', canvas1);
							break;
					}
				}
				base64 = canvas1.toDataURL("image/jpeg", 0.8);
			} else if (navigator.userAgent.match(/Android/i)) {
				base64 = e.target.result
			} else {
				if (Orientation != "" && Orientation != 1) {
					switch (Orientation) {
						case 6:
							rotateImg(this, 'left', canvas1);
							break;
						case 8:
							rotateImg(this, 'right', canvas1);
							break;
						case 3:
							rotateImg(this, 'right', canvas1);
							rotateImg(this, 'right', canvas1);
							break;
					}
				}
				base64 = canvas1.toDataURL();
			}
			var cut = document.querySelector('.cut')
			cut.style.display = 'block'
			var pc = new PhotoClip('.cut', {
				adaptive: ['100%', '50%'],
				outputSize: '100%',
				outputType: 'png',
				img: base64,
				ok: '#ok',
				done: function(dataURL) {
					cut.style.display = 'none'
					document.querySelector('.shu').style.display = 'none'
					document.querySelector('.heng').style.display = 'none'
					const img = document.querySelector('.img')
					if (img.querySelectorAll('img').item(0) == null) {
						const setImg = document.createElement('img')
						setImg.src = dataURL
						img.append(setImg)
					} else {
						img.querySelectorAll('img').item(0).src = dataURL
					}
				}
			})
		}
	}
	reader.readAsDataURL(file);*/
}

/*function rotateImg(img, direction, canvas) {
	var min_step = 0;
	var max_step = 3;
	if (img == null) return;
	var height = img.height;
	var width = img.width;
	var step = 2;
	if (step == null) {
		step = min_step;
	}
	if (direction == 'right') {
		step++;
		step > max_step && (step = min_step);
	} else {
		step--;
		step < min_step && (step = max_step);
	}
	var degree = step * 90 * Math.PI / 180;
	var ctx = canvas.getContext('2d');
	switch (step) {
		case 0:
			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(img, 0, 0);
			break;
		case 1:
			canvas.width = height;
			canvas.height = width;
			ctx.rotate(degree);
			ctx.drawImage(img, 0, -height);
			break;
		case 2:
			canvas.width = width;
			canvas.height = height;
			ctx.rotate(degree);
			ctx.drawImage(img, -width, -height);
			break;
		case 3:
			canvas.width = height;
			canvas.height = width;
			ctx.rotate(degree);
			ctx.drawImage(img, -width, 0);
			break;
	}
}*/


function selects(selected) {
	switch (selected) {
		case 'yes':
			date.style.display = 'block';
			break;
		default:
			date.style.display = 'none';
			break
	}
}


function dates(e) {
	if (e.value.length > 0) {
		date.querySelectorAll('input').item(0).classList.add("full");
	} else {
		date.querySelectorAll('input').item(0).classList.remove("full");
	}
}



//立即生成
function generate() {
	const set_name = document.querySelector("#name").value
	const set_type = document.querySelector("#type").value
	const set_date = (document.querySelector("#date").value).replace(/\-/g, "/")
	const img = document.querySelector('.img').querySelectorAll('img').item(0)
	if (img !== null) {
		if (set_name.length > 0) {
			if (set_type !== 'none') {
				document.querySelector(".get_name").innerHTML = `我是${set_name}`
				if (set_type == 'yes') {
					if (set_date.length > 0) {
						const get_date = parseInt((ifsw - Date.parse(set_date)) / (1000 * 60 * 60 * 24) + 1)
						document.querySelector('.set').style.display = 'none'
						document.querySelector('.get').style.display = 'block'
						const yes_t = document.querySelectorAll('.yes_t')
						for (let i = 0; i < yes_t.length; i++) {
							yes_t[i].style.display = 'block'
						}
						document.querySelector('.yes_t1').style.opacity = '1'
						document.querySelector('.call').style.display = 'none'
						document.querySelector(".get_date").innerHTML = `今天是我加入社工第${get_date}天`
						switch (get_date.toString().length) {
							case 4:
								document.querySelector(".qian").innerHTML = get_date.toString().charAt(0)
								document.querySelector(".bai").innerHTML = get_date.toString().charAt(1)
								document.querySelector(".shi").innerHTML = get_date.toString().charAt(2)
								document.querySelector(".ge").innerHTML = get_date.toString().charAt(3)
								break
							case 3:
								document.querySelector(".qian").innerHTML = 0
								document.querySelector(".bai").innerHTML = get_date.toString().charAt(0)
								document.querySelector(".shi").innerHTML = get_date.toString().charAt(1)
								document.querySelector(".ge").innerHTML = get_date.toString().charAt(2)
								break
							case 2:
								document.querySelector(".qian").innerHTML = 0
								document.querySelector(".bai").innerHTML = 0
								document.querySelector(".shi").innerHTML = get_date.toString().charAt(0)
								document.querySelector(".ge").innerHTML = get_date.toString().charAt(1)
								break
							case 1:
								document.querySelector(".qian").innerHTML = 0
								document.querySelector(".bai").innerHTML = 0
								document.querySelector(".shi").innerHTML = 0
								document.querySelector(".ge").innerHTML = get_date.toString().charAt(0)
								break
						}
						document.querySelector(".download").style.display = 'block'
						convert2canvas()
					} else {
						document.querySelector('.erro').innerHTML = '请选择日期'
						setTimeout("document.querySelector('.erro').innerHTML = ''", 2000)
					}
				} else {
					document.querySelector('.set').style.display = 'none'
					document.querySelector('.get').style.display = 'block'
					const yes_t = document.querySelectorAll('.yes_t')
					for (let i = 0; i < yes_t.length; i++) {
						yes_t[i].style.display = 'none'
					}
					document.querySelector('.text').style.marginTop = (15 / 32.5) + 'rem'
					document.querySelector('.yes_t1').style.opacity = '0'
					document.querySelector('.call').style.display = 'block'
					document.querySelector(".download").style.display = 'block'
					convert2canvas()
				}
			}
		} else {
			document.querySelector('.erro').innerHTML = '请输入姓名'
			setTimeout("document.querySelector('.erro').innerHTML = ''", 2000)
		}
	} else {
		document.querySelector('.erro').innerHTML = '请上传图片'
		setTimeout("document.querySelector('.erro').innerHTML = ''", 2000)
	}
}



//截图函数
function convert2canvas() {
	var shareContent = document.querySelector('.wrap');
	var width = shareContent.offsetWidth;
	var height = shareContent.offsetHeight;
	var canvas = document.createElement("canvas");
	var scale = 2;

	canvas.width = width * scale;
	canvas.height = height * scale;
	canvas.getContext("2d").scale(scale, scale);

	var opts = {
		scale: scale,
		canvas: canvas,
		width: width,
		height: height
	};
	html2canvas(shareContent, opts).then(function(canvas) {
		var context = canvas.getContext('2d');
		var download = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);
		document.querySelector('.download').append(download)
		download.style.width = canvas.width / 2 + "px"
		download.style.height = canvas.height / 2 + "px"
		document.querySelector('.save').classList.add('hei55')
		document.querySelector('.save').classList.remove('hei0')
		setTimeout(function() {
			document.querySelector('.save').classList.remove('hei55')
			document.querySelector('.save').classList.add('hei0')
		}, 3000)
	});
}