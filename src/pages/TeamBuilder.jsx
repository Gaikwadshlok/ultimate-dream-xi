import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
// Import shared data
import { formations, samplePlayers, generateRandomTeamName, adjectives, nouns, suffixes } from '../data/constants'; 

const coaches = [
    { id: 0, name: "AI COACH" },
    { 
        id: 1, 
        name: "Sir Alex Ferguson",
        formations: ["4-4-2"]
    },
    {
        id: 2,
        name: "Pep Guardiola",
        formations: ["4-3-3", "3-4-3"]
    },
    {
        id: 3,
        name: "Zinedine Zidane",
        formations: ["4-3-3"]
    },
    {
        id: 4,
        name: "Carlo Ancelotti",
        formations: ["4-3-1-2", "4-3-3"]
    },
    {
        id: 5,
        name: "José Mourinho",
        formations: ["4-2-3-1"]
    }
];

// Update DraggablePlayerCard to receive selectedPlayers and playerPositions as props
const DraggablePlayerCard = ({ player, selectedPlayers, isDisabled, playerPositions }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "PLAYER",
        item: player,
        canDrag: !isDisabled,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const isSelected = selectedPlayers.some(p => 
        p.id === player.id && playerPositions[p.id] !== undefined
    );

    return (
        <div
            ref={drag}
            className={`bg-[#0d1117] p-2 sm:p-3 rounded-lg transition-all transform border ${
                isSelected 
                    ? 'border-red-500 opacity-50 cursor-not-allowed' 
                    : isDisabled
                    ? 'border-gray-800 opacity-50 cursor-not-allowed'
                    : 'border-gray-800 hover:bg-[#1e2943] hover:scale-[1.02] cursor-move'
            } ${isDragging ? 'opacity-50 scale-95' : ''}`}
        >
            <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1e2943] flex items-center justify-center text-xs sm:text-sm font-bold ${
                    isSelected ? 'text-red-400' : isDisabled ? 'text-gray-500' : 'text-yellow-400'
                }`}>
                    {player.number}
                </div>
                <div>
                    <p className="text-white font-medium text-xs sm:text-sm flex items-center gap-2">
                        {player.name}
                        {isSelected && (
                            <span className="text-red-500 text-xs hidden sm:inline">
                                (Selected)
                            </span>
                        )}
                    </p>
                    <p className="text-gray-400 text-xs">{player.position}</p>
                </div>
            </div>
        </div>
    );
};

const FieldPosition = ({
    position,
    index,
    spot,
    onDrop,
    player,
    selectedPlayers,
    playerPositions,
    selectedFormation,
    handleRemovePlayer
}) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "PLAYER",
        canDrop: (item) => {
            if (!item) return false;
            if (item.position !== position) return false;
            
            if (player) return false;
            
            const currentCount = selectedPlayers.filter(p => p.position === position).length;
            
            return currentCount < selectedFormation.formation[position];
        },
        drop: (item) => {
            if (onDrop) {
                onDrop(item, index, position);
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    const [{ isDragging }, drag] = useDrag({
        type: "PLAYER",
        item: player ? { ...player, type: 'FIELD_PLAYER', currentIndex: index } : null,
        canDrag: !!player,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });

    const ref = React.useCallback(node => {
        drop(node);
        if (player) {
            drag(node);
        }
    }, [drop, drag, player]);

    const formatPlayerName = (fullName) => {
        const parts = fullName.split(' ');
        if (parts.length <= 2) {
            return parts;
        }
        const lastName = parts.pop();
        const firstName = parts.join(' ');
        return [firstName, lastName];
    };

    return (
        <div
            ref={ref}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
                top: spot.top,
                left: spot.left,
                zIndex: player ? 10 : 1,
                willChange: 'transform'
            }}
        >
            {player ? (
                <div
                    onClick={() => handleRemovePlayer(player.id)}
                    className="relative w-20 h-28 transform hover:scale-110 transition-transform cursor-pointer flex flex-col justify-between pb-6"
                    style={{
                        background: '#FFDC83',
                        clipPath: 'path("M 15 0 L 65 0 C 75 0 80 5 80 15 L 80 85 L 40 100 L 0 85 L 0 15 C 0 5 5 0 15 0")',
                        boxShadow: '0 0 20px rgba(253, 184, 51, 0.5)',
                    }}
                >
                    <div className="flex-1 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-600">
                            {player.number}
                        </div>
                    </div>
                    <div className="text-gray-900 font-bold text-[10px] flex flex-col items-center leading-tight pointer-events-none">
                        {formatPlayerName(player.name).map((namePart, i) => (
                            <span key={i} className="uppercase">{namePart}</span>
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    className={`w-20 h-28 flex flex-col justify-between pb-6 transition-all duration-200 ${
                        isOver && canDrop
                            ? 'bg-blue-500/30 border-2 border-blue-500 scale-110'
                            : canDrop
                            ? 'bg-gray-800/50 border-2 border-blue-500/50'
                            : 'bg-gray-800/50 border-2 border-dashed border-gray-600'
                    }`}
                    style={{
                        clipPath: 'path("M 15 0 L 65 0 C 75 0 80 5 80 15 L 80 85 L 40 100 L 0 85 L 0 15 C 0 5 5 0 15 0")'
                    }}
                >
                    <div className="flex-1 flex items-center justify-center">
                        <div className={`text-center transition-colors duration-200 ${
                            isOver && canDrop ? 'text-white' : 'text-gray-400'
                        }`}>
                            <div className="text-xs">{position}</div>
                            <div className="text-xs mt-1">Empty</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const TeamBuilder = () => {
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [selectedFormation, setSelectedFormation] = useState(formations[0]);
    const [playerPositions, setPlayerPositions] = useState({});
    const [selectedCoach, setSelectedCoach] = useState(coaches[0]);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = localStorage.getItem("dreamXI");
        if (saved) {
            const savedData = JSON.parse(saved);
            setSelectedPlayers(savedData.players || []);
            setPlayerPositions(savedData.positions || {});
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("dreamXI", JSON.stringify({
            players: selectedPlayers,
            positions: playerPositions,
            formation: selectedFormation.name
        }));
    }, [selectedPlayers, playerPositions, selectedFormation]);

    const handleFormationChange = (e) => {
        const newFormation = formations.find(f => f.name === e.target.value);
        setSelectedFormation(newFormation);
        setSelectedPlayers([]);
        setPlayerPositions({});
        setTeamName("");
    };

    const handleRemovePlayer = (id) => {
        setSelectedPlayers(prev => prev.filter(p => p.id !== id));
        setPlayerPositions(prev => {
            const newPositions = { ...prev };
            delete newPositions[id];
            return newPositions;
        });
    };

    const handleCreateTeam = async () => {
        if (selectedPlayers.length !== 11 || !teamName.trim()) {
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/team/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    teamName,
                    formation: selectedFormation.name,
                    players: selectedPlayers,
                    positions: playerPositions,
                    coachName: selectedCoach.name
                }),
            });

            if (res.ok) {
                navigate("/my-team");
            } else {
                 // Handle non-OK responses (e.g., display error message)
                 const errorData = await res.json();
                 console.error("Failed to save team:", errorData);
                 alert(`Failed to save team: ${errorData.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error("Error creating team:", err);
             alert("An error occurred while saving the team. Please try again.");
        }
    };

    const getFormationPositions = (formation) => {
        const commonGoalkeeper = [{ top: '88%', left: '50%' }];

        switch (formation.name) {
            case "4-3-3":
                return {
                    Forward: [
                        { top: '15%', left: '25%' },
                        { top: '15%', left: '50%' },
                        { top: '15%', left: '75%' }
                    ],
                    Midfielder: [
                        { top: '40%', left: '25%' },
                        { top: '40%', left: '50%' },
                        { top: '40%', left: '75%' }
                    ],
                    Defender: [
                        { top: '65%', left: '15%' },
                        { top: '65%', left: '38%' },
                        { top: '65%', left: '62%' },
                        { top: '65%', left: '85%' }
                    ],
                    Goalkeeper: commonGoalkeeper
                };
            case "4-4-2":
                return {
                    Forward: [
                        { top: '15%', left: '35%' },
                        { top: '15%', left: '65%' }
                    ],
                    Midfielder: [
                        { top: '40%', left: '15%' },
                        { top: '40%', left: '38%' },
                        { top: '40%', left: '62%' },
                        { top: '40%', left: '85%' }
                    ],
                    Defender: [
                        { top: '65%', left: '15%' },
                        { top: '65%', left: '38%' },
                        { top: '65%', left: '62%' },
                        { top: '65%', left: '85%' }
                    ],
                    Goalkeeper: commonGoalkeeper
                };
            case "3-5-2":
                return {
                    Forward: [
                        { top: '15%', left: '35%' },
                        { top: '15%', left: '65%' }
                    ],
                    Midfielder: [
                        { top: '40%', left: '10%' },
                        { top: '35%', left: '30%' },
                        { top: '30%', left: '50%' },
                        { top: '35%', left: '70%' },
                        { top: '40%', left: '90%' }
                    ],
                    Defender: [
                        { top: '65%', left: '25%' },
                        { top: '65%', left: '50%' },
                        { top: '65%', left: '75%' }
                    ],
                    Goalkeeper: commonGoalkeeper
                };
            case "3-4-3":
                return {
                    Forward: [
                        { top: '15%', left: '25%' },
                        { top: '15%', left: '50%' },
                        { top: '15%', left: '75%' }
                    ],
                    Midfielder: [
                        { top: '40%', left: '15%' },
                        { top: '40%', left: '38%' },
                        { top: '40%', left: '62%' },
                        { top: '40%', left: '85%' }
                    ],
                    Defender: [
                        { top: '65%', left: '25%' },
                        { top: '65%', left: '50%' },
                        { top: '65%', left: '75%' }
                    ],
                    Goalkeeper: commonGoalkeeper
                };
            case "5-3-2":
                return {
                    Forward: [
                        { top: '15%', left: '35%' },
                        { top: '15%', left: '65%' }
                    ],
                    Midfielder: [
                        { top: '40%', left: '25%' },
                        { top: '40%', left: '50%' },
                        { top: '40%', left: '75%' }
                    ],
                    Defender: [
                        { top: '65%', left: '10%' },
                        { top: '65%', left: '30%' },
                        { top: '65%', left: '50%' },
                        { top: '65%', left: '70%' },
                        { top: '65%', left: '90%' }
                    ],
                    Goalkeeper: commonGoalkeeper
                };
            default:
                return {
                    Forward: [],
                    Midfielder: [],
                    Defender: [],
                    Goalkeeper: []
                };
        }
    };

    const handlePositionDrop = (item, index, position) => {
        const playerAlreadySelected = selectedPlayers.some(p => p.id === item.id);

        if (playerAlreadySelected) {
            setPlayerPositions(prev => ({
                ...prev,
                [item.id]: { index, position }
            }));
        } else {
            setSelectedPlayers(prev => [...prev, item]);
            setPlayerPositions(prev => ({
                ...prev,
                [item.id]: { index, position }
            }));
        }
    };

    const handleCoachMode = () => {
        // 1. Select formation based on coach's preference
        let selectedFormation;
        if (selectedCoach.id === 0) {
            // AI COACH: Random formation
            selectedFormation = formations[Math.floor(Math.random() * formations.length)];
        } else {
            // Use coach's preferred formation
            const preferredFormations = selectedCoach.formations || [formations[0].name];
            const formationName = preferredFormations[Math.floor(Math.random() * preferredFormations.length)];
            selectedFormation = formations.find(f => f.name === formationName) || formations[0];
        }
        setSelectedFormation(selectedFormation);

        // 2. Select players based on coach's style
        const newSelectedPlayers = [];
        const newPlayerPositions = {};
        let availablePlayers = [...samplePlayers];

        const selectPlayersForPosition = (position, count, style) => {
            const positionPlayers = availablePlayers.filter(p => p.position === position);
            
            if (selectedCoach.id !== 0 && style) {
                // Add randomness to coach's preferences
                const playersWithScores = positionPlayers.map(player => ({
                    player,
                    score: (style(player)?.score || 0) + Math.random() * 2 // Add random factor of 0-2
                }));

                // Sort by score but with randomness
                playersWithScores.sort((a, b) => b.score - a.score);
                
                // Return just the players
                return playersWithScores
                    .slice(0, Math.min(count + 2, playersWithScores.length)) // Get a few extra options
                    .sort(() => Math.random() - 0.5) // Shuffle them
                    .slice(0, count) // Take required number
                    .map(p => p.player);
            } else {
                // Random selection for AI COACH
                return [...positionPlayers]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, count);
            }
        };

        // Fill positions based on formation
        Object.entries(selectedFormation.formation).forEach(([position, count]) => {
            const style = selectedCoach.style?.[position];
            const selectedForPosition = selectPlayersForPosition(position, count, style);
            
            // Randomly assign positions within the same role
            const indices = Array.from({ length: count }, (_, i) => i)
                .sort(() => Math.random() - 0.5);
            
            selectedForPosition.forEach((player, i) => {
                newSelectedPlayers.push(player);
                newPlayerPositions[player.id] = { 
                    index: indices[i], 
                    position 
                };
                availablePlayers = availablePlayers.filter(p => p.id !== player.id);
            });
        });

        // 3. Generate team name
        const generateTeamName = () => {
            const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
            const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
            const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
            return `${randomAdjective} ${randomNoun} ${randomSuffix}`;
        };

        // 4. Update state
        setSelectedPlayers(newSelectedPlayers);
        setPlayerPositions(newPlayerPositions);
        setTeamName(generateTeamName());
    };

    const renderFieldPlayers = () => {
        const positions = getFormationPositions(selectedFormation);
        
        return (
            <>
                {Object.entries(positions).map(([position, spots]) =>
                    spots.map((spot, index) => {
                        const player = selectedPlayers.find(p => 
                            p.position === position && 
                            playerPositions[p.id]?.index === index
                        );

                        return (
                            <FieldPosition
                                key={`${position}-${index}`}
                                position={position}
                                index={index}
                                spot={spot}
                                onDrop={handlePositionDrop}
                                player={player}
                                selectedPlayers={selectedPlayers}
                                playerPositions={playerPositions}
                                selectedFormation={selectedFormation}
                                handleRemovePlayer={handleRemovePlayer}
                            />
                        );
                    })
                )}
            </>
        );
    };

    return (
        <div className="min-h-screen flex flex-col p-2 sm:p-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">Team Builder</h1>

            <div className="mb-4 w-full max-w-5xl mx-auto px-2 sm:px-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="Enter team name"
                            className="w-full p-2 sm:p-3 pr-24 sm:pr-32 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                        />
                        <button
                            onClick={handleCreateTeam}
                            disabled={selectedPlayers.length !== 11 || !teamName.trim()}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-md text-sm sm:text-base font-semibold text-white transition-all whitespace-nowrap
                                ${selectedPlayers.length === 11 && teamName.trim()
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-600 cursor-not-allowed"
                                }`}
                        >
                            Save Team
                        </button>
                    </div>
                    <select
                        value={selectedFormation.name}
                        onChange={handleFormationChange}
                        className="w-full sm:w-40 p-2 sm:p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                    >
                        {formations.map((formation) => (
                            <option key={formation.name} value={formation.name}>
                                {formation.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full max-w-7xl mx-auto">
                <div className="bg-[#0d1117] rounded-lg flex flex-col h-[500px] sm:h-[600px]">
                    <div className="p-3 sm:p-4 border-b border-gray-800 bg-[#161b22]">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">Available Players</h2>
                    </div>
                    <div className="overflow-auto flex-1 p-2 sm:p-4">
                        {["Forward", "Midfielder", "Defender", "Goalkeeper"].map((pos) => {
                            const positionCount = Object.entries(playerPositions)
                                .filter(([playerId]) => 
                                    selectedPlayers.find(p => 
                                        p.id.toString() === playerId.toString() && 
                                        p.position === pos
                                    )
                                ).length;
                            
                            const maxAllowed = selectedFormation.formation[pos];
                            return (
                                <div key={pos} className="bg-[#161b22] rounded-lg p-2 sm:p-4 mb-3 sm:mb-4">
                                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                                        <h3 className="text-[#3b82f6] text-base sm:text-lg font-medium">{pos}s</h3>
                                        <span className={`text-xs sm:text-sm ${positionCount >= maxAllowed ? 'text-red-500' : 'text-gray-400'}`}>
                                            {positionCount}/{maxAllowed}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                        {samplePlayers.filter(p => p.position === pos).map((player) => {
                                            const isSelected = playerPositions[player.id] !== undefined;
                                            const isPositionFull = positionCount >= maxAllowed;
                                            return (
                                                <DraggablePlayerCard
                                                    key={player.id}
                                                    player={player}
                                                    selectedPlayers={selectedPlayers}
                                                    isDisabled={!isSelected && isPositionFull}
                                                    playerPositions={playerPositions}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-[#0d1117] rounded-lg relative h-[500px] sm:h-[600px] overflow-hidden field-container">
                    <div className="absolute inset-0">
                        <div className="w-full h-full bg-green-600 relative">
                            <div className="absolute inset-2 sm:inset-4 border-2 border-white">
                                <div className="absolute top-1/2 left-1/2 w-[30%] h-[30%] border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white -translate-x-1/2" />
                                <div className="absolute top-0 left-1/2 w-[60%] h-[25%] border-2 border-white -translate-x-1/2" />
                                <div className="absolute bottom-0 left-1/2 w-[60%] h-[25%] border-2 border-white -translate-x-1/2" />
                                <div className="absolute top-0 left-1/2 w-[30%] h-[12%] border-2 border-white -translate-x-1/2" />
                                <div className="absolute bottom-0 left-1/2 w-[30%] h-[12%] border-2 border-white -translate-x-1/2" />
                            </div>

                            <div className="absolute inset-2 sm:inset-4">
                                {renderFieldPlayers()}
                            </div>

                            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-20">
                                <div className="relative">
                                    <button
                                        onClick={handleCoachMode}
                                        onWheel={(e) => {
                                            e.preventDefault();
                                            const direction = e.deltaY > 0 ? 1 : -1;
                                            const currentIndex = coaches.findIndex(c => c.id === selectedCoach.id);
                                            let newIndex = currentIndex + direction;
                                            if (newIndex >= coaches.length) newIndex = 0;
                                            if (newIndex < 0) newIndex = coaches.length - 1;
                                            setSelectedCoach(coaches[newIndex]);
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                                                 py-1.5 sm:py-2 px-3 sm:px-4 
                                                 text-xs sm:text-sm
                                                 rounded-lg shadow-md transition-all 
                                                 opacity-50 hover:opacity-100 
                                                 inline-flex items-center"
                                        title={`Let ${selectedCoach.name} select your team`}
                                    >
                                        <span>{selectedCoach.name}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamBuilder;