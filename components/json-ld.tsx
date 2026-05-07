/**
 * Inject JSON-LD structured data into the document.
 * Renders a <script type="application/ld+json"> with the serialized object.
 *
 * Use Next.js's <Script> would defer execution; for JSON-LD a plain <script>
 * is correct because it's not executable code, just metadata for crawlers.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML is the standard way to embed JSON-LD in React.
      // The content is server-controlled (we generate it ourselves), not user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
