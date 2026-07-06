export const lessons_html = [
    {
        id: "html_1",
        title: "Das Grundgerüst",
        theory: "Jedes HTML-Dokument folgt einer festen Hierarchie. Es beginnt mit der Doctype-Deklaration `<!DOCTYPE html>`, die dem Browser sagt, dass es sich um modernes HTML5 handelt. Das `<html>`-Element umschließt den gesamten Code. Darinnen teilt sich die Seite in zwei Hauptbereiche: Der `<head>` enthält unsichtbare Metadaten, Zeichensätze und den Seitentitel für den Browser-Tab. Der `<body>` enthält schließlich den gesamten sichtbaren Inhalt wie Text, Bilder und Buttons, den die Nutzer am Ende sehen.",
        xpReward: 15,
        tasks: [
            { 
                taskType: "mc", 
                question: "Welches HTML-Element umschließt den gesamten sichtbaren Inhalt einer Webseite?", 
                options: ["<head>", "<body>", "<footer>"], 
                correctAnswer: 1,
                tellwhatright: "<body> – Der <body> umschließt den gesamten sichtbaren Inhalt. <head> enthält nur Metadaten, <footer> ist nur der Fußbereich.",
                feedback: "Richtig! Der sichtbare Inhalt liegt komplett im <body>. Der <head> enthält nur unsichtbare Metadaten und Informationen für den Browser." 
            },
            { 
                taskType: "code", 
                question: "Erstelle einen einfachen Textabsatz mit dem Inhalt 'Hallo'.", 
                correctAnswer: "<p>Hallo</p>", 
                tellwhatright: "<p>Hallo</p> – Das <p>-Tag (Paragraph) erzeugt einen Textabsatz. Der Text steht zwischen dem öffnenden <p> und dem schließenden </p>." 
            },
            { 
                taskType: "mc", 
                question: "Was ist die primäre Aufgabe des <head>-Bereichs?", 
                options: ["Sichtbaren Text und Bilder auf der Seite anzeigen", "Metadaten, Zeichensätze und den Seitentitel speichern", "Das Layout und die Buttons direkt im Browser gestalten"], 
                correctAnswer: 1, 
                tellwhatright: "Metadaten, Zeichensätze und den Seitentitel speichern – Der <head> ist unsichtbar und dient als Behälter für Metadaten, Zeichensätze und den Seitentitel.",
                feedback: "Exakt! Der <head> liefert Hintergrundinformationen über das Dokument, wird selbst aber nicht direkt auf der Leinwand dargestellt." 
            },
            { 
                taskType: "code", 
                question: "Schreibe das vollständige, leere HTML-Grundgerüst inklusive Doctype, html, head und body (ohne Leerzeichen zwischen den Tags).", 
                correctAnswer: "<!DOCTYPE html><html><head></head><body></body></html>", 
                tellwhatright: "<!DOCTYPE html><html><head></head><body></body></html> – Das Grundgerüst startet mit <!DOCTYPE html>, gefolgt von <html>, darin zuerst <head></head> dann <body></body>, bevor </html> schließt." 
            },
            { 
                taskType: "select", 
                question: "Wähle das richtige HTML-Element, um den Titel im Tab des Webbrowsers festzulegen.", 
                options: ["<title>", "<p>", "<img>"], 
                preview: "<title>Meine Webseite</title>", 
                correctAnswer: 0,
                tellwhatright: "<title> – Das <title>-Element gehört in den <head> und bestimmt den Text im Browser-Tab.",
                feedback: "Korrekt! Das <title>-Element gehört in den <head> und definiert den Text, der oben im Browser-Tab angezeigt wird." 
            }
        ]
    },
    {
        id: "html_2",
        title: "Überschriften und Absätze",
        theory: "Texte müssen strukturiert werden, damit sie leicht lesbar sind und von Suchmaschinen verstanden werden. HTML bietet dafür sechs Stufen von Überschriften: `<h1>` ist die wichtigste Hauptüberschrift (sollte nur einmal pro Seite vorkommen), gefolgt von Unterüberschriften wie `<h2>` bis hinunter zu `<h6>` für kleinste Abschnitte. Fließtext und normale Sätze werden hingegen immer in ein `<p>`-Element (Paragraph) gepackt, wodurch automatisch ein passender Abstand nach unten erzeugt wird.",
        xpReward: 20,
        tasks: [
            { 
                taskType: "mc", 
                question: "Welches der folgenden Elemente stellt die hierarchisch wichtigste und größte Überschrift dar?", 
                options: ["<h3>", "<h1>", "<h6>"], 
                correctAnswer: 1,
                tellwhatright: "<h1> – <h1> ist die oberste und wichtigste Überschrift. Je höher die Zahl, desto tiefer die Hierarchie und kleiner die Schrift.",
                feedback: "Richtig! <h1> steht für die Hauptüberschrift (Heading 1). Je höher die Zahl, desto kleiner und unwichtiger wird die Überschrift."
            },
            { 
                taskType: "code", 
                question: "Erstelle eine Hauptüberschrift (Stufe 1) mit dem Text 'Willkommen'.", 
                correctAnswer: "<h1>Willkommen</h1>",
                tellwhatright: "<h1>Willkommen</h1> – Hauptüberschriften werden mit <h1> und </h1> umschlossen. Das sorgt für große Darstellung und hohe Relevanz bei Suchmaschinen."
            },
            { 
                taskType: "sort", 
                question: "Bringe die Elemente in eine logische semantische Reihenfolge (von der Metainformation zur tiefsten Inhaltsebene):", 
                options: ["<h1>", "<p>", "<title>"], 
                correctAnswer: "<title> -> <h1> -> <p>",
                tellwhatright: "<title> -> <h1> -> <p> – Der <title> steht im Head (Metainfo), dann folgt die Hauptüberschrift <h1>, darunter der Fließtext <p>.",
                feedback: "Genau! Der <title> steht ganz oben im Head, gefolgt von der Hauptüberschrift <h1> im Body und dem anschließenden Fließtext <p>."
            },
            { 
                taskType: "code", 
                question: "Erstelle einen regulären Fließtext-Absatz mit dem Inhalt 'HTML macht Spaß'.", 
                correctAnswer: "<p>HTML macht Spaß</p>",
                tellwhatright: "<p>HTML macht Spaß</p> – Für normalen Text nutzt man das <p>-Tag. Das schließende </p> darf nicht fehlen."
            },
            { 
                taskType: "select", 
                question: "Welches Element ist semantisch dafür gedacht, zusammenhängenden Fließtext zu strukturieren?", 
                options: ["<p>", "<div>", "<span>"], 
                preview: "<p>Ein Absatz mit Text.</p>", 
                correctAnswer: 0,
                tellwhatright: "<p> – <p> (Paragraph) ist das semantisch korrekte Element für Textabsätze. <div> und <span> sind universelle Container ohne eigene Bedeutung.",
                feedback: "Korrekt! <p> steht für Paragraph und ist das Standard-Element für Textabsätze."
            }
        ]
    },
    {
        id: "html_3",
        title: "Links und Bilder",
        theory: "Das World Wide Web lebt von Verknüpfungen. Mit dem Anchor-Tag `<a>` erstellst du Hyperlinks. Wo die Reise hingeht, bestimmt das Attribut `href` (hypertext reference). Um Medien einzubinden, nutzt du das Image-Tag `<img>`. Wichtig: `<img>` hat keinen schließenden Tag (Self-Closing). Es benötigt zwingend zwei Attribute: `src` (source) für den Pfad zur Bilddatei und `alt` (Alternativtext), der das Bild beschreibt, falls es nicht geladen werden kann oder ein Screenreader die Seite vorliest.",
        xpReward: 20,
        tasks: [
            { 
                taskType: "mc", 
                question: "Welches Attribut wird beim <a>-Tag benötigt, um das genaue Linkziel anzugeben?", 
                options: ["src", "href", "alt"], 
                correctAnswer: 1,
                tellwhatright: "href – href (hypertext reference) gibt das Linkziel an. src ist für Bilder, alt für Alternativtexte.",
                feedback: "Richtig! 'href' steht für Hypertext Reference und hält die URL oder den Pfad zum Ziel bereit."
            },
            { 
                taskType: "code", 
                question: "Erstelle einen Link mit dem sichtbaren Text 'Link', der zu 'https://example.com' führt.", 
                correctAnswer: "<a href=\"https://example.com\">Link</a>",
                tellwhatright: "<a href=\"https://example.com\">Link</a> – Das <a>-Tag bekommt href=\"URL\". Der klickbare Text steht zwischen <a> und </a>."
            },
            { 
                taskType: "code", 
                question: "Füge ein Bild mit der Quelle 'bild.png' und dem Alternativtext 'Bild' ein.", 
                correctAnswer: "<img src=\"bild.png\" alt=\"Bild\">",
                tellwhatright: "<img src=\"bild.png\" alt=\"Bild\"> – <img> nutzt src für den Pfad und alt für die Beschreibung. Es hat keinen schließenden Tag."
            },
            { 
                taskType: "select", 
                question: "Welches dieser Elemente bindet eine Grafik direkt in die Seite ein und schließt sich selbst?", 
                options: ["<img>", "<a>", "<ul>"], 
                preview: "<img src='logo.png' alt='Logo'>", 
                correctAnswer: 0,
                tellwhatright: "<img> – <img> ist ein Self-Closing-Tag. <a> und <ul> haben schließende Tags und sind keine Grafikelemente.",
                feedback: "Korrekt! Das <img>-Element ist ein Standalone-Tag, das Grafiken mithilfe von Attributen darstellt."
            },
            { 
                taskType: "sort", 
                question: "Ordne die Bestandteile beim Aufbau eines Bild-Tags logisch: Basis-Tag, Pfadangabe, Beschreibungstext.", 
                options: ["<img>", "src", "alt"], 
                correctAnswer: "<img> -> src -> alt",
                tellwhatright: "<img> -> src -> alt – Zuerst das Element <img>, dann die Pfadangabe src, dann der Alternativtext alt.",
                feedback: "Sehr gut! Zuerst wird das Element aufgerufen (img), dann die Quelle definiert (src) und schließlich der Alternativtext (alt) angehängt."
            }
        ]
    },
    {
        id: "html_4",
        title: "Listen und Tabellen",
        theory: "Zur übersichtlichen Darstellung von Daten nutzt man Listen oder Tabellen. Es gibt ungeordnete Listen mit Aufzählungspunkten (`<ul>` für unordered list) und nummerierte, geordnete Listen (`<ol>` für ordered list). Die einzelnen Listeneinträge werden immer mit `<li>` (list item) deklariert. Tabellen werden mit `<table>` erstellt; sie bauen sich zeilenweise über Tabellenzeilen (`<tr>` für table row) auf, in denen dann die eigentlichen Datenzellen (`<td>` für table data) sitzen.",
        xpReward: 25,
        tasks: [
            { 
                taskType: "mc", 
                question: "Mit welchem Tag leitet man eine ungeordnete Liste mit Aufzählungspunkten (Bulletpoints) ein?", 
                options: ["<ol>", "<ul>", "<li>"], 
                correctAnswer: 1,
                tellwhatright: "<ul> – <ul> (unordered list) erzeugt Aufzählungspunkte. <ol> wäre eine nummerierte Liste, <li> nur ein einzelner Eintrag.",
                feedback: "Genau! <ul> steht für 'unordered list' (ungeordnete Liste). <ol> wäre für nummerierte Listen da."
            },
            { 
                taskType: "code", 
                question: "Erstelle eine ungeordnete Liste (ul) mit zwei Einträgen: 'eins' und 'zwei'.", 
                correctAnswer: "<ul><li>eins</li><li>zwei</li></ul>",
                tellwhatright: "<ul><li>eins</li><li>zwei</li></ul> – Die Liste wird von <ul> umschlossen. Jeder Eintrag steht in <li>...</li>."
            },
            { 
                taskType: "select", 
                question: "Welches Element bildet das äußere Grundgerüst, um tabellarische Daten in Zeilen und Spalten darzustellen?", 
                options: ["<table>", "<section>", "<form>"], 
                preview: "<table><tr><td>Daten</td></tr></table>", 
                correctAnswer: 0,
                tellwhatright: "<table> – <table> umschließt die gesamte Tabellenstruktur. <section> gliedert Abschnitte, <form> ist für Eingabeformulare.",
                feedback: "Richtig! Das <table>-Tag umschließt die gesamte Tabellenstruktur aus Zeilen (tr) und Zellen (td)."
            },
            { 
                taskType: "sort", 
                question: "Ordne die Verschachtelung einer Liste von außen nach innen:", 
                options: ["<ul>", "<li>", "Text"], 
                correctAnswer: "<ul> -> <li> -> Text",
                tellwhatright: "<ul> -> <li> -> Text – Die Liste (<ul>) umschließt die Einträge (<li>), darin steht der Text.",
                feedback: "Perfekt! Das Listen-Tag (ul) öffnet den Container, das Listenelement (li) definiert den Stichpunkt, und darin liegt der eigentliche Text."
            },
            { 
                taskType: "mc", 
                question: "Was unterscheidet eine geordnete Liste (<ol>) standardmäßig von einer ungeordneten Liste (<ul>)?", 
                options: ["Sie zeigt quadratische Punkte", "Sie nummeriert die Einträge automatisch mit Zahlen", "Sie kann nur Bilder enthalten"], 
                correctAnswer: 1,
                tellwhatright: "Sie nummeriert die Einträge automatisch mit Zahlen – <ol> (ordered list) nummeriert Einträge durch. <ul> zeigt nur Aufzählungspunkte.",
                feedback: "Stimmt! <ol> steht für 'ordered list' und nummeriert die Einträge fortlaufend (1., 2., 3...)."
            }
        ]
    },
    {
        id: "html_5",
        title: "Formulare",
        theory: "Formulare (`<form>`) machen Webseiten interaktiv. Sie fangen Benutzereingaben ab. Das flexibelste Element hierbei ist `<input>`. Über das Attribut `type` entscheidet sich, was für ein Feld entsteht: `type=\"text\"` für Namen, `type=\"email\"` oder `type=\"password\"`. Ergänzt werden Eingabefelder oft durch beschriftende `<label>`-Elemente und einen `<button>`, mit dem die eingegebenen Daten schließlich abgeschickt werden können.",
        xpReward: 30,
        tasks: [
            { 
                taskType: "mc", 
                question: "Welches HTML-Element erzeugt ein flexibles, einzeiliges Eingabefeld für den Nutzer?", 
                options: ["<input>", "<button>", "<label>"], 
                correctAnswer: 0,
                tellwhatright: "<input> – <input> ist das universelle Eingabefeld. <button> erzeugt einen Button, <label> beschriftet Felder.",
                feedback: "Richtig! Das <input>-Element ist das Standard-Werkzeug für jegliche Form von Nutzereingaben."
            },
            { 
                taskType: "code", 
                question: "Erstelle ein Eingabefeld, das explizit für die Eingabe von normalem Text gedacht ist.", 
                correctAnswer: "<input type=\"text\">",
                tellwhatright: "<input type=\"text\"> – Mit type=\"text\" wird <input> zu einer einzeiligen Texteingabe."
            },
            { 
                taskType: "select", 
                question: "Welches Element stellt eine klickbare Schaltfläche dar, um eine Aktion oder das Absenden auszulösen?", 
                options: ["<button>", "<img>", "<p>"], 
                preview: "<button>Absenden</button>", 
                correctAnswer: 0,
                tellwhatright: "<button> – <button> erzeugt eine klickbare Schaltfläche. <img> zeigt ein Bild, <p> ist ein Textabsatz.",
                feedback: "Korrekt! Das <button>-Element erzeugt die klassische, klickbare Schaltfläche."
            },
            { 
                taskType: "code", 
                question: "Erstelle ein Formular-Element (form), das innen ein Textfeld (input type=\"text\") und direkt danach einen Button mit dem Text 'Absenden' enthält.", 
                correctAnswer: "<form><input type=\"text\"><button>Absenden</button></form>",
                tellwhatright: "<form><input type=\"text\"><button>Absenden</button></form> – Das <form>-Element umschließt Eingabefelder und Button als Einheit."
            },
            { 
                taskType: "sort", 
                question: "Ordne die Elemente eines Standard-Login-Formulars von der äußeren Struktur bis zum finalen Klick-Element:", 
                options: ["<form>", "<input>", "<button>"], 
                correctAnswer: "<form> -> <input> -> <button>",
                tellwhatright: "<form> -> <input> -> <button> – Zuerst <form> als Container, dann <input> für die Eingabe, zuletzt <button> zum Absenden.",
                feedback: "Klasse! Das <form>-Tag umschließt das gesamte Formular, die <input>-Felder nehmen die Daten auf und der <button> schickt sie ab."
            }
        ]
    }
];
