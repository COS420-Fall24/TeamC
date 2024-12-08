import { createBookmark, scrollToBookmark } from './BookmarkUtils';

describe('BookmarkUtils', () => {
    // Setup
    beforeEach(() => {
        // Create a mock editor element
        const editor = document.createElement('div');
        editor.id = 'editor';
        document.body.appendChild(editor);
    });

    // Cleanup
    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('createBookmark', () => {
        test('should return 0 if editor element is not found', () => {
            document.body.innerHTML = ''; // Remove editor
            const range = new Range();
            const result = createBookmark(range);
            expect(result).toBe(0);
        });

    });

    describe('scrollToBookmark', () => {
        test('should not scroll if position is null', () => {
            const scrollToSpy = jest.spyOn(window, 'scrollTo');
            scrollToBookmark(null);
            expect(scrollToSpy).not.toHaveBeenCalled();
        });

        test('should call window.scrollTo with correct parameters', () => {
            const scrollToSpy = jest.spyOn(window, 'scrollTo');
            const position = 100;
            
            scrollToBookmark(position);
            
            expect(scrollToSpy).toHaveBeenCalledWith({
                top: position,
                behavior: 'smooth'
            });
        });
    });
}); 