interface BionicTextProps {
    html: string;
    setHtml: (html: string) => void;
}

export function BionicText({ html, setHtml }: BionicTextProps) {
    const toggleBionic = () => {
        // Create temporary div to parse HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Check if content is already in bionic reading format
        const isBionic = tempDiv.innerHTML.includes('<strong>');
        
        if (isBionic) {
            // Remove all bold tags while preserving text content
            const plainText = tempDiv.innerHTML.replace(/<\/?strong>/g, '');
            setHtml(plainText);
            return;
        }

        // Process all text nodes in the document
        const walk = document.createTreeWalker(
            tempDiv,
            NodeFilter.SHOW_TEXT,
            null
        );

        const nodes = [];
        let currentNode;
        while ((currentNode = walk.nextNode())) {
            nodes.push(currentNode);
        }

        // Process nodes after collecting them all
        nodes.forEach(node => {
            if (node.textContent) {
                const words = node.textContent.split(/(\s+)/);
                const processedWords = words.map(word => {
                    if (word.trim().length === 0) return word;
                    
                    const midpoint = Math.ceil(word.length / 3);
                    const firstHalf = word.slice(0, midpoint);
                    const secondHalf = word.slice(midpoint);
                    
                    return `<strong>${firstHalf}</strong>${secondHalf}`;
                });

                const span = document.createElement('span');
                span.innerHTML = processedWords.join('');
                node.parentNode?.replaceChild(span, node);
            }
        });

        setHtml(tempDiv.innerHTML);
    };

    return (
        <button onClick={toggleBionic}>
            Bionic
        </button>
    );
}


export default BionicText;