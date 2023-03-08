const ads = [
  {
    title: "RETE 服务器",
    body: "生存、工业、机械、蒸汽等多种玩法，期待您的加入。 QQ群: 518463968",
    lang: "zh-CN",
    icon: "https://rete.netlify.app/static/images/icon.ico",
    tag: "rete"
  },
  {
    title: "完全开源+免费的封装非结构化数据工具包",
    body: "Python友好 🎁 完全开源+免费的封装非结构化数据工具包 - 轻松搭建以图搜图、语音搜图的AI应用",
    url: "https://docarray.jina.ai/",
    lang: "zh-CN",
    icon: "https://cdn.wwads.cn/creatives/psA35eGEhv9ia4LX2UU6Bjw7f6TZoK4XpINWTee2.jpg"
  },
  {
    title: "🔥CRMEB开源商城系统",
    body: "🔥CRMEB开源商城系统, TP6+Uniapp+Vue开发,二开便捷, 可免费商用！！",
    url: "https://gitee.com/ZhongBangKeJi/CRMEB",
    lang: "zh-CN",
    icon: "https://cdn.wwads.cn/creatives/8GEe7vmehX0a7eHx45fh2gHA0hXUxM1Ae9M7o4Ik.jpg"
  }
];

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

var obj = sample(ads);

// Advanced Console
cons = {
  s: (m) => {
    console.log(`%c[SUCCESS]%c ${m}`, "color:white;background:green;", "");
  },
  w: (m) => {
    console.log(`%c[WARNING]%c ${m}`, "color:brown;background:yellow;", "");
  },
  i: (m) => {
    console.log(`%c[INFO]%c ${m}`, "color:white;background:blue;", "");
  },
  e: (m) => {
    console.log(`%c[ERROR]%c ${m}`, "color:white;background:red;", "");
  },
  d: (m) => {
    console.log(`%c[DEBUG]%c ${m}`, "color:white;background:black;", "");
  }
};

var Notification =
  window.Notification || window.mozNotification || window.webkitNotification; // 浏览器做兼容处理
if (Notification) {
  var xml = new XMLHttpRequest();
  xml.onreadystatechange = function () {
    if (xml.readyState == 0) {
      cons.e("[Anti-VPN] 请求未初始化");
    }
    if (xml.readyState == 1) {
      cons.s("[Anti-VPN] 与服务器连接已建立");
    }
    if (xml.readyState == 2) {
      cons.s("[Anti-VPN] 已接收返回内容");
    }
    if (xml.readyState == 3) {
      cons.i("[Anti-VPN] 请求处理中");
    }
    if (xml.readyState == 4) {
      cons.s("[Anti-VPN] 已完成请求，开始分析");
    }
  };
  xml.open("GET", "https://cdn.cyfan.top/cdn-cgi/trace", false);
  xml.send();
  var loc = xml.responseText.split("loc=")[1].split("\n")[0];
  if (loc && loc === "CN") {
    cons.s("[Anti-VPN] 分析完成");
    cons.d(`客户端的国家为${loc}`);
    Notification.requestPermission().then(function (status) {
      //第一次询问或已经禁止通知(如果用户之前已经禁止显示通知，那么浏览器不会再次询问用户的意见，Notification.requestPermission()方法无效)
      if (status === "granted") {
        // 通知权限已获取
        cons.d("通知权限已获取");
        setTimeout(function () {
          var n = new Notification(obj.title ? obj.title : "广告", {
            body: obj.body ? obj.body : null, // 通知的Body
            dir: "auto",
            data: {
              url: obj.url ? obj.url : "https://xiaozhu2007.netlify.app/"
            }, // 数据
            tag: obj.tag ? obj.tag : "default", // 标签
            requireInteraction: true, // 不自动关闭通知
            lang: obj.lang ? obj.lang : "zh-CN", // 语言
            icon: obj.icon // 图标
          });
          console.clear(); // 反制策略
          n.onshow = function () {
            console.log("advertisement shown");
          };
          n.onclick = function () {
            window.open(n.data.url, "_blank"); // 打开网址，计入推送费用
            n.close(); // 并且关闭通知
          };
          setTimeout(function () {
            n.close(); // 超时 30s 用户未点击，判断为挂机，计入推送费用
          }, 30000);
        }, 10000);
      } else {
        cons.d("通知权限未获取-用户(曾经)拒绝过通知");
        const errorWindow = window.open("", "_self"); // 替换网站页面，不计入推送费用
        errorWindow.document.write("<h1>错误</h1>");
        errorWindow.document.write("<p>你没有授权本网站通知权限</p>");
        errorWindow.document.write("<h4>如何授权？</h4>");
        errorWindow.document.write(
          '<p>Chrome及其内核的浏览器的通知设置: 设置 > 高级 > 内容设置 > 通知</p>'
        );
        console.clear(); // 反制策略
        window.stop(); // 避免不必要的加载
      }
    });
  } else {
    cons.d(`客户端的国家为${loc}, 不会执行`);
  }
}
