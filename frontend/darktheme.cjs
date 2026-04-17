const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function findAndReplaceJSXFiles(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findAndReplaceJSXFiles(filePath);
        } else if (filePath.endsWith('.jsx')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;

            // Replacing light theme backgrounds
            content = content.replace(/bg-white/g, 'bg-surface');
            content = content.replace(/bg-gray-50/g, 'bg-background');
            content = content.replace(/bg-gray-100/g, 'bg-surface/50');
            content = content.replace(/bg-\[\#f0f5ff\]\/30/g, 'bg-[#1a1a2e]');
            
            // Replacing text colors
            content = content.replace(/text-gray-900/g, 'text-textMain');
            content = content.replace(/text-gray-800/g, 'text-textMain');
            content = content.replace(/text-gray-700/g, 'text-textMain/80');
            content = content.replace(/text-gray-600/g, 'text-muted');
            content = content.replace(/text-gray-500/g, 'text-muted');
            content = content.replace(/text-gray-400/g, 'text-muted/70');
            
            // Replacing borders
            content = content.replace(/border-gray-100/g, 'border-white/5');
            content = content.replace(/border-gray-200/g, 'border-white/10');
            content = content.replace(/border-gray-300/g, 'border-white/20');
            
            // shadows
            content = content.replace(/shadow-gray-[0-9]+\/[0-9]+/g, 'shadow-primary/10');
            
            // primary-dark
            content = content.replace(/text-primary-dark/g, 'text-primary');

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated ${filePath}`);
            }
        }
    });
}

findAndReplaceJSXFiles(directoryPath);
