import React, { useState } from 'react';
import './FileDialog.css';

interface FileDialogProps {
  onClose: () => void;
  onCreate: (title: string, color: string) => void;
}

const FileDialog: React.FC<FileDialogProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#f5f5f5');

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate(title, color);
    setTitle('');
    setColor('#f5f5f5');
    onClose();
  };

  return (
    <div className="file-dialog-overlay">
      <div className="file-dialog">
        <h2>Create New File</h2>
        <input
          type="text"
          placeholder="Enter file title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="color-picker">
          <label>Choose Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="dialog-buttons">
          <button
            onClick={handleCreate}
            disabled={!title.trim()}
            className="create-btn"
          >
            Create
          </button>

          <button
            onClick={onClose}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default FileDialog;