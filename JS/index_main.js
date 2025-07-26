document.addEventListener('DOMContentLoaded', function () {
    // Select the two span parts inside H1 and the H2 subtitle
    const part1El = document.querySelector('#type-effect .part1');
    const part2El = document.querySelector('#type-effect .part2');
    const subtitleEl = document.getElementById('typing-subtitle');

    // Store the text content of each element (cleaned of spaces)
    const part1Text = part1El.textContent.trim();
    const part2Text = part2El.textContent.trim();
    const subtitleText = subtitleEl.textContent.trim();

    // A pool of random characters to simulate the typing effect
    const allChars = "@#$%&*+=-|~^?!(){}[]<>:;";

    // Main function to run the full typing animation
    function runTypingEffect() {
        // Clear the content of all target elements
        part1El.textContent = "";
        part2El.textContent = "";
        subtitleEl.textContent = "";

        let h1Index = 0; // To track the position while typing H1
        let result1 = "", result2 = ""; // Store built characters for each part
        const fullText = part1Text + part2Text; // Full H1 text

        // Type H1 letters one by one using a random char animation
        function typeH1(callback) {
            if (h1Index < fullText.length) {
                // Pick a random character to animate
                const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
                const current = fullText[h1Index];

                // Determine whether we are still typing part1 or already in part2
                if (h1Index < part1Text.length) {
                    part1El.innerHTML = result1 + `<span style="opacity:0.4;">${randomChar}</span>`;
                    part2El.textContent = result2;
                } else {
                    part1El.textContent = result1;
                    part2El.innerHTML = result2 + `<span style="opacity:0.4;">${randomChar}</span>`;
                }

                // Delay then commit the real character and continue
                setTimeout(() => {
                    if (h1Index < part1Text.length) {
                        result1 += current;
                    } else {
                        result2 += current;
                    }
                    h1Index++;
                    typeH1(callback); // Continue typing
                }, 80 + Math.random() * 100); // Variable speed for effect
            } else {
                // Once finished typing H1, set final text and run H2
                part1El.textContent = part1Text;
                part2El.textContent = part2Text;
                callback(); // Move to subtitle (H2)
            }
        }

        // Type subtitle (H2) character by character
        function typeH2(callback) {
            let h2Index = 0;
            let finalText = ""; // Final output string

            // Recursive function to animate each character
            function typeChar() {
                if (h2Index < subtitleText.length) {
                    const realChar = subtitleText[h2Index];
                    const randomChar = allChars[Math.floor(Math.random() * allChars.length)];

                    // Show current text + flashing random character
                    subtitleEl.innerHTML = finalText + `<span style="opacity:0.4;">${randomChar}</span>`;

                    // After short delay, add real character and continue
                    setTimeout(() => {
                        finalText += realChar;
                        h2Index++;
                        typeChar();
                    }, 60 + Math.random() * 80); // Typing speed
                } else {
                    // Once done, set full text and run optional callback
                    subtitleEl.textContent = subtitleText;
                    if (callback) callback();
                }
            }

            subtitleEl.textContent = ""; // Clear before start
            typeChar(); // Start typing
        }

        // Run full sequence: H1 → H2 → wait → repeat
        typeH1(() => {
            typeH2(() => {
                // After short pause, restart animation
                setTimeout(runTypingEffect, 4000);
            });
        });
    }

    // Start animation once page fully loads
    window.addEventListener('load', runTypingEffect);
});
