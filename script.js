var inp;// = {"arr":[[["Elton Brand","Jason Williams","Mike Dunleavy","Jabari Parker","Luol Deng","Wendell Carter Jr."],["Chris Duhon","Wendell Carter Jr."],["Carlos Boozer","Chris Duhon","Luol Deng"]],[["Austin Rivers","Jabari Parker","Jahlil Okafor","Marvin Bagley III","Zion Williamson","Paolo Banchero","Brandon Ingram"],["Chris Duhon","Paolo Banchero"],["Chris Duhon","Brandon Ingram"]],[["Christian Laettner","Bobby Hurley","Grant Hill","Shane Battier","Jason Williams","Mike Dunleavy","Jahlil Okafor","Cherokee Parks","Justise Winslow"],["Grant Hill","Chris Duhon","Amile Jefferson"],["Carlos Boozer","Chris Duhon","Quinn Cook","Ryan Kelly"]]],"topNames":["CHI","accRoy","ncaaChamp"],"sideNames":["lottoPick","ORL","LAL"]};
var names = [ "Rudy D’Emilio", "Ronnie Mayer", "Joe Belmont", "Jim Newcome", "Carroll Youngkin", "Art Heyman", "Jeff Mullins", "Jack Marin", "Bob Verga", "Mike Lewis", "Randy Denton", "Gary Melchionni", "Tate Armstrong", "Jim Spanarkel", "Mike Gminski", "Gene Banks", "Vince Taylor", "Mark Alarie", "Johnny Dawkins", "Danny Ferry", "Christian Laettner", "Bobby Hurley", "Grant Hill", "Trajan Langdon", "Roshown McLeod", "Elton Brand", "Chris Carrawell", "Shane Battier", "Jason Williams", "Mike Dunleavy", "Carlos Boozer", "Dahntay Jones", "Chris Duhon", "J.J. Redick", "Shelden Williams", "DeMarcus Nelson", "Gerald Henderson", "Jon Scheyer", "Kyle Singler", "Nolan Smith", "Austin Rivers", "Mason Plumlee", "Jabari Parker", "Jahlil Okafor", "Grayson Allen", "Luke Kennard", "Marvin Bagley III", "Zion Williamson", "RJ Barrett", "Vernon Carey Jr.", "Tre Jones", "Matthew Hurt", "Paolo Banchero", "Steve Vacendak", "Mark Williams", "Dick Groat", "Luol Deng", "Tommy Amaker", "Billy King", "Steve Wojciechowski", "Kyrie Irving", "Quinn Cook", "Jack White", "Ed Koffenberger", "Bernie Janicki", "Junior Morgan", "Bucky Allen", "Doug Kistler", "Howard Hurt", "Jay Buckley", "Hack Tison", "Bob Riedy", "Joe Kennedy", "Steve Vandenberg", "Fred Lind", "Rick Katherman", "Larry Saunders", "Bob Fleischer", "Willie Hodge", "Mark Crow", "Bob Bender", "Kenny Dennard", "Tom Emma", "Dan Meagher", "David Henderson", "Jay Bilas", "Martin Nessley", "Alaa Abdelnaby", "Phil Henderson", "Brian Davis", "Thomas Hill", "Antonio Lang", "Cherokee Parks", "Erik Meek", "Corey Maggette", "William Avery", "Daniel Ewing", "Josh McRoberts", "Miles Plumlee", "Ryan Kelly", "Rodney Hood", "Justise Winslow", "Tyus Jones", "Brandon Ingram", "Jayson Tatum", "Harry Giles", "Frank Jackson", "Wendell Carter Jr.", "Gary Trent Jr.", "Cam Reddish", "Cassius Stanley", "Jalen Johnson", "AJ Griffin", "Wendell Moore Jr.", "Trevor Keels", "Dereck Lively II", "Dariq Whitehead", "Marques Bolden", "Seth Curry", "Andre Dawkins", "Trevon Duval", "Bob Gantt", "Amile Jefferson", "Marshall Plumlee", "Shavlik Randolph", "Lance Thomas", "Javin DeLaurier", "Bill Werber", "Jim Thompson", "Bill Mock", "Jeff Capel", "Robert Brickey", "Greg Paulus", "Chris Redding", "Nate James", "Kevin Strickland", "Chris Collins", "Ricky Price", "Chip Engelland", "Greg Koubek", "Marty Clark", "Clay Buckley", "Kenny Blakeney", "Ron Burt", "Nick Horvath", "Casey Sanders", "Matt Christensen", "Reggie Love", "JD Simpson", "Andre Buckner", "Andy Borman", "Ryan Caldbeck", "Brian Zoubek", "Jordan Davidson", "Steve Johnson", "Casey Peters", "Todd Zafirovski", "Matt Jones", "Nick Pagliuca", "Sean Kelly", "Sean Obi" ];
var sRC = [0,0];
var guesses = [];
var grid = [["","",""],["","",""],["","",""]];
var correct = [];
var sT = "Duke Grid ";
var exp;
var clmn = ["x","y","z"];
window.onload = function() {
	getData().then((value) => {inp = value;
		for (var i = 0; i < 3; i++) {
		// for (var j = 0; j < 3; j++) {
			// document.getElementById("_"+i+j).innerText = inp.arr[i][j];
		// }
			document.getElementById("t"+i).innerText = inp.topNames[i];
			document.getElementById("s"+i).innerText = inp.sideNames[i];
		}
	});
	d = new Date();
	sT+= d.getMonth()+"/"+d.getDate();
	d.setDate(d.getDate() + 1);
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);
	exp = d.toUTCString();
	if (document.cookie.length > 0) {
		cooks = document.cookie.split("; ");
		var cookObjs = new Object();
		for (var i = 0; i < cooks.length; i++) {
			obj = cooks[i].split("=");
			cookObjs[obj[0]] = obj[1].split(",");
		}
		if (cookObjs.guesses) {
			for (var i = 0; i < guesses.length; i++) {
				guess("g",0,0);
			}
			guesses = cookObjs.guesses;
		}
		for (var i = 0; i < 3; i++) {
			if (cookObjs[clmn[i]]) {
				// grid[i] = cookObjs[clmn[i]];
				for (var j = 0; j < 3; j++) {
					if (cookObjs[clmn[i]][j].length > 0) {
						guess(cookObjs[clmn[i]][j],i,j);
					}
				}
			}
		}
	}
	
}

