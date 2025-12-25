originalData = null;
originalStyle = null;
let isColorUnset = true; // 标记颜色是否为默认状态
let isParagraphVisible = false;
totalClick = 0;
currentElement = null;
explainationItems = null;

function fetchData() {
    const cachedData = localStorage.getItem('cachedData');
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    return null;
};

document.addEventListener('DOMContentLoaded', function() {
    const parsedData = fetchData();
    if (parsedData) {
       enterData(parsedData);
    }
});

function enterData(parsedData) {
    // 强制显示"狸花猫"和100%
    document.getElementById('EngName').innerText = "";
    document.getElementById('CnName').innerText = "狸花猫";
    document.getElementById('works').innerHTML = `<div class="medSmallText">《狸花猫的捡手机合集》<br>
    《我时常在想我妈究竟是谁》<br>
    《大诗人狸花猫》</div>`;
    document.getElementById('percentage').innerText = "100%";

    // 次要作者也强制显示"狸花猫"和100%
    document.getElementById('alsoAuthor1').innerText = "李华茂";
    document.getElementById('alsoPercentage1').innerText = "100%";
    document.getElementById('alsoAuthor2').innerText = "貓活_";
    document.getElementById('alsoPercentage2').innerText = "100%";

    // 颜色指南显示"狸花猫"
    document.getElementById('localAuth2').innerText = "狸花猫";

    // 隐藏文本过短提示
    document.getElementById('tooshort').innerText = "";

    const originText = document.getElementById('originText');
    originText.innerHTML = ''; // 清空现有内容

    // 获取原始输入文本
    const originalInput = localStorage.getItem('originalInputText') || '';
    
    // 使用。？！作为分句符号
    const sentences = originalInput.split(/([。？！])/).filter(s => s.trim());
    
    // 为每个句子创建span元素
    sentences.forEach((sentence, index) => {
        const span = document.createElement('span');
        span.textContent = sentence;
        span.style.background = 'white';
        span.style.color = 'unset'; // 初始颜色为默认
        span.setAttribute('onclick', `onTextPointed(this, ${index})`);
        span.setAttribute('explain_color', "#82aab8"); // 固定着色颜色
        originText.appendChild(span);
    });
}

function onTextPointed(element, index) {
    if (originalData == null)
        fetchOriginalContent();

    if (currentElement == element) {
        restoreSpanColor(currentElement);
        restoreOriginalContent();
        currentElement = null;
        return;
    }
    if (currentElement != null)
        restoreSpanColor(currentElement);
    currentElement = element;

    // 强制显示"狸花猫"相关信息
    getNode("intro").innerHTML = "这句很像……";
    getNode("EngName").innerHTML = "";
    getNode("CnName").innerHTML = "狸花猫";

    let works = getNode("works");
    works.innerHTML = "<p class='medSmallText' style='font-family:OurFont;white-space: pre;'></p>" +
                     "<div class='medSmallText'>《狸花猫的捡手机合集》<br>《我时常在想我妈究竟是谁》<br>《大诗人狸花猫》</div></div>";

    getNode("percentage").innerHTML = "100%";

    // 强制次要作者显示
    for (let i = 1; i < 3; ++i) {
        let node = getNode("also" + i);
        node.style.opacity = 1;
        let nameNode = getNode("alsoAuthor" + i);
        let percentageNode = getNode("alsoPercentage" + i);

        nameNode.innerHTML = "狸花猫";
        percentageNode.innerHTML = "100%";
    }

    // 切换点击元素的颜色和背景
    let bg = element.style.background;
    let fg = element.style.color;

    if (isColorUnset) {
        fg = "black";
    }

    element.style.background = fg;
    element.style.color = bg;
}

function restoreSpanColor(element) {
    let bg = element.style.background;
    let fg = element.style.color;
    element.style.background = fg;
    element.style.color = bg;
}

function restoreOriginalContent() {
    for (let id in ids) {
        let node = getNode(ids[id]);
        node.style = originalStyle[id];
        node.innerHTML = originalData[id];
    }
    currentElement = null;
}

const ids = [
    "intro",
    "EngName",
    "CnName",
    "works",
    "percentage",
    "also1",
    "alsoAuthor1",
    "alsoPercentage1",
    "also2",
    "alsoAuthor2",
    "alsoPercentage2"
];

function getNode(id) {
    return document.getElementById(id);
}

function fetchOriginalContent() {
    originalData = [];
    originalStyle = [];
    for (let id in ids) {
        originalData.push(getNode(ids[id]).innerHTML);
        originalStyle.push(getNode(ids[id]).style);
    }
}

function toggleContent() {
    if (currentElement != null) {
        restoreSpanColor(currentElement);
        restoreOriginalContent();
        originalStyle = null;
        originalData = null;
    }

    const textBlock = document.getElementById('originText');
    const toggleParagraph = document.getElementById('guide');
    const spans = textBlock.querySelectorAll('span');

    // 切换所有句子的颜色
    spans.forEach(span => {
        if (isColorUnset) {
            span.style.color = "#82aab8"; // 着色为指定颜色
        } else {
            span.style.color = 'unset'; // 恢复默认颜色
        }
    });

    // 切换指南显示状态
    if (isParagraphVisible) {
        toggleParagraph.style.display = 'none';
        document.getElementById("explainButton").classList.remove('active');
    } else {
        toggleParagraph.style.display = 'block';
        document.getElementById("explainButton").classList.add('active');
    }

    if (isColorUnset) { totalClick++; }
    isColorUnset = !isColorUnset;
    isParagraphVisible = !isParagraphVisible;
}