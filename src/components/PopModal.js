import * as React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Modals({ open, setOpen, noteId }) {
  const navigate = useNavigate();
  const [noteDeleteLoader, setNoteDeleteLoader] = React.useState(false);

  const onNoteDeleteHandler = async () => {
    try {
      setNoteDeleteLoader(true);

      await api.delete(`/notes/${noteId}`);
      toast.success("Note Delete successful");
      setOpen(false);
      navigate("/notes");
    } catch (err) {
      toast.error("Delete Note Failed");
    } finally {
      setNoteDeleteLoader(false);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex justify-center items-center h-full">
          <div className="w-96 glass-card rounded-2xl shadow-xl max-w-md px-6 py-10 m-4 animate-fade-in">
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-2">
                <AiOutlineWarning className="text-red-400 text-2xl" />
              </div>
            </div>
            <p className="mt-4 text-surface-200 text-center font-medium">
              Are you sure you want to delete this note?
            </p>
            <p className="text-surface-500 text-center text-sm mt-1">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-center space-x-3">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 bg-white/[0.05] border border-white/[0.1] text-surface-300 rounded-lg hover:bg-white/[0.1] transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={onNoteDeleteHandler}
                className="px-5 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300"
              >
                {noteDeleteLoader ? "Loading" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
