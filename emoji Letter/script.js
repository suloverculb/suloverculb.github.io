(function() {
    // 垂直排列字母的表情符號筆畫模板 (A-Z)，寬度為3-4個表情符號
    const letterTemplates = {
        A: [
            [0,1,0],
            [1,0,1],
            [1,1,1],
            [1,0,1],
            [1,0,1]
        ],
        B: [
            [1,1,0],
            [1,0,1],
            [1,1,0],
            [1,0,1],
            [1,1,0]
        ],
        C: [
            [0,1,1],
            [1,0,0],
            [1,0,0],
            [1,0,0],
            [0,1,1]
        ],
        D: [
            [1,1,0],
            [1,0,1],
            [1,0,1],
            [1,0,1],
            [1,1,0]
        ],
        E: [
            [1,1,1],
            [1,0,0],
            [1,1,0],
            [1,0,0],
            [1,1,1]
        ],
        F: [
            [1,1,1],
            [1,0,0],
            [1,1,0],
            [1,0,0],
            [1,0,0]
        ],
        G: [
            [0,1,1],
            [1,0,0],
            [1,0,1],
            [1,0,1],
            [0,1,1]
        ],
        H: [
            [1,0,1],
            [1,0,1],
            [1,1,1],
            [1,0,1],
            [1,0,1]
        ],
        I: [
            [1,1,1],
            [0,1,0],
            [0,1,0],
            [0,1,0],
            [1,1,1]
        ],
        J: [
            [0,0,1],
            [0,0,1],
            [0,0,1],
            [1,0,1],
            [0,1,0]
        ],
        K: [
            [1,0,1],
            [1,0,1],
            [1,1,0],
            [1,0,1],
            [1,0,1]
        ],
        L: [
            [1,0,0],
            [1,0,0],
            [1,0,0],
            [1,0,0],
            [1,1,1]
        ],
        M: [
            [1,0,0,1],
            [1,1,1,1],
            [1,0,0,1],
            [1,0,0,1],
            [1,0,0,1]
        ],
        N: [
            [1,0,0,1],
            [1,1,0,1],
            [1,0,1,1],
            [1,0,0,1],
            [1,0,0,1]
        ],
        O: [
            [0,1,0],
            [1,0,1],
            [1,0,1],
            [1,0,1],
            [0,1,0]
        ],
        P: [
            [1,1,0],
            [1,0,1],
            [1,1,0],
            [1,0,0],
            [1,0,0]
        ],
        Q: [
            [0,1,0],
            [1,0,1],
            [1,0,1],
            [1,0,1],
            [0,1,1]
        ],
        R: [
            [1,1,0],
            [1,0,1],
            [1,1,0],
            [1,0,1],
            [1,0,1]
        ],
        S: [
            [0,1,1],
            [1,0,0],
            [0,1,0],
            [0,0,1],
            [1,1,0]
        ],
        T: [
            [1,1,1],
            [0,1,0],
            [0,1,0],
            [0,1,0],
            [0,1,0]
        ],
        U: [
            [1,0,1],
            [1,0,1],
            [1,0,1],
            [1,0,1],
            [0,1,0]
        ],
        V: [
            [1,0,1],
            [1,0,1],
            [1,0,1],
            [0,1,0],
            [0,1,0]
        ],
        W: [
            [1,0,0,1],
            [1,0,0,1],
            [1,0,0,1],
            [1,1,1,1],
            [0,1,1,0]
        ],
        X: [
            [1,0,1],
            [1,0,1],
            [0,1,0],
            [1,0,1],
            [1,0,1]
        ],
        Y: [
            [1,0,1],
            [1,0,1],
            [0,1,0],
            [0,1,0],
            [0,1,0]
        ],
        Z: [
            [1,1,1],
            [0,0,1],
            [0,1,0],
            [1,0,0],
            [1,1,1]
        ],
        ' ': [
            [0],
            [0],
            [0],
            [0],
            [0]
        ]
    };

    document.getElementById('emojiForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const emoji = document.getElementById('emoji').value.trim();
        const letters = document.getElementById('letters').value.trim().toUpperCase();
        
        if (!emoji || !letters) {
            return;
        }
        
        let result = '';

        // 垂直排列字母
        for (let i = 0; i < letters.length; i++) {
            const char = letters[i];
            const template = letterTemplates[char] || letterTemplates[' '];
            
            // 依行繪製當前字母
            for (let row = 0; row < template.length; row++) {
                let line = '';
                for (let col = 0; col < template[row].length; col++) {
                    line += template[row][col] ? emoji : '　';
                }
                result += line + '\n';
            }
            
            // 字母間添加空行
            if (i < letters.length - 1) {
                result += '\n';
            }
        }

        const outputElement = document.getElementById('output');
        outputElement.textContent = result;
        
        // 顯示複製按鈕
        const copyButton = document.getElementById('copyButton');
        copyButton.style.display = 'block';
    });

    // 複製到剪貼簿功能
    document.getElementById('copyButton').addEventListener('click', function() {
        const outputText = document.getElementById('output').textContent;
        
        navigator.clipboard.writeText(outputText)
            .then(() => {
                // 成功時顯示複製成功視覺提示
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>已複製！</span>
                `;
                this.classList.remove('bg-primary-100', 'hover:bg-primary-200', 'text-primary-700');
                this.classList.add('bg-green-100', 'hover:bg-green-200', 'text-green-700');
                
                // 2秒後復原按鈕狀態
                setTimeout(() => {
                    this.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>複製到剪貼簿</span>
                    `;
                    this.classList.remove('bg-green-100', 'hover:bg-green-200', 'text-green-700');
                    this.classList.add('bg-primary-100', 'hover:bg-primary-200', 'text-primary-700');
                }, 2000);
            })
            .catch(err => {
                console.error('複製失敗：', err);
                alert('複製失敗，請手動複製。');
            });
    });
})();