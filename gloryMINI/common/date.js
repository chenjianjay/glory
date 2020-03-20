module.exports = function date(a) {
	let date = new Date(a);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let h = date.getHours();
	let m = date.getMinutes()
	let s = date.getSeconds()
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;
	h = h > 9 ? h : '0' + h;
	m = m > 9 ? m : '0' + m;
	s = s > 9 ? s : '0' + s;
	return `${year}-${month}-${day} ${h}:${m}:${s}`;
}