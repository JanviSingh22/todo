import './FileCard.css';

interface FileCardProps {
  title: string | number;
  color: string;
  onClick?: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ title, color, onClick }) => { // used generuc type React.FC for functional component
  return (
    <div className="file-card" style={{ backgroundColor: color }} onClick = {onClick}> 
    
      <h3>{title}</h3>
    </div>
  );
};

export default FileCard;
