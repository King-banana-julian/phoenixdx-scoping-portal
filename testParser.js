import fs from 'fs';
import path from 'path';
import { parseActivityMarkdown } from './src/utils/activityParser.js';

const mdPath = './System_prompt/model-a-audit-evaluation.md';
const content = fs.readFileSync(mdPath, 'utf-8');

const activities = parseActivityMarkdown(content);
console.log(JSON.stringify(activities, null, 2));
