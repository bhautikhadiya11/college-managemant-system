const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages', 'professor');
const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.jsx'));

for (let file of files) {
  let filePath = path.join(directoryPath, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert import if missing
  if (!content.includes('import PageLoader')) {
    const importRegex = /import .*? from .*?;/g;
    let match;
    let lastIndex = 0;
    while ((match = importRegex.exec(content)) !== null) {
      lastIndex = importRegex.lastIndex;
    }
    if (lastIndex > 0) {
      content = content.slice(0, lastIndex) + "\nimport PageLoader from '../../components/PageLoader';" + content.slice(lastIndex);
    }
  }

  // Attendance
  content = content.replace(/if\s*\(loading\)\s*return\s*\(\s*<>\s*<style>\{styles\}<\/style>\s*<div className="pa-root pa-state">\s*<div className="pa-spinner" \/>\s*<span[^>]*>.*?<\/span>\s*<\/div>\s*<\/>\s*\);/g, 'if (loading) return <PageLoader text="Loading your attendance..." />;');
  content = content.replace(/if\s*\(loading\)\s*\{\s*return\s*\(\s*<>\s*<style>\{styles\}<\/style>\s*<div className="pa-root pa-state">\s*<div className="pa-spinner" \/>\s*<span[^>]*>.*?<\/span>\s*<\/div>\s*<\/>\s*\);\s*\}/g, 'if (loading) return <PageLoader text="Loading your attendance..." />;');
  
  // Assignment
  content = content.replace(/if\s*\(loading\)\s*return\s*\(\s*<>\s*<style>\{styles\}<\/style>\s*<div className="pa-root pa-state">\s*<div className="pa-spinner" \/>\s*<span[^>]*>.*?<\/span>\s*<\/div>\s*<\/>\s*\);/g, 'if (loading) return <PageLoader text="Loading assignments..." />;');
  content = content.replace(/if\s*\(loading\)\s*\{\s*return\s*\(\s*<>\s*<style>\{styles\}<\/style>\s*<div className="pa-root pa-state">\s*<div className="pa-spinner" \/>\s*<span[^>]*>.*?<\/span>\s*<\/div>\s*<\/>\s*\);\s*\}/g, 'if (loading) return <PageLoader text="Loading assignments..." />;');

  // Syllabus
  content = content.replace(/if\s*\(loading\)\s*return\s*<><style>\{styles\}<\/style><div className="ps-root ps-state"><div className="ps-spinner" \/><span[^>]*>.*?<\/span><\/div><\/>;/g, 'if (loading) return <PageLoader text="Loading subjects..." />;');

  // ProfessorHome
  content = content.replace(/if\s*\(loading\)\s*\{\s*return\s*\(\s*<>\s*<style>\{styles\}<\/style>\s*<div className="ph-root ph-center">\s*<div className="ph-spinner" \/>\s*<span className="ph-load-text">.*?<\/span>\s*<\/div>\s*<\/>\s*\);\s*\}/g, 'if (loading) return <PageLoader text="Loading dashboard..." />;');
  

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log("Done replacing professor loaders.");
