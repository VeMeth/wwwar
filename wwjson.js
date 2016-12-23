//EVENTS
  document.getElementById('togglewolf').onclick = function() {hidewolves()};
  document.getElementById('toggledeadchat').onclick = function() {hidedeadchat()};
  document.getElementById('toggletownchat').onclick = function() {hidetownchat()};
  document.getElementById('togglecovenchat').onclick = function() {hidecovenchat()};

//Vars
	var inputBox = document.getElementById('PlayerName');
	var players = [];
	var origplayers = [];
	var wolfhidden = true;
	var deadhidden = true;
	var covenhidden = true;
	var townhidden = false;
	var gamename = 'ext-053';
	var shiftername = '';
//initialgame
 makegame();

 //Add zeros to dates under 10
 function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
//hide Wolfchat
	function hidewolves() {
		if (wolfhidden) {
		document.getElementById("togglewolf").innerHTML = "Hide Wolves";
		$('.wolfmsg').show();
		wolfhidden = false;
		}
		else {
		document.getElementById("togglewolf").innerHTML = "Show Wolves";
		$('.wolfmsg').hide();
		wolfhidden = true;
		}

	}
//hide Deadchat
	function hidedeadchat() {
		if (deadhidden) {
		document.getElementById("toggledeadchat").innerHTML = "Hide salt mine";
		$('.ghostmsg').show();
		deadhidden = false;
		}
		else {
		document.getElementById("toggledeadchat").innerHTML = "Show salt mine";
		$('.ghostmsg').hide();
		deadhidden = true;
		}

	}
//hide Villager Chat
		function hidetownchat() {
		if (townhidden) {
		document.getElementById("toggletownchat").innerHTML = "Hide Townchat";
		$('.villagemsg').show();
		townhidden = false;
		}
		else {
		document.getElementById("toggletownchat").innerHTML = "Show Townchat";
		$('.villagemsg').hide();
		townhidden = true;
		}

	}

	//hide Coven Chat
		function hidecovenchat() {
		if (townhidden) {
		document.getElementById("togglecovenchat").innerHTML = "Hide covenchat";
		$('.covenmsg').show();
		townhidden = false;
		}
		else {
		document.getElementById("togglecovenchat").innerHTML = "Show covenchat";
		$('.covenmsg').hide();
		townhidden = true;
		}

	}
//format events
	function formatter(msgtype,position) {
		var formatclass = '';
		switch(msgtype)
		{
		//"
		case "Werewolf.GameEngine.Chatting.WerewolfNightMessageEvent, Werewolf.GameEngine":
		formatclass = "<tr class='wolfmsg' >";
		break;

		case "Werewolf.GameEngine.Chatting.GhostMessageEvent, Werewolf.GameEngine":
		formatclass = "<tr class='ghostmsg' >";
		break;

		case "Werewolf.GameEngine.Core.ModeratorMessageEvent, Werewolf.GameEngine":
		formatclass = "<tr class='modmsg' >";
		break;

		case "Werewolf.GameEngine.Phases.Day.VillageNominationEvent, Werewolf.GameEngine":
		formatclass = "<tr class='modmsg' >";
		break;

		case "Werewolf.GameEngine.Phases.Day.PlayerLynchedEvent, Werewolf.GameEngine":
		formatclass = "<tr class='modmsg' >";
		break;

		case "Werewolf.GameEngine.Roles.Werewolves.Shapeshifter.IdentitySwappedByShapeshifterEvent, Werewolf.GameEngine":
		formatclass = "<tr class='modmsg' >";
		break;

		case "Werewolf.GameEngine.Phases.Night.PlayerKilledEvent, Werewolf.GameEngine":
		formatclass = "<tr class='modmsg' >";
		break;
		case "Werewolf.GameEngine.Roles.Coven.Djinn.DjinnSwappedPlayerIdentities, Werewolf.GameEngine":
		formatclass = "<tr class='modmsg' >";
		break;

		case "Werewolf.GameEngine.Chatting.CovenNightMessageEvent, Werewolf.GameEngine":
		formatclass = "<tr class='covenmsg' >";
		break;

		case "Werewolf.GameEngine.Roles.Werewolves.Shapeshifter.ShapeshifterSwappedPlayerIdentities, Werewolf.GameEngine":
		formatclass = "<tr class='modmsg' >";
		break;

    case "Werewolf.GameEngine.Roles.Village.Protector.ProtectorTargetChosenEvent, Werewolf.GameEngine":
		formatclass = "<tr class='modmsg' >";
		break;

    case "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine":
		formatclass = "<tr class='modmsg' >";
		break;

    case "Werewolf.GameEngine.Phases.Day.DayStartedEvent, Werewolf.GameEngine":
    formatclass = "<tr class='modmsg' >";
    break;

		default:
		formatclass = "<tr class='villagemsg' >"


		}
		return formatclass
	}
