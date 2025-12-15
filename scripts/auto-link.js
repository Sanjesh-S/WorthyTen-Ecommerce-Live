const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');
require('firebase/compat/storage');
global.XMLHttpRequest = require('xhr2');
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
    console.log("\n📸 Auto Image Linker (Local CLI - Probe Mode)\n");

    // Auth
    const email = await ask("Enter Admin Email: ");
    const password = await ask("Enter Admin Password: ");

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("\n✅ Logged in successfully!");
    } catch (e) {
        console.error("\n❌ Login failed:", e.message);
        process.exit(1);
    }

    // Load Products
    console.log("\n📦 Loading DSLR Products...");
    const snap = await db.collection('products')
        .where('category', '==', 'DSLR/Lens')
        .get();

    const products = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log(`Found ${products.length} products.`);

    const forceOverwrite = await ask("\nForce overwrite existing images? (y/n): ");
    const force = forceOverwrite.toLowerCase().startsWith('y');

    // Probing
    console.log("\n🔍 Probing for images (Checking specific filenames)...");

    let matches = [];
    let processed = 0;
    const extensions = ['.jpg', '.png', '.jpeg', '.webp'];

    for (const p of products) {
        processed++;
        if (processed % 10 === 0) process.stdout.write(`\rChecked ${processed}/${products.length}...`);

        // Skip if exists and not forcing
        if (p.image && p.image.startsWith('http') && !force) continue;

        const folder = `${p.brand} Images`;

        for (const ext of extensions) {
            const filename = `${p.name}${ext}`;
            try {
                // In Node, we can getDownloadURL without CORS issues usually
                const url = await storage.ref(`${folder}/${filename}`).getDownloadURL();

                // If we get here, it exists!
                matches.push({ id: p.id, name: p.name, image: url });
                console.log(`\n   ✅ FOUND: ${filename}`);
                break; // Stop checking extensions
            } catch (e) {
                // Not found, ignore
            }
        }
    }
    console.log(`\nChecked ${processed}/${products.length}. Done.`);

    if (matches.length === 0) {
        console.log("\nNo new matches found.");
        process.exit(0);
    }

    // Save
    const confirm = await ask(`\n💾 Found ${matches.length} matches. Write to Firestore? (y/n): `);
    if (confirm.toLowerCase().startsWith('y')) {
        console.log("\nSaving...");
        let saved = 0;
        const batchSize = 400;
        for (let i = 0; i < matches.length; i += batchSize) {
            const chunk = matches.slice(i, i + batchSize);
            const batch = db.batch();
            chunk.forEach(m => {
                const ref = db.collection('products').doc(m.id);
                batch.update(ref, { image: m.image });
            });
            await batch.commit();
            saved += chunk.length;
            console.log(`   Saved batch ${Math.ceil((i + 1) / batchSize)}...`);
        }
        console.log(`\n🎉 Successfully saved ${saved} products!`);
    } else {
        console.log("\nCancelled.");
    }

    process.exit(0);
}

main();
