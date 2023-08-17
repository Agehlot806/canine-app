import React, { useEffect } from "react";

const WhatsAppWidget = () => {
  useEffect(() => {
    (function (w, d, s, u) {
      w.gbwawc = {
        url: u,
        options: {
          waId: "+91 7045883457",
          siteName: "Canine",
          siteTag: "usually reply in 10 min",
          siteLogo: "https://waw.gallabox.com/chatbotavatars/4.png",
          widgetPosition: "RIGHT",
          triggerMessage: "write something!",
          welcomeMessage: "Welcome to Canine",
          brandColor: "#25D366",
          messageText: "I am looking for rabbit food",
          replyOptions: [
            "I'd like to chat with sale",
            "I have a support question",
            "I'm just browsing",
          ],
        },
      };
      var h = d.getElementsByTagName(s)[0],
        j = d.createElement(s);
      j.async = true;
      j.src = u + "/whatsapp-widget.min.js?_=" + Math.random();
      h.parentNode.insertBefore(j, h);
    })(window, document, "script", "https://waw.gallabox.com");
  }, []);

  return <div></div>;
};
export default WhatsAppWidget;
