
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"flex-item { width: 45%; margin:2%; height: ",[0,200],"; text-align: center; line-height: ",[0,200],"; display:inline-block; }\n.",[1],"left-part{ background: pink; }\n.",[1],"right-part{ background:red; }\n",],undefined,{path:"./pages/home/home.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/home/home.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      