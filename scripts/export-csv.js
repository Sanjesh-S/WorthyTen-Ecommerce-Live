const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');
require('firebase/compat/storage');
global.XMLHttpRequest = require('xhr2');
const fs = require('fs');
const readline = require('readline');

const firebaseConfig = {
    apiKey: "AIzaSyC4SqbxwKCJmUBNKt85UwEJgNnep9t7qOY",
    authDomain: "worthyten-otp-a925d.firebaseapp.com",
    projectId: "worthyten-otp-a925d",
    storageBucket: "worthyten-otp-a925d.appspot.com",
    messagingSenderId: "1067702314639",
    appId: "1:1067702314639:web:0bb2a39181720c306572fa"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const ask = (q) => new Promise(r => rl.question(q, r));

async function main() {
    console.log("\n📊 Export Nikon Images to CSV (Local)\n");

    const email = await ask("Enter Admin Email: ");
    const password = await ask("Enter Admin Password: ");

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("✅ Logged in!");
    } catch (e) {
        console.error("❌ Login failed:", e.message);
        process.exit(1);
    }

    const folderName = 'Nikon Images';
    let records = [];

    // Strategy 1: List All (Preferred)
    console.log(`\nAttempting to list all files in '${folderName}'...`);
    try {
        const res = await storage.ref(folderName).listAll();
        console.log(`✅ Success! Found ${res.items.length} files. Fetching URLs...`);

        for (const item of res.items) {
            try {
                const url = await item.getDownloadURL();
                records.push({ name: item.name, url: url });
                process.stdout.write('.');
            } catch (e) { }
        }

    } catch (e) {
        console.log(`⚠️ Listing failed (${e.code}). Switching to PROBE strategy...`);
        console.log("   (We will search for images matching your Products instead)");

        // Strategy 2: Probe based on Products
        console.log("📦 Loading Nikon products from Firestore...");
        const snap = await db.collection('products')
            .where('brand', '==', 'Nikon')
            .get();

        const products = snap.docs.map(d => d.data());
        console.log(`Found ${products.length} Nikon products. Checking for images...`);

        const extensions = ['.jpg', '.png', '.jpeg', '.webp'];
        let checked = 0;

        for (const p of products) {
            checked++;
            if (checked % 10 === 0) process.stdout.write(`\rChecking ${checked}/${products.length}...`);

            for (const ext of extensions) {
                const filename = `${p.name}${ext}`;
                const path = `${folderName}/${filename}`;
                try {
                    const url = await storage.ref(path).getDownloadURL();
                    records.push({ name: filename, url: url });
                    break; // Found one
                } catch (e) { }
            }
        }
    }

    console.log(`\n\n✅ Collected ${records.length} image URLs.`);

    // Write CSV
    const csvContent = "Filename,URL\n" + records.map(r => `"${r.name}","${r.url}"`).join("\n");
    const outputPath = 'nikon_images.csv';
    fs.writeFileSync(outputPath, csvContent);

    console.log(`\n📄 CSV saved to: ${process.cwd()}\\${outputPath}`);
    process.exit(0);
}

main();
