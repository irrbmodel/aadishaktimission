const fs = require('fs');
const path = require('path');

const dir = '/Users/ishanroy/Desktop/client work/aadishaktimission/frontend/src/components';
const appPath = '/Users/ishanroy/Desktop/client work/aadishaktimission/frontend/src/App.jsx';

const processFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Replace pure blacks with the main dark teal
    content = content.replace(/\bbg-black\b/g, 'bg-brand-cream');
    
    // 2. Change bg-brand-dark to bg-brand-cream (Dark Teal) everywhere so the whole site is consistent Dark Teal.
    // Wait! If I do this, Hero.jsx, Gallery.jsx etc will all have Dark Teal backgrounds.
    content = content.replace(/\bbg-brand-dark\b/g, 'bg-brand-cream');
    
    // 3. To fix text visibility on the newly made Dark Teal backgrounds, any text that was originally 
    // text-brand-cream (which was meant for dark backgrounds in light mode) should now be text-brand-dark (White).
    // Let's find hover:text-brand-cream and normal text-brand-cream.
    // A gold button (bg-brand-red) uses text-brand-cream (Dark Teal). We should keep that!
    // So we only replace text-brand-cream when it's NOT on a button.
    // Instead of complex regex, let's just make the changes manually or specific regex.
    content = content.replace(/text-brand-cream/g, 'text-brand-dark'); // Default everything to white
    
    // Now revert the buttons specifically:
    // "bg-brand-red text-brand-dark" -> "bg-brand-red text-brand-cream"
    content = content.replace(/bg-brand-red([\s\S]*?)text-brand-dark/g, 'bg-brand-red$1text-brand-cream');
    content = content.replace(/hover:bg-brand-red([\s\S]*?)hover:text-brand-dark/g, 'hover:bg-brand-red$1hover:text-brand-cream');

    fs.writeFileSync(filePath, content);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
files.forEach(file => processFile(path.join(dir, file)));
processFile(appPath);

console.log("Updated classes for dark theme successfully.");
