import type { Plugin } from 'vite';

export function cspPlugin(): Plugin {
  return {
    name: 'vite-plugin-csp',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        // Добавляем CSP только в продакшн-сборке
        if (process.env.NODE_ENV === 'production') {
          return html.replace(
            '<meta name="viewport"',
            `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'">
    <meta name="viewport"`
          );
        }
        return html;
      },
    },
  };
}
