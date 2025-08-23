import './SideBar.css';

import notesIcon from '../assets/notes.png';
import archiveIcon from '../assets/archive.png';
import trashIcon from '../assets/trash.png';
import closeIcon from '../assets/close.png';

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}>
          <div className="sidebar-drawer" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>
              <img src={closeIcon} alt="Close" width={20} />
            </button>
            <div className="sidebar-icons">
              <button className="sidebar-icon">
                <img src={notesIcon} alt="Notes" width={24} />
                <span>Notes</span>
              </button>
              <button className="sidebar-icon">
                <img src={archiveIcon} alt="Archive" width={24} />
                <span>Archive</span>
              </button>
              <button className="sidebar-icon">
                <img src={trashIcon} alt="Trash" width={24} />
                <span>Trash</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
