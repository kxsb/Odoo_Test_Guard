# Odoo Test Guard

Module Odoo 18 de sécurité pour les instances de test neutralisées.

## Fonction

Lorsqu'un utilisateur se trouve sur l'instance de test et clique sur un lien menant vers un domaine de production, une confirmation explicite est demandée avant la navigation.

La protection n'est active que si :

- l'hôte courant est `test.monnaies-locales.org`
- le bandeau natif de neutralisation Odoo `#oe_neutralize_banner` est présent

Domaines protégés :

- `sol-monnaies-locales.org`
- `www.sol-monnaies-locales.org`
- `sol-reseau.org`
- `www.sol-reseau.org`

## Compatibilité

Odoo 18.
