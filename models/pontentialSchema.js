/* Potential combined schema. 
Tim, I am not sure if you said you wanted to use Redux or Flux, 
but I had some ideas on a simple JSON structure which could be used
to manage users, teams, and seasons. This doesn't consider some of 
the metadata we discussed (i.e. time for pick), but I wanted to share
some thoughts. Also, I will need to better understand the structure required
for Redux/Flux

Note: I list some basic fields, but this does not include all that would be needed,
and some listed would likely change. I don't think this data change will impact
what you have done too much and I am happy to discuss/help with needed changes.
*/

var fffSeasons = [ //Array of seasons. 
  { 
    year: 2017,
    teams:[ //Array of yahoo teams. Position aligns to draft order
      {
        TID: "1234", //Team ID, perhaps yahoo has an ID already created
        teamName: "Leaning Computer",
        owner: {
          OID: "1234", //Owner ID, Could this be used to track user actions in the app?
          name: "Matthew", 
          email: "msr25c@gmail.com", //Could be used as ID and remove OID. Contact info
          password: "myPassword" //If we use a password to log into the application
        },
        players: [ //Array of players, array position aligns to draft order
          {
            // We may want a player ID but I currently don't see its use
            name: "Alex Smith",
            team: "Chiefs",
            position: "QB"
          },
          {
            name: "Tyreek Hill",
            team: "Chiefs",
            position: "WR"
          }
        ]
      }
    ]
  },
  {
    year: 2018,
    teams: [
      {
        TID: "1234", 
        teamName: "Leaning Computer2",
        owner: {
          OID: "1234", 
          name: "Matthew Roman", 
          email: "msr25c@gmail.com", 
          password: "myPassword2" 
        },
        players: [ 
          {
            name: "Player 1",
            team: "Chiefs",
            position: "QB"
          },
          {
            name: "Player 2",
            team: "Chiefs",
            position: "WR"
          }
        ]
      },
      {
        TID: "2222", 
        teamName: "another team",
        owner: {
          OID: "3333", 
          name: "someoneElse", 
          email: "something@gmail.com", 
          password: "myPassword2" 
        },
        players: [ 
          {
            name: "Player 1",
            team: "Chiefs",
            position: "QB"
          },
          {
            name: "Player 2",
            team: "Chiefs",
            position: "WR"
          }
        ]
      }
    ],
  }
];

//helper functions

// Returns ths current round
function currentRound(){
  var firstTeam = fffSeasons[fffSeasons.length - 1].teams[0];
  var lastTeam = fffSeasons[fffSeasons.length - 1].teams[fffSeasons[fffSeasons.length-1].
  teams.length - 1];

  return (firstTeam.players.length !== lastTeam.players.length) ? 
          Math.max(firstTeam.players.length, lastTeam.players.length) :
          lastTeam.players.length + 1;
}

// Returns the team which needs to pick
function currentPickTeam(){
  var currentSeason = fffSeasons[fffSeasons.length - 1];
  var firstTeam = currentSeason.teams[0];
  var lastTeam = currentSeason.teams[currentSeason.teams.length - 1];
  var evenRound = currentRound() % 2 === 0;
  var currentPickIndex = currentSeason.teams.findIndex((team, index) => {
        return evenRound ? 
              team.players.length < lastTeam.players.length :
              team.players.length < firstTeam.players.length
      })
  if(currentPickIndex !== -1){
    return currentSeason.teams[currentPickIndex].teamName;
  }else{
    return evenRound ? lastTeam.teamName : firstTeam.teamName;
  }
}

//Returns the next pick number
function currentPickNumber(){
  var completedPicks = 0;
  fffSeasons[fffSeasons.length-1].teams.forEach(team => {
    team.players.forEach(player => {
      completedPicks++;
    });
  });
  return completedPicks + 1;
}