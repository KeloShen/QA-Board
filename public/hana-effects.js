// 🌸 HANA 花朵特效脚本

// 创建随机花朵飘落效果
function createFloatingFlowers() {
    const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🍀'];
    const container = document.querySelector('.flower-container');
    
    if (!container) return;
    
    setInterval(() => {
        // 随机选择花朵
        const flower = flowers[Math.floor(Math.random() * flowers.length)];
        const flowerElement = document.createElement('div');
        flowerElement.className = 'flower';
        flowerElement.textContent = flower;
        
        // 随机位置和动画时间
        flowerElement.style.left = Math.random() * 100 + '%';
        flowerElement.style.animationDuration = (Math.random() * 5 + 8) + 's';
        flowerElement.style.animationDelay = Math.random() * 2 + 's';
        flowerElement.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        container.appendChild(flowerElement);
        
        // 动画结束后移除元素
        setTimeout(() => {
            if (flowerElement.parentNode) {
                flowerElement.parentNode.removeChild(flowerElement);
            }
        }, 15000);
    }, 3000); // 每3秒创建一个新花朵
}

// 点击按钮时的花朵爆炸效果
function createFlowerExplosion(element) {
    const flowers = ['🌸', '🌺', '🌻', '🌷', '💖', '✨'];
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const flower = document.createElement('div');
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.position = 'fixed';
        flower.style.left = centerX + 'px';
        flower.style.top = centerY + 'px';
        flower.style.fontSize = '20px';
        flower.style.pointerEvents = 'none';
        flower.style.zIndex = '9999';
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        flower.animate([
            { 
                transform: 'translate(0, 0) scale(0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1) rotate(360deg)`, 
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            document.body.removeChild(flower);
        };
        
        document.body.appendChild(flower);
    }
}

// 鼠标跟随花朵效果
function createMouseTrail() {
    let mouseX = 0, mouseY = 0;
    const flowers = ['🌸', '🌺', '✨'];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 随机创建花朵跟随
        if (Math.random() < 0.1) {
            const flower = document.createElement('div');
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.position = 'fixed';
            flower.style.left = mouseX + (Math.random() - 0.5) * 50 + 'px';
            flower.style.top = mouseY + (Math.random() - 0.5) * 50 + 'px';
            flower.style.fontSize = '12px';
            flower.style.pointerEvents = 'none';
            flower.style.zIndex = '1';
            flower.style.opacity = '0.6';
            
            flower.animate([
                { transform: 'scale(0) rotate(0deg)', opacity: 0.6 },
                { transform: 'scale(1) rotate(180deg)', opacity: 0 }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).onfinish = () => {
                if (flower.parentNode) {
                    document.body.removeChild(flower);
                }
            };
            
            document.body.appendChild(flower);
        }
    });
}

// 为按钮添加花朵点击效果
function addFlowerClickEffects() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('hana-btn') || 
            e.target.classList.contains('hana-vote-btn')) {
            createFlowerExplosion(e.target);
        }
    });
}

// 创建背景浮动花朵
function createBackgroundFloatingFlowers() {
    const container = document.body;
    const flowers = ['🌸', '🌺', '🌻', '🌷', '🌿'];
    
    for (let i = 0; i < 5; i++) {
        const flower = document.createElement('div');
        flower.className = 'floating-flower';
        flower.textContent = flowers[i % flowers.length];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = Math.random() * 100 + '%';
        flower.style.animationDelay = Math.random() * 6 + 's';
        flower.style.position = 'fixed';
        flower.style.pointerEvents = 'none';
        flower.style.zIndex = '1';
        
        container.appendChild(flower);
    }
}

// 页面加载完成后初始化所有效果
document.addEventListener('DOMContentLoaded', () => {
    // 延迟启动效果，避免影响页面加载
    setTimeout(() => {
        createFloatingFlowers();
        addFlowerClickEffects();
        createBackgroundFloatingFlowers();
        
        // 在移动设备上禁用鼠标跟随效果
        if (!window.matchMedia('(max-width: 768px)').matches) {
            createMouseTrail();
        }
    }, 1000);
});

// 为新问题添加特殊动画
function celebrateNewQuestion() {
    const flowers = ['🌸', '🌺', '🌻', '🌷', '💖', '✨', '🌟'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.position = 'fixed';
            flower.style.left = Math.random() * window.innerWidth + 'px';
            flower.style.top = '-20px';
            flower.style.fontSize = (Math.random() * 15 + 15) + 'px';
            flower.style.pointerEvents = 'none';
            flower.style.zIndex = '9999';
            
            flower.animate([
                { 
                    transform: 'translateY(0) rotate(0deg)', 
                    opacity: 1 
                },
                { 
                    transform: `translateY(${window.innerHeight + 50}px) rotate(720deg)`, 
                    opacity: 0 
                }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'ease-in'
            }).onfinish = () => {
                if (flower.parentNode) {
                    document.body.removeChild(flower);
                }
            };
            
            document.body.appendChild(flower);
        }, i * 100);
    }
}

// 导出函数供其他脚本使用
window.HanaEffects = {
    createFlowerExplosion,
    celebrateNewQuestion
};