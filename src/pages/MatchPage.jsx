import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fieldBg from '../assets/field-bg.jpg';

const PlayerCard = ({ player, position }) => {
  const formatPlayerName = (fullName) => {
    const parts = fullName.split(' ');
    if (parts.length <= 2) return parts;
    const lastName = parts.pop();
    const firstName = parts.join(' ');
    return [firstName, lastName];
  };

  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2"
         style={{ top: position.top, left: position.left }}>
      <div className="w-16 h-24 transform hover:scale-110 transition-transform cursor-pointer 
                    flex flex-col justify-between pb-4"
           style={{
             background: '#FFDC83',
             clipPath: 'path("M 12 0 L 52 0 C 60 0 64 4 64 12 L 64 68 L 32 80 L 0 68 L 0 12 C 0 4 4 0 12 0")',
             boxShadow: '0 0 15px rgba(253, 184, 51, 0.3)',
           }}>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center 
                        text-base font-bold text-gray-600">
            {player.number}
          </div>
        </div>
        <div className="text-gray-900 font-bold text-[8px] flex flex-col items-center leading-tight">
          {formatPlayerName(player.name).map((namePart, i) => (
            <span key={i} className="uppercase">{namePart}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const MatchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { myTeam, aiTeam } = location.state || {};
  const [showIntro, setShowIntro] = useState(true);
  
  // Match state
  const [matchState, setMatchState] = useState({
    score: { home: 0, away: 0 },
    minute: 0,
    events: [],
    stats: {
      home: { possession: 50, shots: 0, shotsOnTarget: 0, corners: 0, fouls: 0 },
      away: { possession: 50, shots: 0, shotsOnTarget: 0, corners: 0, fouls: 0 }
    },
    isPaused: false
  });

  useEffect(() => {
    if (!myTeam || !aiTeam) {
      navigate('/battle');
      return;
    }

    // Detailed debug logs
    console.log('Match Page Data:', {
      myTeam: {
        teamName: myTeam.teamName,
        formation: myTeam.formation,
        players: myTeam.players,
        positions: myTeam.positions,
        rawData: myTeam
      },
      aiTeam: {
        teamName: aiTeam.teamName,
        formation: aiTeam.formation,
        players: aiTeam.players,
        positions: aiTeam.positions,
        rawData: aiTeam
      }
    });

    const timer = setTimeout(() => {
      setShowIntro(false);
      startMatch();
    }, 2000);

    return () => clearTimeout(timer);
  }, [myTeam, aiTeam, navigate]);

  const startMatch = () => {
    // Start match simulation
    const matchInterval = setInterval(() => {
      setMatchState(prev => {
        if (prev.minute >= 90 || prev.isPaused) return prev;

        const newMinute = prev.minute + 1;
        const newEvents = [...prev.events];
        const newStats = { ...prev.stats };
        const newScore = { ...prev.score };

        // Simulate match events
        if (Math.random() < 0.1) { // 10% chance of an event each minute
          const eventType = Math.random();
          const isHomeTeam = Math.random() < 0.5;
          const team = isHomeTeam ? 'home' : 'away';
          
          if (eventType < 0.4) { // 40% chance of a shot
            newStats[team].shots++;
            if (Math.random() < 0.3) { // 30% chance of shot on target
              newStats[team].shotsOnTarget++;
              if (Math.random() < 0.2) { // 20% chance of goal
                newScore[team]++;
                newEvents.push({
                  minute: newMinute,
                  type: 'goal',
                  team,
                  player: isHomeTeam 
                    ? myTeam.players[Math.floor(Math.random() * myTeam.players.length)]
                    : aiTeam.players[Math.floor(Math.random() * aiTeam.players.length)]
                });
              }
            }
          } else if (eventType < 0.7) { // 30% chance of a corner
            newStats[team].corners++;
            newEvents.push({
              minute: newMinute,
              type: 'corner',
              team
            });
          } else { // 30% chance of a foul
            newStats[team].fouls++;
            newEvents.push({
              minute: newMinute,
              type: 'foul',
              team
            });
          }
        }

        // Update possession (slight random variation)
        const possessionChange = (Math.random() - 0.5) * 2;
        newStats.home.possession = Math.max(0, Math.min(100, newStats.home.possession + possessionChange));
        newStats.away.possession = 100 - newStats.home.possession;

        return {
          ...prev,
          minute: newMinute,
          events: newEvents,
          stats: newStats,
          score: newScore
        };
      });
    }, 1000); // Update every second

    return () => clearInterval(matchInterval);
  };

  const getFormationPositions = (formation) => {
    // Debug log
    console.log('Formation:', formation);

    const commonGoalkeeper = [{ top: '85%', left: '50%' }];

    switch (formation) {
      case "4-3-3":
        return {
          Forward: [
            { top: '15%', left: '25%' },  // Left Forward
            { top: '10%', left: '50%' },  // Center Forward
            { top: '15%', left: '75%' }   // Right Forward
          ],
          Midfielder: [
            { top: '35%', left: '25%' },  // Left Midfielder
            { top: '30%', left: '50%' },  // Center Midfielder
            { top: '35%', left: '75%' }   // Right Midfielder
          ],
          Defender: [
            { top: '65%', left: '15%' },  // Left Back
            { top: '60%', left: '35%' },  // Left Center Back
            { top: '60%', left: '65%' },  // Right Center Back
            { top: '65%', left: '85%' }   // Right Back
          ],
          Goalkeeper: commonGoalkeeper
        };
      case "4-4-2":
        return {
          Forward: [
            { top: '15%', left: '35%' },  // Left Forward
            { top: '15%', left: '65%' }   // Right Forward
          ],
          Midfielder: [
            { top: '35%', left: '15%' },  // Left Midfielder
            { top: '30%', left: '35%' },  // Left Center Midfielder
            { top: '30%', left: '65%' },  // Right Center Midfielder
            { top: '35%', left: '85%' }   // Right Midfielder
          ],
          Defender: [
            { top: '65%', left: '15%' },  // Left Back
            { top: '60%', left: '35%' },  // Left Center Back
            { top: '60%', left: '65%' },  // Right Center Back
            { top: '65%', left: '85%' }   // Right Back
          ],
          Goalkeeper: commonGoalkeeper
        };
      case "3-5-2":
        return {
          Forward: [
            { top: '15%', left: '35%' },  // Left Forward
            { top: '15%', left: '65%' }   // Right Forward
          ],
          Midfielder: [
            { top: '35%', left: '10%' },  // Left Wing
            { top: '30%', left: '30%' },  // Left Center Midfielder
            { top: '25%', left: '50%' },  // Center Midfielder
            { top: '30%', left: '70%' },  // Right Center Midfielder
            { top: '35%', left: '90%' }   // Right Wing
          ],
          Defender: [
            { top: '65%', left: '25%' },  // Left Center Back
            { top: '60%', left: '50%' },  // Center Back
            { top: '65%', left: '75%' }   // Right Center Back
          ],
          Goalkeeper: commonGoalkeeper
        };
      case "5-3-2":
        return {
          Forward: [
            { top: '15%', left: '35%' },  // Left Forward
            { top: '15%', left: '65%' }   // Right Forward
          ],
          Midfielder: [
            { top: '35%', left: '25%' },  // Left Midfielder
            { top: '30%', left: '50%' },  // Center Midfielder
            { top: '35%', left: '75%' }   // Right Midfielder
          ],
          Defender: [
            { top: '65%', left: '10%' },  // Left Wing Back
            { top: '60%', left: '30%' },  // Left Center Back
            { top: '55%', left: '50%' },  // Center Back
            { top: '60%', left: '70%' },  // Right Center Back
            { top: '65%', left: '90%' }   // Right Wing Back
          ],
          Goalkeeper: commonGoalkeeper
        };
      default:
        console.warn('Unknown formation:', formation);
        return {
          Forward: [],
          Midfielder: [],
          Defender: [],
          Goalkeeper: commonGoalkeeper
        };
    }
  };

  const renderPlayers = () => {
    // Debug logs for player rendering
    console.log('Rendering Players:', {
      myTeam: {
        hasPlayers: !!myTeam?.players,
        playerCount: myTeam?.players?.length,
        hasPositions: !!myTeam?.positions,
        positions: myTeam?.positions,
        formation: myTeam?.formation
      },
      aiTeam: {
        hasPlayers: !!aiTeam?.players,
        playerCount: aiTeam?.players?.length,
        hasPositions: !!aiTeam?.positions,
        positions: aiTeam?.positions,
        formation: aiTeam?.formation
      }
    });

    if (!myTeam?.players || !myTeam?.positions || !aiTeam?.players || !aiTeam?.positions) {
      console.warn('Missing players or positions data:', {
        myTeamPlayers: !!myTeam?.players,
        myTeamPositions: !!myTeam?.positions,
        aiTeamPlayers: !!aiTeam?.players,
        aiTeamPositions: !!aiTeam?.positions
      });
      return null;
    }

    const homePositions = getFormationPositions(myTeam.formation);
    const awayPositions = getFormationPositions(aiTeam.formation);
    
    console.log('Formation Positions:', {
      home: homePositions,
      away: awayPositions
    });

    return (
      <>
        {/* Home Team Players */}
        {myTeam.players.map((player, index) => {
          // Debug log for each player
          console.log('Processing home player:', {
            player,
            index,
            position: player.position,
            positionInfo: myTeam.positions[player.id]
          });

          const positionInfo = myTeam.positions[player.id];
          
          if (!positionInfo) {
            console.warn('No position info for player:', player.name);
            return null;
          }

          const positionSpots = homePositions[player.position];
          
          if (!positionSpots || !positionSpots[positionInfo.index]) {
            console.warn('No position spot found for player:', player.name, 'at index:', positionInfo.index);
            return null;
          }

          return (
            <PlayerCard
              key={`home-${player.id || index}`}
              player={player}
              position={positionSpots[positionInfo.index]}
            />
          );
        })}

        {/* Away Team Players */}
        {aiTeam.players.map((player, index) => {
          // Debug log for each player
          console.log('Processing away player:', {
            player,
            index,
            position: player.position,
            positionInfo: aiTeam.positions[player.id]
          });

          const positionInfo = aiTeam.positions[player.id];
          
          if (!positionInfo) {
            console.warn('No position info for player:', player.name);
            return null;
          }

          const positionSpots = awayPositions[player.position];
          
          if (!positionSpots || !positionSpots[positionInfo.index]) {
            console.warn('No position spot found for player:', player.name, 'at index:', positionInfo.index);
            return null;
          }

          // Mirror the position for away team
          const mirroredPosition = {
            top: positionSpots[positionInfo.index].top,
            left: `${100 - parseFloat(positionSpots[positionInfo.index].left)}%`
          };

          return (
            <PlayerCard
              key={`away-${player.id || index}`}
              player={player}
              position={mirroredPosition}
            />
          );
        })}
      </>
    );
  };

  if (!myTeam || !aiTeam) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <div 
        className="w-full h-full bg-cover bg-center brightness-75 contrast-110"
        style={{ backgroundImage: `url(${fieldBg})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Game-like Intro Screen */}
      {showIntro && (
        <div className="absolute inset-0 flex items-center justify-center animate-fadein">
          <div className="w-full h-full relative">
            {/* Transparent overlay */}
            <div className="absolute inset-0 bg-black/20 animate-fadein"></div>
            
            {/* Content container for better alignment */}
            <div className="absolute inset-0 flex items-center justify-between px-20">
              {/* Home Team (Blue) - Left side */}
              <div className="flex-1 text-left animate-slide-in-left">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-500/90
                           tracking-[0.2em] leading-tight uppercase">
                  {myTeam.teamName}
                </h2>
              </div>
              
              {/* VS Text (Grey) */}
              <div className="flex-shrink-0 mx-8 animate-scale-in">
                <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-gray-400/70 
                           tracking-wide animate-pulse-glow">
                  VS
                </div>
              </div>
              
              {/* Away Team (Red) - Right side */}
              <div className="flex-1 text-right animate-slide-in-right">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-500/90
                           tracking-[0.2em] leading-tight uppercase">
                  {aiTeam.teamName}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Players on the field */}
      <div className="absolute inset-0 pointer-events-none">
        {!showIntro && (
          <>
            {renderPlayers()}
            {/* Debug info */}
            <div className="absolute top-4 left-4 bg-black/70 p-2 rounded text-white text-xs">
              <div>Team: {myTeam?.teamName}</div>
              <div>Formation: {myTeam?.formation}</div>
              <div>Players: {myTeam?.players?.length || 0}</div>
            </div>
          </>
        )}
      </div>
      
      {/* End Match Button */}
      <button
        onClick={() => navigate('/battle')}
        className="absolute bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 
                 bg-gray-800 hover:bg-gray-700 text-white 
                 px-6 py-3 
                 text-base
                 rounded-lg font-bold transition-all duration-300 
                 shadow-lg hover:shadow-xl
                 border-2 border-gray-700 hover:border-gray-600
                 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                 uppercase tracking-wider"
      >
        End Match
      </button>
    </div>
  );
};

// Animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-in-left {
    from { transform: translateX(-100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slide-in-right {
    from { transform: translateX(100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes scale-in {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes pulse-glow {
    0% { text-shadow: 0 0 5px rgba(200, 200, 200, 0.5); }
    50% { text-shadow: 0 0 20px rgba(200, 200, 200, 0.8); }
    100% { text-shadow: 0 0 5px rgba(200, 200, 200, 0.5); }
  }
  
  @keyframes fadeout {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-slide-in-left {
    animation: slide-in-left 0.8s ease-out forwards;
  }
  
  .animate-slide-in-right {
    animation: slide-in-right 0.8s ease-out forwards;
  }
  
  .animate-scale-in {
    animation: scale-in 0.6s ease-out forwards;
  }

  .animate-pulse-glow {
    animation: pulse-glow 1.5s ease-in-out infinite;
  }

  .animate-fadeout {
    animation: fadeout 0.5s ease-out forwards;
  }

  .animate-fadein {
    animation: fadein 0.5s ease-in forwards;
  }
`;
document.head.appendChild(style);

export default MatchPage; 