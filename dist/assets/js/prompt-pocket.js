const KEY='promptPocket.v2';
const LEGACY_KEY='promptPocket.v1';
const PREF_KEY='promptPocket.prefs.v1';
const baseTags=['🖼️ 画像','🎬 動画','お洒落','女の子','男の子','獣人','可愛い','ダーク','アニメ','実写','夜景','ファンタジー','SF','水彩'];
const presetSampleImage='assets/media/prompt-pocket-03.webp';
const presetPrompts={
  'three-view':{
    name:'三面図を作成',
    prompt:'てんぷしたきゃらくたーがぞうをさんしょうして、おなじきゃらくたーのさんめんずをさくせいしてください。しょうめん・まよこ・はいめんのぜんしんをよこいちれつにならべ、かみがた、かおだち、たいかく、いしょう、そうしょく、はいしょくをとういつしてください。かくほうこうででざいんがむじゅんしないようにし、せっていしりょうとしてかくにんしやすいしんぷるなはいけいとれいあうとにしてください。',
    tags:['🖼️ 画像','アニメ','女の子'],
    image:presetSampleImage
  },
  'character-sheet':{
    name:'キャラクターシートを作成',
    prompt:'てんぷしたがぞうのきゃらくたーをさんしょうして、きゃらくたーしーとをさくせいしてください。きゃらくたーのでざいん、かみがた、いしょう、そうしょく、はいしょくなどのとくちょうをいじし、ぜんしんず、かおのあっぷ、だいひょうてきなひょうじょうやぽーずをみやすくはいちしてください。おなじきゃらくたーとしてとういつかんをたもち、せっていしりょうとしてつかいやすいしんぷるなれいあうとにしてください。',
    tags:['🖼️ 画像','アニメ','女の子'],
    image:presetSampleImage
  },
  'illustration-to-photo':{
    name:'イラストを写真化',
    prompt:'添付したイラストを参照して、キャラクターの髪型、顔立ち、衣装、配色、構図などの特徴をできるだけ維持したまま、自然な実写写真のように変換してください。肌、髪、布地、光、影を現実的に表現し、過度な加工感を避けて、実際に撮影した写真のような仕上がりにしてください。',
    tags:['🖼️ 画像','実写','女の子'],
    image:presetSampleImage
  },
  'photo-to-illustration':{
    name:'写真をイラスト化',
    prompt:'添付した写真を参照して、被写体の特徴、服装、構図、背景の雰囲気を保ちながら、丁寧なアニメイラスト風に描き直してください。自然な色合いと柔らかな光を使い、人物の特徴が元の写真から大きく変わらないようにしてください。',
    tags:['🖼️ 画像','アニメ','女の子'],
    image:presetSampleImage
  },
  'expressions':{
    name:'表情差分を作成',
    prompt:'添付したキャラクター画像を参照して、同じキャラクターデザインを維持したまま複数の表情差分を作成してください。通常、笑顔、怒り、悲しみ、驚きなど、分かりやすく異なる表情を並べてください。髪型、顔立ち、衣装、配色は変えず、顔の表情だけが自然に変化するようにしてください。',
    tags:['🖼️ 画像','アニメ','女の子','可愛い'],
    image:presetSampleImage
  },
  'poses':{
    name:'ポーズ差分を作成',
    prompt:'添付したキャラクター画像を参照して、同じキャラクターデザインと衣装を維持したまま、複数の異なる全身ポーズを作成してください。立つ、歩く、振り向く、座るなど自然に違いが分かるポーズにし、顔立ち、髪型、体格、配色が変化しないようにしてください。',
    tags:['🖼️ 画像','アニメ','女の子'],
    image:presetSampleImage
  },
  'outfit':{
    name:'衣装を変更',
    prompt:'添付した画像の人物またはキャラクターを参照して、顔立ち、髪型、体格、ポーズなど本人の特徴を維持したまま、衣装だけを変更してください。新しい衣装が身体に自然に合うようにし、元画像の人物が別人にならないようにしてください。',
    tags:['🖼️ 画像','女の子','お洒落'],
    image:presetSampleImage
  },
  'background':{
    name:'背景を変更',
    prompt:'添付した画像の人物またはキャラクターをそのまま維持し、背景だけを別の場所や風景に変更してください。人物の顔、髪型、衣装、ポーズ、配色はできるだけ変えず、新しい背景の光や影が人物と自然になじむようにしてください。',
    tags:['🖼️ 画像','お洒落'],
    image:presetSampleImage
  },
  'transparent-bg':{
    name:'背景を透過',
    prompt:'添付した画像から人物またはキャラクターをきれいに切り抜き、背景を透明にしてください。髪の毛、衣装、装飾品などの細かな輪郭をできるだけ維持し、被写体そのものの形や色は変更しないでください。',
    tags:['🖼️ 画像','アニメ'],
    image:presetSampleImage
  },
  'enhance':{
    name:'高画質化・ディテール改善',
    prompt:'添付した画像の構図、人物、デザイン、色合いを維持したまま、高画質化してください。ぼやけた輪郭や細部を自然に整え、髪、目、衣装、背景などのディテールを改善してください。元画像にない要素を勝手に追加せず、元の雰囲気を保ってください。',
    tags:['🖼️ 画像','アニメ'],
    image:presetSampleImage
  }
};

const isFreshInstall=localStorage.getItem(KEY)===null&&localStorage.getItem(LEGACY_KEY)===null;
let items=JSON.parse(localStorage.getItem(KEY)||localStorage.getItem(LEGACY_KEY)||'[]');
const APP_VERSION='1.16';
const VERSION_KEY='promptPocket.lastSeenVersion';
const UPDATE_116_NOTICE_KEY='promptPocket.updateNotice.1.16.final';
const VERSION_HISTORY={
    '1.73':['初回の外部ブラウザ案内を、わかりやすい歓迎画面に変更','現在のバージョン表示とバージョン記録を追加','アップデート内容を更新時に一度だけ表示'],
    '1.74':['X内ブラウザ案内を矢印中心の表示に変更','ブラウザバック後に下部メニューが消える問題を修正','＋追加の長押しショートカットを追加'],
    '1.75':['画像選択の長押しでクリップボード画像を貼り付け','オプション画面を整理し保存・キャンセルを固定表示','X内ブラウザ案内の矢印表示を修正'],
    '1.76':['X内ブラウザ案内の矢印下を完全に空白化','その他の設定を注意色付きの折りたたみに変更','初回起動時の見本プロンプト登録を安定化'],
    '1.77':['初回ウェルカム終了時、登録0件の場合だけ見本プロンプトを追加','長押しショートカットを新規利用時は初期ONに変更','開発者向け機能をテスト用3項目に整理'],
    '1.78':['初回ウェルカム完了時の見本プロンプト登録判定を修正','X・Discord経由の外部ブラウザ遷移後でも登録0件なら見本を追加','デバッグ表示のウェルカムでは見本を追加しない'],
    '1.79':['見本プロンプトの登録をウェルカム表示処理から完全に分離','初回起動で登録0件なら起動時に見本を先に保存','X・Discord経由や外部ブラウザ遷移に左右されない初期登録へ変更'],
    '1.0':['Prompt Pocket 正式版を公開','見本「雨上がりの少女」のプロンプトを日本語化','初回起動・ショートカット貼り付け・表示まわりを正式版向けに仕上げ'],
    '1.01':['Xの記事から開いた場合に外部ブラウザ案内が表示されない問題を修正'],
    '1.02':['Xの記事用リンクに ?from=x を付けることで外部ブラウザ案内を確実に表示','通常のXポスト・Discordからの従来判定も維持'],
    '1.03':['アプリ復帰時にカードが一時的に消えて見える問題を修正','ページ復帰時に保存データを再読込して自動再描画'],
    '1.04':['PC版のカード表示を1列に変更','PC版のカード領域を中央寄せして見やすさを改善','スマホ表示は変更なし'],
    '1.05':['編集画面右上に閉じる×ボタンを追加','一覧の詳細表示中にピン留め・お気に入りを変更しても詳細を維持','メモ欄を5行表示に拡大','編集画面の下部操作を「保存／削除・キャンセル」に変更','カード表示にTOP／END移動ボタンを追加','タイトル段とカード／一覧段をスクロール中も固定表示'],
    '1.06':['カード高速移動にMIDを追加','高速移動ボタンを右端収納式に変更','検索を開いても現在のスクロール位置を維持'],
    '1.07':['高速移動ボタンを右上表示に変更','スクロール操作時にTOP／MID／ENDを表示','操作停止後約2.5秒でフェードアウト'],
    '1.08':['高速移動ボタンの表示位置を少し下へ調整','高速移動ボタンの自動消去を約2秒に短縮'],
    '1.09':['高速移動ボタンの背景を半透明化','一覧モード切替時に高速移動ボタンが残る問題を修正','オプションをタイトル右側へ移動し下部メニューを3ボタン化'],
    '1.10':['オプションをアイコン＋文字の縦型表示に変更','下部メニューの3ボタンを均等配置して余白を調整'],
    '1.11':['オプションをカード／一覧切替の件数表示横へ移動','タイトル周辺のオプション表示を撤去'],
    '1.12':['件数横のオプションボタンをコンパクト化','歯車アイコンを大きくして設定ボタンを見つけやすく調整'],
    '1.13':['オプションに背景・枠・立体感を追加してボタンであることを明確化','大きな歯車アイコンと押しやすい高さを維持'],
    '1.14':['オプションボタンを「一つ戻す」の右隣へ移動','表示切替・件数と操作ボタンの間隔を整理'],
    '1.15':['TOP／MID／END高速移動ボタンの背景をさらに少し透明化'],
    '1.16':['TOP／MID／END高速移動ボタンをさらに透明化','ホバー時の背景も少し軽く調整']
};
function addWelcomeSample(){
  if(items.some(x=>x.id==='prompt-pocket-welcome-sample'))return false;
  const now=Date.now();
  // 見本プロンプトは初心者にも分かりやすいよう、日本語で記述する。
  const sample={"id":"prompt-pocket-welcome-sample","name":"（見本）雨上がりの少女","prompt":"雨上がりの静かな街角に、透明な傘を持った美しい少女が立っている。濡れた路面や小さな水たまりには、淡い青空と夕暮れの暖かな光が映り込んでいる。やさしい風が少女の髪とスカートをわずかに揺らし、近くの葉や手すりには雨粒が残っている。少女は穏やかな微笑みを浮かべながら、こちらを見つめている。柔らかな映画的ライティング、繊細なアニメイラスト、きれいな線画、鮮やかで自然な色彩、丁寧な反射表現、静かで心地よい雰囲気、高品質。","author":"","xhandle":"","source":"","memo":"これはPrompt Pocketの見本です。編集・コピーなど自由に試してみてください。不要になったら削除してOKです。","tags":["🖼️ 画像","女の子","アニメ","お洒落"],"image":"assets/media/prompt-pocket-04.webp","fav":false,"pinned":false,"useCount":0,"lastUsed":0,"created":0,"updated":0};
  sample.created=now;sample.updated=now;
  items=[sample,...items];
  return true;
}
let selectedTags=new Set(), filterTags=new Set(), customTags=new Set();
let activeTagForManage='';
let imageData='';
let undoState=null;
let prefs=JSON.parse(localStorage.getItem(PREF_KEY)||'{"view":"card","welcomed":false,"tagOrder":[]}');
prefs.tagOrder=Array.isArray(prefs.tagOrder)?prefs.tagOrder:[];
prefs.hiddenTags=Array.isArray(prefs.hiddenTags)?prefs.hiddenTags:[];
prefs.rememberOps=!!prefs.rememberOps;
prefs.shortcutEnabled=Object.prototype.hasOwnProperty.call(prefs,'shortcutEnabled')?!!prefs.shortcutEnabled:true;
// TEST34: 個別の検索/ヘルプ長押し設定を廃止し、ボタン共通設定へ移行。
prefs.longPressAllButtonsEnabled=Object.prototype.hasOwnProperty.call(prefs,'longPressAllButtonsEnabled')
  ?!!prefs.longPressAllButtonsEnabled
  :(!!prefs.longPressHelpEnabled||!!prefs.longPressSearchEnabled);
