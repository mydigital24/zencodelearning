export const lessons_js = [
    {
        id: "js_1",
        title: "Variablen",
        theory: "In modernem JavaScript speichern wir Werte meistens mit 'let' (veränderbar) oder 'const' (unveränderbar).",
        xpReward: 20,
        tasks: [
            { taskType: "code", question: "Deklariere eine unveränderbare Variable namens 'alter'.", correctAnswer: "const alter", tellwhatright: "const alter – Mit const deklarierst du eine unveränderbare Variable. Der Name folgt direkt nach const." },
            { taskType: "mc", question: "Was bedeutet const?", options: ["veränderbar", "unveränderbar", "leer"], correctAnswer: 1, tellwhatright: "unveränderbar – const (constant) bedeutet, der Wert kann nach der Zuweisung nicht mehr geändert werden.", feedback: "const steht für eine unveränderbare Variable. Der Wert bleibt fest." },
            { taskType: "code", question: "Deklariere eine veränderbare Variable namens 'name'.", correctAnswer: "let name", tellwhatright: "let name – let erlaubt eine spätere Neuzuweisung, anders als const." },
            { taskType: "mc", question: "Welche Schreibweise ist korrekt?", options: ["let x = 1", "const x = 1", "both"], correctAnswer: 2, tellwhatright: "both – Beide sind syntaktisch korrekt. let erlaubt Neuzuweisung, const nicht.", feedback: "Beide Formen sind korrekt, je nachdem ob der Wert später verändert werden soll." },
            { taskType: "code", question: "Erstelle eine Variable mit dem Wert 5.", correctAnswer: "const x = 5", tellwhatright: "const x = 5 – Eine Variable kann direkt bei der Deklaration mit einem Wert initialisiert werden." }
        ]
    },
    {
        id: "js_2",
        title: "Konsolen-Ausgabe",
        theory: "Mit console.log() kannst du dir Werte im Browser-Inspektor anzeigen lassen.",
        xpReward: 15,
        tasks: [
            { taskType: "mc", question: "Wie gibst du 'Hallo' in der Konsole aus?", options: ["print('Hallo')", "console.log('Hallo')", "echo 'Hallo'"], correctAnswer: 1, tellwhatright: "console.log('Hallo') – console.log() ist die korrekte Methode. print und echo gibt es in JS nicht." },
            { taskType: "code", question: "Gib 'Hallo' in der Konsole aus.", correctAnswer: "console.log('Hallo')", tellwhatright: "console.log('Hallo') – console.log() gibt Text in der Browser-Konsole aus. Der Wert steht in Klammern." },
            { taskType: "mc", question: "Wofür ist console.log?", options: ["Ausgabe", "Styles", "Datenbank"], correctAnswer: 0, tellwhatright: "Ausgabe – console.log() dient der Ausgabe in die Entwicklerkonsole zum Debuggen und Testen." },
            { taskType: "code", question: "Gib deine Zahl 7 aus.", correctAnswer: "console.log(7)", tellwhatright: "console.log(7) – Gibt die Zahl 7 in der Konsole aus. Zahlen brauchen im Gegensatz zu Strings keine Anführungszeichen." },
            { taskType: "mc", question: "Welche Funktion ist korrekt?", options: ["console.log()", "print()", "show()"], correctAnswer: 0, tellwhatright: "console.log() – Die einzige standardisierte Methode zur Konsolenausgabe in JavaScript." }
        ]
    },
    {
        id: "js_3",
        title: "Datentypen",
        theory: "JavaScript hat verschiedene Datentypen wie Strings (Texte), Numbers (Zahlen) und Booleans (true/false).",
        xpReward: 20,
        tasks: [
            { taskType: "mc", question: "Welcher Datentyp ist 'Hello World'?", options: ["Number", "Boolean", "String"], correctAnswer: 2, tellwhatright: "String – 'Hello World' steht in Anführungszeichen, das ist ein String. Ohne Anführungszeichen wäre es eine Variable." },
            { taskType: "code", question: "Deklariere eine Variable mit dem String 'JavaScript ist toll'.", correctAnswer: "const text = 'JavaScript ist toll';", tellwhatright: "const text = 'JavaScript ist toll'; – Ein String wird in einfache oder doppelte Anführungszeichen gesetzt." },
            { taskType: "mc", question: "Welcher Datentyp ist 123?", options: ["String", "Number", "Boolean"], correctAnswer: 1, tellwhatright: "Number – 123 ohne Anführungszeichen ist eine Zahl. In Anführungszeichen wäre es ein String." },
            { taskType: "code", question: "Erstelle eine Variable mit dem Boolean-Wert true.", correctAnswer: "const istWahr = true;", tellwhatright: "const istWahr = true; – Boolean hat nur true (wahr) oder false (falsch). Keine Anführungszeichen verwenden!" },
            { taskType: "mc", question: "Was ist ein Boolean?", options: ["Text", "Zahl", "Wahr/Falsch"], correctAnswer: 2, tellwhatright: "Wahr/Falsch – Ein Boolean hat zwei Zustände: true (wahr) oder false (falsch)." }
        ]
    },
    {
        id: "js_4",
        title: "Operatoren",
        theory: "Operatoren führen Operationen mit Werten aus, z.B. +, -, *, /, % (Modulo) für Zahlen. '==' prüft auf Gleichheit, '=' weist zu.",
        xpReward: 25,
        tasks: [
            { taskType: "code", question: "Addiere 5 und 3 und speichere das Ergebnis in 'summe'.", correctAnswer: "const summe = 5 + 3;", tellwhatright: "const summe = 5 + 3; – Der +-Operator addiert. Das Ergebnis wird mit = der Variable summe zugewiesen." },
            { taskType: "mc", question: "Was ist das Ergebnis von 10 % 3?", options: ["1", "3", "0"], correctAnswer: 0, tellwhatright: "1 – % ist Modulo (Rest). 10 ÷ 3 = 3 Rest 1, also 10 % 3 = 1." },
            { taskType: "code", question: "Prüfe, ob 10 gleich '10' ist (loose equality).", correctAnswer: "10 == '10';", tellwhatright: "10 == '10'; – == vergleicht Werte ohne Typ-Prüfung. 10 (Number) und '10' (String) gelten als gleich." },
            { taskType: "mc", question: "Welcher Operator ist eine Zuweisung?", options: ["==", "=", "!="], correctAnswer: 1, tellwhatright: "= – = weist zu. == prüft auf Gleichheit, != prüft auf Ungleichheit." },
            { taskType: "code", question: "Multipliziere 4 mit 6 und gib das Ergebnis aus.", correctAnswer: "console.log(4 * 6);", tellwhatright: "console.log(4 * 6); – Der *-Operator multipliziert. 4 * 6 = 24 wird mit console.log() ausgegeben." }
        ]
    },
    {
        id: "js_5",
        title: "Funktionen",
        theory: "Funktionen sind wiederverwendbare Code-Blöcke. Du definierst sie mit 'function' oder als Pfeilfunktion.",
        xpReward: 30,
        tasks: [
            { taskType: "code", question: "Deklariere eine Funktion namens 'sagHallo', die 'Hallo' in der Konsole ausgibt.", correctAnswer: "function sagHallo() { console.log('Hallo'); }", tellwhatright: "function sagHallo() { console.log('Hallo'); } – function + Name + () + { Code-Block }. Die Funktion gibt 'Hallo' aus." },
            { taskType: "mc", question: "Wie rufst du eine Funktion namens 'machWas' auf?", options: ["machWas[]", "machWas()", "run machWas"], correctAnswer: 1, tellwhatright: "machWas() – Funktionen werden mit Name + () aufgerufen. Geschweifte Klammern sind nur für die Definition." },
            { taskType: "code", question: "Erstelle eine Pfeilfunktion 'quadrat', die eine Zahl quadriert und zurückgibt.", correctAnswer: "const quadrat = (x) => x * x;", tellwhatright: "const quadrat = (x) => x * x; – Pfeilfunktionen nutzen =>. (x) ist der Parameter, x * x ist der Rückgabewert." },
            { taskType: "mc", question: "Was bedeutet 'return' in einer Funktion?", options: ["Funktion beenden", "Wert zurückgeben", "Fehler anzeigen"], correctAnswer: 1, tellwhatright: "Wert zurückgeben – return gibt einen Wert zurück und beendet die Funktion. Ohne return gibt sie undefined zurück." },
            { taskType: "code", question: "Definiere eine Funktion mit einem Parameter 'name', die 'Hallo, ' + name ausgibt.", correctAnswer: "function greet(name) { console.log('Hallo, ' + name); }", tellwhatright: "function greet(name) { console.log('Hallo, ' + name); } – Der Parameter 'name' wird in den Klammern definiert und mit + an den String gehängt." }
        ]
    }
];
