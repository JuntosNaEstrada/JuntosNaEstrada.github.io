let trips=[],filterStatus="all";
const els={total:document.getElementById('total'),allCount:document.getElementById('allCount'),done:document.getElementById('done'),photos:document.getElementById('photos'),search:document.getElementById('search'),distance:document.getElementById('distance'),reason:document.getElementById('reason'),cards:document.getElementById('cards'),empty:document.getElementById('empty')};
async function load(){
  if(!configured)return loadFallback();
  const {data,error}=await blSupabase.from("trips").select("*,trip_photos(id,path,caption)").order("sort_order").order("city");
  if(error)return loadFallback(error.message);
  trips=data||[];renderStats();render();
}
async function loadFallback(message=''){
  try{
    trips=await fetch('data/trips.json').then(r=>{if(!r.ok)throw new Error('arquivo indisponível');return r.json()});
    trips=trips.map((t,i)=>({...t,id:`local-${i}`,trip_photos:[]}));
    renderStats();render();
    if(message)showNotice('Exibindo a lista de destinos sem as memórias e fotos no momento.');
  }catch(e){showError(message||e.message)}
}
function renderStats(){els.total.textContent=trips.length;els.allCount.textContent=trips.length;els.done.textContent=trips.filter(t=>t.status==='completed').length;els.photos.textContent=trips.reduce((n,t)=>n+(t.trip_photos?.length||0),0)}
function match(t){const q=els.search.value.toLowerCase();return(filterStatus==='all'||t.status===filterStatus)&&(!els.distance.value||t.distance_range===els.distance.value)&&(!els.reason.value||t.motivation.includes(els.reason.value))&&`${t.city} ${t.title} ${t.motivation} ${t.highlights}`.toLowerCase().includes(q)}
function render(){
  const list=trips.filter(match);
  els.cards.innerHTML=list.map(t=>card(t)).join('');
  els.empty.classList.toggle('hidden',!!list.length);
  els.cards.querySelectorAll('[data-gallery]').forEach(b=>b.onclick=()=>openGallery(String(b.dataset.gallery)));
}
function card(t){
  const photos=t.trip_photos||[],p=photos[0],src=p?photoUrl(p.path):'';
  return`<article class="tripCard ${t.status}">${p?`<button class="cardPhotoButton" data-gallery="${esc(t.id)}" aria-label="Ver ${photos.length} fotografia(s) de ${esc(t.title)}"><img src="${esc(src)}" class="cardPhoto" alt="Foto de ${esc(t.title)}">${photos.length>1?`<span>＋ ${photos.length-1} foto${photos.length>2?'s':''}</span>`:''}</button>`:''}<div class="cardTop"><span>${esc(t.distance_range)}</span><span class="statusLabel">${t.status==='completed'?'✓ Visitado':'○ Planejado'}</span></div><small>${esc(t.city)}</small><h3>${esc(t.title)}</h3><b class="motivation">${esc(t.motivation)}</b><p>${esc(t.highlights)}</p><div class="chips"><span>↗ ${esc(t.access)}</span><span>◇ ${esc(t.difficulty)}</span><span>◷ ${esc(t.best_time)}</span></div>${t.status==='completed'?`<div class="memory"><b>✓ Conhecemos${t.visit_date?' em '+new Date(t.visit_date+'T12:00:00').toLocaleDateString('pt-BR'):''}</b>${t.notes?`<p>“${esc(t.notes)}”</p>`:''}${t.rating?`<span>${'★'.repeat(t.rating)}</span>`:''}</div>`:''}</article>`;
}
function openGallery(id){
  const t=trips.find(item=>String(item.id)===id);
  if(!t?.trip_photos?.length)return;
  galleryTitle.textContent=`${t.title} · ${t.city}`;
  galleryGrid.innerHTML=t.trip_photos.map((p,i)=>`<figure><img src="${esc(photoUrl(p.path))}" alt="Foto ${i+1} de ${esc(t.title)}" loading="lazy">${p.caption?`<figcaption>${esc(p.caption)}</figcaption>`:''}</figure>`).join('');
  galleryDialog.showModal();
}
function closeGallery(){galleryDialog.close()}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function showError(m){els.cards.innerHTML=`<p class="error">Não foi possível carregar: ${esc(m)}</p>`}
function showNotice(m){els.cards.insertAdjacentHTML('beforebegin',`<p class="publicNotice">${esc(m)}</p>`)}
els.search.oninput=render;els.distance.onchange=render;els.reason.onchange=render;document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelector('.tabs .active').classList.remove('active');b.classList.add('active');filterStatus=b.dataset.status;render()});
galleryClose.onclick=closeGallery;
galleryDialog.onclick=e=>{if(e.target===galleryDialog)closeGallery()};
load();
