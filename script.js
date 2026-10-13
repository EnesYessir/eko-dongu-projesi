let userScore = 0;

// Puanı ekranda güncelleme fonksiyonu
function updateScoreDisplay() {
    document.getElementById("user-score").innerText = userScore;
}

// Renkli kutulara tıklandığında açılacak rehber içerikleri
const stationData = {
    'Plastik & Ambalaj': {
        info: "🟡 Sarı Kutu: Plastik ve ambalaj atıklarının toplandığı alandır. Bu kutuya sadece temiz ambalajlar atılmalıdır.",
        items: ["Pet şişeler ve kapakları", "Plastik su/süt kutuları", "Naylon poşetler ve ambalajlar"],
        questionText: "İçinde yemek kalıntısı veya yağ olan plastik tabaklar bu kutuya atılabilir mi?",
        correctAnswer: false
    },
    'Organik Atık & Kompost': {
        info: "🟫 Kahverengi Kutu: Kantin ve yemekhaneden çıkan gıda atıkları için ayrılmıştır. Okul bahçesinde komposta dönüştürülür.",
        items: ["Çay posası ve kahve telvesi", "Meyve ve sebze kabukları", "Yemek artıkları (sebze bazlı)"],
        questionText: "Çay posası ve meyve kabukları kompost laboratuvarı için uygun bir organik atık mıdır?",
        correctAnswer: true
    },
    'Kağıt ve Karton': {
        info: "🔵 Mavi Kutu: Kağıt, karton ve dergilerin toplandığı bölmedir. Kirlenmemiş olmaları geri dönüşüm için çok önemlidir.",
        items: ["Karton koliler ve kutular", "Temiz ders defterleri ve kitaplar", "Dergiler ve gazeteler"],
        questionText: "Islanmış veya yağ bulaşmış kağıtlar bu kutuya atılabilir mi?",
        correctAnswer: false
    },
    'Cam Atık': {
        info: "🟢 Yeşil Kutu: Kırılmamış cam şişe ve kavanozların güvenle toplandığı bölmedir.",
        items: ["Cam meyve suyu şişeleri", "Cam reçel ve sos kavanozları"],
        questionText: "Cam kavanozları kutuya atmadan önce hafifçe durulamak doğru bir uygulama mıdır?",
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
            <p><strong>Bu Kutuya Atılabilecekler:</strong></p>
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