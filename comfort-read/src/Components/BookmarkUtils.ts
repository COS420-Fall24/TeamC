export function createBookmark(range: Range): number {
    // Get the editor element
    const editor = document.getElementById('editor');
    if (!editor) return 0;

    // Create a temporary marker element
    const marker = document.createElement('span');
    marker.id = 'bookmark-marker';
    
    // Insert the marker at the start of the selection
    range.insertNode(marker);
    
    // Calculate the offset from the top of the editor
    const offset = marker.offsetTop;
    
    // Remove the marker
    marker.parentNode?.removeChild(marker);
    
    return offset;
}

export function scrollToBookmark(position: number | null) {
    if (position === null) return;
    
    window.scrollTo({
        top: position,
        behavior: 'smooth'
    });
} 