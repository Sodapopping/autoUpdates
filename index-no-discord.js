const axios = require('axios');
require('dotenv').config();

let isStreamOnline = false;
let streamGame = "Intro";

checkStreamStatus();
setInterval(checkStreamStatus, 15000);

async function checkStreamStatus() {
	try {
		const response = await axios.get(`https://api.twitch.tv/helix/streams?user_login=xqc`, {
			headers: {
				'Client-ID': process.env.TWITCH_CLIENT_ID,
				'Authorization': process.env.TWITCH_TOKEN,
			},
		});

		let stream = response.data.data[0];

		if (stream) {

			if(!streamGame == stream.game_name && isStreamOnline) {
				if(streamGame == "Intro" && stream.game_name == "Just Chatting") return; 
				console.log(`\nGame changed from ${streamGame} to ${stream.game_name}\n`);
				streamGame = stream.game_name;
				return;
			}

			if (!isStreamOnline) {
				console.log(`\nxQc is live on Twitch!\n\nTitle: ${stream.title}\nGame: ${stream.game_name}\nStream Link: https://twitch.tv/xQc`);
				isStreamOnline = true;
				return;
			}
		} else {
			isStreamOnline = false;
			console.log('\nStreamer now offline.\n')
			return;
		}
	} catch (error) { return null; }
} // Well, that was easy.
