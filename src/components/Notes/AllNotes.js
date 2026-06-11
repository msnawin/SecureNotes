import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import NoteItems from "./NoteItems";
import { FiFilePlus } from "react-icons/fi";
import { Blocks } from "react-loader-spinner";
import Errors from "../Errors";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await api.get("/notes");

      const parsedNotes = response.data.map((note) => ({
        ...note,
        parsedContent: JSON.parse(note.content).content, // Assuming each note's content is JSON-formatted.
      }));
      setNotes(parsedNotes);
    } catch (error) {
      setError(error.response.data.message);
      console.error("Error fetching notes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //calling the function here to fetch all notes
    fetchNotes();
  }, []);

  //to show an errors
  if (error) {
    return <Errors message={error} />;
  }

  return (
    <div className="min-h-[calc(100vh-74px)] sm:py-10 sm:px-5 px-0 py-4">
      <div className="w-[92%] mx-auto">
        {!loading && notes && notes?.length > 0 && (
          <h1 className="font-outfit text-surface-100 sm:text-4xl text-2xl font-semibold">
            My Notes
          </h1>
        )}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-72">
            <span>
              <Blocks
                height="70"
                width="70"
                color="#10b981"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
              />
            </span>
            <span className="text-surface-400 mt-2">Please wait...</span>
          </div>
        ) : (
          <>
            {notes && notes?.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-96 p-4">
                <div className="text-center glass-card p-10 animate-fade-in">
                  <div className="w-16 h-16 rounded-2xl bg-vault-500/10 border border-vault-500/20 flex items-center justify-center mx-auto mb-6">
                    <FiFilePlus className="text-vault-400 text-3xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-surface-100 mb-3 font-outfit">
                    No notes yet
                  </h2>
                  <p className="text-surface-400 mb-6">
                    Start by creating a new note to keep track of your thoughts.
                  </p>
                  <div className="w-full flex justify-center">
                    <Link to="/create-note">
                      <button className="vault-btn flex items-center px-6 py-2.5 text-white">
                        <FiFilePlus className="mr-2" size={20} />
                        Create New Note
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="pt-10 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-5 justify-center">
                  {notes.map((item) => (
                    <NoteItems key={item.id} {...item} id={item.id} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllNotes;
