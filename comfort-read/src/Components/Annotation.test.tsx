import { render, fireEvent, screen } from '@testing-library/react';
import Annotation from './Annotation';

describe('Annotation Component', () => {
    const mockAnnotation = {
        id: '1',
        text: 'Selected text',
        comment: 'Test comment',
        position: 100
    };
    const mockOnDelete = jest.fn();
    const mockOnEdit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders annotation with selected text and comment', () => {
        render(
            <Annotation 
                annotation={mockAnnotation}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        );

        expect(screen.getByText(`"${mockAnnotation.text}"`)).toBeInTheDocument();
        expect(screen.getByText(mockAnnotation.comment)).toBeInTheDocument();
    });

    test('enters edit mode when edit button is clicked', () => {
        render(
            <Annotation 
                annotation={mockAnnotation}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        );

        fireEvent.click(screen.getByText('Edit'));
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('calls onEdit when saving changes', () => {
        render(
            <Annotation 
                annotation={mockAnnotation}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        );

        fireEvent.click(screen.getByText('Edit'));
        const textarea = screen.getByRole('textbox');
        fireEvent.change(textarea, { target: { value: 'Updated comment' } });
        fireEvent.click(screen.getByText('Save'));

        expect(mockOnEdit).toHaveBeenCalledWith('1', 'Updated comment');
    });

    test('calls onDelete when delete button is clicked', () => {
        render(
            <Annotation 
                annotation={mockAnnotation}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        );

        fireEvent.click(screen.getByText('Delete'));
        expect(mockOnDelete).toHaveBeenCalledWith('1');
    });

    test('cancels edit mode without saving changes', () => {
        render(
            <Annotation 
                annotation={mockAnnotation}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        );

        fireEvent.click(screen.getByText('Edit'));
        const textarea = screen.getByRole('textbox');
        fireEvent.change(textarea, { target: { value: 'Updated comment' } });
        fireEvent.click(screen.getByText('Cancel'));

        expect(mockOnEdit).not.toHaveBeenCalled();
        expect(screen.getByText(mockAnnotation.comment)).toBeInTheDocument();
    });
}); 