delete prefs.longPressHelpEnabled;
delete prefs.longPressSearchEnabled;
prefs.shortcutDelay=[500,800,1000].includes(Number(prefs.shortcutDelay))?Number(prefs.shortcutDelay):800;
prefs.view='detail';
customTags=new Set(Array.isArray(prefs.customTags)?prefs.customTags:[]);
let randomOrder=[];
let detailFavSort=!!(prefs.rememberOps&&prefs.detailFavSort);
const $=id=>document.getElementById(id);
const esc=s=>(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function normalize(){items=items.map(x=>({...x,created:x.created||Date.now(),updated:x.updated||x.created||Date.now(),pinned:!!x.pinned,useCount:x.useCount||0,lastUsed:x.lastUsed||0}));}
normalize();
const FOLDER_KEY='promptPocketFolders.v1';
let folders=[];
try{folders=JSON.parse(localStorage.getItem(FOLDER_KEY)||'[]');if(!Array.isArray(folders))folders=[]}catch{folders=[]}
const openFolders=new Set();
function saveFolders(){localStorage.setItem(FOLDER_KEY,JSON.stringify(folders))}
function folderById(id){return folders.find(f=>f.id===id)}
function folderCount(id){return items.filter(x=>x.folderId===id).length}
function save(){
  try{localStorage.setItem(KEY,JSON.stringify(items));return true;}
  catch(err){console.error('Prompt Pocket save failed:',err);alert('データを保存できませんでした。\n画像データなどでブラウザの保存容量が不足している可能性があります。\n画像を小さくしてもう一度お試しください。');return false;}
}
function savePrefs(){prefs.customTags=[...customTags];localStorage.setItem(PREF_KEY,JSON.stringify(prefs));}

// Ver.1.0: 見本の初期登録はウェルカム完了時だけ行う。
// 条件は「通常の初回ウェルカム」かつ「登録0件」。ここでは追加しない。
function toast(t){$('toast').textContent=t;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1600)}
function snapshot(label){undoState={label,items:structuredClone(items)}; updateUndo();}
function updateUndo(){$('undoBtn').disabled=!undoState;$('undoBtn').classList.toggle('undoReady',!!undoState);$('undoBtn').title=undoState?`${undoState.label}を元に戻す`:'戻せる操作はありません';}
function allTags(){const tags=[...new Set([...baseTags,...customTags,...items.flatMap(x=>x.tags||[])])].filter(t=>!(prefs.hiddenTags||[]).includes(t));const order=prefs.tagOrder||[];return [...tags].sort((a,b)=>{const ai=order.indexOf(a),bi=order.indexOf(b);if(ai<0&&bi<0)return tags.indexOf(a)-tags.indexOf(b);if(ai<0)return 1;if(bi<0)return -1;return ai-bi});}
function syncTagOrder(){
  const tags=allTags();
  prefs.tagOrder=[...new Set([...(prefs.tagOrder||[]).filter(t=>tags.includes(t)),...tags])];
  savePrefs();
}
function moveTag(from,to){
  if(!from||!to||from===to)return;
  syncTagOrder();
  const a=prefs.tagOrder.filter(t=>t!==from), i=a.indexOf(to);
  a.splice(i<0?a.length:i,0,from); prefs.tagOrder=a; savePrefs(); renderTagChoices(); render();
}
function renderTagChoices(){
  syncTagOrder();
  const tags=allTags();
  $('tagChoices').innerHTML=tags.map(t=>`<button type="button" draggable="true" class="chip ${selectedTags.has(t)?'on':''} ${activeTagForManage===t?'activeManage':''}" data-tag="${esc(t)}">${selectedTags.has(t)?'✓ ':''}${esc(t)}</button>`).join('');
  $('deleteTagBtn').disabled=!activeTagForManage;
  $('tagChoices').querySelectorAll('.chip').forEach(b=>{
    b.onclick=()=>{const t=b.dataset.tag;activeTagForManage=t;selectedTags.has(t)?selectedTags.delete(t):selectedTags.add(t);renderTagChoices()};
    b.ondragstart=e=>{e.dataTransfer.setData('text/plain',b.dataset.tag);b.classList.add('dragging')};
    b.ondragend=()=>b.classList.remove('dragging');
    b.ondragover=e=>{e.preventDefault();b.classList.add('dragOver')};
    b.ondragleave=()=>b.classList.remove('dragOver');
    b.ondrop=e=>{e.preventDefault();b.classList.remove('dragOver');moveTag(e.dataTransfer.getData('text/plain'),b.dataset.tag)};
    let timer=null,sx=0,sy=0;
    b.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')return;sx=e.clientX;sy=e.clientY;timer=setTimeout(()=>{b.dataset.touchDrag='1';b.classList.add('dragging');navigator.vibrate?.(20)},420)});
    b.addEventListener('pointermove',e=>{if(timer&&Math.hypot(e.clientX-sx,e.clientY-sy)>8){clearTimeout(timer);timer=null}if(b.dataset.touchDrag==='1'){e.preventDefault();const target=document.elementFromPoint(e.clientX,e.clientY)?.closest?.('[data-tag]');if(target&&target!==b)moveTag(b.dataset.tag,target.dataset.tag)}});
    const end=()=>{if(timer)clearTimeout(timer);timer=null;delete b.dataset.touchDrag;b.classList.remove('dragging')};b.addEventListener('pointerup',end);b.addEventListener('pointercancel',end);
  });
}
function renderFilters(){const used=allTags().filter(t=>items.some(x=>(x.tags||[]).includes(t)));$('filterTags').innerHTML=used.map(t=>`<button class="chip ${filterTags.has(t)?'on':''}" data-tag="${esc(t)}">${esc(t)}</button>`).join('');$('filterTags').querySelectorAll('.chip').forEach(b=>b.onclick=()=>{const t=b.dataset.tag;filterTags.has(t)?filterTags.delete(t):filterTags.add(t);render()});}
function xUrl(h){if(!h)return'';h=h.trim();if(h.startsWith('http'))return h;return 'https://x.com/'+h.replace(/^@/,'');}
function fmt(ts){return new Date(ts).toLocaleString('ja-JP',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});}
function sortList(list){const s=$('sort').value;if(s==='manual'){const order=Array.isArray(prefs.manualOrder)?prefs.manualOrder:[];list.sort((a,b)=>{const ai=order.indexOf(a.id),bi=order.indexOf(b.id);if(ai<0&&bi<0)return b.created-a.created;if(ai<0)return 1;if(bi<0)return -1;return ai-bi});}else if(s==='createdAsc')list.sort((a,b)=>a.created-b.created);else if(s==='updatedDesc')list.sort((a,b)=>b.updated-a.updated);else if(s==='nameAsc')list.sort((a,b)=>a.name.localeCompare(b.name,'ja'));else if(s==='nameDesc')list.sort((a,b)=>b.name.localeCompare(a.name,'ja'));else if(s==='authorAsc')list.sort((a,b)=>(a.author||'').localeCompare(b.author||'','ja'));else if(s==='fav')list.sort((a,b)=>(b.fav?1:0)-(a.fav?1:0)||b.created-a.created);else if(s==='recentUsed')list.sort((a,b)=>(b.lastUsed||0)-(a.lastUsed||0)||b.created-a.created);else if(s==='mostUsed')list.sort((a,b)=>(b.useCount||0)-(a.useCount||0)||b.created-a.created);else if(s==='random'){if(randomOrder.length!==items.length) randomOrder=[...items].sort(()=>Math.random()-.5).map(x=>x.id);list.sort((a,b)=>randomOrder.indexOf(a.id)-randomOrder.indexOf(b.id));}else list.sort((a,b)=>b.created-a.created);if(detailFavSort&&prefs.view==='detail')list.sort((a,b)=>(b.fav?1:0)-(a.fav?1:0));list.sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0));return list;}
function actionButtons(x){return `<button data-copy="${x.id}">📋 コピー</button><button data-edit="${x.id}">✏️ 編集</button><button data-duplicate="${x.id}">📄 複製</button><button class="dangerMini" data-delete="${x.id}">🗑️ 削除</button>${x.source?`<button data-source="${x.id}">出典</button>`:''}`;}
function render(){
  prefs.view='detail';
  renderFilters();
  const q=$('search').value.toLowerCase().trim();
  const matches=x=>{
    const hay=[x.name,x.prompt,x.author,x.xhandle,x.memo,...(x.tags||[])].join(' ').toLowerCase();
    return(!q||hay.includes(q))&&[...filterTags].every(t=>(x.tags||[]).includes(t));
  };
  let topCards=items.filter(x=>!x.folderId&&matches(x));
  sortList(topCards);

  const folderRows=folders.map(f=>({type:'folder',folder:f,created:f.created||0}));
  let mixed=[...folderRows,...topCards.map(x=>({type:'card',card:x,created:x.created||0}))];
  if($('sort').value==='createdDesc')mixed.sort((a,b)=>b.created-a.created);
  if($('sort').value==='createdAsc')mixed.sort((a,b)=>a.created-b.created);
  if($('sort').value==='nameAsc')mixed.sort((a,b)=>(a.folder?.name||a.card?.name||'').localeCompare(b.folder?.name||b.card?.name||'','ja'));
  if($('sort').value==='nameDesc')mixed.sort((a,b)=>(b.folder?.name||b.card?.name||'').localeCompare(a.folder?.name||a.card?.name||'','ja'));
  if($('sort').value==='manual'){
    const order=Array.isArray(prefs.manualOrder)?prefs.manualOrder:[];
    const key=v=>v.type==='folder'?'folder:'+v.folder.id:v.card.id;
    mixed.sort((a,b)=>{
      const ai=order.indexOf(key(a)),bi=order.indexOf(key(b));
      if(ai<0&&bi<0)return 0;
      if(ai<0)return 1;if(bi<0)return -1;return ai-bi;
    });
  }

  $('count').textContent=`カード：${items.length}枚`;
  $('empty').classList.toggle('hidden',items.length>0||folders.length>0);
  $('cards').className='detailExplorer unifiedExplorer';

  const cardRows=(x,child=false)=>`<tr class="unifiedRow ${child?'folderChildRow':''}" data-row="${x.id}"${child?' data-folder-child="'+esc(x.folderId)+'"':''}><td><button class="tableIcon" data-fav="${x.id}" title="お気に入り">${x.fav?'★':'☆'}</button></td><td class="nameCell unifiedDragArea" title="${esc(x.name)}">${child?'<span class="folderBranch">└</span>':''}${x.image?`<img class="tinyThumb" src="${x.image}" alt="" loading="lazy" decoding="async">`:``}${x.pinned?'<span class="miniPin">📌</span>':''}<span class="rowName">${esc(x.name)}</span><span class="dragSpace" aria-hidden="true"></span></td><td><div class="tableActions"><button data-copy="${x.id}">📋 コピー</button><span class="detailMenuWrap"><button data-menu-toggle="${x.id}" aria-label="メニューを開く">⋯</button><div class="detailPopupMenu hidden" id="detailMenu-${x.id}"><button data-edit="${x.id}">✏️ 編集</button><button data-copy="${x.id}">📋 コピー</button><button data-move-folder="${x.id}">📁 フォルダへ移動</button>${child?`<button data-folder-remove="${x.id}">📤 フォルダから出す</button>`:''}<button data-pin="${x.id}">${x.pinned?'📌 ピン留めを解除':'📌 ピン留めする'}</button><button class="dangerMenu" data-delete="${x.id}">🗑️ 削除</button></div></span></div></td></tr><tr class="rowDetail hidden" id="rowDetail-${x.id}"><td colspan="3"><div class="unifiedCardDetail">${x.image?`<div class="unifiedThumb"><img src="${x.image}" alt="" loading="lazy" decoding="async"></div>`:'<div class="unifiedThumb unifiedNoImage"><span>サムネイル</span></div>'}<div class="unifiedCardBody"><div class="meta">${x.author?`作者：${esc(x.author)}`:'自作 / 作者未登録'}</div><div class="unifiedPrompt">${esc(x.prompt)}</div><div class="chips">${(x.tags||[]).map(t=>`<span class="chip">${esc(t)}</span>`).join('')}</div><div class="cardactions">${actionButtons(x)}</div></div></div></td></tr>`;

  const folderHtml=f=>{
    const open=openFolders.has(f.id), kids=items.filter(x=>x.folderId===f.id&&matches(x));
    let s=`<tr class="folderRow" data-folder="${f.id}" data-sort-key="folder:${f.id}"><td><span class="tableIcon">☆</span></td><td class="nameCell folderInteractArea" data-folder-toggle="${f.id}"><span class="folderNameBtn"><span>${open?'📂':'📁'}</span><span>${esc(f.name)}</span></span><span class="folderDragSpace" aria-label="フォルダを移動"></span></td><td><div class="tableActions folderActions"><span class="folderCountInline">${folderCount(f.id)}枚</span><span class="detailMenuWrap"><button class="folderMenuBtn" data-folder-menu-toggle="${f.id}" aria-label="フォルダのメニューを開く">⋯</button><div class="detailPopupMenu hidden"><button data-folder-rename="${f.id}">✏️ 名前を変更</button><button class="dangerMenu" data-folder-delete="${f.id}">🗑️ フォルダを削除</button></div></span></div></td></tr>`;
    if(open){
      if(kids.length)s+=kids.map(x=>cardRows(x,true)).join('');
      else s+=`<tr class="folderEmptyRow"><td colspan="3">このフォルダは空です</td></tr>`;
    }
    return s;
  };

  $('cards').innerHTML=`<div class="detailScroll"><table class="detailTable unifiedTable"><colgroup><col class="col-star"><col class="col-name"><col class="col-actions"></colgroup><thead><tr><th class="starCol">★</th><th>名前</th><th class="opCol">操作</th></tr></thead><tbody>${mixed.map(v=>v.type==='folder'?folderHtml(v.folder):cardRows(v.card)).join('')}</tbody></table></div>`;
  bindActions();
  bindFolderActions();
  updateUndo();
}
function initColumnResize(){
  const table=document.querySelector('.detailTable'); if(!table)return;
  const saved=JSON.parse(localStorage.getItem('promptPocket.columnWidths.v1')||'{}');
  const cols={name:table.querySelector('.col-name')};
  Object.entries(saved).forEach(([k,w])=>{if(cols[k]) cols[k].style.width=w+'px'});
  table.querySelectorAll('.colResizer').forEach(handle=>{
    handle.onpointerdown=e=>{
      if(window.innerWidth<=560)return;
      e.preventDefault(); e.stopPropagation();
      const key=handle.dataset.resize, col=cols[key]; if(!col)return;
      const startX=e.clientX, startW=col.getBoundingClientRect().width;
      handle.setPointerCapture?.(e.pointerId); document.body.classList.add('resizingCol');
      const move=ev=>{const w=Math.max(key==='name'?140:100,startW+ev.clientX-startX);col.style.width=w+'px'};
      const up=()=>{document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',up);document.body.classList.remove('resizingCol');const state={};Object.entries(cols).forEach(([k,c])=>state[k]=Math.round(c.getBoundingClientRect().width));localStorage.setItem('promptPocket.columnWidths.v1',JSON.stringify(state));};
      document.addEventListener('pointermove',move);document.addEventListener('pointerup',up,{once:true});
    };
  });
}

function getOpenDetailIds(){return [...document.querySelectorAll('.rowDetail:not(.hidden)')].map(r=>r.id.replace('rowDetail-',''))}function restoreOpenDetails(ids){ids.forEach(id=>$('rowDetail-'+id)?.classList.remove('hidden'))}function renderKeepingDetails(){const open=getOpenDetailIds();render();restoreOpenDetails(open)}
function saveManualOrderFromRows(){
  prefs.manualOrder=[...document.querySelectorAll('.unifiedRow')].map(r=>r.dataset.row);
  prefs.sort='manual';
  savePrefs();
  $('sort').value='manual';
}
function bindUnifiedReorder(){
  document.querySelectorAll('.unifiedRow').forEach(row=>{
    const area=row.querySelector('.unifiedDragArea'); if(!area)return;
    let timer=null,active=false,startX=0,startY=0;
    const clearTimer=()=>{if(timer){clearTimeout(timer);timer=null}};
    area.addEventListener('pointerdown',e=>{
      if(e.pointerType==='mouse'&&e.button!==0)return;
      if(e.target.closest('button,a,img'))return;
      startX=e.clientX;startY=e.clientY;active=false;
      timer=setTimeout(()=>{
        active=true;row.classList.add('dragging');navigator.vibrate?.(20);
        try{area.setPointerCapture(e.pointerId)}catch{}
      },800);
    });
    area.addEventListener('pointermove',e=>{
      if(!active){if(timer&&Math.hypot(e.clientX-startX,e.clientY-startY)>10)clearTimer();return}
      e.preventDefault();
      const target=document.elementFromPoint(e.clientX,e.clientY)?.closest?.('.unifiedRow');
      if(!target||target===row)return;
      const body=row.parentElement;
      const r=target.getBoundingClientRect();
      if(e.clientY<r.top+r.height/2)body.insertBefore(row,target);else body.insertBefore(row,target.nextSibling);
    });
    const finish=()=>{
      clearTimer();
      if(active){row.classList.remove('dragging');saveManualOrderFromRows();save();render();toast('並べ替えました')}
      active=false;
    };
    area.addEventListener('pointerup',finish);area.addEventListener('pointercancel',finish);
    area.addEventListener('contextmenu',e=>{if(active)e.preventDefault()});
  });
}


function saveUnifiedManualOrder(){
  const keys=[];
  document.querySelectorAll('.detailTable tbody > tr').forEach(r=>{
    if(r.classList.contains('folderChildRow')||r.classList.contains('rowDetail')||r.classList.contains('folderEmptyRow'))return;
    if(r.dataset.folder)keys.push('folder:'+r.dataset.folder);
    else if(r.dataset.row)keys.push(r.dataset.row);
  });
  prefs.manualOrder=keys;prefs.sort='manual';savePrefs();$('sort').value='manual';
}
function bindFolderReorder(){
  document.querySelectorAll('.folderRow').forEach(row=>{
    const handles=[...row.querySelectorAll('.folderInteractArea,.folderMenuBtn')];
    handles.forEach(handle=>{
      let timer=null,drag=false,sx=0,sy=0,suppressClick=false,ghost=null,ghostOffsetY=0,lastClick=0,lastClickX=0,lastClickY=0;
      const clear=()=>{if(timer){clearTimeout(timer);timer=null}};
      const toggleFolder=()=>{
        const id=row.dataset.folder;
        openFolders.has(id)?openFolders.delete(id):openFolders.add(id);
        render();
      };
      handle.addEventListener('pointerdown',e=>{
      if(e.pointerType==='mouse'&&e.button!==0)return;
      sx=e.clientX;sy=e.clientY;drag=false;suppressClick=false;
      timer=setTimeout(()=>{
        drag=true;suppressClick=true;row.classList.add('folderDragging');
        const r=row.getBoundingClientRect();
        ghost=row.cloneNode(true);ghost.className='folder-dnd-ghost';
        ghost.style.width=r.width+'px';ghost.style.left='0px';ghost.style.top='0px';
        ghost.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));
        document.body.appendChild(ghost);
        ghostOffsetY=Math.min(Math.max(sy-r.top,8),r.height-8);
        ghost.style.transform=`translate3d(${r.left}px,${sy-ghostOffsetY}px,0) scale(.985)`;
        navigator.vibrate?.(20);try{handle.setPointerCapture(e.pointerId)}catch{}
      },800);
      });
      handle.addEventListener('pointermove',e=>{
      if(!drag){if(timer&&Math.hypot(e.clientX-sx,e.clientY-sy)>10)clear();return}
      e.preventDefault();
      const r0=row.getBoundingClientRect();
      ghost.style.transform=`translate3d(${r0.left}px,${e.clientY-ghostOffsetY}px,0) scale(.985)`;
      const insertion=ppRootInsertion(row,e.clientY-ghostOffsetY);
      ppInsertLine(insertion);
      });
      const finish=e=>{
      clear();
      if(!drag)return;
      e.preventDefault();
      const insertion=ppRootInsertion(row,e.clientY-ghostOffsetY);
      row.classList.remove('folderDragging');
      ghost?.remove();ghost=null;
      ppInsertLine(null);
      if(insertion){
        const body=row.parentElement;
        const before=insertion.beforeKey?ppRootRows(row).find(r=>ppRootKey(r)===insertion.beforeKey):null;
        // Move an open folder together with its visible children/detail rows.
        // Moving only the header would leave its contents behind.
        const group=[row];
        let next=row.nextElementSibling;
        while(next&&!next.matches('tr.folderRow,tr.unifiedRow:not(.folderChildRow)')){
          group.push(next);next=next.nextElementSibling;
        }
        group.forEach(node=>body.insertBefore(node,before||null));
        saveUnifiedManualOrder();save();render();toast('フォルダを移動しました');
      }
      drag=false;
      setTimeout(()=>{suppressClick=false},50);
      };
      handle.addEventListener('pointerup',finish);
      handle.addEventListener('pointercancel',()=>{clear();drag=false;row.classList.remove('folderDragging');ghost?.remove();ghost=null;ppInsertLine(null)});
      handle.addEventListener('click',e=>{
        if(suppressClick){e.preventDefault();e.stopImmediatePropagation();return}
        if(!handle.classList.contains('folderInteractArea'))return;
        const now=Date.now();
        if(now-lastClick<650&&Math.hypot(e.clientX-lastClickX,e.clientY-lastClickY)<32){
          lastClick=0;e.preventDefault();e.stopImmediatePropagation();toggleFolder();
        }else{lastClick=now;lastClickX=e.clientX;lastClickY=e.clientY}
      },true);
    });
  });
}
function bindFolderActions(){
  bindFolderReorder();
  document.querySelectorAll('[data-folder-remove]').forEach(b=>b.onclick=()=>{
    const x=items.find(i=>i.id===b.dataset.folderRemove);if(!x)return;
    delete x.folderId;x.updated=Date.now();save();render();toast('フォルダから出しました');
  });
  document.querySelectorAll('[data-folder-menu-toggle]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    const menu=b.parentElement?.querySelector('.detailPopupMenu');
    document.querySelectorAll('.detailPopupMenu').forEach(m=>{if(m!==menu)m.classList.add('hidden')});
    menu?.classList.toggle('hidden');
  });
  document.querySelectorAll('[data-folder-rename]').forEach(b=>b.onclick=()=>{
    const f=folderById(b.dataset.folderRename);if(!f)return;
    const next=prompt('フォルダ名を変更',f.name);
    if(next===null)return;
    const name=next.trim();
    if(!name||/[\\/:*?"<>|]/.test(name)){alert('このフォルダ名は使えません。');return}
    f.name=name;saveFolders();render();
  });
  document.querySelectorAll('[data-folder-delete]').forEach(b=>b.onclick=()=>{
    const f=folderById(b.dataset.folderDelete);if(!f)return;
    const n=folderCount(f.id);
    if(!confirm(`⚠️ フォルダ「${f.name}」と中のカード${n}枚を削除します。\n\nこの操作は元に戻せません。`))return;
    items=items.filter(x=>x.folderId!==f.id);
    folders=folders.filter(x=>x.id!==f.id);
    openFolders.delete(f.id);
    saveFolders();save();render();toast('フォルダと中のカードを削除しました');
  });
}
let folderMoveCardId=null;
function openFolderMoveDialog(id){
  const card=items.find(x=>x.id===id);if(!card)return;
  if(!folders.length){toast('移動先のフォルダがありません');return}
  folderMoveCardId=id;
  $('folderMoveCardName').textContent=`「${card.name}」の移動先を選択`;
  const list=$('folderMoveList');
  list.innerHTML=folders.map(f=>`<button type="button" data-folder-move-target="${f.id}">📁 ${esc(f.name)} <span>（${folderCount(f.id)}枚）</span></button>`).join('');
  list.querySelectorAll('[data-folder-move-target]').forEach(b=>b.onclick=()=>{
    const x=items.find(i=>i.id===folderMoveCardId);if(!x)return;
    x.folderId=b.dataset.folderMoveTarget;x.updated=Date.now();
    openFolders.add(x.folderId);save();$('folderMoveDialog').close();render();toast('フォルダへ移動しました');
  });
  $('folderMoveDialog').showModal();
}
$('folderMoveCancel').onclick=()=>$('folderMoveDialog').close();
$('folderMoveDialog').addEventListener('cancel',e=>{e.preventDefault();$('folderMoveDialog').close()});
document.addEventListener('click',e=>{
  const b=e.target.closest?.('[data-move-folder]');
  if(!b)return;
  e.preventDefault();e.stopPropagation();openFolderMoveDialog(b.dataset.moveFolder);
});
function bindActions(){document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=()=>{snapshot('お気に入り変更');const x=items.find(i=>i.id===b.dataset.fav);x.fav=!x.fav;x.updated=Date.now();save();renderKeepingDetails()});document.querySelectorAll('[data-pin]').forEach(b=>b.onclick=()=>{const x=items.find(i=>i.id===b.dataset.pin);if(!x)return;if(!x.pinned&&items.filter(i=>i.pinned).length>=3){alert('📌 ピン留めできるのは3件までです。\n別のピンを解除してから追加してください。');return}const keepScrollY=window.scrollY;snapshot('ピン留め変更');x.pinned=!x.pinned;x.updated=Date.now();save();renderKeepingDetails();requestAnimationFrame(()=>window.scrollTo({top:keepScrollY,left:0,behavior:'auto'}))});document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=async()=>{const x=items.find(i=>i.id===b.dataset.copy);if(!x)return;let copied=false;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(x.prompt);copied=true}}catch{}if(!copied){const ta=document.createElement('textarea');ta.value=x.prompt;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';ta.style.pointerEvents='none';document.body.appendChild(ta);ta.focus();ta.select();ta.setSelectionRange(0,ta.value.length);try{copied=document.execCommand('copy')}catch{}ta.remove()}if(copied){x.useCount=(x.useCount||0)+1;x.lastUsed=Date.now();save();toast(`「${x.name}」をコピーしました`)}else{toast('コピーできませんでした')}});document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openEditor(items.find(i=>i.id===b.dataset.edit)));document.querySelectorAll('[data-duplicate]').forEach(b=>b.onclick=()=>duplicateItem(b.dataset.duplicate));document.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>deleteItem(b.dataset.delete));document.querySelectorAll('[data-source]').forEach(b=>b.onclick=()=>{const x=items.find(i=>i.id===b.dataset.source);window.open(x.source,'_blank','noopener')});document.querySelectorAll('[data-toggle-row]').forEach(b=>b.onclick=()=>{$('rowDetail-'+b.dataset.toggleRow)?.classList.toggle('hidden')});document.querySelectorAll('[data-menu-toggle]').forEach(b=>b.onclick=e=>{e.stopPropagation();const wrap=b.closest('.detailMenuWrap'),menu=wrap?.querySelector('.detailPopupMenu');document.querySelectorAll('.detailPopupMenu').forEach(m=>{if(m!==menu){m.classList.add('hidden');m.classList.remove('openUp')}});if(!menu)return;const opening=menu.classList.contains('hidden');menu.classList.toggle('hidden');menu.classList.remove('openUp');if(opening){const r=menu.getBoundingClientRect();const bottomNav=document.querySelector('.bottomnav');const safeBottom=bottomNav?Math.min(window.innerHeight,bottomNav.getBoundingClientRect().top):window.innerHeight;if(r.bottom>safeBottom-8&&wrap.getBoundingClientRect().top-r.height-5>8)menu.classList.add('openUp')}});document.querySelectorAll('.detailPopupMenu').forEach(m=>m.onclick=e=>e.stopPropagation());const favSortBtn=$('detailFavSortBtn');if(favSortBtn)favSortBtn.onclick=()=>{detailFavSort=!detailFavSort;if(prefs.rememberOps){prefs.detailFavSort=detailFavSort;savePrefs()}render()};bindPocketDnd();}


/* Prompt Pocket D&D BOUNDARY-CONFIRM TEST
   - ⋯ long press 0.8 sec
   - translucent ghost
   - NO insertion line
   - drop is valid when a real row boundary lies anywhere inside the ghost card height
   - invalid drop = silent cancel
   - valid drop = ask "この場所に挿入しますか？"
*/
let ppDnd=null;
const PP_ORDER_KEY='promptPocketManualOrder';
const PP_EDGE_SCROLL_ZONE=72;
function ppUpdateAutoScroll(st,y){
  const dir=y<PP_EDGE_SCROLL_ZONE?-1:y>window.innerHeight-PP_EDGE_SCROLL_ZONE?1:0;
  st.scrollDir=dir;
  if(!dir||st.scrollFrame)return;
  const step=()=>{
    if(ppDnd!==st||!st.active||!st.scrollDir){st.scrollFrame=null;return}
    window.scrollBy(0,st.scrollDir*13);
    st.scrollFrame=requestAnimationFrame(step);
  };
  st.scrollFrame=requestAnimationFrame(step);
}

function ppLoadOrder(){try{return JSON.parse(localStorage.getItem(PP_ORDER_KEY)||'[]')}catch{return[]}}
function ppSaveOrder(ids){localStorage.setItem(PP_ORDER_KEY,JSON.stringify(ids))}
function ppPoint(ev){const t=ev.changedTouches?.[0]||ev.touches?.[0]||ev;return{x:t.clientX,y:t.clientY}}
function ppRows(){return [...document.querySelectorAll('.detailTable tbody > tr[data-row]')]}

function ppFinishCancel(){
  if(!ppDnd)return;
  clearTimeout(ppDnd.timer);
  ppDnd.scrollDir=0;
  ppDnd.ghost?.remove();
  ppDnd.row?.classList.remove('pp-dnd-source');
  ppDnd.pcTarget?.classList.remove('pp-pc-drop-target');
  ppInsertLine?.(null);
  document.body.classList.remove('pp-dnd-active');
  ppDnd=null;
}

function ppBegin(row,x,y,source=row,pcMode=false){
  ppFinishCancel();
  const r=row.getBoundingClientRect();
  ppDnd={
    row,active:false,lastX:x,lastY:y,startX:x,startY:y,
    sourceTop:r.top,sourceBottom:r.bottom,
    offsetY:0,timer:null,ghost:null,ghostHeight:r.height,
    candidate:null,pcMode,pcTarget:null,source,scrollDir:0,scrollFrame:null
  };
  const st=ppDnd;
  st.timer=setTimeout(()=>ppStart(st),800);
}

function ppStart(st){
  if(ppDnd!==st)return;
  st.active=true;
  const handle=st.source?.matches?.('[data-menu-toggle]')?st.source:null;
  if(handle)handle.dataset.dndSuppress='1';
  st.row.classList.add('pp-dnd-source');
  document.body.classList.add('pp-dnd-active');
  navigator.vibrate?.(20);

  const r=st.row.getBoundingClientRect();
  const g=st.row.cloneNode(true);
  /* Prevent the detached ghost from auto-sizing its title/copy/menu columns. */
  const srcRect=st.row.getBoundingClientRect();
  g.style.width=srcRect.width+'px';
  g.style.minWidth=srcRect.width+'px';
  g.style.maxWidth=srcRect.width+'px';
  Array.from(st.row.children).forEach((cell,i)=>{
    const gc=g.children[i];
    if(!gc)return;
    const r=cell.getBoundingClientRect();
    gc.style.width=r.width+'px';
    gc.style.minWidth=r.width+'px';
    gc.style.maxWidth=r.width+'px';
    gc.style.boxSizing='border-box';
  });
  g.className='pp-dnd-ghost';
  g.style.width=r.width+'px';
  g.style.height=r.height+'px';
  g.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));
  document.body.appendChild(g);
  st.ghost=g;
  st.ghostHeight=r.height;
  st.offsetY=Math.min(Math.max(st.lastY-r.top,8),r.height-8);
  ppMove(st.lastX,st.lastY);
}

