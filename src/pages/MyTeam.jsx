import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

const MyTeam = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Log the request details for debugging
      console.log('Fetching teams with token:', token);
      
      const response = await fetch("http://localhost:5000/api/team/my-teams", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the response status
      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Teams data:', data); // Log the received data
        setTeams(data);
      } else {
        console.error("Failed to fetch teams");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (!teamId) {
      console.error("No team ID provided");
      return;
    }

    try {
      setDeleteLoading(teamId);
      const token = localStorage.getItem("token");
      
      // Updated endpoint URL to match your API structure
      const response = await fetch(`http://localhost:5000/api/team/${teamId}`, {  // Removed 'delete' from the URL
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Delete response status:', response.status);

      if (response.ok) {
        // Remove team from state
        setTeams(prevTeams => prevTeams.filter(team => team._id !== teamId));
        console.log('Team deleted successfully');
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete team');
        } else {
          throw new Error(`Failed to delete team (Status: ${response.status})`);
        }
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      alert(error.message || "Failed to delete team. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleCreateTeam = () => {
    navigate("/team-builder");
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">My Saved Teams</h1>
        
        <div className="overflow-y-auto h-[calc(100vh-180px)] scrollbar-hide">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : teams.length === 0 ? (
            <div className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
              <p className="text-gray-300 mb-4">No teams saved yet.</p>
              <button
                onClick={handleCreateTeam}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Create Your First Team
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {teams.map((team) => (
                <div
                  key={team._id}
                  className="bg-[#161b22] rounded-lg overflow-hidden border border-slate-700 shadow-lg"
                >
                  <div className="p-4 bg-[#1e2736] border-b border-gray-700 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-[#63b3ed]">{team.teamName}</h2>
                      <p className="text-sm text-gray-400 mt-1">
                        Coach: {
                          team.coachName ? 
                            (team.coachName === "AI COACH" ? "AI Generated" : team.coachName) 
                          : 
                            (team.userId && team.userId.username ? team.userId.username : "Unknown User") 
                        }
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteTeam(team._id)}
                      disabled={deleteLoading === team._id}
                      className={`px-3 py-1 rounded transition-colors ${
                        deleteLoading === team._id
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      } text-white flex items-center justify-center min-w-[70px]`}
                    >
                      {deleteLoading === team._id ? (
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-md font-medium mb-4 text-gray-300">
                      Formation: {team.formation || 'Not specified'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {team.players.map((player, playerIdx) => (
                        <div
                          key={playerIdx}
                          className="bg-[#2d3748] p-3 rounded-md hover:bg-[#374151] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-sm">
                              {player.number || '?'}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white text-sm">{player.name}</h3>
                              <p className="text-xs text-gray-400">{player.position}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
