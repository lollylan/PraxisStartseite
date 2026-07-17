// Automatisch generiert von scripts/build-demo.js — nicht von Hand bearbeiten.
// Ersetzt die Server-API der Praxis-Startseite durch Beispieldaten im Browser.
(function () {
  'use strict';

  const SEED = {
  "settings": {
    "praxisName": "Praxis Dr. Mustermann",
    "praxisSubtitle": "Facharzt fuer Allgemeinmedizin",
    "kanbanEnabled": true,
    "jokesEnabled": true
  },
  "tiles": {
    "tiles": [
      {
        "id": "tile-1",
        "title": "Hausbesuchsplaner",
        "subtitle": "VisiCore",
        "icon": "🏠",
        "color": "#2563eb",
        "url": "#",
        "type": "web",
        "order": 1
      },
      {
        "id": "tile-2",
        "title": "QM / QNG",
        "subtitle": "Qualitaetsmanagement",
        "icon": "📋",
        "color": "#059669",
        "url": "https://notion.so",
        "type": "web",
        "order": 2
      },
      {
        "id": "tile-3",
        "title": "Mitarbeiterplaner",
        "subtitle": "HAEPPI-Flow",
        "icon": "👥",
        "color": "#7c3aed",
        "url": "#",
        "type": "web",
        "order": 3
      },
      {
        "id": "tile-4",
        "title": "Praxis Bingo",
        "subtitle": "Teamspiel",
        "icon": "🎲",
        "color": "#dc2626",
        "url": "#",
        "type": "web",
        "order": 4
      },
      {
        "id": "tile-5",
        "title": "FaxFinity",
        "subtitle": "Fax-Umbenenner",
        "icon": "📠",
        "color": "#ca8a04",
        "url": "#",
        "type": "web",
        "order": 5
      },
      {
        "id": "tile-6",
        "title": "Zeittracker",
        "subtitle": "Praxis Zeiterfassung",
        "icon": "⏱️",
        "color": "#0891b2",
        "url": "#",
        "type": "web",
        "order": 6
      },
      {
        "id": "tile-7",
        "title": "DocMotion",
        "subtitle": "Bewegungstracker",
        "icon": "🏃",
        "color": "#16a34a",
        "url": "#",
        "type": "web",
        "order": 7
      },
      {
        "id": "tile-8",
        "title": "Medical Scribe",
        "subtitle": "Asklaion",
        "icon": "🦩",
        "color": "#6366f1",
        "url": "#",
        "type": "web",
        "order": 8
      }
    ]
  },
  "links": {
    "categories": [
      {
        "id": "cat-1",
        "name": "KVB / Abrechnung",
        "icon": "🏥",
        "links": [
          {
            "id": "link-1",
            "title": "KVB Portal",
            "url": "https://www.kvb.de",
            "newTab": true
          },
          {
            "id": "link-2",
            "title": "KVB Mitgliederportal",
            "url": "https://www.kvb.de/mitglieder",
            "newTab": true
          }
        ]
      },
      {
        "id": "cat-2",
        "name": "Verbaende",
        "icon": "📊",
        "links": [
          {
            "id": "link-3",
            "title": "Bayerischer Hausaerzteverband",
            "url": "https://www.hausaerzteverband.de",
            "newTab": true
          },
          {
            "id": "link-4",
            "title": "BHAEV",
            "url": "https://www.hausaerzte-bayern.de",
            "newTab": true
          }
        ]
      },
      {
        "id": "cat-3",
        "name": "Labor",
        "icon": "🧪",
        "links": [
          {
            "id": "link-5",
            "title": "Labor Beispiel",
            "url": "https://www.labor-beispiel.de",
            "newTab": true
          }
        ]
      },
      {
        "id": "cat-4",
        "name": "Krankenkassen",
        "icon": "💳",
        "links": [
          {
            "id": "link-6",
            "title": "AOK Bayern",
            "url": "https://www.aok.de/bayern",
            "newTab": true
          },
          {
            "id": "link-7",
            "title": "TK",
            "url": "https://www.tk.de",
            "newTab": true
          }
        ]
      },
      {
        "id": "cat-5",
        "name": "Sonstiges",
        "icon": "🔗",
        "links": [
          {
            "id": "link-8",
            "title": "Google",
            "url": "https://www.google.de",
            "newTab": true
          }
        ]
      }
    ]
  },
  "staff": {
    "staff": [
      {
        "id": "staff-1",
        "name": "Anna Mueller",
        "role": "MFA",
        "birthday": "1995-03-15"
      },
      {
        "id": "staff-2",
        "name": "Lisa Schmidt",
        "role": "MFA",
        "birthday": "1990-07-22"
      },
      {
        "id": "staff-3",
        "name": "Sarah Weber",
        "role": "VERAH",
        "birthday": "1988-11-03"
      }
    ]
  },
  "jokes": {
    "intervalMinutes": 10,
    "count": 3,
    "jokes": [
      {
        "id": "joke-88e01ba2",
        "text": "Was ist weis und fliegt über die Wiese? Die Biene Mayo"
      },
      {
        "id": "joke-714a3706",
        "text": "Warum stolpert man zwischen Österreich und der Schweiz? Da Liechtenstein."
      },
      {
        "id": "joke-802fc01f",
        "text": "Wo wohnt der Nazifrosch? Im dritten Teich."
      },
      {
        "id": "joke-d7c43d01",
        "text": "Höchste Auszeichnung für Steinmetze? Mit Gravur bestanden."
      },
      {
        "id": "joke-84f4c551",
        "text": "Warum wohnen Fußballspieler nicht gerne im Erdgeschoss? Sie wollen einen Ball-kon."
      },
      {
        "id": "joke-65f0fbc8",
        "text": "Was ist schwarz und brutzelt? Eine blonde Elektrikerin."
      },
      {
        "id": "joke-7eabf050",
        "text": "Welche Hundegattung wiegt nur 4,5 kg? Der Neun-Pfund-Länder."
      },
      {
        "id": "joke-606e2092",
        "text": "Was heißt Tausendfüßler auf italienisch? Molto Bene."
      },
      {
        "id": "joke-da73d9f8",
        "text": "Wie nennt man Bücher über Schubladen? Fachliteratur."
      },
      {
        "id": "joke-10b3841a",
        "text": "Wie nennt man einen besonders intensiven Furz? Nahkoterfahrung."
      },
      {
        "id": "joke-94494d4d",
        "text": "Wie nennt man eine Türkin mit Holzbein? Aische Rustikal."
      },
      {
        "id": "joke-06a61ea7",
        "text": "Welche Zeitform ist \"Der öffentliche Nahverkehr ist pünktlich gekommen?\" Buskamperfekt."
      },
      {
        "id": "joke-7a21d20a",
        "text": "Was liegt ab Strand und redet undeutlich? Eine Nuschel."
      },
      {
        "id": "joke-ed0461ed",
        "text": "Was ist rot und steht am Straßenrand? Eine Hagenutte."
      },
      {
        "id": "joke-0d3297be",
        "text": "Was ist grün und steht am Straßenrand? Eine Froschtituierte."
      },
      {
        "id": "joke-4e479665",
        "text": "Was ist rot, schnieft und läuft durch den Wald? — Rotzkäppchen"
      },
      {
        "id": "joke-6677f683",
        "text": "Was essen Autos am liebsten? — Parkplätzchen"
      },
      {
        "id": "joke-a4630517",
        "text": "Wie lautet der Vorname vom Reh? — Kartoffelpü"
      },
      {
        "id": "joke-2c8337d6",
        "text": "Was essen Hunde im Restaurant? — Bell-Kartoffeln"
      },
      {
        "id": "joke-0b6b704a",
        "text": "Wie heißt der Keks an der Börse? — Spekulatius"
      },
      {
        "id": "joke-401c4cc6",
        "text": "Was macht ein Clown im Büro? — Faxen"
      },
      {
        "id": "joke-5be09cf6",
        "text": "Wo wohnen Katzen? — Im Miezhaus"
      },
      {
        "id": "joke-e3609c87",
        "text": "Wie nennt man einen Schneemann im Sommer? — Eine Pfütze"
      },
      {
        "id": "joke-928407be",
        "text": "Welche Süßigkeit essen Bösewichte? — Schurkolade"
      },
      {
        "id": "joke-6fc466f3",
        "text": "Was sitzt auf dem Baum und schreit „Aha“? — Ein Uhu mit Sprachfehler"
      },
      {
        "id": "joke-05ae4ead",
        "text": "Welche Schuhe tragen Journalisten? — Skandalen"
      },
      {
        "id": "joke-172c2c12",
        "text": "Was ist groß, braun und schreibt sehr undeutlich? — Ein Kritzli-Bär"
      },
      {
        "id": "joke-052be972",
        "text": "Was ist schwarz-weiß und sitzt auf der Schaukel? — Ein Schwinguin"
      },
      {
        "id": "joke-d003b0b0",
        "text": "Wie heißt ein Bär, der fliegen kann? — Hubschrau-Bär"
      },
      {
        "id": "joke-34c6a613",
        "text": "Welchen Arzt braucht Pinocchio? — Den Holz-Nasen-Ohren-Arzt"
      },
      {
        "id": "joke-d0584bfd",
        "text": "Wie nennt man einen Hundewelpen? — Babybell"
      },
      {
        "id": "joke-bd1535ae",
        "text": "Was ist braun, klebrig und läuft durch die Wüste? — Ein Karamel"
      },
      {
        "id": "joke-c5fc4b60",
        "text": "Was ist rot und liegt auf dem Feld? Eine alte Bauernregel."
      },
      {
        "id": "joke-2738c1be",
        "text": "Was ist grün und flüstert im Gurkensalat? — Dill Schweiger"
      },
      {
        "id": "joke-b71ad1f9",
        "text": "Was kaufen Leute mit zwei linken Füßen im Schuhladen? — Flip Flips"
      },
      {
        "id": "joke-b934ba59",
        "text": "Was ist schwarz, weiß und rot? — Ein Zebra mit Sonnenbrand"
      },
      {
        "id": "joke-4b81961f",
        "text": "Was ist gesund und beleidigt? — Ein Schmollkornbrot"
      },
      {
        "id": "joke-2a5aa1f1",
        "text": "Was ist schwarz-gelb und dreht sich im Kreis? — Turbine Maja"
      },
      {
        "id": "joke-b12e4715",
        "text": "Welche Sprache wird in der Sauna gesprochen? — Schwitzerdeutsch"
      },
      {
        "id": "joke-f2ea433a",
        "text": "Was macht Bacardi im Regal? — Rum stehen"
      },
      {
        "id": "joke-db094282",
        "text": "Warum trinken Mäuse keinen Alkohol? — Sie haben Angst vor dem Kater"
      },
      {
        "id": "joke-a50b9917",
        "text": "Was machen Pilze auf Pizza? — Sie fungieren als Belag"
      },
      {
        "id": "joke-8ea2ac19",
        "text": "Was ist orange und geht den Berg hoch? — Eine Wanderine"
      },
      {
        "id": "joke-5d0a0a33",
        "text": "Was machen Mathematiker im Garten? — Wurzeln ziehen"
      },
      {
        "id": "joke-39ceeaaa",
        "text": "Was trinken Führungskräfte? — Leitungswasser"
      },
      {
        "id": "joke-b7ca153e",
        "text": "Was ist grün und tötet dich, wenn es vom Baum fällt? — Ein Billardtisch"
      },
      {
        "id": "joke-8bcf960d",
        "text": "Was ist grün und guckt durch das Schlüsselloch? — Ein Spionat"
      },
      {
        "id": "joke-e8490643",
        "text": "Was macht die Security in der Nudelfabrik? — Die Pasta auf"
      },
      {
        "id": "joke-3977db8a",
        "text": "Was ist klein, grün, rund und liegt im Sterben? — Eine Sterbse"
      },
      {
        "id": "joke-e69cf5fc",
        "text": "Was hüpft über die Wiese und qualmt? — Ein Kaminchen"
      },
      {
        "id": "joke-bce2b9b7",
        "text": "Welches Werkzeug hat immer gute Ideen? — Der Vorschlaghammer"
      },
      {
        "id": "joke-bf5034e1",
        "text": "Was ist schwarz-weiß gestreift und rennt durch den Wald? — Eine Knastanie"
      },
      {
        "id": "joke-69442c5b",
        "text": "Was ist süß und schwingt sich durch den Dschungel? — Tarzipan!"
      },
      {
        "id": "joke-69eb3d98",
        "text": "Wie war die Stimmung in der DDR? — Sie hielt sich in Grenzen."
      },
      {
        "id": "joke-3784f291",
        "text": "Was macht man mit einem Hund ohne Beine? — Um die Häuser ziehen"
      },
      {
        "id": "joke-15300a67",
        "text": "Was ist weiß und fliegt nach oben? — Eine verwirrte Schneeflocke"
      },
      {
        "id": "joke-89590633",
        "text": "Was ist grün und stellt viele Fragen? — Günther Lauch"
      },
      {
        "id": "joke-af94c687",
        "text": "Wie nennt man einen Delfin in Unterhose? — Slipper"
      },
      {
        "id": "joke-d4ae1872",
        "text": "Was ist schwarz gelb und macht „Mus Mus“? — Eine Biene im Rückwärtsgang"
      },
      {
        "id": "joke-62eefe0b",
        "text": "Was ist grün und steht vor der Tür? – Ein Klopfsalat!"
      },
      {
        "id": "joke-679d6cff",
        "text": "Was ist rot und schlecht für die Zähne? – Ein Ziegelstein."
      },
      {
        "id": "joke-02fad1fd",
        "text": "Was machen zwei wütende Schafe? – Sie kriegen sich in die Wolle."
      },
      {
        "id": "joke-f3100bf7",
        "text": "Ein Mathematiker springt aus dem Fenster und fliegt nach oben? Was ist passiert? – Vorzeichenfehler."
      },
      {
        "id": "joke-24b1d46d",
        "text": "Was ist weiß und stört beim Essen? – Eine Lawine."
      },
      {
        "id": "joke-9eca71a6",
        "text": "Wie nennt man Kaninchen im Fitnessstudio? – Pumpernickel."
      },
      {
        "id": "joke-7acc00e5",
        "text": "Wer wohnt im Dschungel und schummelt immer? – Mogli."
      },
      {
        "id": "joke-4892fe1b",
        "text": "Was ist rot und steht am Kopierer? – Die Paprikantin."
      },
      {
        "id": "joke-d8e992e1",
        "text": "Was schmeckt wie Zucker und kann singen? – Stevia Naidoo."
      },
      {
        "id": "joke-9ba973be",
        "text": "Was kauft ein Mann mit zwei linken Füßen im Schuhgeschäft? – Flipp-Flipps."
      },
      {
        "id": "joke-c6740da0",
        "text": "Wie nennt man ein Delfin mit Unterhose? – Slipper."
      },
      {
        "id": "joke-a6394570",
        "text": "Was macht ein Pirat am Computer? – Er drückt die Enter-Taste."
      },
      {
        "id": "joke-e06cc8cb",
        "text": "Was sitzt auf einem Baum und winkt? – Ein Hu-hu."
      },
      {
        "id": "joke-dd241768",
        "text": "Wie heißt BH auf Italienisch? – Titi Ni Farrucci."
      },
      {
        "id": "joke-1361fda3",
        "text": "Wie nennt man eine unzufriedene Elfe? – McCafé."
      },
      {
        "id": "joke-f8f32974",
        "text": "Wie nennt man einen nervigen Fisch? Stör"
      },
      {
        "id": "joke-56973ab2",
        "text": "Was ist gelb und kann nicht schwimmen? – Ein Bagger."
      },
      {
        "id": "joke-006e5b22",
        "text": "Kommt ein Frosch in den Milchladen. Fragt die Verkäuferin: “Was willst du denn?” — Sagt der Frosch: “Quak”."
      },
      {
        "id": "joke-17150b55",
        "text": "Prügeln sich zwei Leberwürste. Wer gewinnt? Die Grobe."
      },
      {
        "id": "joke-8fd73fac",
        "text": "Meine Oma ist beim FBI, wir nennen sie Top-Sigrid."
      },
      {
        "id": "joke-f793d97d",
        "text": "„Bin ich hier beim Seminar für unterschwellige Beleidigungen?“ – „Ja, nehmen Sie sich zwei Stühle und setzen Sie sich!“"
      },
      {
        "id": "joke-19428521",
        "text": "„Hast du die ganze Portion aufgegessen?“ – „Ja, ohne mit der Wampe zu zucken.“"
      },
      {
        "id": "joke-4ebc7a02",
        "text": "Was ist grün und fährt Panda-Bären zur Arbeit? Der Bambus"
      },
      {
        "id": "joke-33856904",
        "text": "Warum können Geister so schlecht lügen? Weil man durch sie hindurchsehen kann!"
      },
      {
        "id": "joke-d03a30a9",
        "text": "Was macht ein Pirat am Computer? Er drückt die Enter-Taste!"
      },
      {
        "id": "joke-657821b4",
        "text": "Was atmen Lokomotivführer? Zugluft."
      },
      {
        "id": "joke-f4b6c2e1",
        "text": "Warum war der Prinz angepisst? Rapunzel ließ ihren Harn herunter."
      },
      {
        "id": "joke-ff9294f7",
        "text": "Was ist schwarz-weiß gestreift und kommt nicht vom Fleck? Ein Klebra."
      },
      {
        "id": "joke-2985acab",
        "text": "Was ist die Lieblingsspeise von Piraten? Kapern."
      },
      {
        "id": "joke-29f87edf",
        "text": "Was ist gelb und kann schwimmen? Eine Schwanane."
      },
      {
        "id": "joke-fb3aecdd",
        "text": "Was essen Autos am liebsten? Parkplätzchen."
      },
      {
        "id": "joke-cf1dd3ea",
        "text": "Was ist grün und steht vor der Tür? Ein Klopfsalat."
      },
      {
        "id": "joke-e9a42dad",
        "text": "Wie nennt man jemanden, der so tut, als würde er etwas werfen? – Ein Scheinwerfer."
      },
      {
        "id": "joke-40c2ab84",
        "text": "Wie nennt man einen Bumerang, der nicht zurückkommt? – Ein Stock."
      },
      {
        "id": "joke-ebb18992",
        "text": "Wie heißt die Frau von Herkules? – Frau Kules."
      },
      {
        "id": "joke-afe4a2e2",
        "text": "Wie nennt man einen Hund, der zaubern kann? – Ein Labrakadabrador."
      },
      {
        "id": "joke-4fa1fdb0",
        "text": "Wie nennt man ein helles Mammut? – Hellmut."
      },
      {
        "id": "joke-80b18c69",
        "text": "Wie nennt man ein Einhorn mit zwei Hörnern? – Ein Stier."
      },
      {
        "id": "joke-30d86449",
        "text": "Wie heißt der Bruder von Elvis? – Zwölvis."
      },
      {
        "id": "joke-7a84cb5e",
        "text": "Wie heißt ein Spanier ohne Auto? – Carlos."
      },
      {
        "id": "joke-0505dd26",
        "text": "Wie nennt man ein Rudel aggressiver Wölfe? – Wolfgang."
      },
      {
        "id": "joke-3bf41d89",
        "text": "Welches Gebäck weiß auf alles eine Antwort? – Der Googlehupf."
      },
      {
        "id": "joke-dc5dcb65",
        "text": "Wie heißt der Bruder vom Werwolf? – Warumwolf."
      },
      {
        "id": "joke-f171ab3d",
        "text": "Wie heißt ein Ritter ohne Helm? – Willhelm."
      },
      {
        "id": "joke-cb9b613b",
        "text": "Wie nennt man einen Deutschen im All? – Ein Alman."
      },
      {
        "id": "joke-1b48d78e",
        "text": "Welcher Vogel vögelt gerne? – Der Fuckuck."
      },
      {
        "id": "joke-3bfd6985",
        "text": "Wie nennt man Sex mit Gegenständen? – Dingsbums."
      },
      {
        "id": "joke-ed321c89",
        "text": "Wie nennt man ein Überraschungsessen? – Topf Secret."
      },
      {
        "id": "joke-f3193c0e",
        "text": "Wie nennt man einen unentschlossenen japanischen Krieger? – Nunja."
      },
      {
        "id": "joke-db6555d5",
        "text": "Wie heißt die Auszeichnung für besonders brave, ruhige Hunde? – Der No-Bell-Preis."
      },
      {
        "id": "joke-9e89348b",
        "text": "Wie nennt man eine japanische Unterhosenfabrik? – Sacki Verpacki."
      },
      {
        "id": "joke-44038beb",
        "text": "Was macht die Knackwurst so knackig? – Das N."
      },
      {
        "id": "joke-1f431bb5",
        "text": "Was sagt die Null zur Acht? – Schicker Gürtel."
      },
      {
        "id": "joke-74f0e814",
        "text": "Was sagt der große Stift zum kleinen Stift? – Wachs mal, Stift."
      },
      {
        "id": "joke-a7e7ca03",
        "text": "Magst du Chemie-Witze? – Chlor!"
      },
      {
        "id": "joke-c47271c2",
        "text": "Ich hab gestern meinen Besen verkauft. – I don't kehr."
      },
      {
        "id": "joke-26f1e92c",
        "text": "Ich hab meinem Freund einen Limonadenwitz erzählt. – Fanta lustig."
      },
      {
        "id": "joke-f6b1899c",
        "text": "Wohin geht ein Reh ohne Haare? – In die Reha."
      },
      {
        "id": "joke-b74f8829",
        "text": "Warum sieht man Ameisen nie in der Kirche? – Weil sie In-Sekten sind."
      },
      {
        "id": "joke-b357cb45",
        "text": "Was ist lila und sitzt in der Kirche in der ersten Reihe? – Eine Frommbeere."
      },
      {
        "id": "joke-b07413b4",
        "text": "Was kauft ein Frosch im Supermarkt? – Quaaark."
      },
      {
        "id": "joke-8313496c",
        "text": "Was ist ein Keks unter einem Baum? – Ein schattiges Plätzchen."
      },
      {
        "id": "joke-92cd2355",
        "text": "Was macht ein arbeitsloser Schauspieler? – Er spielt keine Rolle."
      },
      {
        "id": "joke-f793108e",
        "text": "Wo sind Elefanten heimisch? – In Rüsselsheim."
      },
      {
        "id": "joke-00f97c43",
        "text": "Was schwimmt auf dem Wasser und fängt mit Z an? – Zwei Enten."
      },
      {
        "id": "joke-3330af0c",
        "text": "Was ist grün und sitzt auf dem Klo? – Ein Kacktus."
      },
      {
        "id": "joke-8dc2054c",
        "text": "Was ist grün und wird auf Knopfdruck rot? – Ein Frosch im Mixer."
      },
      {
        "id": "joke-c2f3455d",
        "text": "Was ist weiß und rollt den Berg hinauf? – Eine Lawine mit Heimweh."
      },
      {
        "id": "joke-a0f507e0",
        "text": "Was ist weiß und versteckt sich hinter einem Baum? – Eine schüchterne Milch."
      },
      {
        "id": "joke-2152f879",
        "text": "Was ist schwarz-weiß und versteckt sich hinter einem Baum? – Eine schüchterne Milch in Lederjacke."
      },
      {
        "id": "joke-013cfc7c",
        "text": "Was beginnt mit T und endet mit itten? – Tiefkühlfritten."
      },
      {
        "id": "joke-d96969f8",
        "text": "Was ist der Unterschied zwischen Lidl und Schule? – Lidl lohnt sich."
      },
      {
        "id": "joke-88a8e9ba",
        "text": "Mein Hund kennt alle Straßen auswendig. Ich nenne ihn Google Mops."
      },
      {
        "id": "joke-84899d36",
        "text": "Wissenschaftler haben herausgefunden … und sind wieder hineingegangen."
      },
      {
        "id": "joke-662af1d6",
        "text": "Heute war Schrottwichteln im Kindergarten. – Wir sind die neuen Eltern von Kevin."
      },
      {
        "id": "joke-d0528ef4",
        "text": "Ich hab einem Hipster ins Bein geschossen. – Jetzt hoppst er."
      },
      {
        "id": "joke-399f505c",
        "text": "Sagt die eine Kuh „Muuuh“, sagt die andere: „Hey, das wollte ich auch gerade sagen.“"
      },
      {
        "id": "joke-2512d60f",
        "text": "Seit ich clean bin, sprechen meine Freunde nicht mehr mit mir. Der Toaster und die Lampe auch nicht."
      },
      {
        "id": "joke-01159373",
        "text": "„Anton, findest du, dass ich eine schlechte Mutter bin?“ – „Ich heiße Paul.“"
      },
      {
        "id": "joke-fc24ba70",
        "text": "Ich wollte einen Witz über die Deutsche Bahn machen, aber ich glaube, der kommt nicht an."
      },
      {
        "id": "joke-d36ac9ac",
        "text": "Egal wie leer du im Kopf bist – manche Leute sind Lehrer."
      },
      {
        "id": "joke-ab82ded9",
        "text": "Warum summen Bienen? – Weil sie den Text nicht kennen."
      },
      {
        "id": "joke-c613f00e",
        "text": "Wenn man Buchstabensuppe auskotzt, ist das dann gebrochenes Deutsch?"
      },
      {
        "id": "joke-f0192790",
        "text": "Was sagt ein Schwein zum anderen? – Es ist Wurst, was aus uns wird."
      },
      {
        "id": "joke-d9852031",
        "text": "Ich wollte Spiderman anrufen, aber er hatte kein Netz."
      },
      {
        "id": "joke-c01ca2da",
        "text": "Was sind die letzten Worte einer Giftschlange? – Mist, jetzt hab ich mir auf die Zunge gebissen."
      },
      {
        "id": "joke-67e9680d",
        "text": "Was steht auf dem Grab eines Mathematikers? – Damit hat er nicht gerechnet."
      },
      {
        "id": "joke-d9f27c7f",
        "text": "Treffen sich zwei Jäger. Beide tot."
      },
      {
        "id": "joke-730c6394",
        "text": "Treffen sich zwei Rechtsanwälte. Fragt der eine: „Und, wie geht's?“ – „Nichts zu klagen.“"
      },
      {
        "id": "joke-feaae9a4",
        "text": "Wie machen Igel Liebe? – Ganz, ganz vorsichtig."
      },
      {
        "id": "joke-82044fe3",
        "text": "Treffen sich zwei Hellseher. „Kommst du mit?“ – „Nein, da war ich gestern schon.“"
      },
      {
        "id": "joke-0b325021",
        "text": "Kommt ein Skelett zum Arzt. Sagt der Arzt: „Bisschen spät, was?“"
      },
      {
        "id": "joke-fa2d01dd",
        "text": "Was bekommt der Kannibale, der zu spät zum Essen kommt? – Die kalte Schulter."
      },
      {
        "id": "joke-931e1410",
        "text": "Was trinkt ein Mann vor dem Sex? – Einen Kaffee Latte."
      },
      {
        "id": "joke-74d80d96",
        "text": "Fragt der Walfisch den Thunfisch: „Was soll ich tun, Fisch?“ – „Du hast die Wahl, Fisch.“"
      },
      {
        "id": "joke-de9629c2",
        "text": "Was sitzt auf dem Ast und weint? – Eine Heule."
      },
      {
        "id": "joke-4618d7d5",
        "text": "Warum findet der Henker nie den Rückweg? – Weil er nur die Hinrichtung kennt."
      },
      {
        "id": "joke-1b24bc2f",
        "text": "„Oma, hast du meine Tabletten gesehen? Da steht LSD drauf.“ – „Vergiss die Tabletten, hast du den Drachen in der Küche gesehen?“"
      },
      {
        "id": "joke-e7b54d1a",
        "text": "„Wie lange hab ich noch zu leben, Doktor?“ – „10.“ – „10 was? Monate? Jahre?“ – „9, 8, 7 …“"
      },
      {
        "id": "joke-bd197a3b",
        "text": "Wenn sich ein Wissenschaftler ein Sandwich macht, ist es dann wissenschaftlich belegt?"
      },
      {
        "id": "joke-91c3d609",
        "text": "Warum klaut Robin Hood Deodorants? – Weil er sie unter den Armen verteilt."
      },
      {
        "id": "joke-b37aea7a",
        "text": "Ich hab den Joghurt fallen lassen. Er war nicht mehr haltbar."
      },
      {
        "id": "joke-884612f1",
        "text": "„Was ist dein Lieblingsfilm?“ – „Tesafilm, echt guter Streifen.“"
      },
      {
        "id": "joke-26cda86d",
        "text": "Wisst ihr, was der Hammer ist? – Ein Werkzeug."
      },
      {
        "id": "joke-0e02d534",
        "text": "Warum hat die Polizei den Dieb nicht verhaftet? – Er hatte eine Anti-Haft-Beschichtung."
      },
      {
        "id": "joke-23a93f79",
        "text": "Treffen sich zwei Ziegen. „Kommst du mit in den Club?“ – „Nein, ich hab keinen Bock.“"
      },
      {
        "id": "joke-70768f92",
        "text": "Gast zum Kellner: „Die Suppe war köstlich, ein Kompliment an den Koch.“ Kellner zum Koch: „Günther, du bist wunderschön.“"
      },
      {
        "id": "joke-16ee41ba",
        "text": "Wann gehen U-Boote unter? – Am Tag der offenen Tür."
      },
      {
        "id": "joke-b3233176",
        "text": "Treffen sich zwei Unsichtbare. Sagt der eine: „Dich hab ich ja schon lange nicht mehr gesehen.“"
      },
      {
        "id": "joke-80a21a8f",
        "text": "Was passiert, wenn man nachts in der Bäckerei anruft? – Die Mehlbox geht dran."
      },
      {
        "id": "joke-d4184587",
        "text": "In Australien schaut ein Pinguin verschwitzt aus dem Beutel eines Kängurus: „Scheiß Schüleraustausch.“"
      },
      {
        "id": "joke-00296b98",
        "text": "Geht eine Schwangere in die Bäckerei: „Ich bekomme ein Brot.“ Sagt der Bäcker: „Sachen gibt's.“"
      },
      {
        "id": "joke-4b1953ca",
        "text": "Was sagt ein Hai, wenn er einen Surfer sieht? – Wie nett, serviert auf dem Frühstücksbrettchen."
      },
      {
        "id": "joke-fe5ff273",
        "text": "Was macht eine Bombe im Bordell? – Puff."
      },
      {
        "id": "joke-97a13bf4",
        "text": "Hab mich ausgesperrt. War ganz aus dem Häuschen."
      },
      {
        "id": "joke-bcb9ce1d",
        "text": "Ich hab mit meiner Pflanze vereinbart, sie nur noch einmal im Monat zu gießen. Sie ist darauf eingegangen."
      },
      {
        "id": "joke-df66f390",
        "text": "Was sagt man über einen verstorbenen Spanner? – Der ist weg vom Fenster."
      },
      {
        "id": "joke-c3cc5e17",
        "text": "Hat mich am Bahnhof eine Prostituierte angesprochen: Für 30 Euro macht sie alles, was ich will. Ratet mal, wer heute Abend bei mir das Laminat verlegt."
      },
      {
        "id": "joke-0d093a02",
        "text": "Was hat einer, der im Dreieck läuft? – Kreislaufprobleme."
      },
      {
        "id": "joke-8ee68fc4",
        "text": "Wenn die Polizei „Papiere“ sagt und ich „Schere“ – hab ich dann gewonnen?"
      },
      {
        "id": "joke-6c446db6",
        "text": "„Los, Pikachu, Donnerblitz!“ – „Hallo?! Du hast gerade meinen Hamster gegen die Steckdose geworfen.“"
      },
      {
        "id": "joke-35ba8d69",
        "text": "Zahnarzt zum Patienten: „Das kann jetzt ein bisschen weh tun.“ – „Kein Problem.“ – „Ich habe seit drei Jahren ein Verhältnis mit Ihrer Frau.“"
      },
      {
        "id": "joke-4c407630",
        "text": "Fragt der Kellner: „Ihr Glas ist leer, möchten Sie noch eins?“ – „Wozu? Was soll ich mit zwei leeren Gläsern?“"
      },
      {
        "id": "joke-9d69f140",
        "text": "Vater: „Du wurdest adoptiert.“ – „Was?! Ich will zu meinen echten Eltern!“ – „Wir sind deine echten Eltern, du wirst in 30 Minuten abgeholt.“"
      },
      {
        "id": "joke-47b4ad76",
        "text": "„Letzte Mahnung“, schreibt der Anwalt. Gut, dass das jetzt endlich aufhört."
      },
      {
        "id": "joke-88f7149c",
        "text": "Alle Kinder fahren mit dem Bus, nur nicht Gunter, der liegt drunter."
      },
      {
        "id": "joke-2fee6577",
        "text": "Alle Kinder fahren mit der Eisenbahn, außer Sabine, die liegt auf der Schiene."
      },
      {
        "id": "joke-725a364f",
        "text": "Alle Kinder essen Schnitzel, nur nicht Susanne, die liegt in der Pfanne."
      },
      {
        "id": "joke-35ed1400",
        "text": "Alle Kinder können Yoga, nur nicht Nick, der bricht sich das Genick."
      },
      {
        "id": "joke-7262d8c2",
        "text": "Alle Kinder fürchten den Donner, nur nicht Fritz, den traf der Blitz."
      },
      {
        "id": "joke-5da766c1",
        "text": "Alle Kinder bleiben vor der Klippe stehen, außer Peter, der geht noch einen Meter."
      },
      {
        "id": "joke-fbe121c9",
        "text": "Alle Kinder liegen im Sandkasten, nur nicht Marc, der liegt im Sarg."
      }
    ]
  }
};

  // --- Dynamische Daten relativ zu heute ---
  const today = new Date();
  function addDays(n) { const d = new Date(today); d.setDate(d.getDate() + n); return d; }
  function iso(d) { return d.toISOString().slice(0, 10); }

  const vacations = { vacations: [
    { id: 'vac-1', label: 'Sommerurlaub', startDate: iso(addDays(16)), endDate: iso(addDays(30)) },
    { id: 'vac-2', label: 'Weihnachtsferien', startDate: iso(addDays(120)), endDate: iso(addDays(130)) }
  ] };

  const coverage = { coverages: [
    { id: 'cov-1', colleagueName: 'Dr. Meier', practiceName: 'Praxis Meier', date: iso(addDays(5)), endDate: '', type: 'ganztags', halfDay: '', startTime: '', endTime: '', notes: 'Tel: 0931/12345' },
    { id: 'cov-2', colleagueName: 'Dr. Fischer', practiceName: 'Praxis Fischer', date: iso(addDays(18)), endDate: iso(addDays(21)), type: 'ganztags', halfDay: '', startTime: '', endTime: '', notes: '' },
    { id: 'cov-3', colleagueName: 'Dr. Wagner', practiceName: 'Praxis Wagner', date: iso(addDays(34)), endDate: '', type: 'zeitraum', halfDay: '', startTime: '14:00', endTime: '18:00', notes: 'Tel: 0931/98765' }
  ] };

  const kanban = { version: 1, cards: [
    { id: 'kb-demo-1', title: 'Team-Ausflug planen', column: 'idee', order: 0, createdAt: today.toISOString() },
    { id: 'kb-demo-2', title: 'Impfaktion Herbst vorbereiten', column: 'geplant', order: 0, createdAt: today.toISOString() },
    { id: 'kb-demo-3', title: 'Website aktualisieren', column: 'geplant', order: 1, createdAt: today.toISOString() },
    { id: 'kb-demo-4', title: 'Neues Terminsystem testen', column: 'umsetzung', order: 0, createdAt: today.toISOString() },
    { id: 'kb-demo-5', title: 'Wartezimmer umgestalten', column: 'erledigt', order: 0, createdAt: today.toISOString() }
  ] };

  const MOOD_COMMENTS = {
    1: ['Stressiger Tag', 'Drucker streikt schon wieder', 'Wartezimmer zum Bersten voll'],
    2: ['Geht so', 'Viel los heute', 'Montag halt'],
    3: ['Super Team!', 'Alles entspannt heute', 'Kuchen im Pausenraum!']
  };
  const moods = [];
  let moodN = 0;
  for (let back = 60; back >= 0; back--) {
    const day = addDays(-back);
    if (day.getDay() === 0 || day.getDay() === 6) continue; // Wochenende
    const count = 2 + Math.floor(Math.random() * 5);
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      const mood = r < 0.55 ? 3 : r < 0.85 ? 2 : 1;
      const t = new Date(day);
      t.setHours(7 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60), 0, 0);
      const list = MOOD_COMMENTS[mood];
      const comment = Math.random() < 0.2 ? list[Math.floor(Math.random() * list.length)] : '';
      moods.push({ id: 'mood-demo-' + (moodN++), mood, comment, timestamp: t.toISOString() });
    }
  }

  // --- fetch-Mock ---
  const origFetch = window.fetch.bind(window);
  function json(data, status) {
    return new Response(JSON.stringify(data), {
      status: status || 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input.url;
    const apiIdx = url.indexOf('/api/');
    if (apiIdx === -1) return origFetch(input, init);

    init = init || {};
    const method = (init.method || 'GET').toUpperCase();
    const rest = url.slice(apiIdx + 5);
    const pathPart = rest.split('?')[0];
    const params = new URLSearchParams(rest.split('?')[1] || '');
    const segs = pathPart.split('/').filter(Boolean);
    const body = init.body ? JSON.parse(init.body) : {};

    // Einfache GET-Endpunkte
    if (method === 'GET') {
      if (segs[0] === 'settings' && segs[1] === 'public') return json(SEED.settings);
      if (segs[0] === 'tiles') return json(SEED.tiles);
      if (segs[0] === 'links') return json(SEED.links);
      if (segs[0] === 'staff') return json(SEED.staff);
      if (segs[0] === 'jokes') return json(SEED.jokes);
      if (segs[0] === 'vacations') return json(vacations);
      if (segs[0] === 'coverage') return json(coverage);
      if (segs[0] === 'kanban') return json(kanban);
      if (segs[0] === 'moods') {
        let result = moods;
        if (params.get('from')) {
          const from = new Date(params.get('from'));
          result = result.filter(m => new Date(m.timestamp) >= from);
        }
        if (params.get('to')) {
          const to = new Date(params.get('to'));
          to.setHours(23, 59, 59, 999);
          result = result.filter(m => new Date(m.timestamp) <= to);
        }
        return json(result);
      }
    }

    // Stimmung abgeben
    if (method === 'POST' && segs[0] === 'moods') {
      const entry = {
        id: 'mood-demo-' + (moodN++),
        mood: body.mood,
        comment: typeof body.comment === 'string' ? body.comment.trim().slice(0, 500) : '',
        timestamp: new Date().toISOString()
      };
      moods.push(entry);
      return json(entry);
    }

    // Kanban-Operationen (nur im Browser-Speicher)
    if (segs[0] === 'kanban' && segs[1] === 'cards') {
      if (method === 'POST') {
        const card = {
          id: 'kb-demo-' + Math.random().toString(16).slice(2, 10),
          title: (body.title || '').trim().slice(0, 200),
          column: body.column,
          order: kanban.cards.filter(c => c.column === body.column).length,
          createdAt: new Date().toISOString()
        };
        kanban.cards.push(card);
        kanban.version++;
        return json({ card: card, version: kanban.version });
      }
      const cardId = segs[2];
      const card = kanban.cards.find(c => c.id === cardId);
      if (!card) return json({ error: 'Karte nicht gefunden' }, 404);

      if (method === 'PUT' && segs[3] === 'move') {
        const oldColumn = card.column;
        card.column = body.column || card.column;
        const target = kanban.cards
          .filter(c => c.column === card.column && c.id !== card.id)
          .sort((a, b) => a.order - b.order);
        const insertAt = Math.min(body.order != null ? body.order : target.length, target.length);
        target.splice(insertAt, 0, card);
        target.forEach((c, i) => { c.order = i; });
        if (oldColumn !== card.column) {
          kanban.cards
            .filter(c => c.column === oldColumn)
            .sort((a, b) => a.order - b.order)
            .forEach((c, i) => { c.order = i; });
        }
        kanban.version++;
        return json({ version: kanban.version });
      }
      if (method === 'PUT') {
        if (body.title !== undefined) card.title = body.title.trim().slice(0, 200);
        kanban.version++;
        return json({ card: card, version: kanban.version });
      }
      if (method === 'DELETE') {
        kanban.cards.splice(kanban.cards.indexOf(card), 1);
        kanban.version++;
        return json({ ok: true, version: kanban.version });
      }
    }

    return json({ error: 'Nicht verfuegbar in der Demo' }, 404);
  };
})();