function ppBoundaries(st){
  const rows=ppRows().filter(r=>r!==st.row);
  const b=[];
  if(!rows.length)return b;
  // Boundary before first visible row.
  let r=rows[0].getBoundingClientRect();
  b.push({y:r.top,beforeId:rows[0].dataset.row});
  // Boundaries between visible rows.
  for(let i=1;i<rows.length;i++){
    const prev=rows[i-1].getBoundingClientRect();
    const cur=rows[i].getBoundingClientRect();
    b.push({y:(prev.bottom+cur.top)/2,beforeId:rows[i].dataset.row});
  }
  // Boundary after last visible row.
  r=rows[rows.length-1].getBoundingClientRect();
  b.push({y:r.bottom,beforeId:null});
  return b;
}

function ppFindBoundaryCandidate(st,ghostTop){
  const ghostBottom=ghostTop+st.ghostHeight;
  const ghostCenter=(ghostTop+ghostBottom)/2;
  const candidates=[];

  // A boundary is valid whenever its Y position lies anywhere inside
  // the ghost card's vertical span. No pixel tolerance is used.
  for(const b of ppBoundaries(st)){
    if(b.y>=ghostTop && b.y<=ghostBottom){
      candidates.push({
        beforeId:b.beforeId,
        boundaryY:b.y,
        distance:Math.abs(b.y-ghostCenter)
      });
    }
  }

  if(!candidates.length)return null;
  candidates.sort((a,b)=>a.distance-b.distance);
  return candidates[0];
}

