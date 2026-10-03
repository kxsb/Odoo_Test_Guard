/** @odoo-module **/

(() => {
    "use strict";

    // Évite une double initialisation si plusieurs bundles Odoo
    // chargent ce fichier sur la même page.
    if (window.__solTestGuardInstalled) {
        return;
    }
    window.__solTestGuardInstalled = true;

    const TEST_HOST = "test.monnaies-locales.org";

    const PROD_HOSTS = new Set([
        "sol-monnaies-locales.org",
        "www.sol-monnaies-locales.org",
        "sol-reseau.org",
        "www.sol-reseau.org",
    ]);

    function getProtectedTarget(link) {
        if (window.location.hostname !== TEST_HOST) {
            return null;
        }

        // Deuxième sécurité : la base doit réellement être neutralisée.
        if (!document.getElementById("oe_neutralize_banner")) {
            return null;
        }

        try {
            const target = new URL(link.href, window.location.href);

            if (!PROD_HOSTS.has(target.hostname)) {
                return null;
            }

            return target;
        } catch {
            return null;
        }
    }

    function guardNavigation(event) {
        const link = event.target.closest?.("a[href]");

        if (!link) {
            return;
        }

        const target = getProtectedTarget(link);

        if (!target) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        const confirmed = window.confirm(
            "⚠ ATTENTION — PASSAGE SUR LE SITE DE PRODUCTION ⚠\n\n" +
            "Vous êtes actuellement sur l'instance de TEST :\n" +
            "test.monnaies-locales.org\n\n" +
            "Ce lien mène vers le site de PRODUCTION :\n" +
            target.hostname + "\n\n" +
            "Les données présentes sur le site de production sont RÉELLES.\n" +
            "Toute modification effectuée là-bas aura un effet réel.\n\n" +
            "Voulez-vous vraiment continuer ?"
        );

        if (!confirmed) {
            return;
        }

        const openNewTab =
            link.target === "_blank" ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.button === 1;

        if (openNewTab) {
            window.open(target.href, "_blank", "noopener");
        } else {
            window.location.assign(target.href);
        }
    }

    // Clic normal, Ctrl+Clic, etc.
    document.addEventListener("click", guardNavigation, true);

    // Clic molette.
    document.addEventListener(
        "auxclick",
        (event) => {
            if (event.button === 1) {
                guardNavigation(event);
            }
        },
        true
    );
})();
