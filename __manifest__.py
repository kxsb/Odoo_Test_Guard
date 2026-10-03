{
    "name": "Test Guard",
    "version": "18.0.1.0.0",
    "summary": "Avertissement de sécurité lors du passage de TEST vers PROD",
    "category": "Technical",
    "license": "LGPL-3",
    "depends": [
        "web",
        "website",
    ],
    "assets": {
        "web.assets_backend": [
            "test_guard/static/src/js/test_guard.js",
        ],
        "web.assets_frontend": [
            "test_guard/static/src/js/test_guard.js",
        ],
    },
    "installable": True,
    "application": False,
    "auto_install": False,
}
