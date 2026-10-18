(function(){
var WA='918485854107',$=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
function wa(t){return'https://wa.me/'+WA+'?text='+encodeURIComponent(t)}
// menu
var b=$('#burger'),m=$('#menu');
function tog(o){m.classList.toggle('open',o);b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}
b.onclick=function(){tog(!m.classList.contains('open'))};
$$('a',m).forEach(function(a){a.onclick=function(){tog(false)}});
document.onkeydown=function(e){if(e.key==='Escape')tog(false)};
$('#yr').textContent=new Date().getFullYear();
// service cards -> WhatsApp
$$('.card').forEach(function(c){var s=c.dataset.service,a=$('.wa',c);a.href=wa('Hello Rubab The Hair Villa, I would like to enquire about '+s+'.');a.target='_blank';a.rel='noopener'});
// hero tilt (fine pointers only)
var st=$('#stage'),hc=$('.hero-card');
if(matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches){
 st.onmousemove=function(e){var r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;hc.style.transform='rotateY('+(x*12-4)+'deg) rotateX('+(2-y*10)+'deg)'};
 st.onmouseleave=function(){hc.style.transform=''};
}
// videos: one at a time
var vs=$$('.vwrap');
vs.forEach(function(w){var v=$('video',w),p=$('.vplay',w);
 function go(){if(v.paused){vs.forEach(function(o){if(o!==w)$('video',o).pause()});v.controls=true;v.play()}else v.pause()}
 p.onclick=go;
 v.onplay=function(){w.classList.add('playing')};
 v.onpause=function(){if(!v.ended&&v.currentTime>0)return;w.classList.remove('playing')};
 v.onended=function(){w.classList.remove('playing');v.controls=false}});
// lightbox
var lb=$('#lb'),li=$('img',lb),lc=$('p',lb),ph=$$('#masonry img'),k=0;
function show(i){k=(i+ph.length)%ph.length;li.src=ph[k].src;li.alt=ph[k].alt;lc.textContent=ph[k].alt}
ph.forEach(function(im,i){im.parentNode.onclick=function(){show(i);lb.showModal()}});
$('.lb-x').onclick=function(){lb.close()};
$('.lb-p').onclick=function(){show(k-1)};$('.lb-n').onclick=function(){show(k+1)};
lb.onclick=function(e){if(e.target===lb)lb.close()};
lb.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')show(k-1);if(e.key==='ArrowRight')show(k+1)});
var tx=0;lb.ontouchstart=function(e){tx=e.touches[0].clientX};lb.ontouchend=function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)show(k+(d<0?1:-1))};
// booking form
var f=$('#form'),d=f.date,t=new Date();d.min=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
var msgs={name:'Enter your name.',service:'Choose a service.',date:'Pick a date from today onwards.',time:'Pick a preferred time.'};
f.onsubmit=function(e){e.preventDefault();var ok=true;
 ['name','service','date','time'].forEach(function(n){var el=f[n],bad=!el.value.trim()||(n==='date'&&el.value<d.min);el.classList.toggle('invalid',bad);el.setAttribute('aria-invalid',bad);el.parentNode.querySelector('.err').textContent=bad?msgs[n]:'';if(bad&&ok){el.focus();ok=false}});
 if(!ok)return;
 var dt=new Date(f.date.value+'T'+f.time.value),ds=dt.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'}),ts=dt.toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'});
 var txt='Hello Rubab The Hair Villa, I would like to book an appointment.\nName: '+f.name.value.trim()+'\nService: '+f.service.value+'\nPreferred date: '+ds+'\nPreferred time: '+ts+(f.msg.value.trim()?'\nMessage: '+f.msg.value.trim():'');
 window.open(wa(txt),'_blank','noopener');
};
})();
