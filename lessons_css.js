export const lessons_css = [
    {
        id: "css_1",
        title: "Farben ändern",
        theory: "In CSS wird die Textfarbe mit der Eigenschaft 'color' definiert. Beispiel: color: blue;",
        xpReward: 15,
        tasks: [
            { taskType: "code", question: "Färbe den Text rot ein.", correctAnswer: "color: red;", tellwhatright: "color: red; – Die Textfarbe wird mit color gesetzt. 'red' ist einer von 140 benannten CSS-Farbwerten." },
            { taskType: "mc", question: "Welche Eigenschaft ändert die Textfarbe?", options: ["color", "background", "margin"], correctAnswer: 0, tellwhatright: "color – color ist die CSS-Eigenschaft für Schriftfarbe. background ändert den Hintergrund, margin den Außenabstand.", feedback: "color ist die CSS-Eigenschaft für die Schriftfarbe." },
            { taskType: "code", question: "Setze die Schriftfarbe auf blau.", correctAnswer: "color: blue;", tellwhatright: "color: blue; – 'blue' setzt die Schriftfarbe auf Blau. CSS kennt viele Farbnamen wie red, green, blue." },
            { taskType: "mc", question: "Wie schreibt man eine CSS-Regel?", options: ["selector { style }", "selector < style >", "selector = style"], correctAnswer: 0, tellwhatright: "selector { style } – Eine CSS-Regel besteht aus einem Selektor und geschweiften Klammern mit den Style-Angaben.", feedback: "Eine Regel besteht aus einem Selektor und einem Stylesatz in geschweiften Klammern." },
            { taskType: "code", question: "Färbe einen Block grün ein.", correctAnswer: "color: green;", tellwhatright: "color: green; – color mit dem Wert 'green' färbt die Schrift grün ein." }
        ]
    },
    {
        id: "css_2",
        title: "Hintergründe",
        theory: "Die Eigenschaft 'background-color' ändert die Hintergrundfarbe eines Elements.",
        xpReward: 20,
        tasks: [
            { taskType: "mc", question: "Wie macht man den Hintergrund schwarz?", options: ["bg: black;", "color: black;", "background-color: black;"], correctAnswer: 2, tellwhatright: "background-color: black; – background-color ändert den Hintergrund. 'bg' gibt es nicht in CSS, color ändert nur die Schrift." },
            { taskType: "code", question: "Setze die Hintergrundfarbe auf schwarz.", correctAnswer: "background-color: black;", tellwhatright: "background-color: black; – Setzt den Hintergrund eines Elements auf Schwarz." },
            { taskType: "mc", question: "Welche Eigenschaft verändert den Hintergrund?", options: ["background-color", "font-size", "border"], correctAnswer: 0, tellwhatright: "background-color – Die korrekte Eigenschaft für die Hintergrundfarbe. font-size ändert die Schriftgröße, border den Rahmen." },
            { taskType: "code", question: "Setze die Hintergrundfarbe auf grau.", correctAnswer: "background-color: gray;", tellwhatright: "background-color: gray; – Färbt den Hintergrund in Grau. 'gray' (oder 'grey') ist ein gültiger CSS-Farbname." },
            { taskType: "mc", question: "Welche Farbe ist ein CSS-Wert?", options: ["red", "hello", "button"], correctAnswer: 0, tellwhatright: "red – 'red' ist ein gültiger CSS-Farbname. 'hello' und 'button' sind keine Farben." }
        ]
    },
    {
        id: "css_3",
        title: "Schriftgrößen & -arten",
        theory: "Die Schriftgröße wird mit 'font-size' und die Schriftart mit 'font-family' festgelegt.",
        xpReward: 20,
        tasks: [
            { taskType: "code", question: "Setze die Schriftgröße auf 16 Pixel.", correctAnswer: "font-size: 16px;", tellwhatright: "font-size: 16px; – Setzt die Schrift auf 16 Pixel Höhe. 'px' ist die gebräuchlichste Einheit für Bildschirme." },
            { taskType: "mc", question: "Welche Einheit ist KEINE gültige Schriftgröße?", options: ["px", "em", "cm"], correctAnswer: 2, tellwhatright: "cm – px (Pixel) und em (relative Größe) sind üblich. cm (Zentimeter) ist für Bildschirme ungeeignet." },
            { taskType: "code", question: "Setze die Schriftart auf Arial.", correctAnswer: "font-family: Arial;", tellwhatright: "font-family: Arial; – Weist den Browser an, die Schriftart Arial zu verwenden." },
            { taskType: "mc", question: "Wie zentriert man Text?", options: ["align-text: center;", "text-align: center;", "text-center: true;"], correctAnswer: 1, tellwhatright: "text-align: center; – Zentriert Text. 'align-text' und 'text-center' sind keine gültigen CSS-Eigenschaften." },
            { taskType: "code", question: "Setze die Textfarbe auf blau und die Schriftgröße auf 1.2em.", correctAnswer: "color: blue; font-size: 1.2em;", tellwhatright: "color: blue; font-size: 1.2em; – Zwei Deklarationen: color für die Farbe, font-size für die relative Schriftgröße." }
        ]
    },
    {
        id: "css_4",
        title: "Padding & Margin",
        theory: "Padding ist der Innenabstand eines Elements, Margin der Außenabstand.",
        xpReward: 25,
        tasks: [
            { taskType: "code", question: "Füge 10px Padding hinzu.", correctAnswer: "padding: 10px;", tellwhatright: "padding: 10px; – Fügt auf allen vier Seiten einen Innenabstand von 10 Pixeln hinzu." },
            { taskType: "mc", question: "Was ist der Innenabstand?", options: ["margin", "border", "padding"], correctAnswer: 2, tellwhatright: "padding – Padding ist der Innenabstand zwischen Inhalt und Rahmen. Margin ist Außenabstand, border der Rahmen." },
            { taskType: "code", question: "Füge 20px Margin nach unten hinzu.", correctAnswer: "margin-bottom: 20px;", tellwhatright: "margin-bottom: 20px; – Fügt nur unten einen Außenabstand von 20 Pixeln hinzu." },
            { taskType: "mc", question: "Welche Eigenschaft ist KEIN Box-Modell-Bestandteil?", options: ["content", "padding", "color"], correctAnswer: 2, tellwhatright: "color – Das Box-Modell besteht aus content, padding, border und margin. 'color' gehört nicht dazu." },
            { taskType: "code", question: "Setze Padding und Margin auf 5px.", correctAnswer: "padding: 5px; margin: 5px;", tellwhatright: "padding: 5px; margin: 5px; – Setzt Innen- und Außenabstand auf jeweils 5 Pixel." }
        ]
    },
    {
        id: "css_5",
        title: "Borders",
        theory: "Mit 'border' kannst du Rahmen um Elemente legen. Du kannst Stil, Breite und Farbe definieren.",
        xpReward: 20,
        tasks: [
            { taskType: "code", question: "Füge einen 1px schwarzen, durchgezogenen Rahmen hinzu.", correctAnswer: "border: 1px solid black;", tellwhatright: "border: 1px solid black; – Setzt einen 1px breiten, durchgezogenen (solid) schwarzen Rahmen." },
            { taskType: "mc", question: "Welche Eigenschaft definiert den Rahmenstil?", options: ["border-color", "border-style", "border-width"], correctAnswer: 1, tellwhatright: "border-style – Bestimmt den Stil (solid, dashed, dotted). border-color und border-width sind separate Untereigenschaften." },
            { taskType: "code", question: "Setze nur den unteren Rahmen auf 2px gestrichelt und rot.", correctAnswer: "border-bottom: 2px dashed red;", tellwhatright: "border-bottom: 2px dashed red; – Setzt einen 2px dicken, gestrichelten (dashed) roten Rahmen nur unten." },
            { taskType: "mc", question: "Was macht 'border-radius'?", options: ["Rahmenfarbe ändern", "Rahmenecken abrunden", "Rahmenbreite ändern"], correctAnswer: 1, tellwhatright: "Rahmenecken abrunden – border-radius rundet die Ecken ab. Je höher der Wert, desto runder die Ecke." },
            { taskType: "code", question: "Füge einen 3px blauen Rahmen hinzu und runde die Ecken um 5px ab.", correctAnswer: "border: 3px solid blue; border-radius: 5px;", tellwhatright: "border: 3px solid blue; border-radius: 5px; – Erst der Rahmen, dann border-radius zum Abrunden der Ecken." }
        ]
    }
];
