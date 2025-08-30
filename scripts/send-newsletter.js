/**
 * Newsletter sending script for Axar Robotics
 * Usage: node scripts/send-newsletter.js
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function sendNewsletter() {
  try {
    console.log('🤖 Axar Robotics Newsletter Sender\n');

    // Get newsletter details
    const subject = await askQuestion('Enter newsletter subject: ');
    const content = await askQuestion('Enter newsletter content: ');

    // Confirm before sending
    const confirm = await askQuestion(`\nSend newsletter to all subscribers?\nSubject: ${subject}\nContent: ${content}\n\nConfirm (y/N): `);
    
    if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
      console.log('Newsletter sending cancelled.');
      rl.close();
      return;
    }

    // Send the newsletter
    const response = await fetch('http://localhost:3001/api/newsletter/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject, content }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ ${result.message}`);
    } else {
      console.error(`❌ Error: ${result.error}`);
    }

  } catch (error) {
    console.error('❌ Failed to send newsletter:', error.message);
  } finally {
    rl.close();
  }
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Run the script
sendNewsletter();
