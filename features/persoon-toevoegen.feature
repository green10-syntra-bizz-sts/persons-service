# language: nl

Functionaliteit: Een persoon aan de bekende personen toevoegen

  Een Customer Service Representative (CSR)
  kan een persoon toevoegen met zijn voornaam, familienaam en e-mailadres.
  De toegevoegde persoon krijgt een uniek id.

  Scenario: Een eerste persoon toevoegen
    Gegeven er zijn geen bekende personen
    Als de CSR een persoon toevoegt met voornaam "Hans", familienaam "Vandenbogaerde" en e-mailadres "hans.vdb@gmail.com"
    Dan is er 1 bekende persoon
    En krijgt de CSR het enige toegekende uniek id

  Scenario: Een volgende persoon toevoegen
    Gegeven er zijn 3 bekende personen
      | voornaam            | familienaam         | emailadres          |
      | Hans                | Vandenbogaerde      | hans.vdb@gmail.com  |
      | Nina                | Simone              | nina@baltimore.com  |
      | Deedee              | Bridgewater         | deedee@paris.fr     |
    Als de CSR een persoon toevoegt met voornaam "Diana", familienaam "Krall" en e-mailadres "diana@london.co.uk"
    Dan zijn er 4 bekende personen
    En krijgt de CSR het enige toegekende uniek id

