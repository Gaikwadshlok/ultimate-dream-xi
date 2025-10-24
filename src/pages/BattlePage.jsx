// src/pages/BattlePage.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/Authcontext'; // Import useAuth to get user token
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// Import shared data
import { formations, samplePlayers, generateRandomTeamName } from '../data/constants'; 

const BattlePage = () => {
  const { user } = useAuth(); // Get user info if needed, primarily for token
  const navigate = useNavigate(); // Get navigate function for navigation
  
  // State for fetching user's teams
  const [userTeams, setUserTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // State for the battle participants and result
  const [myTeam, setMyTeam] = useState(null); // Initialize as null
  const [aiTeam, setAiTeam] = useState(null); // Initialize as null
  const [result, setResult] = useState(null);

  // Fetch user's saved teams on component mount
  useEffect(() => {
    const fetchUserTeams = async () => {
      setLoadingTeams(true);
      setFetchError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        setFetchError("Authentication token not found.");
        setLoadingTeams(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/team/my-teams", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch teams (Status: ${response.status})`);
        }

        const data = await response.json();
        setUserTeams(data); // Store the fetched teams
      } catch (error) {
        console.error("Error fetching user teams:", error);
        setFetchError(error.message || "An error occurred while fetching teams.");
      } finally {
        setLoadingTeams(false);
      }
    };

    fetchUserTeams();
  }, []); // Empty dependency array ensures this runs once on mount

  // Update myTeam state when a team is selected from the dropdown
  useEffect(() => {
    if (selectedTeamId) {
      const selected = userTeams.find(team => team._id === selectedTeamId);
      setMyTeam(selected || null); // Set the full team object or null if not found
    } else {
      setMyTeam(null); // Reset if no team is selected
    }
  }, [selectedTeamId, userTeams]); // Re-run when selection or fetched teams change

  const handleTeamSelectChange = (e) => {
    setSelectedTeamId(e.target.value);
    setResult(null); // Reset result when team changes
    setAiTeam(null); // Optionally reset AI team too
  };

  const generateAITeam = () => {
    setResult(null); // Reset result

    // 1. Select Random Formation
    const randomFormation = formations[Math.floor(Math.random() * formations.length)];
    const formationRequirements = randomFormation.formation;

    // 2. Select Random Players based on Formation
    const newSelectedPlayers = [];
    let availablePlayers = [...samplePlayers]; // Create a mutable copy

    // Function to shuffle an array (Fisher-Yates algorithm)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    };

    // Iterate through position requirements (Forward, Midfielder, etc.)
    for (const [position, count] of Object.entries(formationRequirements)) {
        // Filter available players by position
        const playersForPosition = availablePlayers.filter(p => p.position === position);
        
        // Shuffle them to ensure randomness
        const shuffledPositionPlayers = shuffleArray(playersForPosition);

        // Select the required number of players
        const selectedForPosition = shuffledPositionPlayers.slice(0, count);

        // Add selected players to the team
        newSelectedPlayers.push(...selectedForPosition);

        // Remove selected players from the available pool to prevent duplicates
        const selectedIds = new Set(selectedForPosition.map(p => p.id));
        availablePlayers = availablePlayers.filter(p => !selectedIds.has(p.id));
    }

    // Ensure exactly 11 players were selected (handle potential edge cases if samplePlayers is too small)
    if (newSelectedPlayers.length !== 11) {
        console.error("Could not generate a full AI team of 11 players. Check samplePlayers pool size and formation definitions.");
        // Optionally, handle this error more gracefully (e.g., alert user, try again)
        // For now, we'll set a partial or empty team to indicate failure
         setAiTeam({
            teamName: "AI Generation Error",
            formation: randomFormation.name,
            players: newSelectedPlayers // Might be incomplete
         });
        return; 
    }

    // 3. Generate Random Team Name
    const aiTeamName = generateRandomTeamName();

    // 4. Set the AI Team State
    setAiTeam({
      teamName: aiTeamName,
      formation: randomFormation.name,
      players: newSelectedPlayers,
      // You might want to add coachName: "AI Opponent" or similar if needed later
    });
  };

  const battleTeams = (e) => {
    e.preventDefault(); // Prevent any default behavior
    if (!myTeam || !aiTeam) return;

    // Assign correct index within each position group for myTeam
    const myTeamPositions = {};
    const myTeamPositionCounters = {};
    myTeam.players.forEach((player) => {
      const playerId = player._id || player.id;
      const pos = player.position;
      if (!(pos in myTeamPositionCounters)) myTeamPositionCounters[pos] = 0;
      myTeamPositions[playerId] = {
        position: pos,
        index: myTeamPositionCounters[pos]
      };
      myTeamPositionCounters[pos]++;
    });

    // Assign correct index within each position group for aiTeam
    const aiTeamPositions = {};
    const aiTeamPositionCounters = {};
    aiTeam.players.forEach((player) => {
      const playerId = player._id || player.id;
      const pos = player.position;
      if (!(pos in aiTeamPositionCounters)) aiTeamPositionCounters[pos] = 0;
      aiTeamPositions[playerId] = {
        position: pos,
        index: aiTeamPositionCounters[pos]
      };
      aiTeamPositionCounters[pos]++;
    });

    // Debug log
    console.log('Battle Teams Data:', {
      myTeam: {
        ...myTeam,
        positions: myTeamPositions
      },
      aiTeam: {
        ...aiTeam,
        positions: aiTeamPositions
      }
    });

    navigate('/match', {
      state: {
        myTeam: {
          ...myTeam,
          positions: myTeamPositions
        },
        aiTeam: {
          ...aiTeam,
          positions: aiTeamPositions
        }
      }
    });
  };

  // Helper to display team details
  const renderTeam = (team, title) => (
    <div className="bg-slate-900/50 rounded-lg p-4 min-h-[300px]"> {/* Added min-height */}
        <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        {team ? (
            <>
                <h3 className="text-lg font-medium text-blue-400 mb-1">{team.teamName}</h3>
                <p className="text-sm text-gray-400 mb-3">Formation: {team.formation || 'N/A'}</p>
                <ul className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800 pr-2"> {/* Scrollable list */}
                    {team.players.map((p, idx) => (
                        <li key={p._id || p.id || idx} className="bg-slate-800/50 p-2 rounded-md text-sm flex justify-between items-center">
                           <span> <span className="font-bold text-yellow-400 mr-2">({p.number || '?'})</span>{p.name} </span> <span className="text-xs text-gray-500">{p.position}</span>
                        </li>
                    ))}
                </ul>
            </>
        ) : (
            <p className="text-gray-500 text-center mt-10">No team selected/generated.</p>
        )}
    </div>
  );

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">⚔️ Battle Page</h1>

      {/* Team Selection Dropdown */}
      <div className="mb-6 max-w-md mx-auto">
          <label htmlFor="teamSelect" className="block text-sm font-medium text-gray-300 mb-2">Select Your Team:</label>
          {loadingTeams ? (
               <p className="text-center text-gray-400">Loading your teams...</p>
          ) : fetchError ? (
               <p className="text-center text-red-500">{fetchError}</p>
          ) : userTeams.length === 0 ? (
               <p className="text-center text-yellow-500">You haven't saved any teams yet. Go create one!</p>
          ) : (
              <select
                  id="teamSelect"
                  value={selectedTeamId}
                  onChange={handleTeamSelectChange}
                  className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
              >
                  <option value="">-- Choose a Team --</option>
                  {userTeams.map(team => (
                      <option key={team._id} value={team._id}>
                          {team.teamName} ({team.formation || 'No formation'})
                      </option>
                  ))}
              </select>
          )}
      </div>


      {/* Team Display Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
         {renderTeam(myTeam, "Your Team")}
         {renderTeam(aiTeam, "AI Opponent")}
      </div>

      {/* Action Buttons */}
      <div className="text-center space-x-4">
        <button
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              !selectedTeamId
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          onClick={generateAITeam}
          disabled={!selectedTeamId}
        >
          Find Opponent
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              !myTeam || !aiTeam
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
          onClick={battleTeams}
          disabled={!myTeam || !aiTeam}
        >
          Battle!
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className={`text-center mt-6 text-2xl font-bold ${
            result === 'You Win!' ? 'text-green-500' : result === 'You Lose!' ? 'text-red-500' : 'text-yellow-500'
        }`}>
          Result: {result}
        </div>
      )}
    </div>
  );
};

export default BattlePage;
