document.addEventListener('DOMContentLoaded', function() {
    // 編輯狀態記錄變數
    let editingSectionId = null;

    // 獲取按鈕元素
    const refreshButton = document.querySelector('.refresh-button');
    const addButton = document.querySelector('.add-button');
    
    // 頁籤切換功能
    const tabs = document.querySelectorAll('.tab');
    const contentSections = document.querySelectorAll('.content-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有頁籤的活動狀態
            tabs.forEach(t => t.classList.remove('active'));
            
            // 移除所有內容區域的活動狀態
            contentSections.forEach(section => section.classList.remove('active'));
            
            // 為當前點擊的頁籤添加活動狀態
            tab.classList.add('active');
            
            // 顯示對應的內容區域
            const tabId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(`${tabId}-content`);
            targetContent.classList.add('active');

            // 切換頁籤時不再需要處理編輯狀態，因為所有內容區域會同步編輯
        });
    });

    // 任務勾選功能
    const checkboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const taskItem = checkbox.closest('.task-item');
            if (checkbox.checked) {
                taskItem.classList.add('completed');
                // 添加動畫效果
                taskItem.style.opacity = '0.7';
            } else {
                taskItem.classList.remove('completed');
                taskItem.style.opacity = '1';
            }
        });
    });

    // 編輯/關閉編輯按鈕效果（事件代理，解決重複點擊問題）
    document.addEventListener('click', function(e) {
        // 編輯按鈕
        const editBtn = e.target.closest('.edit-button');
        if (editBtn) {
            // 切換按鈕為關閉編輯
            editBtn.textContent = '';
            editBtn.innerHTML = '<i class="fas fa-times"></i>';
            editBtn.classList.add('close-edit-button');
            editBtn.classList.remove('edit-button');

            // 所有內容區域都進入編輯模式
            document.querySelectorAll('.content-section').forEach(section => {
                switch(section.id) {
                    case 'notes-content':
                        enableNotesEditing(section);
                        break;
                    case 'tasks-content':
                        enableTasksEditing(section);
                        break;
                    case 'ideas-content':
                        enableIdeasEditing(section);
                        break;
                }
            });
            // 記錄目前進入編輯模式
            editingSectionId = 'all';
            showNotification('進入編輯模式');
            return;
        }
        // 關閉編輯按鈕
        const closeBtn = e.target.closest('.close-edit-button');
        if (closeBtn) {
            // 關閉所有編輯模式
            disableEditing();
            // 清除編輯狀態記錄
            editingSectionId = null;
            // 切換回編輯按鈕
            closeBtn.textContent = '';
            closeBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            closeBtn.classList.add('edit-button');
            closeBtn.classList.remove('close-edit-button');
            showNotification('已關閉編輯模式');
            return;
        }
    });

    // 關閉所有編輯模式
    function disableEditing() {
        // 筆記
        document.querySelectorAll('.note-item.editing').forEach(item => {
            // 取消 contentEditable
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');
            if (h3) h3.contentEditable = false;
            if (p) p.contentEditable = false;
            // 移除控制按鈕
            const controls = item.querySelector('.note-edit-controls');
            if (controls) controls.remove();
            item.classList.remove('editing');
        });
        // 任務
        document.querySelectorAll('.task-item.editing').forEach(item => {
            const label = item.querySelector('label');
            const dateSpan = item.querySelector('.task-date');
            // 恢復顯示
            if (label) label.style.display = '';
            if (dateSpan) dateSpan.style.display = '';
            // 移除編輯元素
            const labelInput = item.querySelector('.edit-task-input');
            const dateInput = item.querySelector('.edit-date-input');
            if (labelInput) labelInput.remove();
            if (dateInput) dateInput.remove();
            const controls = item.querySelector('.task-edit-controls');
            if (controls) controls.remove();
            item.classList.remove('editing');
        });
        // 想法
        document.querySelectorAll('.idea-item.editing').forEach(item => {
            const p = item.querySelector('p');
            if (p) p.contentEditable = false;
            const tagInput = item.querySelector('.edit-tag-input');
            if (tagInput) tagInput.remove();
            const controls = item.querySelector('.idea-edit-controls');
            if (controls) controls.remove();
            const tagsContainer = item.querySelector('.idea-tags');
            if (tagsContainer) tagsContainer.style.display = '';
            item.classList.remove('editing');
        });
    }
    
    // 啟用筆記編輯模式
    function enableNotesEditing(section) {
        const noteItems = section.querySelectorAll('.note-item');
        
        noteItems.forEach(item => {
            // 為每個筆記項目添加編輯按鈕
            if (!item.querySelector('.note-edit-controls')) {
                // 添加編輯控制按鈕
                const editControls = document.createElement('div');
                editControls.className = 'note-edit-controls';
                editControls.innerHTML = `
                    <button class="save-note"><i class="fas fa-save"></i></button>
                    <button class="cancel-edit"><i class="fas fa-times"></i></button>
                `;
                item.appendChild(editControls);
                
                // 記住原始內容
                const title = item.querySelector('h3').textContent;
                const content = item.querySelector('p').textContent;
                
                // 將標題和內容變為可編輯
                item.querySelector('h3').contentEditable = true;
                item.querySelector('p').contentEditable = true;
                
                // 添加編輯中的視覺效果
                item.classList.add('editing');
                
                // 儲存按鈕的事件監聽器
                item.querySelector('.save-note').addEventListener('click', () => {
                    // 移除編輯模式
                    item.classList.remove('editing');
                    item.querySelector('h3').contentEditable = false;
                    item.querySelector('p').contentEditable = false;
                    
                    // 移除編輯控制按鈕
                    editControls.remove();
                    
                    // 顯示儲存成功通知
                    showNotification('筆記已儲存');
                });
                
                // 取消按鈕的事件監聽器
                item.querySelector('.cancel-edit').addEventListener('click', () => {
                    // 恢復原始內容
                    item.querySelector('h3').textContent = title;
                    item.querySelector('p').textContent = content;
                    
                    // 移除編輯模式
                    item.classList.remove('editing');
                    item.querySelector('h3').contentEditable = false;
                    item.querySelector('p').contentEditable = false;
                    
                    // 移除編輯控制按鈕
                    editControls.remove();
                    
                    showNotification('已取消編輯');
                });
            }
        });
    }
    
    // 啟用任務編輯模式
    function enableTasksEditing(section) {
        const taskItems = section.querySelectorAll('.task-item');
        
        taskItems.forEach(item => {
            // 為每個任務項目添加編輯功能
            if (!item.querySelector('.task-edit-controls')) {
                // 保存原始內容
                const originalLabel = item.querySelector('label').textContent;
                const originalDate = item.querySelector('.task-date').textContent;
                
                // 轉換成可編輯輸入框
                const label = item.querySelector('label');
                const labelId = label.getAttribute('for');
                const dateSpan = item.querySelector('.task-date');
                
                // 創建輸入欄位
                const labelInput = document.createElement('input');
                labelInput.type = 'text';
                labelInput.value = originalLabel;
                labelInput.className = 'edit-task-input';
                
                const dateInput = document.createElement('input');
                dateInput.type = 'date';
                dateInput.className = 'edit-date-input';
                
                // 將日期格式從 YYYY/MM/DD 轉為 YYYY-MM-DD (HTML日期輸入框格式)
                const dateParts = originalDate.split('/');
                if (dateParts.length === 3) {
                    dateInput.value = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
                }
                
                // 替換原始元素
                label.style.display = 'none';
                dateSpan.style.display = 'none';
                
                item.insertBefore(labelInput, dateSpan);
                item.appendChild(dateInput);
                
                // 添加編輯控制按鈕
                const editControls = document.createElement('div');
                editControls.className = 'task-edit-controls';
                editControls.innerHTML = `
                    <button class="save-task"><i class="fas fa-save"></i></button>
                    <button class="cancel-task-edit"><i class="fas fa-times"></i></button>
                `;
                item.appendChild(editControls);
                
                // 添加編輯中的視覺效果
                item.classList.add('editing');
                
                // 儲存按鈕的事件監聽器
                item.querySelector('.save-task').addEventListener('click', () => {
                    const newLabel = labelInput.value;
                    
                    // 將日期從 YYYY-MM-DD 轉回 YYYY/MM/DD
                    let newDate = dateInput.value;
                    if (newDate) {
                        newDate = newDate.replace(/-/g, '/');
                    } else {
                        newDate = originalDate; // 如果未輸入，保持原始值
                    }
                    
                    // 更新任務內容
                    label.textContent = newLabel;
                    dateSpan.textContent = newDate;
                    
                    // 恢復顯示
                    label.style.display = '';
                    dateSpan.style.display = '';
                    
                    // 移除編輯元素
                    labelInput.remove();
                    dateInput.remove();
                    editControls.remove();
                    
                    // 移除編輯模式
                    item.classList.remove('editing');
                    
                    showNotification('任務已更新');
                });
                
                // 取消按鈕的事件監聽器
                item.querySelector('.cancel-task-edit').addEventListener('click', () => {
                    // 恢復顯示
                    label.style.display = '';
                    dateSpan.style.display = '';
                    
                    // 移除編輯元素
                    labelInput.remove();
                    dateInput.remove();
                    editControls.remove();
                    
                    // 移除編輯模式
                    item.classList.remove('editing');
                    
                    showNotification('已取消編輯');
                });
            }
        });
    }
    
    // 啟用想法編輯模式
    function enableIdeasEditing(section) {
        const ideaItems = section.querySelectorAll('.idea-item');
        
        ideaItems.forEach(item => {
            // 為每個想法項目添加編輯功能
            if (!item.querySelector('.idea-edit-controls')) {
                // 保存原始內容
                const originalText = item.querySelector('p').textContent;
                const originalTags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent);
                
                // 轉換成可編輯元素
                item.querySelector('p').contentEditable = true;
                
                // 創建標籤編輯元素
                const tagsContainer = item.querySelector('.idea-tags');
                const originalTagsHTML = tagsContainer.innerHTML;
                
                // 創建標籤輸入欄位
                const tagInput = document.createElement('input');
                tagInput.type = 'text';
                tagInput.className = 'edit-tag-input';
                tagInput.value = originalTags.join(', ');
                tagInput.placeholder = '以逗號分隔多個標籤';
                
                // 隱藏原始標籤
                tagsContainer.style.display = 'none';
                
                // 添加標籤輸入欄位
                item.appendChild(tagInput);
                
                // 添加編輯控制按鈕
                const editControls = document.createElement('div');
                editControls.className = 'idea-edit-controls';
                editControls.innerHTML = `
                    <button class="save-idea"><i class="fas fa-save"></i></button>
                    <button class="cancel-idea-edit"><i class="fas fa-times"></i></button>
                `;
                item.appendChild(editControls);
                
                // 添加編輯中的視覺效果
                item.classList.add('editing');
                
                // 儲存按鈕的事件監聽器
                item.querySelector('.save-idea').addEventListener('click', () => {
                    const newText = item.querySelector('p').textContent;
                    const newTagsText = tagInput.value;
                    
                    // 清空原始標籤容器
                    tagsContainer.innerHTML = '';
                    
                    // 添加新標籤
                    const newTags = newTagsText.split(',').map(tag => tag.trim()).filter(tag => tag);
                    newTags.forEach(tag => {
                        const tagSpan = document.createElement('span');
                        tagSpan.className = 'tag';
                        tagSpan.textContent = tag;
                        tagsContainer.appendChild(tagSpan);
                    });
                    
                    // 恢復顯示
                    tagsContainer.style.display = '';
                    
                    // 停用編輯模式
                    item.querySelector('p').contentEditable = false;
                    
                    // 移除編輯元素
                    tagInput.remove();
                    editControls.remove();
                    
                    // 移除編輯模式
                    item.classList.remove('editing');
                    
                    showNotification('想法已更新');
                });
                
                // 取消按鈕的事件監聽器
                item.querySelector('.cancel-idea-edit').addEventListener('click', () => {
                    // 恢復原始內容
                    item.querySelector('p').textContent = originalText;
                    tagsContainer.innerHTML = originalTagsHTML;
                    
                    // 恢復顯示
                    tagsContainer.style.display = '';
                    
                    // 停用編輯模式
                    item.querySelector('p').contentEditable = false;
                    
                    // 移除編輯元素
                    tagInput.remove();
                    editControls.remove();
                    
                    // 移除編輯模式
                    item.classList.remove('editing');
                    
                    showNotification('已取消編輯');
                });
            }
        });
    }
    
    // 刷新按鈕效果
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            // 添加旋轉動畫
            refreshButton.querySelector('i').classList.add('fa-spin');
            
            // 2秒後停止旋轉動畫
            setTimeout(() => {
                refreshButton.querySelector('i').classList.remove('fa-spin');
                showNotification('內容已更新');
            }, 2000);
        });
    }
    
    // 添加按鈕效果
    if (addButton) {
        addButton.addEventListener('click', () => {
            // 獲取當前活動的內容區域
            const activeSection = document.querySelector('.content-section.active');
            const sectionId = activeSection.id;
            
            let itemTemplate = '';
            let containerClass = '';
            
            switch(sectionId) {
                case 'notes-content':
                    containerClass = '.notes-list';
                    itemTemplate = createNoteTemplate();
                    break;
                case 'tasks-content':
                    containerClass = '.tasks-list';
                    itemTemplate = createTaskTemplate();
                    break;
                case 'ideas-content':
                    containerClass = '.ideas-list';
                    itemTemplate = createIdeaTemplate();
                    break;
            }
            
            if (containerClass && itemTemplate) {
                const container = activeSection.querySelector(containerClass);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = itemTemplate;
                const newItem = tempDiv.firstElementChild;
                
                // 新增項目到列表頂端
                container.insertBefore(newItem, container.firstChild);
                
                // 添加動畫效果
                newItem.style.opacity = '0';
                newItem.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    newItem.style.opacity = '1';
                    newItem.style.transform = 'translateY(0)';
                }, 10);
                
                showNotification('新增項目成功');
                
                // 如果是任務項目，為新的核選方塊添加事件監聽器
                if (sectionId === 'tasks-content') {
                    const newCheckbox = newItem.querySelector('input[type="checkbox"]');
                    newCheckbox.addEventListener('change', () => {
                        if (newCheckbox.checked) {
                            newItem.classList.add('completed');
                            newItem.style.opacity = '0.7';
                        } else {
                            newItem.classList.remove('completed');
                            newItem.style.opacity = '1';
                        }
                    });
                }
            }
        });
    }
    
    // 建立新的筆記項目模板
    function createNoteTemplate() {
        const today = new Date();
        const dateString = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
        return `
            <div class="note-item" style="transition: all 0.5s ease;">
                <h3>新筆記</h3>
                <p>點擊編輯按鈕開始編輯您的筆記內容...</p>
                <div class="note-date">${dateString}</div>
            </div>
        `;
    }
    
    // 建立新的任務項目模板
    function createTaskTemplate() {
        const today = new Date();
        const randomId = 'task' + Math.floor(Math.random() * 10000);
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 3);
        const dateString = `${futureDate.getFullYear()}/${String(futureDate.getMonth() + 1).padStart(2, '0')}/${String(futureDate.getDate()).padStart(2, '0')}`;
        
        return `
            <div class="task-item" style="transition: all 0.5s ease;">
                <input type="checkbox" id="${randomId}">
                <label for="${randomId}">新增任務項目</label>
                <span class="task-date">${dateString}</span>
            </div>
        `;
    }
    
    // 建立新的想法項目模板
    function createIdeaTemplate() {
        return `
            <div class="idea-item" style="transition: all 0.5s ease;">
                <p>在這裡輸入您的新想法或靈感...</p>
                <div class="idea-tags">
                    <span class="tag">新想法</span>
                </div>
            </div>
        `;
    }
    
    // 顯示通知訊息
    function showNotification(message) {
        // 檢查是否已有通知元素，有的話移除它
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 建立新的通知元素
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // 設定通知樣式
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = 'rgba(31, 78, 121, 0.9)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        // 將通知元素加入文件
        document.body.appendChild(notification);
        
        // 顯示通知
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // 設定通知自動消失
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // 頁面載入時的動畫效果
    const notebookContainer = document.querySelector('.notebook-container');
    notebookContainer.style.opacity = '0';
    notebookContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        notebookContainer.style.transition = 'all 0.8s ease';
        notebookContainer.style.opacity = '1';
        notebookContainer.style.transform = 'translateY(0)';
    }, 200);
});