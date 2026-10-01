document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // MÓDULO 1: CART ATTRIBUTES (CHECKOUT ESTÁNDAR)
  // ==========================================
  (function initCartAttributes() {
    "use strict";

    // Función para obtener el valor de un parámetro URL
    function getURLParameter(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name) || "";
    }

    // Función para obtener el valor de una cookie
    function getCookie(name) {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    }

    // Función para obtener el último fragmento después del punto de _gcl_aw
    function getGclidFromCookie() {
      const gclAw = getCookie("_gcl_aw");
      if (gclAw) {
        const parts = gclAw.split(".");
        return parts[parts.length - 1] || "";
      }
      return "";
    }

    // Función para recopilar datos de tracking
    function getTrackingData() {
      return {
        source: getURLParameter("utm_source"),
        medium: getURLParameter("utm_medium"),
        campaign: getURLParameter("utm_campaign"),
        term: getURLParameter("utm_term"),
        content: getURLParameter("utm_content"),
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        ttp: getCookie("_ttp"),
        ttclid: getCookie("ttclid"),
        gclid: getGclidFromCookie(),
      };
    }

    // Verificar si tracking_updated está en false o no existe en sessionStorage
    const trackingUpdated = sessionStorage.getItem("tracking_updated");

    if (trackingUpdated !== "true") {
      // Agregar delay de 2 segundos para garantizar que otros procesos del tema se ejecuten primero
      setTimeout(function () {
        // Recopilar todos los valores
        const trackingData = getTrackingData();

        // Construir el objeto attributes solo con valores existentes
        // Los parámetros UTM van con primera letra mayúscula
        const attributes = {};

        // Agregar atributo de verificación de Neosocios SIEMPRE
        attributes.Neosocios = "true";

        // Agregar demás atributos solo si existen
        if (trackingData.source) attributes.Source = trackingData.source;
        if (trackingData.medium) attributes.Medium = trackingData.medium;
        if (trackingData.campaign) attributes.Campaign = trackingData.campaign;
        if (trackingData.term) attributes.Term = trackingData.term;
        if (trackingData.content) attributes.Content = trackingData.content;
        if (trackingData.fbp) attributes.fbp = trackingData.fbp;
        if (trackingData.fbc) attributes.fbc = trackingData.fbc;
        if (trackingData.ttp) attributes.ttp = trackingData.ttp;
        if (trackingData.ttclid) attributes.ttclid = trackingData.ttclid;
        if (trackingData.gclid) attributes.gclid = trackingData.gclid;

        // Actualizar los note_attributes del carrito usando la API de Shopify
        fetch("/cart/update.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ attributes }),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Neosocios: Cart attributes updated successfully");
              // Establecer tracking_updated en true en sessionStorage
              sessionStorage.setItem("tracking_updated", "true");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Neosocios: Updated cart ", data);
          })
          .catch((error) => {
            console.error("Neosocios: Error updating cart attributes:", error);
          });
      }, 2000); // Delay de 2 segundos
    }
  })();
});