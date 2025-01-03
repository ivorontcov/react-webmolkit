import { useEffect, useRef, useState } from "react";

import { Sketcher } from "webmolkit/sketcher/Sketcher";
import {
  ClipboardProxyWeb,
  ClipboardProxyHandler,
} from "webmolkit/ui/ClipboardProxy";
import { MenuProxyWeb } from "webmolkit/ui/MenuProxy";

const Webmolkit = () => {
  const sketcherRef = useRef<Sketcher | null>(null); // Use a ref to store the Sketcher instance
  const [isSetup, setIsSetup] = useState(false); // Add a setup flag to prevent creating sketcher duplicates

  useEffect(() => {
    if (!sketcherRef.current) {
      // Only create the Sketcher instance if it doesn't exist
      sketcherRef.current = new Sketcher();
      sketcherRef.current.setSize(800, 700);

      let proxy = new ClipboardProxyWeb();
      let handler = new ClipboardProxyHandler();

      handler.copyEvent = (andCut, proxy) => {
        sketcherRef.current?.performCopySelection(andCut); // Use optional chaining
        return true;
      };

      handler.pasteEvent = (proxy) => {
        sketcherRef.current?.pasteText(proxy.getString()); // Use optional chaining
        return true;
      };

      proxy.pushHandler(handler);

      sketcherRef.current.defineClipboard(proxy);
      sketcherRef.current.defineContext(new MenuProxyWeb());
    }

    if (sketcherRef.current && !isSetup) {
      // Check both ref and flag
      sketcherRef.current.setup(() => {
        sketcherRef.current?.render(document.getElementById("sketcher"));
        setIsSetup(true); // Set the flag after setup is complete
      });
    }

    return () => {
      const sketcherElement = document.getElementById("sketcher");
      if (sketcherElement) {
        while (sketcherElement.firstChild) {
          sketcherElement.removeChild(sketcherElement.firstChild);
        }
      }
      sketcherRef.current = null;

      setIsSetup(false); // Reset the flag on unmount
    };
  }, []);

  return <div id="sketcher" />;
};

export default Webmolkit;
