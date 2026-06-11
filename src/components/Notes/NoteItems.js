import { MdRemoveRedEye } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { truncateText } from "../../utils/truncateText";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

const NoteItems = ({ parsedContent, id, createdAt }) => {
  const formattedDate = moment(createdAt).format("D MMMM YYYY");
  return (
    <div className="sm:px-5 px-3 py-5 glass-card hover:border-vault-500/20 hover:shadow-glow min-h-96 max-h-96 relative overflow-hidden transition-all duration-300 group">
      <p
        className="text-surface-300 font-customWeight ql-editor"
        dangerouslySetInnerHTML={{ __html: truncateText(parsedContent) }}
      ></p>
      <div className="flex justify-between items-center absolute bottom-0 left-0 w-full sm:px-5 px-3 py-4 bg-gradient-to-t from-surface-900/95 via-surface-900/80 to-transparent">
        <span className="text-surface-500 text-sm">{formattedDate}</span>
        <Link to={`/notes/${id}`}>
          {" "}
          <Tooltip title="View Note">
            <IconButton className="group-hover:text-vault-400">
              <MdRemoveRedEye className="text-surface-400 group-hover:text-vault-400 transition-colors duration-200" />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default NoteItems;
