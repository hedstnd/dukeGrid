var inp = {"arr":[[["Elton Brand","Jason Williams","Mike Dunleavy","Jabari Parker","Luol Deng","Wendell Carter Jr."],["Chris Duhon","Wendell Carter Jr."],["Carlos Boozer","Chris Duhon","Luol Deng"]],[["Austin Rivers","Jabari Parker","Jahlil Okafor","Marvin Bagley III","Zion Williamson","Paolo Banchero","Brandon Ingram"],["Chris Duhon","Paolo Banchero"],["Chris Duhon","Brandon Ingram"]],[["Christian Laettner","Bobby Hurley","Grant Hill","Shane Battier","Jason Williams","Mike Dunleavy","Jahlil Okafor","Cherokee Parks","Justise Winslow"],["Grant Hill","Chris Duhon","Amile Jefferson"],["Carlos Boozer","Chris Duhon","Quinn Cook","Ryan Kelly"]]],"topNames":["CHI","accRoy","ncaaChamp"],"sideNames":["lottoPick","ORL","LAL"]};
var names = [ "Rudy D’Emilio", "Ronnie Mayer", "Joe Belmont", "Jim Newcome", "Carroll Youngkin", "Art Heyman", "Jeff Mullins", "Jack Marin", "Bob Verga", "Mike Lewis", "Randy Denton", "Gary Melchionni", "Tate Armstrong", "Jim Spanarkel", "Mike Gminski", "Gene Banks", "Vince Taylor", "Mark Alarie", "Johnny Dawkins", "Danny Ferry", "Christian Laettner", "Bobby Hurley", "Grant Hill", "Trajan Langdon", "Roshown McLeod", "Elton Brand", "Chris Carrawell", "Shane Battier", "Jason Williams", "Mike Dunleavy", "Carlos Boozer", "Dahntay Jones", "Chris Duhon", "J.J. Redick", "Shelden Williams", "DeMarcus Nelson", "Gerald Henderson", "Jon Scheyer", "Kyle Singler", "Nolan Smith", "Austin Rivers", "Mason Plumlee", "Jabari Parker", "Jahlil Okafor", "Grayson Allen", "Luke Kennard", "Marvin Bagley III", "Zion Williamson", "RJ Barrett", "Vernon Carey Jr.", "Tre Jones", "Matthew Hurt", "Paolo Banchero", "Steve Vacendak", "Mark Williams", "Dick Groat", "Luol Deng", "Tommy Amaker", "Billy King", "Steve Wojciechowski", "Kyrie Irving", "Quinn Cook", "Jack White", "Ed Koffenberger", "Bernie Janicki", "Junior Morgan", "Bucky Allen", "Doug Kistler", "Howard Hurt", "Jay Buckley", "Hack Tison", "Bob Riedy", "Joe Kennedy", "Steve Vandenberg", "Fred Lind", "Rick Katherman", "Larry Saunders", "Bob Fleischer", "Willie Hodge", "Mark Crow", "Bob Bender", "Kenny Dennard", "Tom Emma", "Dan Meagher", "David Henderson", "Jay Bilas", "Martin Nessley", "Alaa Abdelnaby", "Phil Henderson", "Brian Davis", "Thomas Hill", "Antonio Lang", "Cherokee Parks", "Erik Meek", "Corey Maggette", "William Avery", "Daniel Ewing", "Josh McRoberts", "Miles Plumlee", "Ryan Kelly", "Rodney Hood", "Justise Winslow", "Tyus Jones", "Brandon Ingram", "Jayson Tatum", "Harry Giles", "Frank Jackson", "Wendell Carter Jr.", "Gary Trent Jr.", "Cam Reddish", "Cassius Stanley", "Jalen Johnson", "AJ Griffin", "Wendell Moore Jr.", "Trevor Keels", "Dereck Lively II", "Dariq Whitehead", "Marques Bolden", "Seth Curry", "Andre Dawkins", "Trevon Duval", "Bob Gantt", "Amile Jefferson", "Marshall Plumlee", "Shavlik Randolph", "Lance Thomas", "Javin DeLaurier", "Bill Werber", "Jim Thompson", "Bill Mock", "Jeff Capel", "Robert Brickey", "Greg Paulus", "Chris Redding", "Nate James", "Kevin Strickland", "Chris Collins", "Ricky Price", "Chip Engelland", "Greg Koubek", "Marty Clark", "Clay Buckley", "Kenny Blakeney", "Ron Burt", "Nick Horvath", "Casey Sanders", "Matt Christensen", "Reggie Love", "JD Simpson", "Andre Buckner", "Andy Borman", "Ryan Caldbeck", "Brian Zoubek", "Jordan Davidson", "Steve Johnson", "Casey Peters", "Todd Zafirovski", "Matt Jones", "Nick Pagliuca", "Sean Kelly", "Sean Obi" ];
var sRC = [0,0];
var guesses = [];
var grid = [["","",""],["","",""],["","",""]];
window.onload = function() {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			document.getElementById("_"+i+j).innerText = inp.arr[i][j];
		}
		document.getElementById("t"+i).innerText = inp.topNames[i];
		document.getElementById("s"+i).innerText = inp.sideNames[i];
	}
}

