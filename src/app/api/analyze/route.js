import { JSDOM } from 'jsdom';

export async function POST(req) {
  try {
    const { url } = await req.json();

    try {
      // Fetch the HTML content of the page
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch the page.');
      }

      const html = await response.text();

      try {
        // Use JSDOM to parse the HTML
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Extract information
        const htmlVersion = document.doctype?.name || 'Unknown';
        const pageTitle = document.querySelector('title')?.textContent || 'No Title';
        const headings = Array.from({ length: 6 }, (_, i) => 
          document.querySelectorAll(`h${i + 1}`).length
        );
        const links = Array.from(document.querySelectorAll('a')).map(a => ({
          href: a.href,
          text: a.textContent.trim()
        }));
        const internalLinks = links.filter(link => link.href.startsWith(url));
        const externalLinks = links.filter(link => !link.href.startsWith(url));

        // Detect if there is a login form
        const loginFormDetected = !!document.querySelector('input[type="password"]');

        // Optional: Validate links
        const validationResults = await validateLinks([...internalLinks, ...externalLinks]);

        // Return results
        return new Response(JSON.stringify({
          htmlVersion,
          pageTitle,
          headings,
          internalLinks: internalLinks.length,
          externalLinks: externalLinks.length,
          loginFormDetected,
          validationResults,
        }), { status: 200 });

      } catch (domParsingError) {
        throw new Error(`Error parsing HTML: ${domParsingError.message}`);
      }

    } catch (fetchError) {
      throw new Error(`Error fetching the page: ${fetchError.message}`);
    }

  } catch (jsonError) {
    return new Response(JSON.stringify({ error: `Error parsing request body: ${jsonError.message}` }), { status: 400 });
  }
}

// Helper function to validate links
async function validateLinks(links) {
  return await Promise.all(
    links.map(async (link) => {
      try {
        const response = await fetch(link.href);
        return { href: link.href, status: response.ok ? 'OK' : `Failed (Status: ${response.status})` };
      } catch (error) {
        return { href: link.href, status: 'Failed (Error)' };
      }
    })
  );
}
