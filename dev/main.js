
window.onload = (event) => {
    let httpResponses = document.querySelectorAll('[id^="httpReqRes-"]');
    // console.log(httpResponses)
    httpResponses.forEach(e => {
      e.onclick = function(){
          let pre = document.getElementById(e.id.replace('httpReqRes-', ''));
          if(pre.style.display == '') return pre.style.display = 'block';
          pre.style.display == 'none' ? pre.style.display = 'block' : pre.style.display = 'none';
      };
    });
};
