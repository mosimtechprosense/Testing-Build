import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchLocalityDescription } from "../../api/listingsApi";

const truncateHTML = (html, maxLength) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  let text = div.textContent || div.innerText || "";
  if (text.length <= maxLength) return html; // no need to truncate
  text = text.slice(0, maxLength);
  return text + "...";
};

const LocalityDescription = () => {
  const location = useLocation();
  const [localityContent, setLocalityContent] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const localitySlug = location.pathname.split("/")[2];

  useEffect(() => {
    if (!localitySlug) return setLocalityContent(null);

    fetchLocalityDescription(localitySlug)
      .then((res) => setLocalityContent(res.data))
      .catch(() => setLocalityContent(null));
  }, [localitySlug]);

  if (!localityContent?.description) return null;

  const previewHTML = truncateHTML(localityContent.description, 600);
  const isLong = localityContent.description.length > 600;

  return (
    <section className="mt-8 md:mt-16 bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">
        {localityContent.heading || `Wedding Venues in ${localityContent.name}`}
      </h2>

      <div className="prose prose-sm md:prose-base max-w-full text-gray-700">
        <div
          dangerouslySetInnerHTML={{
            __html: expanded ? localityContent.description : previewHTML
          }}
        />
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 md:mt-4 text-red-600 font-semibold hover:underline cursor-pointer"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </section>
  );
};

export default LocalityDescription;