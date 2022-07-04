const roomsDropdown = document.getElementById("room");

const socket = io();

let rooms = [];
socket.emit("getRooms");
socket.on("getRooms", data => {
	rooms = data;
	let html = ``;
	data.forEach(
		room => (html += `<option value=${room.name}>${room.name}</option>`)
	);
	roomsDropdown.innerHTML = html;
});

document.getElementById("btn-create-room").addEventListener("click", () => {
	const roomname = document.getElementById("roomname").value;
	if (!roomname || roomname.length == 0) {
		alert(`Room name cannot be empty.`);
		return;
	}

	let alreadyExists = rooms.find(
		k => k.name.toLowerCase() === roomname.toLowerCase()
	);
	if (alreadyExists) {
		alert(`Room already exists with same name.`);
		return;
	}

	socket.emit("addRoom", { name: roomname });
	// socket.emit("getRooms");
	document.getElementById("roomname").value = ``;
	alert(`New room created.`);
});