/* D&D v2: the insertion point follows the TOP edge of the ghost card. */
function ppRootRows(exclude=null){
  return [...document.querySelectorAll('.detailTable tbody > tr.folderRow, .detailTable tbody > tr.unifiedRow:not(.folderChildRow)')]
    .filter(row=>row!==exclude);
}
function ppRootKey(row){return row.dataset.folder?'folder:'+row.dataset.folder:row.dataset.row}
function ppGroupBottom(row){
  let bottom=row.getBoundingClientRect().bottom;
  let next=row.nextElementSibling;
  while(next&&!next.matches('tr.folderRow,tr.unifiedRow:not(.folderChildRow)')){
    // Hidden detail rows have a zero-sized rectangle; they must not erase
    // the real bottom boundary of the last visible card.
    if(!next.classList.contains('hidden'))bottom=next.getBoundingClientRect().bottom;
    next=next.nextElementSibling;
  }
  return bottom;
}
function ppRootInsertion(sourceRow,ghostTop){
  const rows=ppRootRows(sourceRow);
  if(!rows.length)return null;
  const lines=[];
  rows.forEach(row=>{
    lines.push({y:row.getBoundingClientRect().top,beforeKey:ppRootKey(row)});
  });
  lines.push({y:ppGroupBottom(rows[rows.length-1]),beforeKey:null});
  lines.sort((a,b)=>Math.abs(a.y-ghostTop)-Math.abs(b.y-ghostTop));
  return lines[0];
}
function ppInsertLine(show){
  let line=document.getElementById('ppInsertLine');
  if(!show){line?.remove();return}
  if(!line){line=document.createElement('div');line.id='ppInsertLine';document.body.appendChild(line)}
  const table=document.querySelector('.detailTable');
  const r=table?.getBoundingClientRect();
  if(!r){line.remove();return}
  line.style.left=r.left+'px';line.style.top=(show.y-2)+'px';line.style.width=r.width+'px';
}
function ppCardInsertion(st,x,y){
  const folder=document.elementFromPoint(x,y)?.closest?.('tr[data-folder]');
  if(folder&&!st.row.classList.contains('folderRow')){
    const r=folder.getBoundingClientRect();
    const edge=Math.min(26,Math.max(16,r.height*.24));
    // The ghost card's TOP edge decides the folder zone, not the finger/cursor.
    // Moving upward: line below folder → folder body → line above folder.
    const ghostTop=y-st.offsetY;
    if(ghostTop>r.top+edge&&ghostTop<r.bottom-edge)return {kind:'folder',folderId:folder.dataset.folder};
  }
  return {kind:'line',...(ppRootInsertion(st.row,y-st.offsetY)||{})};
}
function ppCommitAtLine(st,beforeKey){
  const dragId=st.row.dataset.row;
  const card=items.find(x=>x.id===dragId);
  if(!card)return;
  const keys=ppRootRows(st.row).map(ppRootKey).filter(Boolean);
  let at=beforeKey?keys.indexOf(beforeKey):keys.length;
  if(at<0)at=keys.length;
  keys.splice(at,0,dragId);
  snapshot('並べ替え');
  delete card.folderId;
  card.updated=Date.now();
  prefs.manualOrder=keys;prefs.sort='manual';savePrefs();$('sort').value='manual';
  const rootCardIds=keys.filter(key=>!key.startsWith('folder:'));
  const map=new Map(items.map(x=>[x.id,x]));
  const ordered=rootCardIds.map(id=>map.get(id)).filter(Boolean);
  const rest=items.filter(x=>!rootCardIds.includes(x.id));
  items.splice(0,items.length,...ordered,...rest);
  save();render();toast('移動しました');
}
function ppRelease(st,x,y){
  const insert=ppCardInsertion(st,x,y);
  st.ghost?.remove();st.ghost=null;
  st.row.classList.remove('pp-dnd-source');
  st.pcTarget?.classList.remove('pp-pc-drop-target');
  document.querySelectorAll('.folderRow.folderDropTarget').forEach(row=>row.classList.remove('folderDropTarget'));
  document.body.classList.remove('pp-dnd-active');
  ppInsertLine(null);
  ppDnd=null;
  if(insert.kind==='folder'&&insert.folderId){
    const card=items.find(item=>item.id===st.row.dataset.row);
    if(card){card.folderId=insert.folderId;card.updated=Date.now();save();openFolders.add(insert.folderId);render();toast('フォルダに入れました')}
    return;
  }
  if(insert.beforeKey!==undefined)ppCommitAtLine(st,insert.beforeKey);
}

function ppMove(x,y){
  const st=ppDnd;if(!st?.active)return;
  st.lastX=x;st.lastY=y;
  ppUpdateAutoScroll(st,y);
  const sr=st.row.getBoundingClientRect();
  const ghostTop=y-st.offsetY;
  st.ghost.style.transform=`translate3d(${sr.left}px,${ghostTop}px,0) scale(.985)`;
  st.insert=ppCardInsertion(st,x,y);
  const folderEl=st.insert.kind==='folder'?document.querySelector(`tr[data-folder="${st.insert.folderId}"]`):null;
  document.querySelectorAll('.folderRow.folderDropTarget').forEach(r=>{if(r!==folderEl)r.classList.remove('folderDropTarget')});
  folderEl?.classList.add('folderDropTarget');
  ppInsertLine(st.insert.kind==='line'&&Number.isFinite(st.insert.y)?st.insert:null);
}


