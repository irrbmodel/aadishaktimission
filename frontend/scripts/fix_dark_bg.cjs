const fs = require('fs');
const path = require('path');

const dir = '/Users/ishanroy/Desktop/client work/aadishaktimission/frontend/src/components';
const appPath = '/Users/ishanroy/Desktop/client work/aadishaktimission/frontend/src/App.jsx';

const processFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // If a button or element has bg-brand-dark (Green background), its text MUST be Butter (text-brand-cream).
    // The previous script might have set it to text-brand-dark (Green text). Let's fix that.
    content = content.replace(/(bg-brand-dark[^>]*?)text-brand-dark/g, '$1text-brand-cream');
    
    // Also check hover:bg-brand-dark and make sure text is hover:text-brand-cream
    content = content.replace(/(hover:bg-brand-dark[^>]*?)hover:text-brand-dark/g, '$1hover:text-brand-cream');

    fs.writeFileSync(filePath, content);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
files.forEach(file => processFile(path.join(dir, file)));
processFile(appPath);

console.log("Fixed dark backgrounds having dark text.");