function guess(name,col,row) {
	if (inp.arr[col][row].includes(name)) {
		var cell = document.getElementById("_"+sRC[0]+sRC[1]);
		cell.innerText = "";
		sp = document.createElement("span");
		sp.setAttribute("class","name");
		sp.innerText = name;
		cell.after(sp);
		cell.removeAttribute("onclick");
		cell.setAttribute("disabled","true");
		cell.setAttribute("class","correct");
		cell.style.backgroundImage = "url('../images/"+name.toLowerCase().replaceAll(" ","_").replaceAll(".","").replaceAll("’","")+".png')";
		console.log("correct");
		document.getElementById("lst").setAttribute("hidden","true");
		grid[sRC[0]][sRC[1]] = name;
		hide();
		document.getElementById("lst").innerHTML="";
	} else {
		console.log("incorrect");
		//popUp(sRC[0],sRC[1]);
	}
	guesses.push(name);
	document.getElementById("gLeft").innerText=9-guesses.length;
}

function hide() {
	// document.getElementById("boxes").setAttribute("hidden","true");
	document.getElementById("g"+sRC[0]+sRC[1]).setAttribute("hidden","true");
	document.getElementById("g"+sRC[0]+sRC[1]).setAttribute("class","guess");
	document.getElementById("m").style.display = "none";
	document.getElementById("g"+sRC[0]+sRC[1]).value = "";
	document.getElementById("lst").innerHTML = "";
}

function popUp(col,row) {
	sRC[0] = col;
	sRC[1] = row;
	document.getElementById("g"+col+row).removeAttribute("hidden");
	document.getElementById('m').style.display = "block";
	document.getElementById("g"+col+row).focus();
	document.getElementById("lst").removeAttribute("hidden");
}

function lookUp() {
	box = document.getElementById("g"+sRC[0]+sRC[1]);
	val = box.value;
	console.log(val.length);
	if (val.length == 0) {
		box.setAttribute("class","guess");
		document.getElementById("lst").setAttribute("hidden","true");
	} else {
		box.setAttribute("class","hasText");
		document.getElementById("lst").removeAttribute("hidden");
		res = names.filter(e => e.toLowerCase().includes(val.toLowerCase()));
		console.log(res);
		document.getElementById("lst").innerHTML = "";
		if (res.length == 0) {
			document.getElementById("lst").innerText="No Results";
		}
		for (var i = 0; i < res.length; i++) {
			console.log(i);
			push = document.createElement("li");
			if (!(grid[0].includes(res[i]) || grid[1].includes(res[i]) || grid[2].includes(res[i]))) {
				push.setAttribute("onclick","guess(\""+res[i]+"\","+sRC[0]+","+sRC[1]+")");
			} else {
				push.setAttribute("class","guessed");
			}
			push.innerText = res[i];
			document.getElementById("lst").appendChild(push);
		}
	}
	
}