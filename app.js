function convertToZimbraCAScript() {
    const domain = document.getElementById('domain').value;
    const password = document.getElementById('password').value;
    const fileInput = document.getElementById('csv-file');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const csv = event.target.result;
        const rows = csv.split('\n').slice(1); // skip header
        let output = '';

        rows.forEach(row => {
            const [user, email, name] = row.split(',');

            if (user && email && name) {
                const trimmedName = name.trim(); // Trim leading and trailing whitespace
                output += `createAccount ${user}@${domain} ${password} displayName '${trimmedName}' givenName '${trimmedName}' zimbraPasswordMustChange TRUE \n`;
            }
        });

        document.getElementById('output').innerText = output;

        // Create a Blob containing the output text
        const blob = new Blob([output], { type: 'text/plain' });

        // Create a download link for the Blob
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = file.name.replace('.csv', '.txt'); // Change the extension to .txt
        downloadLink.click();
    };

    reader.readAsText(file);
}
