/**
 * Utility to parse activity markdown files.
 */

export const parseActivityMarkdown = (mdContent) => {
  const activities = [];
  const modelMatch = mdContent.match(/Model ([A-D]) — (.+)/i);
  const modelCode = modelMatch ? modelMatch[1] : '';
  const modelName = modelMatch ? modelMatch[2] : '';
  
  const phaseStructureMatch = mdContent.match(/\*\*Phase structure:\*\*\s*(.+)/i) || mdContent.match(/Phase structure:\s*(.+)/i);
  const phaseStructure = phaseStructureMatch ? phaseStructureMatch[1].split(' → ').map(s => s.trim()) : [];

  const sections = mdContent.split(/^## /m);

  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    if (section.startsWith('Activities in this model') || section.trim() === '' || section.startsWith('About this model')) continue;

    const name = section.split('\n')[0].trim();
    if (!name) continue;

    const activity = {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
      name,
      model: modelCode,
      modelName,
      phaseStructure,
      effortBySize: {},
      phasesBySize: {},
      deliverables: {},
      dependencies: {},
      aiValidation: {},
      scopeGuards: []
    };

    // Effort Table
    const tableMatch = section.match(/\| Size \|[\s\S]+?\|[\r\n]+((?:\|.+[\r\n]+)+)/);
    if (tableMatch) {
      const rows = tableMatch[1].trim().split('\n');
      rows.forEach(row => {
        if (row.includes('---')) return; // Skip divider
        const cols = row.split('|').filter(c => c.trim() !== '').map(c => c.trim());
        if (cols.length >= 5) {
          const rawSize = cols[0];
          const size = (rawSize === 'Extra Large' || rawSize === 'XL') ? 'XL' : rawSize;
          activity.effortBySize[size] = {
            trigger: cols[1],
            effort: cols[2],
            aiEffort: cols[3],
            friction: cols[4]
          };
        }
      });
    }

    // Phase Breakdown
    const phaseHeaderMatch = section.match(/### Phase breakdown/i);
    if (phaseHeaderMatch) {
      const phaseSectionStart = phaseHeaderMatch.index + phaseHeaderMatch[0].length;
      const nextHeaderMatch = section.slice(phaseSectionStart).match(/###/);
      const phaseContent = nextHeaderMatch 
        ? section.slice(phaseSectionStart, phaseSectionStart + nextHeaderMatch.index)
        : section.slice(phaseSectionStart);
      
      const phaseBlocks = phaseContent.split(/\*\*([^*]+)\*\*/);
      for (let j = 1; j < phaseBlocks.length; j += 2) {
        const phaseName = phaseBlocks[j].trim();
        const pContent = phaseBlocks[j + 1].trim();
        const sizeLines = pContent.split('\n').filter(l => l.startsWith('- '));
        sizeLines.forEach(line => {
          const m = line.match(/- (Small|Medium|Large|XL|Extra Large):\s*([\d.d]+)\s*—\s*(.+)/i);
          if (m) {
            const size = (m[1] === 'Extra Large' || m[1] === 'XL') ? 'XL' : m[1];
            if (!activity.phasesBySize[size]) activity.phasesBySize[size] = {};
            activity.phasesBySize[size][phaseName] = { days: m[2], description: m[3] };
          }
        });
      }
    }

    // List Parser Helper
    const parseKVList = (header) => {
      const headerReg = new RegExp(`### ${header}`, 'i');
      const hMatch = section.match(headerReg);
      if (!hMatch) return {};
      const start = hMatch.index + hMatch[0].length;
      const endMatch = section.slice(start).match(/###|---|-{3,}/);
      const content = endMatch ? section.slice(start, start + endMatch.index) : section.slice(start);
      
      const obj = {};
      const items = content.split('\n').filter(l => l.startsWith('- '));
      items.forEach(item => {
        const m = item.match(/- \*\*(.+?)\*\*:\s*(.+)/);
        if (m) {
          let key = m[1].replace(/:$/, '').trim();
          key = (key === 'Extra Large' || key === 'XL') ? 'XL' : key;
          obj[key] = m[2].trim();
        }
      });
      return obj;
    };

    activity.deliverables = parseKVList('Deliverables');
    activity.dependencies = parseKVList('Dependencies');
    activity.aiValidation = parseKVList('AI validation requirements');

    // Scope Guards
    const guardsMatch = section.match(/### Scope guard rules/i);
    if (guardsMatch) {
      const start = guardsMatch.index + guardsMatch[0].length;
      const endMatch = section.slice(start).match(/###|---|-{3,}/);
      const content = endMatch ? section.slice(start, start + endMatch.index) : section.slice(start);
      activity.scopeGuards = content.split('\n')
        .filter(l => l.startsWith('- '))
        .map(l => l.replace('- ', '').trim());
    }

    activities.push(activity);
  }

  return activities;
};

export const loadAllActivities = async () => {
  const modules = import.meta.glob('/System_prompt/model-*.md', { as: 'raw', eager: true });
  let allActivities = [];
  for (const path in modules) {
    const activities = parseActivityMarkdown(modules[path]);
    allActivities = [...allActivities, ...activities];
  }
  return allActivities;
};
