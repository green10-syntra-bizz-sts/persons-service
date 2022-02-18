# language: nl

# Created by hans at 06.12.21

Functionaliteit: Een lijst van alle bekende personen tonen en ook hun aantal

  Een Customer Service Representative (CSR)
  kan een lijst van alle bekende personen opvragen.
  Hij krijgt voor elk van de personen de voornaam en de familienaam

  Scenario: Er zijn geen bekende personen zodat een lege lijst resulteert
    Gegeven er zijn geen bekende personen
    Als de CSR een lijst van bekende personen opvraagt
    Dan krijgt hij "Aantal bekende personen 0" als resultaat

  Scenario: Er zijn meerdere bekende personen die in een lijst getoond worden
    Gegeven er zijn 3 bekende personen
      | voornaam            | familienaam         | emailadres          |
      | Hans                | Vandenbogaerde      | hans.vdb@gmail.com  |
      | Nina                | Simone              | nina@baltimore.com  |
      | Deedee              | Bridgewater         | deedee@paris.fr     |
    Als de CSR een lijst van bekende personen opvraagt
    Dan krijgt hij als resultaat voor de lijst van bekende personen
      | naam                      |
      | Hans Vandenbogaerde       |
      | Nina Simone               |
      | Deedee Bridgewater        |
      | Aantal bekende personen 3 |