function ppPcTargetAt(x,y,st){
  if(!st?.active)return null;
  const el=document.elementFromPoint(x,y);
  const row=el?.closest?.('.detailTable tbody > tr[data-row]');
  if(!row||row===st.row)return null;
  return row;
}
function ppOverlapTarget(st,x,y){
  if(!st?.active)return null;
  const sourceRect=st.row.getBoundingClientRect();
  const left=sourceRect.left,right=sourceRect.right;
  const top=y-st.offsetY,bottom=top+st.ghostHeight;
  return ppRows().filter(row=>row!==st.row).map(row=>{
    const r=row.getBoundingClientRect();
    const vertical=Math.max(0,Math.min(bottom,r.bottom)-Math.max(top,r.top));
    const horizontal=Math.max(0,Math.min(right,r.right)-Math.max(left,r.left));
    return {row,area:vertical*horizontal,center:Math.abs((top+bottom)/2-(r.top+r.bottom)/2)};
  }).filter(x=>x.area>0).sort((a,b)=>b.area-a.area||a.center-b.center)[0]?.row||null;
}
function ppDropTargetAt(st,x,y){
  return ppOverlapTarget(st,x,y)||ppPcTargetAt(x,y,st)||st.pcTarget||null;
}
function ppSetPcTarget(st,row){
  if(st.pcTarget===row)return;
  st.pcTarget?.classList.remove('pp-pc-drop-target');
  st.pcTarget=row||null;
  st.pcTarget?.classList.add('pp-pc-drop-target');
}
function ppCommitPcBelow(st,targetRow){
  if(!targetRow)return;
  /* フォルダ内のカードを通常カードの上へ落としたら、対象カードの直下へ戻す。 */
  if(st.row.classList.contains('folderChildRow')&&!targetRow.classList.contains('folderChildRow')){
    const dragId=st.row.dataset.row,targetId=targetRow.dataset.row;
    const x=items.find(i=>i.id===dragId);
    if(!x||!targetId||dragId===targetId)return;
    const rootRows=[...document.querySelectorAll('.detailTable tbody > tr.folderRow, .detailTable tbody > tr.unifiedRow:not(.folderChildRow)')];
    const order=rootRows.map(r=>r.dataset.folder?'folder:'+r.dataset.folder:r.dataset.row).filter(Boolean).filter(id=>id!==dragId);
    const at=order.indexOf(targetId);
    if(at<0)return;
    snapshot('フォルダから移動');
    delete x.folderId;
    x.updated=Date.now();
    order.splice(at+1,0,dragId);
    prefs.manualOrder=order;prefs.sort='manual';savePrefs();$('sort').value='manual';
    save();render();toast('フォルダの外へ移動しました');
    return;
  }
  let order=ppRows().map(r=>r.dataset.row).filter(Boolean);
  const dragId=st.row.dataset.row;
  const targetId=targetRow.dataset.row;
  if(!dragId||!targetId||dragId===targetId)return;
  const original=[...order];
  order=order.filter(id=>id!==dragId);
  const ti=order.indexOf(targetId);
  if(ti<0)return;
  order.splice(ti+1,0,dragId);
  if(order.length===original.length&&order.every((id,i)=>id===original[i]))return;

  snapshot('並べ替え');
  ppSaveOrder(order);
  // Keep folder keys in the manual order.  A card move must never send all
  // folders to the fallback (bottom) position during the next render.
  const mixedOrder=[...document.querySelectorAll('.detailTable tbody > tr.folderRow, .detailTable tbody > tr.unifiedRow:not(.folderChildRow)')]
    .map(row=>row.dataset.folder?'folder:'+row.dataset.folder:row.dataset.row).filter(Boolean);
  const mixedWithoutDrag=mixedOrder.filter(key=>key!==dragId);
  const mixedTarget=mixedWithoutDrag.indexOf(targetId);
  if(mixedTarget>=0)mixedWithoutDrag.splice(mixedTarget+1,0,dragId);
  prefs.manualOrder=mixedWithoutDrag;
  prefs.sort='manual';
  savePrefs();
  $('sort').value='manual';
  const map=new Map(items.map(v=>[v.id,v]));
  const ordered=order.map(id=>map.get(id)).filter(Boolean);
  const rest=items.filter(v=>!order.includes(v.id));
  items.splice(0,items.length,...ordered,...rest);
  save();
  render();
  toast('移動しました');
}

function ppCommit(st,candidate){
  let order=ppRows().map(r=>r.dataset.row).filter(Boolean);
  const dragId=st.row.dataset.row;
  const from=order.indexOf(dragId);
  if(from<0)return;
  order.splice(from,1);
  let to=candidate.beforeId?order.indexOf(candidate.beforeId):order.length;
  if(to<0)to=order.length;
  order.splice(to,0,dragId);

  snapshot('並べ替え');
  ppSaveOrder(order);

  const map=new Map(items.map(v=>[v.id,v]));
  const ordered=order.map(id=>map.get(id)).filter(Boolean);
  const rest=items.filter(v=>!order.includes(v.id));
  items.splice(0,items.length,...ordered,...rest);
  save();
  render();
  toast('移動しました');
}

function ppDrop(e){
  const st=ppDnd;
  if(!st?.active){ppFinishCancel();return}
  const px=(e&&Number.isFinite(e.clientX))?e.clientX:st.lastX;
  const py=(e&&Number.isFinite(e.clientY))?e.clientY:st.lastY;
  ppRelease(st,px,py);
}

function toggleCardDetail(row){
  $('rowDetail-'+row.dataset.row)?.classList.toggle('hidden');
}
function bindCardPrimaryInteractions(row,area){
  let lastClick=0,lastClickX=0,lastClickY=0;
  area.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse'&&e.button!==0)return;
    ppBegin(row,e.clientX,e.clientY,area,e.pointerType==='mouse');
  });
  area.addEventListener('pointermove',e=>{
    if(ppDnd?.row===row&&!ppDnd.active&&Math.hypot(e.clientX-ppDnd.startX,e.clientY-ppDnd.startY)>10)ppFinishCancel();
  });
  area.addEventListener('pointercancel',()=>{if(ppDnd?.row===row&&!ppDnd.active)ppFinishCancel()});
  area.addEventListener('click',e=>{
    const now=Date.now();
    if(now-lastClick<650&&Math.hypot(e.clientX-lastClickX,e.clientY-lastClickY)<32){
      lastClick=0;
      e.preventDefault();
      if(ppDnd?.row===row&&!ppDnd.active)ppFinishCancel();
      toggleCardDetail(row);
    }else{lastClick=now;lastClickX=e.clientX;lastClickY=e.clientY}
  });
  area.addEventListener('pointerup',e=>{
    if(ppDnd?.row!==row||ppDnd.active)return;
    ppFinishCancel();
  });
}
function bindPocketDnd(){
  ppRows().forEach(row=>{
    const area=row.querySelector('.unifiedDragArea');
    if(area)bindCardPrimaryInteractions(row,area);
    const menu=row.querySelector('[data-menu-toggle]');
    // The ellipsis keeps its normal tap menu; holding it for 0.8 seconds starts D&D.
    if(menu){
      menu.addEventListener('pointerdown',e=>{
        if(e.pointerType==='mouse'&&e.button!==0)return;
        ppBegin(row,e.clientX,e.clientY,menu,e.pointerType==='mouse');
      });
      menu.addEventListener('pointermove',e=>{
        if(ppDnd?.row===row&&!ppDnd.active&&Math.hypot(e.clientX-ppDnd.startX,e.clientY-ppDnd.startY)>10)ppFinishCancel();
      });
      menu.addEventListener('pointercancel',()=>{if(ppDnd?.row===row&&!ppDnd.active)ppFinishCancel()});
      menu.addEventListener('click',e=>{
        if(menu.dataset.dndSuppress!=='1')return;
        delete menu.dataset.dndSuppress;e.preventDefault();e.stopImmediatePropagation();
      },true);
    }
  });
}
document.addEventListener('touchmove',e=>{
  if(!ppDnd)return;
  const p=ppPoint(e);
  if(ppDnd.active){
    e.preventDefault();
    ppMove(p.x,p.y);
    ppSetPcTarget(ppDnd,ppDropTargetAt(ppDnd,p.x,p.y));
  }
},{passive:false});
document.addEventListener('touchend',e=>{
  if(!ppDnd)return;
  if(ppDnd.active){
    const p=ppPoint(e);ppDnd.lastX=p.x;ppDnd.lastY=p.y;
    e.preventDefault();
    const st=ppDnd;
    ppRelease(st,p.x,p.y);
    return;
    const folderEl=document.elementFromPoint(p.x,p.y)?.closest?.('tr[data-folder]');
    const folderTarget=folderEl?.dataset.folder||st.folderTarget||null;
    const target=ppDropTargetAt(st,p.x,p.y);
    st.ghost?.remove();st.ghost=null;
    st.row.classList.remove('pp-dnd-source');
    st.pcTarget?.classList.remove('pp-pc-drop-target');
    document.querySelectorAll('.folderRow.folderDropTarget').forEach(r=>r.classList.remove('folderDropTarget'));
    document.body.classList.remove('pp-dnd-active');
    ppDnd=null;
    if(folderTarget){
      const x=items.find(i=>i.id===st.row.dataset.row);
      if(x){
        x.folderId=folderTarget;
        x.updated=Date.now();
        save();
        openFolders.add(folderTarget);
        render();
        toast('フォルダに入れました');
        return;
      }
    }
    if(target)ppCommitPcBelow(st,target);
  }else ppFinishCancel();
},{passive:false});
document.addEventListener('touchcancel',()=>ppFinishCancel());
document.addEventListener('pointermove',e=>{
  if(!ppDnd||e.pointerType==='touch')return;
  if(ppDnd.active){
    e.preventDefault();
    ppMove(e.clientX,e.clientY);
    if(ppDnd.pcMode)ppSetPcTarget(ppDnd,ppDropTargetAt(ppDnd,e.clientX,e.clientY));
  }
},{passive:false});
document.addEventListener('pointerup',e=>{
  if(!ppDnd||e.pointerType==='touch')return;
  if(ppDnd.active){
    ppDnd.lastX=e.clientX;ppDnd.lastY=e.clientY;
    const st=ppDnd;
    ppRelease(st,e.clientX,e.clientY);
    return;
    if(ppDnd.pcMode){
      const st=ppDnd;
      const folderEl=document.elementFromPoint(e.clientX,e.clientY)?.closest?.('tr[data-folder]');
      const folderTarget=folderEl?.dataset.folder||st.folderTarget||null;
      const target=ppDropTargetAt(st,e.clientX,e.clientY);
      st.ghost?.remove();st.ghost=null;
      st.row.classList.remove('pp-dnd-source');
      st.pcTarget?.classList.remove('pp-pc-drop-target');
      document.querySelectorAll('.folderRow.folderDropTarget').forEach(r=>r.classList.remove('folderDropTarget'));
      document.body.classList.remove('pp-dnd-active');
      ppDnd=null;
      if(folderTarget){
        const x=items.find(i=>i.id===st.row.dataset.row);
        if(x){
          x.folderId=folderTarget;
          x.updated=Date.now();
          save();
          openFolders.add(folderTarget);
          render();
          toast('フォルダに入れました');
          return;
        }
      }
      if(target)ppCommitPcBelow(st,target);
    }else ppDrop(e);
  }else ppFinishCancel();
});
document.addEventListener('pointercancel',e=>{if(e.pointerType!=='touch')ppFinishCancel()});
document.addEventListener('selectstart',e=>{if(e.target.closest?.('.unifiedDragArea, .folderInteractArea, [data-menu-toggle], .folderMenuBtn'))e.preventDefault()},true);
document.addEventListener('contextmenu',e=>{if(e.target.closest?.('.unifiedDragArea, .folderInteractArea, [data-menu-toggle], .folderMenuBtn'))e.preventDefault()},true);
document.addEventListener('dragstart',e=>{if(e.target.closest?.('.unifiedDragArea, .folderInteractArea, [data-menu-toggle], .folderMenuBtn'))e.preventDefault()},true);

