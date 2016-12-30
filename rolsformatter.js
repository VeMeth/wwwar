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

    case "Werewolf.GameEngine.Roles.Vampires.VampireRevived, Werewolf.GameEngine":
    formatclass = "<tr class='modmsg' >";
    break;
    case "Werewolf.GameEngine.Roles.FamiliarStalkerAssignedEvent, Werewolf.GameEngine":
    formatclass = "<tr class='modmsg' >";
    break;

		default:
		formatclass = "<tr class='villagemsg' >"


		}
		return formatclass
	}
