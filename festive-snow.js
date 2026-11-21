(()=>{
 const root=document.querySelector('#colsplit[data-festive]'),button=root?.querySelector('.ny-snow-toggle'),layer=root?.querySelector('.ny-snow');
 if(!root||!button||!layer)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width:860px)'),storageKey='kzavidovo-newyear-snow';
 let wanted=!navigator.connection?.saveData,visible=true,lastHeight=0;
 try{const saved=localStorage.getItem(storageKey);if(saved!==null)wanted=saved==='on'}catch{}
 function particles(){
  const count=mobile.matches?40:46,fragment=document.createDocumentFragment();
  for(let i=0;i<count;i++){
   const flake=document.createElement('i'),depth=i%3,duration=(mobile.matches?14:9)+(i*7%10),phase=(i*.61803398875)%1;
   flake.style.cssText=`--x:${((i*37.17+3.5)%98).toFixed(2)}%;--s:${[1.8,3,4.6][depth]}px;--o:${[.42,.66,.86][depth]};--d:${duration}s;--delay:-${(phase*duration).toFixed(2)}s;--drift:${[-24,32,-42,48][i%4]}px;--end-drift:${[-10,18,-22,28][i%4]}px`;
   fragment.appendChild(flake);
  }
  layer.replaceChildren(fragment);
 }
 function pause(){root.classList.toggle('ny-paused',document.hidden||!visible)}
 function sync(){
  const on=wanted&&!reduced.matches;
  root.classList.toggle('ny-snow-off',!on);button.disabled=reduced.matches;
  button.setAttribute('aria-pressed',String(on));button.setAttribute('aria-label',reduced.matches?'Снег отключён настройкой уменьшения движения':on?'Выключить снег':'Включить снег');
  button.textContent=reduced.matches?'Без снега':`Снег: ${on?'вкл.':'выкл.'}`;
 }
 button.addEventListener('click',()=>{wanted=!wanted;try{localStorage.setItem(storageKey,wanted?'on':'off')}catch{}sync()});
 reduced.addEventListener('change',sync);mobile.addEventListener('change',particles);document.addEventListener('visibilitychange',pause);
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;pause()},{threshold:0}).observe(root);
 new ResizeObserver(es=>{const height=Math.ceil(es[0].contentRect.height)+48;if(height!==lastHeight){lastHeight=height;root.style.setProperty('--snow-distance',height+'px')}}).observe(root);
 particles();sync();pause();
})();
