function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function() {
    const snowLayer = document.getElementById('snow-layer');
    if (!snowLayer) return;
    
    const style = document.createElement('style');
    style.textContent = `
        #snow-layer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        }
        .snowflake {
            position: absolute;
            background: white;
            border-radius: 50%;
            filter: drop-shadow(0 0 5px rgba(255,255,255,0.8));
        }
        @keyframes snowFall {
            0% {
                transform: translateY(-20px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    let snowActive = getCookie('snowActive');
    if (snowActive === null) {
        snowActive = true;
    } else {
        snowActive = snowActive === 'true';
    }
    
    if (!snowActive) {
        snowLayer.style.display = 'none';
    }
    
    function makeSnow() {
        if (!snowActive) return;
        
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        
        const size = Math.random() * 8 + 2;
        flake.style.width = size + 'px';
        flake.style.height = size + 'px';

        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.opacity = 0.3 + Math.random() * 0.7;

        const duration = Math.random() * 5 + 5;
        flake.style.animation = `snowFall ${duration}s linear infinite`;
        
        snowLayer.appendChild(flake);
        
        setTimeout(() => flake.remove(), duration * 1000);
    }
    
    setInterval(makeSnow, 100);
    
    const btn = document.getElementById('toggle-snow');
    if (btn) {
        btn.textContent = snowActive ? '❄️ Выключить снег' : '✨ Включить снег';
        
        btn.addEventListener('click', function() {
            snowActive = !snowActive;
            
            setCookie('snowActive', snowActive, 30);
            
            snowLayer.style.display = snowActive ? 'block' : 'none';
            
            btn.textContent = snowActive ? '❄️ Выключить снег' : '✨ Включить снег';
            
            if (!snowActive) {
                snowLayer.innerHTML = '';
            }
        });
    }
});

if (document.querySelector('.max')) {
     document.querySelector('.max').addEventListener('click', function(){
        alert('Что-ж, Жди бан в течении 48 часов!');
    });
}

if (document.querySelector('.submit01')) {
     document.querySelector('.submit01').addEventListener('click', function(){
        alert('Ваш вопрос был отправлен, но был переадресован в папку СПАМ');
    });
}