document.addEventListener('click',e=>{if(!e.target.closest('.detailMenuWrap'))document.querySelectorAll('.detailPopupMenu').forEach(m=>m.classList.add('hidden'))});
function openEditor(x=null){$('form').reset();selectedTags=new Set(x?.tags||[]);activeTagForManage='';imageData=x?.image||'';$('editId').value=x?.id||'';$('dialogTitle').textContent=x?'プロンプトを編集':'プロンプトを登録';['name','prompt','author','xhandle','source','memo'].forEach(k=>$(k).value=x?.[k]||'');$('deleteBtn').classList.toggle('hidden',!x);updatePreview();renderTagChoices();document.body.classList.add('editor-open');$('editor').showModal();}
function updatePreview(){$('imagePreview').classList.toggle('hidden',!imageData);$('imagePreview').innerHTML=imageData?`<img src="${imageData}" alt="">`:'';}
function deleteItem(id){const x=items.find(i=>i.id===id);if(!x)return;if(confirm(`「${x.name}」を削除しますか？\nこの操作は「戻す」で復元できます。`)){snapshot('削除');items=items.filter(i=>i.id!==id);save();render();toast('削除しました')}}
function duplicateItem(id){const x=items.find(i=>i.id===id);if(!x)return;snapshot('複製');const now=Date.now();const copy={...structuredClone(x),id:crypto.randomUUID(),name:`${x.name} - コピー`,fav:false,pinned:false,created:now,updated:now};items.push(copy);save();render();toast('複製しました');openEditor(copy);}
$('newBtn').onclick=()=>openEditor();
const bottomNew=$('bottomNew');
let shortcutTimer=null,shortcutFired=false;
async function runQuickAdd(){
  let text='';
  try{if(navigator.clipboard?.readText)text=await navigator.clipboard.readText();else throw new Error('clipboard unavailable')}
  catch(err){toast('クリップボードを読み取れませんでした');return}
  if(!text.trim()){toast('クリップボードに文字がありません');return}
  openEditor();$('prompt').value=text;$('prompt').dispatchEvent(new Event('input',{bubbles:true}));toast('コピー中のプロンプトを読み込みました');
}
bottomNew.onclick=e=>{if(shortcutFired){shortcutFired=false;e.preventDefault();return}openEditor()};
bottomNew.onpointerdown=e=>{if(!prefs.shortcutEnabled)return;shortcutFired=false;clearTimeout(shortcutTimer);shortcutTimer=setTimeout(()=>{shortcutFired=true;runQuickAdd()},prefs.shortcutDelay)};
['pointerup','pointercancel','pointerleave'].forEach(ev=>bottomNew.addEventListener(ev,()=>clearTimeout(shortcutTimer)));
bottomNew.addEventListener('contextmenu',e=>{if(prefs.shortcutEnabled)e.preventDefault()});
function closeEditor(){ $('editor').close();document.body.classList.remove('editor-open') }
$('cancelBtn').onclick=closeEditor;$('editorCloseBtn').onclick=closeEditor;$('search').oninput=render;$('sort').onchange=()=>{randomOrder=[];if(prefs.rememberOps){prefs.sort=$('sort').value;savePrefs()}render()};$('clearFilters').onclick=()=>{$('search').value='';filterTags.clear();render()};$('undoBtn').onclick=()=>{if(!undoState)return;if(!confirm('前の状態に戻しますか？\n\n直前の操作を取り消して、前の状態に戻します。'))return;const current=structuredClone(items);items=structuredClone(undoState.items);undoState={label:'元に戻す前の状態',items:current};save();render();toast('前の状態に戻しました')};
$('deleteAllBtn').onclick=()=>{const n=items.length;if(!confirm(`⚠️ Prompt Pocketのデータをすべてリセットします。\n\n登録プロンプト ${n}件に加えて、表示設定・カスタムタグも初期化されます。\nこの操作は元に戻せません。\n続けますか？`))return;if(!confirm(`最終確認\n本当にすべてのデータをリセットしますか？\nリセット後は「（見本）雨上がりの少女」だけが復帰します。`))return;localStorage.removeItem(KEY);localStorage.removeItem(LEGACY_KEY);localStorage.removeItem(PREF_KEY);localStorage.removeItem('promptPocket.columnWidths.v1');items=[];undoState=null;customTags.clear();prefs={view:'card',welcomed:false,tagOrder:[],hiddenTags:[],rememberOps:false,shortcutEnabled:true,longPressAllButtonsEnabled:false,shortcutDelay:800,customTags:[]};addWelcomeSample();save();savePrefs();render();toast('全データをリセットし、見本プロンプトを復帰しました')};
$('addTagBtn').onclick=()=>{const t=$('customTag').value.trim();if(!t)return;customTags.add(t);prefs.hiddenTags=prefs.hiddenTags.filter(x=>x!==t);if(!prefs.tagOrder.includes(t))prefs.tagOrder.push(t);selectedTags.add(t);activeTagForManage=t;$('customTag').value='';savePrefs();renderTagChoices()};
$('deleteTagBtn').onclick=()=>{const tag=activeTagForManage;if(!tag)return;const count=items.filter(x=>(x.tags||[]).includes(tag)).length;if(!confirm(`タグ「${tag}」は${count}件で使用されています。
削除すると、これらのプロンプトからこのタグだけが削除されます。
プロンプト本体は削除されません。

このタグを削除しますか？`))return;snapshot('タグ削除');items.forEach(x=>x.tags=(x.tags||[]).filter(t=>t!==tag));selectedTags.delete(tag);customTags.delete(tag);filterTags.delete(tag);if(!prefs.hiddenTags.includes(tag))prefs.hiddenTags.push(tag);prefs.tagOrder=prefs.tagOrder.filter(t=>t!==tag);activeTagForManage='';save();savePrefs();renderTagChoices();render();toast('タグを削除しました')};
function loadImageFile(f){
  if(!f||!f.type.startsWith('image/')){if(f)alert('画像ファイルを選んでください。');return}
  const r=new FileReader();
  r.onload=()=>{
    const img=new Image();
    img.onload=()=>{
      const MAX=800;
      let w=img.naturalWidth,h=img.naturalHeight;
      const scale=Math.min(1,MAX/Math.max(w,h));
      w=Math.max(1,Math.round(w*scale));h=Math.max(1,Math.round(h*scale));
      const c=document.createElement('canvas');c.width=w;c.height=h;
      c.getContext('2d').drawImage(img,0,0,w,h);
      imageData=c.toDataURL('image/jpeg',0.70);
      updatePreview();
    };
    img.onerror=()=>alert('画像を読み込めませんでした。');
    img.src=r.result;
  };
  r.readAsDataURL(f)
}
$('image').onchange=e=>loadImageFile(e.target.files[0]);
const imageDropZone=$('imageDropZone');
let imageShortcutTimer=null,imageShortcutFired=false;
async function pasteClipboardImage(){
  try{
    if(!navigator.clipboard?.read)throw new Error('clipboard image read unavailable');
    const clipItems=await navigator.clipboard.read();
    for(const item of clipItems){
      const type=item.types.find(t=>t.startsWith('image/'));
      if(type){const blob=await item.getType(type);loadImageFile(blob);toast('クリップボードの画像を貼り付けました');return}
    }
    toast('クリップボードに画像がありません');
  }catch(err){toast('クリップボードの画像を読み取れませんでした')}
}
imageDropZone.onclick=e=>{if(imageShortcutFired){imageShortcutFired=false;e.preventDefault();return}$('image').click()};
imageDropZone.onpointerdown=()=>{if(!prefs.shortcutEnabled)return;imageShortcutFired=false;clearTimeout(imageShortcutTimer);imageShortcutTimer=setTimeout(()=>{imageShortcutFired=true;pasteClipboardImage()},prefs.shortcutDelay||800)};
['pointerup','pointercancel','pointerleave'].forEach(ev=>imageDropZone.addEventListener(ev,()=>clearTimeout(imageShortcutTimer)));
imageDropZone.addEventListener('contextmenu',e=>{if(prefs.shortcutEnabled)e.preventDefault()});
imageDropZone.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('image').click()}};
$('imageDropZone').ondragover=e=>{e.preventDefault();$('imageDropZone').classList.add('dragOver')};$('imageDropZone').ondragleave=()=>$('imageDropZone').classList.remove('dragOver');$('imageDropZone').ondrop=e=>{e.preventDefault();$('imageDropZone').classList.remove('dragOver');loadImageFile(e.dataTransfer.files[0])};
$('pastePromptBtn').onclick=async()=>{const field=$('prompt');let text='';try{if(navigator.clipboard?.readText){text=await navigator.clipboard.readText()}else{throw new Error('clipboard unavailable')}}catch(err){alert('クリップボードを読み取れませんでした。\nブラウザの権限設定を確認するか、入力欄を長押しして貼り付けてください。');return}if(!text)return toast('クリップボードに文字がありません');if(field.value.trim()&&!confirm('現在のプロンプトは上書きされます。\n貼り付けますか？'))return;field.value=text;field.dispatchEvent(new Event('input',{bubbles:true}));field.focus();toast('プロンプトを貼り付けました')};
$('form').onsubmit=e=>{e.preventDefault();const id=$('editId').value||crypto.randomUUID();const old=items.find(x=>x.id===id);snapshot(old?'編集':'新規登録');const now=Date.now();const obj={id,name:$('name').value.trim(),prompt:$('prompt').value.trim(),author:$('author').value.trim(),xhandle:$('xhandle').value.trim(),source:$('source').value.trim(),memo:$('memo').value.trim(),tags:[...selectedTags],image:imageData,fav:old?.fav||false,pinned:old?.pinned||false,useCount:old?.useCount||0,lastUsed:old?.lastUsed||0,created:old?.created||now,updated:now};if(!obj.name||!obj.prompt)return;const before=items;items=old?items.map(x=>x.id===id?obj:x):[...items,obj];if(!save()){items=before;return}$('editor').close();document.body.classList.remove('editor-open');render();toast('保存しました')};
$('deleteBtn').onclick=()=>{const id=$('editId').value;if(!id)return;const x=items.find(i=>i.id===id);if(x&&confirm(`「${x.name}」を削除しますか？\nこの操作は「戻す」で復元できます。`)){snapshot('削除');items=items.filter(i=>i.id!==id);save();$('editor').close();document.body.classList.remove('editor-open');render();toast('削除しました')}};


let optionPrefsBackup=null;
const openOptions=()=>{optionPrefsBackup=structuredClone(prefs);$('rememberOps').checked=!!prefs.rememberOps;$('shortcutEnabled').checked=!!prefs.shortcutEnabled;$('longPressAllButtonsEnabled').checked=!!prefs.longPressAllButtonsEnabled;$('shortcutDelay').value=String(prefs.shortcutDelay||800);$('shortcutDelay').disabled=!(prefs.shortcutEnabled||prefs.longPressAllButtonsEnabled);$('optionDialog').showModal()};
function openSearchKeepingScroll(){
  const y=window.scrollY||document.documentElement.scrollTop;
  $('searchPanel').classList.remove('hidden');
  try{$('search').focus({preventScroll:true})}catch{$('search').focus()}
  requestAnimationFrame(()=>window.scrollTo({top:y,behavior:'auto'}));
}
$('viewOptionBtn').onclick=openOptions;

/* TEST34: 「＋追加」以外のすべての button を、設定ON時だけ共通の長押し操作にする。
   キーボード操作やコードからの .click() は従来どおり通し、実際のポインター短押しだけ抑止する。 */
let ppAllButtonHold=null;
function ppLongPressTarget(target){
  const btn=target?.closest?.('button');
  if(!btn||btn.disabled||btn.id==='bottomNew')return null;
  return btn;
}
function ppCancelAllButtonHold(){
  if(!ppAllButtonHold)return;
  clearTimeout(ppAllButtonHold.timer);
  ppAllButtonHold=null;
}
document.addEventListener('pointerdown',e=>{
  if(!prefs.longPressAllButtonsEnabled)return;
  if(e.pointerType==='mouse'&&e.button!==0)return;
  const btn=ppLongPressTarget(e.target);
  if(!btn)return;
  ppCancelAllButtonHold();
  const st={btn,pointerId:e.pointerId,x:e.clientX,y:e.clientY,timer:null};
  st.timer=setTimeout(()=>{
    if(ppAllButtonHold!==st)return;
    ppAllButtonHold=null;
    if(btn.isConnected&&!btn.disabled)btn.click();
  },Number(prefs.shortcutDelay)||800);
  ppAllButtonHold=st;
},true);
document.addEventListener('pointermove',e=>{
  const st=ppAllButtonHold;
  if(!st||e.pointerId!==st.pointerId)return;
  if(Math.hypot(e.clientX-st.x,e.clientY-st.y)>12)ppCancelAllButtonHold();
},true);
['pointerup','pointercancel'].forEach(type=>document.addEventListener(type,e=>{
  if(ppAllButtonHold&&e.pointerId===ppAllButtonHold.pointerId)ppCancelAllButtonHold();
},true));
document.addEventListener('click',e=>{
  if(!prefs.longPressAllButtonsEnabled||e.detail===0)return;
  const btn=ppLongPressTarget(e.target);
  if(!btn)return;
  e.preventDefault();
  e.stopImmediatePropagation();
},true);
document.addEventListener('contextmenu',e=>{
  if(!prefs.longPressAllButtonsEnabled)return;
  if(ppLongPressTarget(e.target))e.preventDefault();
},true);
/* TEST34: 検索/ヘルプの個別長押しは廃止。通常動作を共通長押しゲートに通す。 */
$('searchMobile').onclick=()=>openSearchKeepingScroll();
$('helpMobile').onclick=()=>openMainHelp();

$('optionSave').onclick=()=>{optionPrefsBackup=null;$('optionDialog').close();toast('オプションを保存しました')};
$('optionCancel').onclick=()=>{if(optionPrefsBackup){prefs=structuredClone(optionPrefsBackup);savePrefs();detailFavSort=!!prefs.detailFavSort;render()}optionPrefsBackup=null;$('optionDialog').close()};
$('deleteAllMobile').onclick=()=>{$('optionDialog').close();$('deleteAllBtn').click()};$('rememberOps').onchange=e=>{prefs.rememberOps=e.target.checked;if(prefs.rememberOps){prefs.view=prefs.view||'card';prefs.sort=$('sort').value;prefs.detailFavSort=detailFavSort}else{delete prefs.sort;delete prefs.detailFavSort;detailFavSort=false}savePrefs();toast(prefs.rememberOps?'操作状態を記憶します':'操作状態の記憶をOFFにしました')};
$('shortcutEnabled').onchange=e=>{prefs.shortcutEnabled=e.target.checked;$('shortcutDelay').disabled=!(prefs.shortcutEnabled||prefs.longPressAllButtonsEnabled);savePrefs();toast(prefs.shortcutEnabled?'長押しショートカットをONにしました':'長押しショートカットをOFFにしました')};$('longPressAllButtonsEnabled').onchange=e=>{prefs.longPressAllButtonsEnabled=e.target.checked;$('shortcutDelay').disabled=!(prefs.shortcutEnabled||prefs.longPressAllButtonsEnabled);savePrefs();toast(prefs.longPressAllButtonsEnabled?'ボタンを長押しで実行します':'ボタンは通常タップで実行します')};
$('shortcutDelay').onchange=e=>{prefs.shortcutDelay=Number(e.target.value)||800;savePrefs();toast('長押し時間を変更しました')};
$('optionDialog').addEventListener('cancel',e=>{e.preventDefault();$('optionCancel').click()});

