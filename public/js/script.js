

function toggleMobileNav() {
	var elm = document.getElementById("navbar");
	if(elm.className === "navbar-display") {
		elm.className = "";
	} else {
		elm.className = "navbar-display";
	}
}