//Create a new game to read
  function makegame()
  {
  //reset Chat buttons
	wolfhidden = true;
	deadhidden = true;
	covenhidden = true;
	townhidden = false;
  //reset more stuff
  protectortarget = "";
  daycount = 1;
	document.getElementById("togglewolf").innerHTML = "Show Wolves";
	document.getElementById("togglecovenchat").innerHTML = "Show Coven";
	document.getElementById("toggledeadchat").innerHTML = "Show salt mine";
	document.getElementById("toggletownchat").innerHTML = "Hide Townchat";
//Empty Links
  $('div#days').empty();
  console.log('Starting');
  //empty exisiting game
  players = [];
  origplayers = players;
  console.log(origplayers);
//Empty chat
  $("#tbdi").empty();
  //Read json file
			gamename = document.getElementById('getgame').value;
            var a = {};
			var filename = gamename+'.json'
			console.log('Processing '+filename);
            $.getJSON(filename, function (data) {
                a = data;
			console.log('Got Data');
    $.each(a, function(idx, elem){
			// create date
			var weekday = '';
				var date = new Date(parseInt(elem.TimeStamp.substr(6)));
				stunden = addZero(date.getHours());
				minuten = addZero(date.getMinutes());
				sekunden = addZero(date.getSeconds());
				day = date.getDay();
				switch (day) {
				case "0": weekday = "Mon"; break;
				case "1": weekday = "Tue"; break;
				case "2": weekday = "Wed"; break;
				case "3": weekday = "Thu"; break;
				case "4": weekday = "Fri"; break;
				case "5": weekday = "Sat"; break;
				case "6": weekday = "Sun"; break;
				}
				//Create player list
				if (elem.__type == "Werewolf.GameEngine.Core.NewIdentityAssignedEvent, Werewolf.GameEngine") {
			players[elem.OriginalName] = elem.NewName;
			console.log('Creating Playerlist');
			}

			//Create player list
				if (elem.__type == "Werewolf.GameEngine.Core.NewIdentityAssignedEvent, Werewolf.GameEngine") {
			players[elem.OriginalName] = elem.NewName;
			console.log('Creating Rolelist');
			}

			//account for legacy shapeshifts
			if (elem.__type == "Werewolf.GameEngine.Roles.Werewolves.Shapeshifter.IdentitySwappedByShapeshifterEvent, Werewolf.GameEngine"){
				if (players[elem.OriginalName] != players[elem.NewName]) {
					$('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.OriginalName]+' shifted into '+players[elem.NewName]+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
					console.log('Found Shapeshift');
					//swapping names
					console.log('Swap '+players[elem.OriginalName]+' with '+players[elem.NewName]);
					shiftername = players[elem.OriginalName]
					players[elem.OriginalName] = players[elem.NewName];

					}
					else {
					console.log('Swap '+players[elem.OriginalName]+' with '+shiftername);
					players[elem.OriginalName] = shiftername;
					shiftername = '';
					}
					//console.log(players);
			}
			//account for shapeshifts
			if (elem.__type == "Werewolf.GameEngine.Roles.Werewolves.Shapeshifter.ShapeshifterSwappedPlayerIdentities, Werewolf.GameEngine"){
				$('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.FirstPlayer]+' was shapeshifted by  '+players[elem.SecondPlayer]+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
					console.log('Found Shapeshift');
					//swapping names
					console.log('Swap '+players[elem.FirstPlayer]+' with '+players[elem.SecondPlayer]);
					wswapname1 = players[elem.FirstPlayer];
					wswapname2 = players[elem.SecondPlayer];
					//console.log('wswapname1 = '+wswapname1);
					console.log(wswapname1+' is now '+wswapname2);
					players[elem.FirstPlayer] = players[elem.SecondPlayer];
					console.log(wswapname2+' is now '+wswapname1);
					players[elem.SecondPlayer] = wswapname1;
					wswapname1 = '';
					wswapname2 = '';
			}
			//account for djinn swaps
			if (elem.__type == "Werewolf.GameEngine.Roles.Coven.Djinn.DjinnSwappedPlayerIdentities, Werewolf.GameEngine"){

					$('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.FirstPlayer]+' was swapped with '+players[elem.SecondPlayer]+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
					console.log('Found Djinn Swap');
					//swapping names
					console.log('Swap '+players[elem.FirstPlayer]+' with '+players[elem.SecondPlayer]);
					swapname1 = players[elem.FirstPlayer];
					swapname2 = players[elem.SecondPlayer];
					//console.log('swapname1 = '+swapname1);
					console.log(swapname1+' is now '+swapname2);
					players[elem.FirstPlayer] = players[elem.SecondPlayer];
					console.log(swapname2+' is now '+swapname1);
					players[elem.SecondPlayer] = swapname1;
					swapname1 = '';
					swapname2 = '';




			}
			//pre-game chat
			 if (elem.__type == "Werewolf.GameEngine.Chatting.PendingGameMessage, Werewolf.GameEngine"){
			$('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+elem.PlayerName+'</td><td>'+elem.Message +'</td><td>'+weekday+'  '+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');

			}
      //find Daybreak
      if (elem.__type == "Werewolf.GameEngine.Phases.Day.DayStartedEvent, Werewolf.GameEngine"){
        protectortarget = "";
        daycount++;
      $('div#days').append('<a href=#day'+daycount+'>Day '+daycount+'</a> | ');
      $('table#tbl TBODY').append(formatter(elem.__type,0)+'<td id=day'+daycount+'>'+'Moderator'+'</td><td> Day '+daycount+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
      console.log('Daybreak');
      }

		   //Find players killed during the night
		   if (elem.__type == "Werewolf.GameEngine.Phases.Night.PlayerKilledEvent, Werewolf.GameEngine"){
			$('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.PlayerName]+' was killed during the night'+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');

			}

		   //Find players put on trial events
		   if (elem.__type == "Werewolf.GameEngine.Phases.Day.VillageNominationEvent, Werewolf.GameEngine"){
			$('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.PlayerName]+' votes to put '+players[elem.Target]+' on trial'+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
			}
			//Find lynch events
			if (elem.__type == "Werewolf.GameEngine.Phases.Day.PlayerLynchedEvent, Werewolf.GameEngine"){
			$('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.PlayerName]+' was lynched by the village'+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
			console.log('Lynch Event');
			}

      //Find protector events
      if (elem.__type == "Werewolf.GameEngine.Roles.Village.Protector.ProtectorTargetChosenEvent, Werewolf.GameEngine" && protectortarget != elem.Target){
        protectortarget = elem.Target;
      $('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.ProtectorName]+' chose to protect '+players[elem.Target]+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
      console.log('Old Protector Event');
      }
      //Find NEW protector events... THX mark!
      if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Protector" && protectortarget != elem.Target){
        protectortarget = elem.Target;
      $('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.PlayerWithRole]+' chose to protect '+players[elem.Target]+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
      console.log('Protector Event');
      }

      //Find NEW stalker events... THX mark!
      if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Stalker"){
        protectortarget = elem.Target;
      $('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.PlayerWithRole]+' chose to stalk '+players[elem.Target]+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
      console.log('Stalker Event');
      }

      //Find NEW Gravedigger events... THX mark!
      if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Gravedigger"){
        protectortarget = elem.Target;
      $('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.PlayerWithRole]+' chose to dig up '+players[elem.Target]+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
      console.log('Gravedigger Event');
      }

      //Find NEW Bloodhound events... THX mark!
      if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Bloodhound"){
        protectortarget = elem.Target;
      $('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.PlayerWithRole]+' the Bloodhound chose to check '+players[elem.Target]+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
      console.log('Bloodhound Event');
      }

      if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Seer"){
        protectortarget = elem.Target;
      $('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.PlayerWithRole]+' the Seer chose to check '+players[elem.Target]+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
      console.log('Seer Event');
      }

      if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Harlot"){
        protectortarget = elem.Target;
      $('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.PlayerWithRole]+' the harlot chose to visit '+players[elem.Target]+'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
      console.log('Harlot Event');
      }

      if (elem.__type == "Werewolf.GameEngine.Roles.NightTargetChosenEvent, Werewolf.GameEngine" && elem.Role == "Militia"){
        protectortarget = elem.Target;
      $('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+players[elem.PlayerWithRole]+' the militia chose to shoot '+players[elem.Target]+' !!!</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
      console.log('Harlot Event');
      }


			if (elem.__type == "Werewolf.GameEngine.Core.ModeratorMessageEvent, Werewolf.GameEngine") {
				$('table#tbl TBODY').append(formatter(elem.__type,0)+'<td>'+'Moderator'+'</td><td>'+elem.Message +'</td><td>'+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');
				}
			if (elem.PlayerName != null && elem.Message != null && elem.__type != "Werewolf.GameEngine.Chatting.PendingGameMessage, Werewolf.GameEngine") {


				$('table#tbl TBODY').append(formatter(elem.__type,0)+'<td title='+elem.PlayerName+'>'+players[elem.PlayerName]+'</td><td>'+elem.Message +'</td><td>'+weekday+'  '+stunden+':'+minuten+':'+sekunden+'</td><td></tr>');}
				//console.log('Adding entry');


    });
                });
}
console.log(players);
