# language: nl

# Created by hans at 20.01.22

Functionaliteit: API-info opvragen

  # Als apirelease nog niet geïnitialiseerd werd, zal dit scenario falen
  # Draai het na init (in constructor van DatabaseManager, mag niet async zijn) opnieuw
  Scenario: API-info opvragen
    Als een andere toepassing API-info opvraagt
    Dan is de waarde van "version" gelijk aan "v1"
    En is de waarde van "methods" gelijk aan "GET, POST, DELETE"
    En is de waarde van "links" gelijk aan "/api/v1/persons"