$('exportBtn').onclick=()=>{syncTagOrder();const data={app:'Prompt Pocket',version:APP_VERSION,exportedAt:new Date().toISOString(),items,folders,prefs,customTags:[...customTags]};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`prompt-pocket-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('バックアップを保存しました')};
$('importBtn').onclick=()=>$('importFile').click();
$('importFile').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const data=JSON.parse(await f.text());const restored=Array.isArray(data)?data:data.items;if(!Array.isArray(restored))throw new Error();const ok=confirm(`⚠️ データを読み込みますか？\n\n現在保存されている${items.length}件のデータは削除され、読み込んだ${restored.length}件のデータに置き換わります。\nこの操作は元に戻せません。`);if(!ok)return;items=restored;folders=Array.isArray(data.folders)?data.folders:[];normalize();if(data.prefs&&typeof data.prefs==='object'){prefs={...prefs,...data.prefs};prefs.tagOrder=Array.isArray(prefs.tagOrder)?prefs.tagOrder:[];prefs.hiddenTags=Array.isArray(prefs.hiddenTags)?prefs.hiddenTags:[];if(!Object.prototype.hasOwnProperty.call(data.prefs,'longPressAllButtonsEnabled'))prefs.longPressAllButtonsEnabled=!!data.prefs.longPressHelpEnabled||!!data.prefs.longPressSearchEnabled;else prefs.longPressAllButtonsEnabled=!!data.prefs.longPressAllButtonsEnabled;delete prefs.longPressHelpEnabled;delete prefs.longPressSearchEnabled;}customTags=new Set(Array.isArray(data.customTags)?data.customTags:[]);prefs.customTags=[...customTags];undoState=null;save();saveFolders();savePrefs();$('optionDialog').close();render();toast('データを復元しました')}catch{alert('このデータファイルは読み込めませんでした。')}finally{e.target.value=''}};


/* TEST41: 正式サンプル管理 */
const sampleCatalog={"practical":[{"key":"three-view","name":"三面図","prompt":"てんぷしたきゃらくたーがぞうをさんしょうして、おなじきゃらくたーのさんめんずをさくせいしてください。しょうめん・まよこ・はいめんのぜんしんをよこいちれつにならべ、かみがた、かおだち、たいかく、いしょう、そうしょく、はいしょくをとういつしてください。かくほうこうででざいんがむじゅんしないようにし、せっていしりょうとしてかくにんしやすいしんぷるなはいけいとれいあうとにしてください。","tags":["🖼️ 画像","アニメ","女の子"],"image":"assets/media/prompt-pocket-05.webp"},{"key":"character-sheet","name":"キャラクターシート","prompt":"てんぷしたがぞうのきゃらくたーをさんしょうして、きゃらくたーしーとをさくせいしてください。きゃらくたーのでざいん、かみがた、いしょう、そうしょく、はいしょくなどのとくちょうをいじし、ぜんしんず、かおのあっぷ、だいひょうてきなひょうじょうやぽーずをみやすくはいちしてください。おなじきゃらくたーとしてとういつかんをたもち、せっていしりょうとしてつかいやすいしんぷるなれいあうとにしてください。","tags":["🖼️ 画像","アニメ","女の子"],"image":"assets/media/prompt-pocket-06.webp"},{"key":"expressions","name":"表情差分","prompt":"てんぷしたきゃらくたーがぞうをさんしょうして、おなじきゃらくたーでざいんをいじしたままふくすうのひょうじょうさぶんをさくせいしてください。つうじょう、えがお、うぃんく、てれ、すこしかなしそう、おどろき、むすっとしたひょうじょう、かんがえちゅう、にっこり、ねむそうなど、わかりやすくことなるひょうじょうをならべてください。かみがた、かおだち、いしょう、はいしょくはかえず、かおのひょうじょうだけがしぜんにへんかするようにしてください。","tags":["🖼️ 画像","アニメ","女の子","可愛い"],"image":"assets/media/prompt-pocket-07.webp"}],"style":[{"key":"fantasy-art","name":"幻想アート","prompt":"きょだいなまんげつのしたにひろがる、えいがのようにちょうみつどでげんそうてきなあにめふうのせかい。ながれるようなとうめいかんのあるあおとしろのどれすをまとったわかいじょせいが、はなとつたにおおわれたいせきからこちらへてをのばしている。くろいかみ、りぼん、はなびら、ひかるちょうがよるかぜにただよい、そばにはちいさなしろいねこがいる。おくには、しろ、はし、たき、とう、うかぶしま、みずかがみ、らんたん、すいしょう、てんたいのそうしょくでかざられたひかりかがやくとしがひろがる。あお、むらさき、ぴんく、きんいろのゆめのようなひかりと、ほし、きり、きらめきにつつまれた、おくゆきのあるげんそうてきなふんいき。","tags":["🖼️ 画像","アニメ","ファンタジー","女の子"],"image":"assets/media/prompt-pocket-08.webp"},{"key":"handdrawn","name":"手描きイラスト風","prompt":"あらくいろえんぴつでえがいた、いきいきとしたあにめふうのいらすと。ひざしのあたるまちのかいだんにえがおのしょうじょがすわり、かたほうのてでほおをささえながらまえにみをのりだし、もうかたほうのてをこちらへのばしている。かぜになびくくろいかみ、かじゅあるなしゃつ、でにむしょーつ、ばっぐを、らふでいろあざやかなせんでえがく。てすり、たてもの、でんちゅう、でんせん、しょくぶつ、はな、かんばん、とおくのまちなみをすけっちのようにえがき、あたたかいかみのしつかん、はっちんぐのかげ、ぱすてるちょうのらくがきのようなせんで、えこんてのようないきおいのあるふんいきにする。よめるもじはいれない。","tags":["🖼️ 画像","アニメ","女の子"],"image":"assets/media/prompt-pocket-09.webp"},{"key":"deformed","name":"デフォルメ・マスコット","prompt":"しろいむじのはいけいに、ひとりのかわいらしいでふぉるめされたあにめふうのしょうじょをえがく。ふとくはっきりしたりんかくせん、くっきりしたせるぬり、ぱすてるちょうのはいらいと、つやのあるおおきなひとみ、あざやかでやわらかなはいしょくにする。しょうじょはかたほうのひざをあげてまえにふみだすようにみをのりだし、おおきくえがかれたてでぴーすさいんをこちらへのばし、うぃんくしながらあかるくえがおをみせる。ながれるようなくらいちゃいろのかみにはいろどりのあるはいらいととあわいいろのへあぴんをつける。ゆったりしたしろいしゃつ、だめーじのあるうすあおのでにむしょーつ、べると、ぴんくのさし色がはいったぼりゅーむのあるすにーかー、きんいろのかなぐがついたくらいいろのばっぐをみにつける。","tags":["🖼️ 画像","アニメ","可愛い","女の子"],"image":"assets/media/prompt-pocket-10.webp"}],"arrange":[]};
let sampleStaging=[];
let sampleGuideTimer=null;
function sampleCurrentList(){return sampleCatalog[$('sampleCategory').value]||[]}
function refreshSampleChoices(){
 const sel=$('sampleChoice'), list=sampleCurrentList();
 sel.innerHTML='';
 if(!list.length){
   const o=document.createElement('option');o.value='';o.textContent='準備中';sel.appendChild(o);sel.disabled=true;$('sampleAdd').disabled=true;
 }else{
   sel.disabled=false;$('sampleAdd').disabled=false;
   list.forEach(x=>{const o=document.createElement('option');o.value=x.key;o.textContent=x.name;sel.appendChild(o)});
 }
 renderSamplePreview();
}
function getSelectedSample(){
 const key=$('sampleChoice').value;
 return sampleCurrentList().find(x=>x.key===key)||null;
}
function renderSamplePreview(){
 const x=getSelectedSample(), box=$('samplePreview');
 if(!x){box.innerHTML='<div style="grid-column:1/-1;text-align:center;color:#999;padding:28px 8px">この項目のサンプルは準備中です</div>';return}
 box.innerHTML='';
 const img=document.createElement('img');img.src=x.image;img.alt=x.name;
 const d=document.createElement('div'),h=document.createElement('h3'),p=document.createElement('p');
 h.textContent=x.name;p.textContent=x.prompt;
 d.append(h,p);box.append(img,d);
}
function renderSampleQueue(lastKey=''){
 const box=$('sampleQueue');box.innerHTML='';
 if(!sampleStaging.length){box.innerHTML='<div class="sampleQueueEmpty">まだ追加されていません</div>';return}
 sampleStaging.forEach((x,i)=>{
   const row=document.createElement('div');row.className='sampleQueueRow'+(x.uid===lastKey?' sampleJustAdded':'');
   const name=document.createElement('strong');name.textContent=(x.uid===lastKey?'✓ ':'')+x.name;
   const del=document.createElement('button');del.type='button';del.className='ghost';del.textContent='削除';
   del.onclick=()=>{sampleStaging.splice(i,1);renderSampleQueue()};
   row.append(name,del);box.appendChild(row);
 });
}
function resetSampleStaging(){sampleStaging=[];renderSampleQueue();clearTimeout(sampleGuideTimer);$('sampleGuide').textContent='項目とサンプルを選んで、追加ボタンを押してください'}
function openSampleDialog(){resetSampleStaging();refreshSampleChoices();$('sampleDialog').showModal()}
$('sampleBtn').onclick=openSampleDialog;
$('sampleCategory').onchange=refreshSampleChoices;
$('sampleChoice').onchange=renderSamplePreview;
$('sampleAdd').onclick=()=>{
 const x=getSelectedSample();if(!x)return;
 const uid=x.key+'-'+Date.now()+'-'+Math.random();
 sampleStaging.push({...x,uid});
 renderSampleQueue(uid);
 clearTimeout(sampleGuideTimer);
 $('sampleGuide').textContent='✓ 「'+x.name+'」を追加しました。下の一覧に追加されています。';
 sampleGuideTimer=setTimeout(()=>{$('sampleGuide').textContent='項目とサンプルを選んで、追加ボタンを押してください'},1600);
};
$('sampleExecute').onclick=()=>{
 if(!sampleStaging.length){toast('追加するサンプルがありません');return}
 snapshot('サンプル追加');
 const now=Date.now();
 sampleStaging.forEach((x,i)=>items.push({
   id:crypto.randomUUID(),presetKey:x.key,name:x.name,prompt:x.prompt,author:'',xhandle:'',source:'',
   memo:'Prompt Pocketに用意されているサンプルプロンプトです。自由に編集して使えます。',
   tags:[...x.tags],image:x.image,pinned:false,fav:false,favorite:false,useCount:0,lastUsed:0,created:now+i,updated:now+i,createdAt:now+i,updatedAt:now+i
 }));
 const n=sampleStaging.length;save();render();resetSampleStaging();$('sampleDialog').close();toast(n+'件追加しました');
};
function closeSampleDialog(){resetSampleStaging();$('sampleDialog').close()}
$('sampleCancel').onclick=closeSampleDialog;
$('sampleClose').onclick=closeSampleDialog;
$('sampleDialog').addEventListener('cancel',e=>{e.preventDefault();closeSampleDialog()});

const toggleSearchPanel=()=>{
  if($('searchPanel').classList.contains('hidden'))openSearchKeepingScroll();
  else $('searchPanel').classList.add('hidden');
};
$('searchToggleBtn').onclick=()=>toggleSearchPanel();
$('closeSearch').onclick=()=>$('searchPanel').classList.add('hidden');
const openMainHelp=()=>{$('simpleHelp').classList.remove('hidden');$('detailHelp').classList.add('hidden');$('usefulHelp').classList.add('hidden');$('helpTitle').textContent='Help';$('helpDialog').showModal()};
$('helpBtn').onclick=()=>openMainHelp();
$('helpClose').onclick=()=>$('helpDialog').close();
$('usefulHelpBtn').onclick=()=>{$('simpleHelp').classList.add('hidden');$('detailHelp').classList.add('hidden');$('usefulHelp').classList.remove('hidden');$('helpTitle').textContent='便利機能'};
$('moreHelpBtn').onclick=()=>{$('simpleHelp').classList.add('hidden');$('usefulHelp').classList.add('hidden');$('detailHelp').classList.remove('hidden');$('helpTitle').textContent='詳しい使い方'};
$('backSimpleHelp').onclick=()=>{$('detailHelp').classList.add('hidden');$('usefulHelp').classList.add('hidden');$('simpleHelp').classList.remove('hidden');$('helpTitle').textContent='Help'};
$('migrationHelpBtn').onclick=()=>{$('optionDialog').close();$('migrationDialog').showModal()};$('migrationClose').onclick=()=>$('migrationDialog').close();

let welcomeIsDebug=false;
$('welcomeStart').onclick=()=>{
  // Ver.1.0: 通常の初回ウェルカム + 登録0件のときだけ見本を1件登録する。
  // デバッグ強制ウェルカムや既存データがある場合は絶対に初期化しない。
  const shouldSeed=!welcomeIsDebug&&!prefs.welcomed&&items.length===0;
  if(shouldSeed&&addWelcomeSample()) save();
  prefs.welcomed=true;savePrefs();$('welcomeDialog').close();
  welcomeIsDebug=false;
  // ダイアログを閉じた後のDOM状態で再描画し、初回からカードを確実に表示する。
  requestAnimationFrame(()=>{render();$('sampleGuideDialog').showModal();});
};$('sampleGuideClose').onclick=()=>$('sampleGuideDialog').close();
$('debugBtn').onclick=()=>{if(!confirm('⚠ 開発者向け機能\n\nここには動作確認用の機能が含まれています。\n通常の利用では使用しないでください。\n\n開発者モードを開きますか？'))return;$('optionDialog').close();$('debugDialog').showModal()};$('debugClose').onclick=()=>$('debugDialog').close();
const debugSamples=[
['ねこのかいもの','かわいい猫が魚屋で買い物をしている。手書き風イラスト、パステルカラー。'],
['雨上がりの猫耳少女','雨上がりの街を歩く猫耳少女。水たまりに光が反射している。アニメイラスト、柔らかな色彩。'],
['森を歩く少女','深い森の小道を歩く黒髪の少女。木漏れ日、ファンタジー、絵本のような雰囲気。'],
['夜の街とキツネ','ネオンが輝く夜の街に佇む小さなキツネ。シネマティック、青い夜景。'],
['空飛ぶ列車','雲の上を走るレトロな列車。夕焼け空、幻想的、アニメ背景美術。'],
['小さなドラゴン','机の上で眠る手のひらサイズのドラゴン。可愛い、暖かな室内光、精密なイラスト。'],
['海辺のロボット','夕暮れの海辺を歩く古いロボット。波打ち際、ノスタルジック、映画的構図。'],
['魔法使いの書斎','本に囲まれた魔法使いの書斎。浮遊する光、アンティーク、ファンタジー。'],
['カフェの白猫','窓辺のカフェでくつろぐ白猫。朝の光、パステルカラー、手書き風。'],
['宇宙を泳ぐクジラ','星空の宇宙をゆっくり泳ぐ巨大なクジラ。幻想的、壮大、青い光。']
];
function addDebugCards(n){snapshot('テストカード追加');const now=Date.now(),base=items.length;for(let i=0;i<n;i++){const d=debugSamples[(base+i)%debugSamples.length];items.push({id:crypto.randomUUID(),name:d[0],prompt:d[1],author:'',xhandle:'',source:'',memo:'テスト用カード',tags:[],image:'',fav:false,pinned:false,useCount:0,lastUsed:0,created:now+i,updated:now+i})}save();render();$('debugDialog').close();toast(`テストカードを${n}件追加しました`)}
$('debugAdd10').onclick=()=>addDebugCards(10);
$('debugLowerVersion').onclick=()=>{
  const raw=localStorage.getItem(VERSION_KEY)||APP_VERSION;
  const n=Number.parseFloat(raw);
  const lowered=Number.isFinite(n)?Math.max(0,Math.round((n-0.1)*100)/100):Math.max(0,Math.round((Number.parseFloat(APP_VERSION)-0.1)*100)/100);
  localStorage.setItem(VERSION_KEY,lowered.toFixed(2));
  toast(`保存バージョンを ${lowered.toFixed(2)} に下げました`);
};
$('debugShowWelcome').onclick=()=>{
  prefs.welcomed=false;savePrefs();
  sessionStorage.setItem('promptPocket.debugWelcome','1');
  $('debugDialog').close();
  toast('更新するとウェルカムを表示します');
};

// v1.74: always synchronize bottom navigation with the actual editor dialog state.
function refreshFromStorage(){
  try{
    const stored=localStorage.getItem(KEY)||localStorage.getItem(LEGACY_KEY)||'[]';
    const latest=JSON.parse(stored);
    if(Array.isArray(latest)){
      items=latest;
      normalize();
    }
  }catch(err){console.error('Prompt Pocket reload failed:',err)}
  render();
}
function syncEditorOpenState(){document.body.classList.toggle('editor-open',!!$('editor')?.open)}
$('editor').addEventListener('close',syncEditorOpenState);
window.addEventListener('pageshow',e=>{syncEditorOpenState();requestAnimationFrame(refreshFromStorage)});
window.addEventListener('popstate',()=>setTimeout(syncEditorOpenState,0));

document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible') requestAnimationFrame(refreshFromStorage);
});



function syncStickyHeaderHeight(){const h=document.querySelector('.topbar')?.offsetHeight||68;document.documentElement.style.setProperty('--pp-topbar-h',h+'px')}
let cardJumpHideTimer=null;
function updateCardJumpNav(){
  const nav=$('cardJumpNav');if(!nav)return;
  const cardMode=false;nav.classList.toggle('hidden',!cardMode);
  if(!cardMode){nav.classList.remove('active');return}
  const y=window.scrollY||document.documentElement.scrollTop;
  const max=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
  $('jumpTopBtn').classList.toggle('hidden',y<80);
  $('jumpEndBtn').classList.toggle('hidden',max-y<80);
}
function showCardJumpNav(){
  const nav=$('cardJumpNav');if(!nav||prefs.view!=='card')return;
  updateCardJumpNav();
  nav.classList.add('active');
  clearTimeout(cardJumpHideTimer);
  cardJumpHideTimer=setTimeout(()=>{
    if(!nav.matches(':hover')&&!nav.contains(document.activeElement))nav.classList.remove('active');
  },2000);
}
function jumpNavAction(target){
  if(prefs.view!=='card'){
    clearTimeout(cardJumpHideTimer);
    const nav=$('cardJumpNav');if(nav){nav.classList.remove('active');nav.classList.add('hidden')}
    return;
  }
  const max=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
  const top=target==='top'?0:target==='mid'?Math.round(max*.5):max;
  window.scrollTo({top,behavior:'smooth'});
  showCardJumpNav();
}
$('jumpTopBtn').onclick=()=>jumpNavAction('top');
$('jumpMidBtn').onclick=()=>jumpNavAction('mid');
$('jumpEndBtn').onclick=()=>jumpNavAction('end');
$('cardJumpNav').addEventListener('mouseenter',()=>clearTimeout(cardJumpHideTimer));
$('cardJumpNav').addEventListener('mouseleave',()=>{clearTimeout(cardJumpHideTimer);cardJumpHideTimer=setTimeout(()=>$('cardJumpNav').classList.remove('active'),2000)});
window.addEventListener('scroll',showCardJumpNav,{passive:true});
window.addEventListener('resize',()=>{syncStickyHeaderHeight();updateCardJumpNav()});
syncStickyHeaderHeight();
setTimeout(()=>{syncStickyHeaderHeight();updateCardJumpNav()},0);

prefs.view='detail';if(prefs.rememberOps&&prefs.sort)$('sort').value=prefs.sort;else $('sort').value='manual';
if(!prefs.welcomed)setTimeout(()=>{
  if(!window.__ppExternalGuideActive && !$('externalBrowserGuide')?.open){
    const debugForced=sessionStorage.getItem('promptPocket.debugWelcome')==='1';
    if(debugForced)sessionStorage.removeItem('promptPocket.debugWelcome');
    welcomeIsDebug=debugForced;
    $('welcomeDialog').showModal();
  }
},220);


function versionLessThan(a,b){
  const pa=String(a||'0').split('.').map(n=>Number.parseInt(n,10)||0);
  const pb=String(b||'0').split('.').map(n=>Number.parseInt(n,10)||0);
  const len=Math.max(pa.length,pb.length);
  for(let i=0;i<len;i++){
    const av=pa[i]||0,bv=pb[i]||0;
    if(av<bv)return true;
    if(av>bv)return false;
  }
  return false;
}
function handleVersionNotice(){
  // 新規利用者にはアップデート通知を出さない。
  if(isFreshInstall){
    localStorage.setItem(VERSION_KEY,APP_VERSION);
    localStorage.setItem(UPDATE_116_NOTICE_KEY,'seen');
    return;
  }

  // 1.16の案内を一度閉じていれば、以後は表示しない。
  if(localStorage.getItem(UPDATE_116_NOTICE_KEY)==='seen')return;

  // 既存ユーザーで「1.16更新案内」をまだ見ていなければ表示する。
  // テスト版1.16を一度開いて VERSION_KEY が1.16になっていても、
  // 正式版の更新案内は専用キーで一度だけ表示する。
  $('updateVersionText').textContent='Ver.1.16';
  $('updateList').innerHTML=[
    'UIの変更',
    'スクロール機能の強化',
    '細かい修正'
  ].map(x=>`<div>・${esc(x)}</div>`).join('');

  const show=()=>{
    if(window.__ppExternalGuideActive||$('externalBrowserGuide')?.open||$('welcomeDialog')?.open){
      setTimeout(show,350);return;
    }
    $('updateDialog').showModal();
  };
  setTimeout(show,300);

  $('updateClose').onclick=()=>{
    localStorage.setItem(UPDATE_116_NOTICE_KEY,'seen');
    localStorage.setItem(VERSION_KEY,APP_VERSION);
    $('updateDialog').close();
  };
}
save();render();
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',handleVersionNotice,{once:true});
}else{
  handleVersionNotice();
}

/* v1.02: X / Discord in-app browser guidance. X Articles: use ?from=x. Test: ?pp_test=x */
(()=>{
  const dlg=document.getElementById('externalBrowserGuide'); if(!dlg)return;
  const ua=navigator.userAgent||'', ref=(document.referrer||'').toLowerCase();
  const qs=new URLSearchParams(location.search), forced=(qs.get('pp_test')||'').toLowerCase(), source=(qs.get('from')||'').toLowerCase();
  const mobile=/Android|iPhone|iPad|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  const fromX=source==='x'||forced==='x'||ref.includes('x.com')||ref.includes('twitter.com')||ref.includes('t.co');
  const fromDiscord=forced==='discord'||ref.includes('discord.com')||ref.includes('discordapp.com');
  // X Articles can open the app without a usable referrer. On mobile, also detect
  // common X/Discord in-app browser user-agent markers so the guide still appears.
  const inAppUA=/Twitter|X\/|Discord/i.test(ua);
  if(!mobile||(!fromX&&!fromDiscord&&!inAppUA))return;
  window.__ppExternalGuideActive=true;
  setTimeout(()=>{if(!dlg.open)dlg.showModal()},80);
})();

document.addEventListener('selectstart', function(e){
  if(e.target.closest?.('#searchBtn, #helpBtn, #optionBtn, .bottomNav, .bottomBar, .bottomMenu')) e.preventDefault();
}, true);
document.addEventListener('contextmenu', function(e){
  if(e.target.closest?.('#searchBtn, #helpBtn, #optionBtn, .bottomNav, .bottomBar, .bottomMenu')) e.preventDefault();
}, true);
document.addEventListener('dragstart', function(e){
  if(e.target.closest?.('#searchBtn, #helpBtn, #optionBtn, .bottomNav, .bottomBar, .bottomMenu')) e.preventDefault();
}, true);

(()=>{
 const bad=/[\\/:*?"<>|]/;
 const reserved=/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i;
 document.addEventListener('DOMContentLoaded',()=>{
   const dlg=$('folderCreateDialog'),input=$('folderNameInput'),err=$('folderNameError');
   $('createFolderBtn').onclick=()=>{input.value='';err.textContent='';input.classList.remove('folderInputError');dlg.showModal();setTimeout(()=>input.focus(),0)};
   $('folderCreateCancel').onclick=()=>dlg.close();
   dlg.addEventListener('cancel',e=>{e.preventDefault();dlg.close()});
   input.oninput=()=>{err.textContent='';input.classList.remove('folderInputError')};
   $('folderCreateForm').onsubmit=e=>{
     e.preventDefault();const raw=input.value,name=raw.trim();let msg='';
     if(!name)msg='フォルダ名を入力してください。';
     else if(raw!==name)msg='先頭や末尾に空白は使えません。';
     else if(bad.test(name)||name==='.'||name==='..'||reserved.test(name))msg='このフォルダ名は使えません。';
     else if(folders.some(f=>f.name===name))msg='同じ名前のフォルダがあります。';
     if(msg){err.textContent=msg;input.classList.add('folderInputError');input.focus();return}
     folders.push({id:'folder-'+crypto.randomUUID(),name,created:Date.now()});
     saveFolders();dlg.close();render();toast('フォルダ「'+name+'」を作成しました');
   };
 });
})();
