const text = "Check out some of my projects I release...";
const typingText = document.getElementById("typing-text");
const cursor = document.querySelector(".cursor");

let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // Adjust speed here
    }
    else {
        setTimeout(() => {
            cursor.style.display = "none";
        }, 2000);
    }
}

window.onload = typeWriter;