let userScore = 0;

// Puanı ekranda güncelleme fonksiyonu
function updateScoreDisplay() {
    document.getElementById("user-score").innerText = userScore;
}

// İstasyonlara (QR Kodlara) tıklandığında açılacak içerikler
const stationData = {
    'Plastik & Ambalaj': {
        info: "Bu kutuya sadece temiz plastik şişeler, naylon ambalajlar ve kutu içecekler atılmalıdır.",
        items: ["Pet şişeler", "Şampuan kutuları", "Naylon poşetler"],
        questionText: "Yağlı plastik ambalajlar bu kutuya atılır mı?",
        correctAnswer: false
    },
    'Organik Atık & Kompost': {
        info: "Bu kutu okul kantini ve öğretmenler odasından çıkan gıda atıkları için tasarlanmıştır. Okul bahçesinde komposta dönüştürülür.",
        items: ["Çay posası", "Meyve kabukları", "Sebze artıkları"],
        questionText: "Çay posası ve sebze kabukları kompost için uygun bir organik atık mıdır?",
        correctAnswer: true
    },
    'Kağıt ve Karton': {
        info: "Defter, kitap ve karton kutuların atıldığı bölmedir. Islanmamış olmasına dikkat edilmelidir.",
        items: ["Karton koliler", "Temiz kağıtlar", "Dergiler"],
        questionText: "Islanmış ve gıda bulaşmış kağıtlar bu kutuya atılabilir mi?",
        correctAnswer: false
    },
    'Cam Atık': {
        info: "Kırılmamış cam şişe ve kavanozların toplandığı güvenli bölmedir.",
        items: ["Cam şişeler", "Cam kavanozlar"],
        questionText: "Cam kavanozları kutuya atmadan önce hafifçe durulamak gerekir mi?",
        correctAnswer: true
    }
};

function openStation(stationName, key) {
    const modal = document.getElementById("station-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    modalTitle.innerText = "QR Kod Rehberi: " + stationName;
    
    const data = stationData[stationName];

    let itemsHtml = "<ul>";
    data.items.forEach(item => {
        itemsHtml += `<li>${item}</li>`;
    });
    itemsHtml += "</ul>";

    modalBody.innerHTML = `
        <div class="modal-body-content">
            <p><strong>Bilgilendirme:</strong> ${data.info}</p>
            <p><strong>Atılabilecekler:</strong></p>
            ${itemsHtml}
            
            <div class="quiz-box">
                <p><strong>🎯 Mini Görev Sorusu:</strong> ${data.questionText}</p>
                <button onclick="answerQuiz('${key}', true)">Evet</button>
                <button onclick="answerQuiz('${key}', false)">Hayır</button>
            </div>
        </div>
    `;

    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("station-modal").style.display = "none";
}

// Mini görev sorusunu yanıtlama ve puan verme
function answerQuiz(key, userChoice) {
    let isCorrect = false;

    if (key === 'plastik' && userChoice === false) isCorrect = true;
    if (key === 'organik' && userChoice === true) isCorrect = true;
    if (key === 'kagit' && userChoice === false) isCorrect = true;
    if (key === 'cam' && userChoice === true) isCorrect = true;

    if (isCorrect) {
        userScore += 10;
        updateScoreDisplay();
        alert("Tebrikler! Doğru yanıtladınız ve +10 Eko-Puan kazandınız! 🌱");
    } else {
        alert("Yanlış yanıt. Lütfen kutu üzerindeki yönergeleri tekrar okuyun.");
    }
    closeModal();
}

// Kantin ödülü alma
function redeemReward(cost, rewardName) {
    if (userScore >= cost) {
        userScore -= cost;
        updateScoreDisplay();
        alert(`Harika! '${rewardName}' ödülünü başarıyla aldınız. Kantin görevlisine bu ekranı gösterebilirsiniz! 🎉`);
    } else {
        alert("Yetersiz Eko-Puan! Daha fazla atık ayrıştırma görevi tamamlayarak puan kazanmalısın.");
    }
}