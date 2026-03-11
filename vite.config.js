import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fm from 'front-matter';
import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: true });

function markdownLoader() {
  return {
    name: 'markdown-loader',
    transform(src, id) {
      if (id.endsWith('.md')) {
        const parsed = fm(src);
        const trimmed = parsed.body.trim();
        const html = trimmed.startsWith('<') ? trimmed : marked(trimmed);
        return {
          code: `
            export const attributes = ${JSON.stringify(parsed.attributes)};
            export const html = ${JSON.stringify(html)};
            export default html;
          `,
          map: null
        };
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), markdownLoader()],
});
