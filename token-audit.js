/**
 * token-audit.js
 * Design System — Token Usage Enforcement (Almosafer)
 *
 * Scans source files for raw styling values that violate the token contract.
 * Components must use CSS custom properties from tokens.css only.
 *
 * Usage:  node token-audit.js
 * Exit:   0 — no violations found
 *         1 — violations found
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Configuration ────────────────────────────────────────────────────────────

const SCAN_FOLDERS = ['src', 'app', 'components', 'specs'];

const SCAN_EXTENSIONS = new Set(['.css', '.scss', '.js', '.jsx', '.ts', '.tsx']);

// Files exempt from auditing — they are permitted to hold raw values.
const EXEMPT_FILES = new Set([
  'tokens.css',
  'token-audit.js',
]);

// Folder segments that are always skipped.
const SKIP_FOLDER_SEGMENTS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  '.cache',
  'foundations',   // specs/foundations — raw values are expected here
  'tokens',        // specs/tokens      — token definitions reference primitives
]);

// ─── Violation Rules ──────────────────────────────────────────────────────────

/**
 * Each rule defines:
 *   name     — label shown in error output
 *   test     — function(line, lineNumber, filePath) → array of matched strings | null
 *   message  — optional extra context shown after the match
 */
const RULES = [

  // 1. Raw HEX colors
  {
    name: 'Raw HEX color',
    message: 'Use a color token: var(--color-*)',
    test(line) {
      const matches = [];
      const pattern = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
      let match;
      while ((match = pattern.exec(line)) !== null) {
        // Exclude HEX inside a CSS custom property declaration name
        // e.g.  --my-color: #fff  ← violation
        // Allow nothing — all HEX is a violation in audited files
        matches.push(match[0]);
      }
      return matches.length ? matches : null;
    },
  },

  // 2. rgb / rgba
  {
    name: 'Raw rgb/rgba color',
    message: 'Use a color token: var(--color-*)',
    test(line) {
      const pattern = /\brgba?\s*\(/g;
      const matches = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        matches.push(match[0]);
      }
      return matches.length ? matches : null;
    },
  },

  // 3. hsl / hsla
  {
    name: 'Raw hsl/hsla color',
    message: 'Use a color token: var(--color-*)',
    test(line) {
      const pattern = /\bhsla?\s*\(/g;
      const matches = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        matches.push(match[0]);
      }
      return matches.length ? matches : null;
    },
  },

  // 4. Raw px values
  //    Allowed: 0px (always), 1px when line contains 'border'
  //    Allowed: image/media dimension contexts (width/height with px on img/video rules)
  {
    name: 'Raw px value',
    message: 'Use a spacing or sizing token: var(--spacing-*) / var(--radius-*)',
    test(line) {
      const pattern = /\b(\d+(?:\.\d+)?)px\b/g;
      const matches = [];
      const isImgDimension = /\b(width|height|max-width|max-height|min-width|min-height)\b/.test(line);
      const hasBorder      = /\bborder\b/.test(line);

      let match;
      while ((match = pattern.exec(line)) !== null) {
        const value    = match[0];
        const numValue = parseFloat(match[1]);

        if (numValue === 0)                       continue; // 0px always allowed
        if (numValue === 1 && hasBorder)          continue; // 1px border allowed
        if (isImgDimension)                       continue; // image dimensions allowed

        matches.push(value);
      }
      return matches.length ? matches : null;
    },
  },

  // 5. Direct foundation primitive references — color palette
  //    Catches: brand-500, brand.500, neutral-100, teal.300, orange.500, etc.
  {
    name: 'Direct color primitive reference',
    message: 'Reference a semantic token instead: var(--color-*)',
    test(line) {
      const pattern = /\b(brand|neutral|teal|purple|brown|orange)[.\-]\d+\b/g;
      const matches = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        matches.push(match[0]);
      }
      return matches.length ? matches : null;
    },
  },

  // 6. Direct foundation primitive references — status palette
  {
    name: 'Direct status primitive reference',
    message: 'Reference a semantic token instead: var(--color-status-*)',
    test(line) {
      const pattern = /\b(status)[.\-](success|warning|danger|info)[.\-]\d+\b/g;
      const matches = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        matches.push(match[0]);
      }
      return matches.length ? matches : null;
    },
  },

  // 7. Direct foundation primitive references — spacing
  {
    name: 'Direct spacing primitive reference',
    message: 'Reference a spacing token instead: var(--spacing-*)',
    test(line) {
      const pattern = /\bspace-\d+\b/g;
      const matches = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        matches.push(match[0]);
      }
      return matches.length ? matches : null;
    },
  },

  // 8. Direct foundation primitive references — typography (old and new naming)
  //    Catches: font-size-300 (legacy), font.size.16 (current)
  {
    name: 'Direct typography size primitive reference',
    message: 'Reference a text style token instead: var(--text-*)',
    test(line) {
      const pattern = /\b(font-size-\d+|font\.size\.\d+)\b/g;
      const matches = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        matches.push(match[0]);
      }
      return matches.length ? matches : null;
    },
  },

  // 9. Direct foundation primitive references — radius
  //    Catches: radius-100, radius-300 (numeric steps, not semantic names like radius-md)
  {
    name: 'Direct radius primitive reference',
    message: 'Reference a radius token instead: var(--radius-*)',
    test(line) {
      const pattern = /\bradius-\d+\b/g;
      const matches = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        matches.push(match[0]);
      }
      return matches.length ? matches : null;
    },
  },

  // 10. Direct foundation primitive references — motion/duration
  {
    name: 'Direct motion primitive reference',
    message: 'Reference a motion token instead: var(--motion-*)',
    test(line) {
      const pattern = /\bduration-\d+\b/g;
      const matches = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        matches.push(match[0]);
      }
      return matches.length ? matches : null;
    },
  },

  // 11. Direct foundation primitive references — font weight numbers in CSS
  //     Flags weight values not routed through a token
  //     Catches raw font-weight numeric values in CSS/SCSS
  {
    name: 'Raw font-weight value',
    message: 'Use a typography token: var(--text-*)',
    test(line) {
      // Only flag when the line contains font-weight property assignment
      if (!/font-weight\s*:/.test(line)) return null;
      // Allow var() references
      if (/font-weight\s*:\s*var\(/.test(line)) return null;
      const pattern = /font-weight\s*:\s*(\d+)/g;
      const matches = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        matches.push(`font-weight: ${match[1]}`);
      }
      return matches.length ? matches : null;
    },
  },

  // 12. Direct font.weight primitive reference
  //     Catches: font.weight.bold, font.weight.semibold, etc. used outside var()
  {
    name: 'Direct font.weight primitive reference',
    message: 'Reference a typography token instead: var(--text-*)',
    test(line) {
      const pattern = /\bfont\.weight\.(regular|medium|semibold|bold)\b/g;
      const matches = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        matches.push(match[0]);
      }
      return matches.length ? matches : null;
    },
  },

  // 13. Direct font.family primitive reference
  //     Catches: font.family used directly instead of via a typography token
  {
    name: 'Direct font.family primitive reference',
    message: 'Reference a typography token instead: var(--typography-family)',
    test(line) {
      // Allow only when inside a var() call
      if (/var\(\s*--[^)]*font[^)]*\)/.test(line)) return null;
      const pattern = /\bfont\.family\b/g;
      const matches = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        matches.push(match[0]);
      }
      return matches.length ? matches : null;
    },
  },

];

