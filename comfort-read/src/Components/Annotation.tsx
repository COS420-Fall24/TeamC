import { useState } from 'react';
import { Button } from 'react-bootstrap';


// Annotation data interface
export interface AnnotationData {
    id: string;
    text: string;
    comment: string;
    position: number;
}

// Annotation props interface
interface AnnotationProps {
    annotation: AnnotationData;
    onDelete: (id: string) => void;
    onEdit: (id: string, newComment: string) => void;
}

function Annotation({ annotation, onDelete, onEdit }: AnnotationProps) {
    // State for editing
    const [isEditing, setIsEditing] = useState(false);
    // State for edited comment
    const [editedComment, setEditedComment] = useState(annotation.comment);

    // Function to handle saving changes
    const handleSave = () => {
        onEdit(annotation.id, editedComment);
        setIsEditing(false);
    };

    return (
        <div 
            className="annotation"
            style={{
                position: 'absolute',
                right: '20px',
                top: `${annotation.position}px`,
                width: '200px',
                backgroundColor: '#f8f9fa',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginLeft: '20px'
            }}
        >
            <div className="selected-text" style={{fontStyle: 'italic', marginBottom: '5px'}}>
                "{annotation.text}"
            </div>
            {isEditing ? (
                <>
                    <textarea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        style={{width: '100%', marginBottom: '5px'}}
                    />
                    <Button size="sm" onClick={handleSave}>Save</Button>
                    <Button size="sm" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                </>
            ) : (
                <>
                    <div className="comment">{annotation.comment}</div>
                    <div className="annotation-actions" style={{marginTop: '5px'}}>
                        <Button size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                        <Button size="sm" variant="danger" onClick={() => onDelete(annotation.id)}>Delete</Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Annotation; 