// 监听表单提交事件
document.getElementById('AddTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const textInput = document.getElementById('str');
    const inputText = textInput.value.trim();
    
    // 简单的长度验证
    if (inputText.length < 200) {
        document.getElementById('charCount').textContent = '请输入至少200字的内容';
        return;
    }
    if (inputText.length > 5000) {
        document.getElementById('charCount').textContent = '内容不能超过5000字';
        return;
    }
    
    // 保存原始输入文本到localStorage
    localStorage.setItem('originalInputText', inputText);
    
    // 创建一个模拟的解析数据结构（仅为了保持原有逻辑兼容）
    const mockParsedData = [
        inputText,  // 原始文本
        { 0: [[0, inputText.length]] }  // 模拟的句子范围
    ];
    localStorage.setItem('cachedData', JSON.stringify(mockParsedData));
    
    // 跳转到结果页面
    window.location.href = 'success.html';
});

// 实时字符计数
document.getElementById('str').addEventListener('input', function() {
    const count = this.value.length;
    const charCountEl = document.getElementById('charCount');
    if (count < 200) {
        charCountEl.textContent = `当前${count}字，还需要${200 - count}字`;
    } else if (count > 5000) {
        charCountEl.textContent = `超出${count - 5000}字，请删减`;
    } else {
        charCountEl.textContent = '';
    }
});