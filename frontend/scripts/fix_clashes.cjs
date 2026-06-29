const fs = require('fs');
const path = require('path');

const dir = '/Users/ishanroy/Desktop/client work/aadishaktimission/frontend/src/components';
const appPath = '/Users/ishanroy/Desktop/client work/aadishaktimission/frontend/src/App.jsx';

const processFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Ensure all default text on our Butter background is Dark Green (text-brand-dark)
    // Replace text-brand-cream (Butter text) with text-brand-dark globally first.
    content = content.replace(/text-brand-cream/g, 'text-brand-dark');
    
    // 2. But if it's inside a green button (bg-brand-red), the text SHOULD be Butter (text-brand-cream)!
    // Let's find those green buttons and fix their text color.
    // E.g., class="... bg-brand-red ... text-brand-dark ..." -> class="... bg-brand-red ... text-brand-cream ..."
    content = content.replace(/(bg-brand-red[^>]*?)text-brand-dark/g, '$1text-brand-cream');
    
    // Similarly for hover states:
    // If hovering makes it Green (hover:bg-brand-dark or hover:bg-brand-red), the hover text should be Butter (hover:text-brand-cream).
    content = content.replace(/(hover:bg-brand-dark[^>]*?)hover:text-brand-dark/g, '$1hover:text-brand-cream');
    content = content.replace(/(hover:bg-brand-red[^>]*?)hover:text-brand-dark/g, '$1hover:text-brand-cream');
    
    // If hovering makes it Butter (hover:bg-brand-cream), the hover text MUST be Green (hover:text-brand-dark).
    // Let's ensure this is correct:
    content = content.replace(/(hover:bg-brand-cream[^>]*?)hover:text-brand-cream/g, '$1hover:text-brand-dark');

    // Also, if group-hover makes it Butter (group-hover:bg-brand-cream), text must be Green.
    content = content.replace(/(group-hover:bg-brand-cream[^>]*?)group-hover:text-brand-cream/g, '$1group-hover:text-brand-dark');

    // Finally, if group-hover makes it Green (group-hover:bg-brand-dark or group-hover:bg-brand-red), text must be Butter.
    content = content.replace(/(group-hover:bg-brand-dark[^>]*?)group-hover:text-brand-dark/g, '$1group-hover:text-brand-cream');
    content = content.replace(/(group-hover:bg-brand-red[^>]*?)group-hover:text-brand-dark/g, '$1group-hover:text-brand-cream');

    fs.writeFileSync(filePath, content);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
files.forEach(file => processFile(path.join(dir, file)));
processFile(appPath);

console.log("Fixed clashes globally.");
