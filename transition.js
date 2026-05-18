// ============================================
// 页面平滑过渡脚本
// 功能：拦截站内链接点击，实现淡出跳转效果
// 用法：在每页 </body> 前导入 <script src="transition.js"></script>
// ============================================

(function() {
    const EXIT_DURATION = 300; // 淡出动画时长（毫秒），与 CSS 过渡时间匹配

    // 判断链接是否为站内链接
    function isInternalLink(link) {
        const url = link.getAttribute('href');
        if (!url) return false;
        // 忽略锚点、javascript、邮件、电话等特殊链接
        if (url.startsWith('#') ||
            url.startsWith('javascript:') ||
            url.startsWith('mailto:') ||
            url.startsWith('tel:')) {
            return false;
        }
        try {
            // 绝对路径：检查同源
            const targetUrl = new URL(url, window.location.href);
            return targetUrl.origin === window.location.origin;
        } catch (e) {
            // 相对路径一律视为站内
            return !url.startsWith('http://') && !url.startsWith('https://');
        }
    }

    // 获取所有链接，添加拦截事件
    const allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(link => {
        if (isInternalLink(link)) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetHref = this.getAttribute('href');
                if (!targetHref) return;

                // 开始淡出效果
                document.body.style.transition = `opacity ${EXIT_DURATION}ms ease`;
                document.body.style.opacity = '0';

                // 延迟跳转
                setTimeout(() => {
                    window.location.href = targetHref;
                }, EXIT_DURATION);
            });
        }
    });

    // 确保页面加载时透明度为 1（避免刷新后遗留透明状态）
    document.body.style.opacity = '1';
    document.body.style.transition = `opacity ${EXIT_DURATION}ms ease`;
})();