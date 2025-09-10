// 🌸 HANA - Minimal Effects

// 创建精简的花朵飘落效果
function createMinimalFlowers() {
    const container = document.querySelector('.flower-container');
    if (!container) return;
    
    // 只在桌面端运行，移动端性能优化
    if (window.matchMedia('(max-width: 768px)').matches) return;
    
    setInterval(() => {
        const flowerElement = document.createElement('div');
        flowerElement.className = 'flower';
        flowerElement.textContent = '🌸';
        
        // 随机位置
        flowerElement.style.left = Math.random() * 100 + '%';
        flowerElement.style.animationDuration = (Math.random() * 5 + 15) + 's';
        flowerElement.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(flowerElement);
        
        // 动画结束后移除
        setTimeout(() => {
            if (flowerElement.parentNode) {
                flowerElement.parentNode.removeChild(flowerElement);
            }
        }, 20000);
    }, 8000); // 每8秒一个花朵
}

// 简单的点击反馈效果
function addClickFeedback() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('hana-btn') || 
            e.target.classList.contains('hana-vote-btn')) {
            
            // 简单的缩放反馈
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    });
}

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createMinimalFlowers();
        addClickFeedback();
    }, 1000);
});

// 导出空函数以保持兼容性
window.HanaEffects = {
    createFlowerExplosion: () => {},
    celebrateNewQuestion: () => {}
};