// ─── File Collection ──────────────────────────────────────────────────────────

function shouldSkipFolder(folderName) {
  return SKIP_FOLDER_SEGMENTS.has(folderName);
}

function collectFiles(dir, found = []) {
  if (!fs.existsSync(dir)) return found;

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (shouldSkipFolder(entry.name)) continue;
      collectFiles(path.join(dir, entry.name), found);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (!SCAN_EXTENSIONS.has(ext)) continue;
      if (EXEMPT_FILES.has(entry.name)) continue;
      found.push(path.join(dir, entry.name));
    }
  }

  return found;
}

// ─── Auditing ─────────────────────────────────────────────────────────────────

function auditFile(filePath) {
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`  [ERROR] Could not read file: ${filePath} — ${err.message}`);
    return [];
  }

  const lines      = content.split('\n');
  const violations = [];

  for (let i = 0; i < lines.length; i++) {
    const line       = lines[i];
    const lineNumber = i + 1;

    // Skip blank lines and pure comment lines
    const trimmed = line.trim();
    if (trimmed === '' || trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
      continue;
    }

    // Strip inline comments before testing (preserve the part before // or /*)
    const codeOnly = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');

    for (const rule of RULES) {
      const matches = rule.test(codeOnly, lineNumber, filePath);
      if (!matches) continue;

      for (const match of matches) {
        violations.push({
          file:    filePath,
          line:    lineNumber,
          column:  codeOnly.indexOf(match) + 1,
          rule:    rule.name,
          match,
          message: rule.message,
          context: line.trim(),
        });
      }
    }
  }

  return violations;
}

// ─── Reporting ────────────────────────────────────────────────────────────────

function formatViolation(v) {
  return [
    ``,
    `  File     : ${v.file}`,
    `  Location : line ${v.line}, col ${v.column}`,
    `  Rule     : ${v.rule}`,
    `  Found    : ${v.match}`,
    `  Fix      : ${v.message}`,
    `  Context  : ${v.context}`,
  ].join('\n');
}

function printSummary(allViolations, scannedCount) {
  const fileSet = new Set(allViolations.map(v => v.file));

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  Design System — Token Audit`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`  Files scanned   : ${scannedCount}`);
  console.log(`  Files with issues: ${fileSet.size}`);
  console.log(`  Total violations : ${allViolations.length}`);
  console.log(`${'─'.repeat(60)}\n`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function run() {
  const root = process.cwd();
  let allFiles = [];

  for (const folder of SCAN_FOLDERS) {
    const folderPath = path.join(root, folder);
    const files = collectFiles(folderPath);
    allFiles = allFiles.concat(files);
  }

  // Deduplicate in case folders overlap
  allFiles = [...new Set(allFiles)];

  if (allFiles.length === 0) {
    console.log('\n  No files found to scan. Check SCAN_FOLDERS configuration.\n');
    process.exit(0);
  }

  let allViolations = [];

  for (const filePath of allFiles) {
    const violations = auditFile(filePath);
    allViolations = allViolations.concat(violations);
  }

  printSummary(allViolations, allFiles.length);

  if (allViolations.length === 0) {
    console.log('  ✓  Audit passed. No token violations found.\n');
    process.exit(0);
  }

  // Group violations by file for readable output
  const byFile = {};
  for (const v of allViolations) {
    if (!byFile[v.file]) byFile[v.file] = [];
    byFile[v.file].push(v);
  }

  for (const [filePath, violations] of Object.entries(byFile)) {
    console.log(`  ✗  ${filePath} — ${violations.length} violation${violations.length > 1 ? 's' : ''}`);
    for (const v of violations) {
      console.log(formatViolation(v));
    }
    console.log('');
  }

  console.log(`${'─'.repeat(60)}`);
  console.log(`  Audit failed. Fix all violations before committing.`);
  console.log(`  All styling must use CSS custom properties from tokens.css.`);
  console.log(`${'─'.repeat(60)}\n`);

  process.exit(1);
}

run();
