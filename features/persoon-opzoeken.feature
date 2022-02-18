# language: nl

# Created by hans at 06.12.21

Functionaliteit: Een persoon opzoeken op id of op e-mailadres

  Een Customer Service Representative (CSR)
  kan een bekend persoon opzoeken op id of op e-mailadres.
  Hij krijgt zowel voornaam, familienaam als e-mailadres van de gevonden persoon

  Achtergrond:
    Gegeven er zijn 3 bekende personen
      | voornaam            | familienaam         | emailadres          |
      | Hans                | Vandenbogaerde      | hans.vdb@gmail.com  |
      | Nina                | Simone              | nina@baltimore.com  |
      | Deedee              | Bridgewater         | deedee@paris.fr     |

  Scenario: Een persoon met een gekend id opzoeken tussen de bekende personen
    Gegeven de CSR een persoon toegevoegd heeft met voornaam "Diana", familienaam "Krall" en e-mailadres "diana@london.co.uk"
    En de CSR het toegekende uniek id gekregen heeft
    Als de CSR de persoon met het toegekende uniek id opzoekt
    Dan krijgt hij "Diana Krall, diana@london.co.uk"

  Scenario: Een persoon met haar e-mailadres opzoeken tussen de bekende personen
    Als de CSR de persoon met het e-mailadres "nina@baltimore.com" opzoekt
    Dan krijgt hij "Nina Simone, nina@baltimore.com"

