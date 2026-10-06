/* Form: same Google Apps Script endpoint and no-cors POST as the original site */
const GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/AKfycbwktOVWTHUCrsNIxjs2KH6Vb8Rv7VwZZhKJg-su1UTnZwStyRv1RulLDP0FURQoHx9J/exec";
const $=s=>document.querySelector(s);
function toast(msg,type){const t=$('#toast');t.textContent=msg;t.className='toast show '+type;setTimeout(()=>t.classList.remove('show'),5000)}
$('#contactForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const f=e.target,btn=$('#submitBtn');
  const d={name:f.name.value.trim(),email:f.email.value.trim(),company:f.company.value.trim(),service:f.service.value,budget:'',message:f.message.value.trim()};
  if(!d.name||!d.email||!d.message){toast('Please fill in name, business email and project details.','err');return}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)){toast('Please enter a valid email address.','err');return}
  btn.disabled=true;btn.textContent='Sending…';
  try{
    await fetch(GOOGLE_SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
    toast('Thanks — your message was sent. We will be in touch.','ok');f.reset();
  }catch(err){toast('Something went wrong. Please try again.','err')}
  btn.disabled=false;btn.textContent='Start a Conversation →';
});
/* mobile menu */
const links=$('#links'),burger=$('#burger');
burger.addEventListener('click',()=>{const o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');burger.setAttribute('aria-expanded',false)}));
/* reveal + workflow line */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv,.steps').forEach(el=>io.observe(el));
