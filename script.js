document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            processFile(contents);
        };
        reader.readAsText(file);
    }
});

document.getElementById('analyzeButton').addEventListener('click', function() {
    const manualInput = document.getElementById('manualInput').value;
    processFile(manualInput);
});

function processFile(contents) {
    const output = document.getElementById('output');
    const numbers = contents.split(',').map(num => num.trim()).map(Number);

    if (numbers.some(isNaN)) {
        output.innerHTML = '<p>Datoteka vsebuje neveljavne podatke. Prosimo, da naložite pravilno datoteko.</p>';
        return;
    }

    const max = Math.max(...numbers);
    const min = Math.min(...numbers);
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const avg = sum / numbers.length;
    const sortedNumbers = numbers.slice().sort((a, b) => a - b);
    const median = sortedNumbers.length % 2 === 0 ?
        (sortedNumbers[sortedNumbers.length / 2 - 1] + sortedNumbers[sortedNumbers.length / 2]) / 2 :
        sortedNumbers[Math.floor(sortedNumbers.length / 2)];

    output.innerHTML = `
        <p>Največje število: ${max}</p>
        <p>Najmanjše število: ${min}</p>
        <p>Povprečje: ${avg.toFixed(2)}</p>
        <p>Mediana: ${median}</p>
        <p>Vsota: ${sum}</p>
    `;
}
