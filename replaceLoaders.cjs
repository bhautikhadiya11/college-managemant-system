const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages', 'student');

const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.jsx'));

for (let file of files) {
  let filePath = path.join(directoryPath, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert import if missing
  if (!content.includes('import PageLoader')) {
    // Find the last import statement
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

  // Define regexes to match the various if (loading) return (...) patterns
  
  // StudentAttendance
  content = content.replace(/if\s*\(loading\)\s*\{\s*return\s*\(\s*<>\s*<style>\{styles\}<\/style>\s*<div className="sa-root">\s*<div className="sa-loading">\s*<div className="sa-spinner" \/>\s*<span className="sa-loading-text">.*?<\/span>\s*<\/div>\s*<\/div>\s*<\/>\s*\);\s*\}/g, 'if (loading) return <PageLoader text="Loading your attendance..." />;');
  
  // StudentHome
  content = content.replace(/if\s*\(loading\)\s*return\s*\(\s*<>\s*<style>\{styles\}<\/style>\s*<div className="sh-root sh-center">\s*<div className="sh-spinner" \/>\s*<span className="sh-load-text">.*?<\/span>\s*<\/div>\s*<\/>\s*\);/g, 'if (loading) return <PageLoader text="Loading dashboard..." />;');
  
  // StudentSyllabus
  content = content.replace(/if\s*\(loading\)\s*return\s*\(\s*<><style>\{styles\}<\/style>\s*<div className="sy-root sy-loading"><div className="sy-spinner" \/><\/div><\/>\s*\);/g, 'if (loading) return <PageLoader text="Loading syllabus..." />;');
  
  // StudentGallery
  content = content.replace(/if\s*\(loading\)\s*return\s*\(\s*<><style>\{styles\}<\/style>\s*<div className="sg-root sg-loading"><div className="sg-spinner" \/><\/div><\/>\s*\);/g, 'if (loading) return <PageLoader text="Loading gallery..." />;');

  // StudentAssignments
  content = content.replace(/if\s*\(loading\)\s*return\s*\(\s*<>\s*<style>\{styles\}<\/style>\s*<div className="sa-root sa-loading">\s*<div className="sa-spinner" \/>\s*<\/div>\s*<\/>\s*\);/g, 'if (loading) return <PageLoader text="Loading assignments..." />;');

  // StudentFees
  content = content.replace(/if\s*\(loading\)\s*return\s*\(\s*<><style>\{styles\}<\/style>\s*<div className="sf-root sf-loading"><div className="sf-spinner" \/><\/div><\/>\s*\);/g, 'if (loading) return <PageLoader text="Loading fee details..." />;');

  // StudentNotifications
  content = content.replace(/if\s*\(loading\)\s*return\s*\(\s*<>\s*<style>\{styles\}<\/style>\s*<div className="sn-root sn-loading">\s*<div className="sn-spinner" \/>\s*<\/div>\s*<\/>\s*\);/g, 'if (loading) return <PageLoader text="Loading notifications..." />;');

  // StudentProfile
  content = content.replace(/if\s*\(loading\)\s*return\s*\(\s*<><style>\{styles\}<\/style>\s*<div className="sp-root sp-center"><div className="sp-spinner" \/><\/div><\/>\s*\);/g, 'if (loading) return <PageLoader text="Loading your profile..." />;');


  fs.writeFileSync(filePath, content, 'utf8');
}

console.log("Done replacing loaders.");
