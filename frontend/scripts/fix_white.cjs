const fs = require('fs');
const path = require('path');

const replaceInFile = (filePath, replacements) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    
    replacements.forEach(({line, find, replace}) => {
        let lineIdx = line - 1;
        if (lines[lineIdx] && lines[lineIdx].includes(find)) {
            lines[lineIdx] = lines[lineIdx].replace(new RegExp(find, 'g'), replace);
        }
    });
    
    fs.writeFileSync(filePath, lines.join('\n'));
};

const componentsDir = '/Users/ishanroy/Desktop/client work/aadishaktimission/frontend/src/components';

replaceInFile(path.join(componentsDir, 'Gallery.jsx'), [
    { line: 110, find: 'text-white/50', replace: 'text-brand-dark/50' },
    { line: 121, find: 'text-white', replace: 'text-brand-dark' },
    { line: 127, find: 'bg-white/5', replace: 'bg-brand-dark/5' },
    { line: 127, find: 'border-white/5', replace: 'border-brand-dark/5' },
    { line: 140, find: 'bg-white', replace: 'bg-brand-dark' },
    { line: 140, find: 'text-black', replace: 'text-brand-cream' },
    { line: 140, find: 'shadow-white/20', replace: 'shadow-brand-dark/20' },
    { line: 141, find: 'text-white hover:bg-white/10', replace: 'text-brand-dark hover:bg-brand-dark/10' }
]);

replaceInFile(path.join(componentsDir, 'StatsCounter.jsx'), [
    { line: 44, find: 'text-white/50 group-hover:text-white', replace: 'text-brand-dark/50 group-hover:text-brand-dark' },
    { line: 90, find: 'text-white', replace: 'text-brand-dark' }
]);

replaceInFile(path.join(componentsDir, 'PillarsHorizontal.jsx'), [
    { line: 376, find: 'text-white/90', replace: 'text-brand-dark/90' }
]);

replaceInFile(path.join(componentsDir, 'IntroAnimation.jsx'), [
    { line: 405, find: 'text-white', replace: 'text-brand-dark' },
    { line: 461, find: 'border-white/15', replace: 'border-brand-dark/15' }
]);

replaceInFile(path.join(componentsDir, 'MembershipPayment.jsx'), [
    { line: 104, find: 'text-white', replace: 'text-brand-cream' }
]);

replaceInFile(path.join(componentsDir, 'ActionHub.jsx'), [
    { line: 316, find: 'text-white', replace: 'text-brand-cream' },
    { line: 422, find: 'text-white', replace: 'text-brand-dark' }, // If it's a category badge, dark green text is better on color background
    { line: 576, find: 'text-white', replace: 'text-brand-cream' }
]);

console.log("Fixed hardcoded whites.");