function guess(name,col,row) {
	sRC = [col,row];
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
		correct.push(name);
		document.getElementById("f"+col+row).setAttribute("class","correct");
		document.cookie = clmn[col] + "=" + grid[col]+";expires="+exp+";path=/";
	} else {
		console.log("incorrect");
		guesses.push(name);
		document.cookie = "guesses="+guesses+";expires="+exp+";path=/";
		//popUp(sRC[0],sRC[1]);
	}
	//guesses.push(name);
	document.getElementById("gLeft").innerText=9-(guesses.length+correct.length);
	if (guesses.length +correct.length == 9) {
		endGame();
	}
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
function endGame() {
	var btns = document.getElementsByTagName("button");
	for (var i = 0; i < btns.length; i++) {
		if (btns[i].id != "sBut") {
			btns[i].setAttribute("disabled","true");
		}
	}
	var shareText = sT + ": " + correct.length + "/9\n";
	var counter = 0;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (grid[j][i].length > 0) {
				shareText+="🟩";
			} else {
				shareText+= "⬛";
			}
		}
		shareText+="\n"
	}
	shareText+= window.location.href;
	sT = shareText;
	document.getElementById("share").removeAttribute("hidden");
	document.getElementById("m").style.display = "block";
	document.getElementById("m").removeAttribute("onclick");
	document.getElementById("g"+sRC[0]+sRC[1]).setAttribute("hidden","true");
	document.getElementById("g"+sRC[0]+sRC[1]).value = "";
	document.getElementById("lst").setAttribute("hidden","true");
	document.getElementById("stat").removeAttribute("hidden");
	document.getElementById("sBut").setAttribute("onclick","copy()");
}

function stats() {
	document.getElementById("share").removeAttribute("hidden");
	document.getElementById("m").style.display = "block";
}
function closeOut() {
	document.getElementById("share").setAttribute("hidden","true");
	hide();
}

function copy() {
	navigator.clipboard.writeText(sT);
}

async function getData() {
	td = new Date();
	var ret;
	var jso = await fetch("../grids/"+td.getMonth()+"/"+td.getDate()+".json");
	ret = await jso.json();
	return ret;
}