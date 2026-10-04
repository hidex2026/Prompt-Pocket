/* PP_RELEASE:2.0-alpha.3c */
if(window.ppVersion&&(!window.ppVersion.assert('2.0-alpha.3c')||window.ppVersion.blocked))throw new Error('Prompt Pocket release mismatch: initialization stopped.');
const KEY='promptPocket.v2';
const LEGACY_KEY='promptPocket.v1';
const PREF_KEY='promptPocket.prefs.v1';
const baseTags=['🖼️ 画像','🎬 動画','実用','アレンジ','お洒落','女の子','男の子','獣人','可愛い','ダーク','アニメ','実写','夜景','ファンタジー','SF','水彩'];
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

// Recover interrupted writes before reading any app data.
const WRITE_JOURNAL_KEY='promptPocket.pendingWrite.v1';
const storageRecoveryIssues=[];
class StorageSaveError extends Error{}
function readStoredJson(key,fallback,valid){
  const raw=localStorage.getItem(key);
  if(raw===null)return structuredClone(fallback);
  try{const value=JSON.parse(raw);if(!valid(value))throw new Error('invalid shape');return value}
  catch{storageRecoveryIssues.push(key);return structuredClone(fallback)}
}
function writeStorageBatch(entries){
  const previous=entries.map(([key])=>[key,localStorage.getItem(key)]);
  localStorage.setItem(WRITE_JOURNAL_KEY,JSON.stringify(previous));
  try{
    entries.forEach(([key,value])=>value===null?localStorage.removeItem(key):localStorage.setItem(key,value));
    localStorage.removeItem(WRITE_JOURNAL_KEY);
  }catch(error){
    try{previous.forEach(([key,value])=>value===null?localStorage.removeItem(key):localStorage.setItem(key,value));localStorage.removeItem(WRITE_JOURNAL_KEY)}catch{}
    throw error;
  }
}
try{
  const journal=localStorage.getItem(WRITE_JOURNAL_KEY);
  if(journal){
    const entries=JSON.parse(journal);
    if(!Array.isArray(entries)||!entries.every(v=>Array.isArray(v)&&typeof v[0]==='string'&&isAppStorageKey(v[0])&&(v[1]===null||typeof v[1]==='string')))throw new Error('invalid journal');
    entries.forEach(([key,value])=>value===null?localStorage.removeItem(key):localStorage.setItem(key,value));
    localStorage.removeItem(WRITE_JOURNAL_KEY);
  }
}catch{storageRecoveryIssues.push(WRITE_JOURNAL_KEY)}
function isAppStorageKey(key){return key.startsWith('promptPocket.')||key==='promptPocketFolders.v1'||key==='promptPocketManualOrder'}
function clearAppStorage(storage){
  const keys=Array.from({length:storage.length},(_,i)=>storage.key(i)).filter(key=>key&&isAppStorageKey(key));
  keys.forEach(key=>storage.removeItem(key));
}
const validCards=value=>Array.isArray(value)&&value.every(x=>x&&typeof x==='object'&&typeof x.name==='string'&&typeof x.prompt==='string');
let items=readStoredJson(localStorage.getItem(KEY)!==null?KEY:LEGACY_KEY,[],validCards);
const APP_VERSION='2.0-alpha.3c';
const VERSION_KEY='promptPocket.lastSeenVersion';
const DATA_VERSION_KEY='promptPocket.dataVersion';
const DATA_SCHEMA_VERSION='2.0';
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
let editorTagDraft=null;
let imageData='';
let imageBlob=null;
let editorImageObjectUrl='';
let undoState=null;
let prefs=readStoredJson(PREF_KEY,{view:'card',welcomed:false,tagOrder:[]},v=>v&&typeof v==='object'&&!Array.isArray(v));
prefs.tagOrder=Array.isArray(prefs.tagOrder)?prefs.tagOrder:[];
prefs.hiddenTags=Array.isArray(prefs.hiddenTags)?prefs.hiddenTags:[];
prefs.rememberOps=!!prefs.rememberOps;
prefs.openFolderIds=Array.isArray(prefs.openFolderIds)?prefs.openFolderIds:[];
prefs.openCardIds=Array.isArray(prefs.openCardIds)?prefs.openCardIds:[];
delete prefs.shortcutEnabled;
prefs.buttonGlowEnabled=Object.prototype.hasOwnProperty.call(prefs,'buttonGlowEnabled')?!!prefs.buttonGlowEnabled:true;
prefs.doubleTapOpenEnabled=!!prefs.doubleTapOpenEnabled;
prefs.dragVibrationEnabled=Object.prototype.hasOwnProperty.call(prefs,'dragVibrationEnabled')?!!prefs.dragVibrationEnabled:true;
prefs.cardCellSize=['small','medium','large'].includes(prefs.cardCellSize)?prefs.cardCellSize:'medium';
document.body.dataset.cardCellSize=prefs.cardCellSize;
prefs.folderNameSize=['small','medium','large'].includes(prefs.folderNameSize)?prefs.folderNameSize:'medium';
function normalizeMainScreenColor(value){return ['default','aqua','red','pastel','yellow','multicolor'].includes(value)?value:'default'}
prefs.mainScreenColor=normalizeMainScreenColor(prefs.mainScreenColor);
document.body.dataset.mainScreenColor=prefs.mainScreenColor;
document.body.dataset.folderNameSize=prefs.folderNameSize;
document.body.classList.toggle('buttonGlowEnabled',prefs.buttonGlowEnabled);
prefs.mainActionOpenMode=['single','double'].includes(prefs.mainActionOpenMode)
  ?prefs.mainActionOpenMode
  :'single';
delete prefs.longPressMainActionsEnabled;
delete prefs.longPressAllButtonsEnabled;
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
folders=readStoredJson(FOLDER_KEY,[],v=>Array.isArray(v)&&v.every(f=>f&&typeof f.id==='string'&&typeof f.name==='string')).map(f=>({...f,fav:!!f.fav}));
const openFolders=new Set(prefs.rememberOps?prefs.openFolderIds.filter(id=>folders.some(f=>f.id===id)&&items.some(x=>x.folderId===id)):[]);
function saveFolders(){return persistAppState()}
function folderById(id){return folders.find(f=>f.id===id)}
function folderCount(id){return items.filter(x=>x.folderId===id).length}
let committedState=null;
function captureState(){
  return {items:structuredClone(items),folders:structuredClone(folders),prefs:structuredClone(prefs),
    customTags:[...customTags],filterTags:[...filterTags],openFolders:[...openFolders],
    openCards:getOpenDetailIds(),sort:$('sort').value||'manual',detailFavSort};
}
function restoreState(state){
  items=structuredClone(state.items);folders=structuredClone(state.folders);prefs=structuredClone(state.prefs);
  customTags=new Set(state.customTags);filterTags=new Set(state.filterTags);
  openFolders.clear();state.openFolders.forEach(id=>openFolders.add(id));
  detailFavSort=state.detailFavSort;$('sort').value=state.sort;
  applyPreferences();
}
function applyPreferences(){
  prefs.mainScreenColor=normalizeMainScreenColor(prefs.mainScreenColor);
  document.body.dataset.mainScreenColor=prefs.mainScreenColor;
  document.body.classList.toggle('buttonGlowEnabled',!!prefs.buttonGlowEnabled);
  document.body.dataset.cardCellSize=prefs.cardCellSize||'medium';
  document.body.dataset.folderNameSize=prefs.folderNameSize||'medium';
}
function persistAppState(allowRecovery=false){
  if(storageRecoveryIssues.length&&!allowRecovery){if(committedState)restoreState(committedState);throw new StorageSaveError('破損した元データを保護するため、保存を停止しています。バックアップの読み込み、またはデータの初期化を行ってください。')}
  try{
    prefs.customTags=[...customTags];
    writeStorageBatch([[KEY,JSON.stringify(items)],[FOLDER_KEY,JSON.stringify(folders)],[PREF_KEY,JSON.stringify(prefs)]]);
    committedState=captureState();
    return true;
  }catch(error){
    if(committedState)restoreState(committedState);
    throw new StorageSaveError('データを保存できませんでした。変更は確定していません。保存容量を確認し、バックアップを取ってから再度お試しください。');
  }
}
function save(){return persistAppState()}
function savePrefs(){return persistAppState()}
committedState=captureState();
function reportSaveFailure(error){
  if(!(error instanceof StorageSaveError))return false;
  console.error(error);alert(error.message);
  requestAnimationFrame(()=>{render();if(committedState)restoreOpenDetails(committedState.openCards)});
  return true;
}
window.addEventListener('error',event=>{if(reportSaveFailure(event.error))event.preventDefault()});
window.addEventListener('unhandledrejection',event=>{if(reportSaveFailure(event.reason))event.preventDefault()});
function rememberOpenFolderState(){
  if(!prefs.rememberOps)return;
  const next=[...openFolders].filter(id=>folders.some(f=>f.id===id)&&items.some(x=>x.folderId===id));
  if(JSON.stringify(next)===JSON.stringify(prefs.openFolderIds||[]))return;
  prefs.openFolderIds=next;
  savePrefs();
}
function rememberOpenCardState(){
  if(!prefs.rememberOps)return;
  prefs.openCardIds=getOpenDetailIds().filter(id=>items.some(x=>x.id===id));
  savePrefs();
}
const IMAGE_DB_NAME='promptPocketImages';
const IMAGE_STORE_NAME='images';
const IMAGE_DB_MIGRATION_KEY='promptPocket.imagesInIndexedDB.v1';
let imageDbPromise=null;
const imageUrlCache=new Map();
function openImageDb(){
  if(imageDbPromise)return imageDbPromise;
  imageDbPromise=new Promise((resolve,reject)=>{
    if(!window.indexedDB){reject(new Error('IndexedDB unavailable'));return}
    const request=indexedDB.open(IMAGE_DB_NAME,1);
    request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(IMAGE_STORE_NAME))request.result.createObjectStore(IMAGE_STORE_NAME)};
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error||new Error('IndexedDB open failed'));
  });
  return imageDbPromise;
}
async function putImageBlob(key,blob){
  const db=await openImageDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(IMAGE_STORE_NAME,'readwrite');
    tx.objectStore(IMAGE_STORE_NAME).put(blob,key);
    tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error||new Error('Image save failed'));tx.onabort=()=>reject(tx.error||new Error('Image save aborted'));
  });
}
async function getImageBlob(key){
  const db=await openImageDb();
  return new Promise((resolve,reject)=>{
    const request=db.transaction(IMAGE_STORE_NAME,'readonly').objectStore(IMAGE_STORE_NAME).get(key);
    request.onsuccess=()=>resolve(request.result||null);request.onerror=()=>reject(request.error||new Error('Image read failed'));
  });
}
async function clearImageDb(){
  try{const db=await openImageDb();await new Promise((resolve,reject)=>{const tx=db.transaction(IMAGE_STORE_NAME,'readwrite');tx.objectStore(IMAGE_STORE_NAME).clear();tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)})}catch{}
  imageUrlCache.forEach(url=>URL.revokeObjectURL(url));imageUrlCache.clear();
}
async function deleteImageDb(){
  try{const db=await openImageDb();db.close()}catch{}
  imageDbPromise=null;
  await new Promise((resolve,reject)=>{if(!window.indexedDB){resolve();return}const request=indexedDB.deleteDatabase(IMAGE_DB_NAME);request.onsuccess=()=>resolve();request.onerror=()=>reject(new Error('画像データを削除できませんでした。時間をおいて再度お試しください。'));request.onblocked=()=>alert('画像データを削除するため、別のタブで開いているPrompt Pocketを閉じてください。')});
  imageUrlCache.forEach(url=>URL.revokeObjectURL(url));imageUrlCache.clear();
}
const isDbImage=value=>typeof value==='string'&&value.startsWith('idb:');
const imageDbKey=value=>value.slice(4);
function blobToDataUrl(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(reader.error);reader.readAsDataURL(blob)})}
function dataUrlToBlob(value){return fetch(value).then(response=>response.blob())}
async function resolveImageUrl(value){
  if(!isDbImage(value))return value||'';
  const key=imageDbKey(value);
  if(imageUrlCache.has(key))return imageUrlCache.get(key);
  const blob=await getImageBlob(key);
  if(!blob)return '';
  const url=URL.createObjectURL(blob);imageUrlCache.set(key,url);return url;
}
function imageTag(value,className=''){
  if(!value)return '';
  if(isDbImage(value))return `<img class="${className}" data-image-ref="${esc(value)}" alt="" loading="lazy" decoding="async" draggable="false">`;
  return `<img class="${className}" src="${esc(value)}" alt="" loading="lazy" decoding="async" draggable="false">`;
}
let imageObserver=null;
function hydrateLazyImages(root=document){
  const images=[...root.querySelectorAll('img[data-image-ref]')];
  if(!images.length)return;
  if(!('IntersectionObserver'in window)){
    images.forEach(async img=>{const url=await resolveImageUrl(img.dataset.imageRef).catch(()=>"");if(url&&img.isConnected)img.src=url});return;
  }
  if(!imageObserver)imageObserver=new IntersectionObserver(entries=>entries.forEach(async entry=>{
    if(!entry.isIntersecting)return;
    const img=entry.target;imageObserver.unobserve(img);
    const url=await resolveImageUrl(img.dataset.imageRef).catch(()=>"");if(url&&img.isConnected)img.src=url;
  }),{rootMargin:'240px 0px'});
  images.forEach(img=>imageObserver.observe(img));
}
async function moveEmbeddedImagesToDb(list){
  let changed=false;
  for(const item of list){
    if(typeof item.image!=='string'||!item.image.startsWith('data:image/'))continue;
    try{const blob=await dataUrlToBlob(item.image);const key=crypto.randomUUID();await putImageBlob(key,blob);item.image='idb:'+key;changed=true}catch{return {changed,complete:false}}
  }
  return {changed,complete:true};
}
async function migrateStoredImages(){
  if(localStorage.getItem(IMAGE_DB_MIGRATION_KEY)==='done')return;
  const result=await moveEmbeddedImagesToDb(items);
  if(result.changed){save();render();toast('保存画像を軽量な読み込み方式へ移行しました')}
  if(result.complete)localStorage.setItem(IMAGE_DB_MIGRATION_KEY,'done');
}
function seedStarterFolders(){
  if(items.length||folders.length)return false;
  const groups=[['実用',sampleCatalog.practical||[]],['アレンジ',[...(sampleCatalog.style||[]),...(sampleCatalog.arrange||[])]],['その他',sampleCatalog.other||[]]];
  const now=Date.now();
  groups.forEach(([name,samples],groupIndex)=>{const folder={id:'starter-folder-'+groupIndex,name,created:now+groupIndex,isNew:false};folders.push(folder);samples.forEach((source,index)=>items.push({id:'starter-'+source.key,presetKey:source.key,name:source.name,prompt:source.prompt,author:'',xhandle:'',source:'',memo:'サンプルです。自由に編集・削除できます。',tags:source.tags||[],image:source.image||'',folderId:folder.id,fav:false,pinned:false,useCount:0,lastUsed:0,created:now+groupIndex*20+index,updated:now+groupIndex*20+index}));});
  save();saveFolders();return true;
}
function upgradeFoldersTo2(source){
  const now=Date.now();
  return (Array.isArray(source)?source:[]).filter(folder=>folder&&typeof folder==='object').map((folder,index)=>({
    ...folder,
    id:typeof folder.id==='string'&&folder.id?folder.id:crypto.randomUUID(),
    name:typeof folder.name==='string'&&folder.name.trim()?folder.name:'名称未設定フォルダー',
    created:Number(folder.created)||now+index,
    isNew:!!folder.isNew
  }));
}
function upgradeItemsTo2(source,sourceFolders){
  const now=Date.now();
  const folderIds=new Set(sourceFolders.map(folder=>folder.id));
  return (Array.isArray(source)?source:[]).filter(item=>item&&typeof item==='object').map((item,index)=>{
    const created=Number(item.created||item.createdAt)||now+index;
    return {
      ...item,
      id:typeof item.id==='string'&&item.id?item.id:crypto.randomUUID(),
      name:typeof item.name==='string'?item.name:'',
      prompt:typeof item.prompt==='string'?item.prompt:'',
      author:typeof item.author==='string'?item.author:'',
      xhandle:typeof item.xhandle==='string'?item.xhandle:'',
      source:typeof item.source==='string'?item.source:'',
      memo:typeof item.memo==='string'?item.memo:'',
      tags:Array.isArray(item.tags)?[...new Set(item.tags.filter(tag=>typeof tag==='string'&&tag))]:[],
      image:typeof item.image==='string'?item.image:'',
      folderId:typeof item.folderId==='string'&&folderIds.has(item.folderId)?item.folderId:null,
      fav:!!(item.fav??item.favorite),
      pinned:!!item.pinned,
      useCount:Number(item.useCount)||0,
      lastUsed:Number(item.lastUsed)||0,
      created,
      updated:Number(item.updated||item.updatedAt)||created
    };
  });
}
function migratePre2Data(){
  if(storageRecoveryIssues.length)return;
  const storedVersion=localStorage.getItem(DATA_VERSION_KEY)||localStorage.getItem(VERSION_KEY)||'1.0';
  if(!versionLessThan(storedVersion,DATA_SCHEMA_VERSION))return;
  const hasOldData=items.length>0||folders.length>0||localStorage.getItem(PREF_KEY)!==null;
  if(hasOldData){
    alert('保存されているデータのバージョンは2.0より古いため、データを2.0用にアップデートします。');
    folders=upgradeFoldersTo2(folders);
    items=upgradeItemsTo2(items,folders);
    save();saveFolders();savePrefs();
    sessionStorage.setItem('promptPocket.migratedFrom1x','1');
  }
  localStorage.setItem(DATA_VERSION_KEY,DATA_SCHEMA_VERSION);
}
try{migratePre2Data()}catch(error){reportSaveFailure(error)}

// Ver.1.0: 見本の初期登録はウェルカム完了時だけ行う。
// 条件は「通常の初回ウェルカム」かつ「登録0件」。ここでは追加しない。
function toast(t){$('toast').textContent=t;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1600)}
function snapshot(label){undoState={label,...captureState()}; updateUndo();}
function updateUndo(){$('undoBtn').disabled=!undoState;$('undoBtn').classList.toggle('undoReady',!!undoState);$('undoBtn').title=undoState?`${undoState.label}を元に戻す`:'戻せる操作はありません';}
function allTags(){const tags=[...new Set([...baseTags,...(editorTagDraft?editorTagDraft.customTags:customTags),...items.flatMap(x=>x.tags||[])])].filter(t=>!(editorTagDraft?editorTagDraft.hiddenTags:(prefs.hiddenTags||[])).includes(t));const order=editorTagDraft?editorTagDraft.tagOrder:(prefs.tagOrder||[]);return [...tags].sort((a,b)=>{const ai=order.indexOf(a),bi=order.indexOf(b);if(ai<0&&bi<0)return tags.indexOf(a)-tags.indexOf(b);if(ai<0)return 1;if(bi<0)return -1;return ai-bi});}
function syncTagOrder(){
  const tags=allTags();
  const next=[...new Set([...(editorTagDraft?editorTagDraft.tagOrder:(prefs.tagOrder||[])).filter(t=>tags.includes(t)),...tags])];
  if(editorTagDraft)editorTagDraft.tagOrder=next;else{prefs.tagOrder=next;savePrefs()}
}
function moveTag(from,to){
  if(!from||!to||from===to)return;
  syncTagOrder();
  const a=(editorTagDraft?editorTagDraft.tagOrder:prefs.tagOrder).filter(t=>t!==from), i=a.indexOf(to);
  a.splice(i<0?a.length:i,0,from);if(editorTagDraft)editorTagDraft.tagOrder=a;else{prefs.tagOrder=a;savePrefs()}renderTagChoices();if(!editorTagDraft)render();
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
function sortList(list){const s=$('sort').value;if(s==='manual'||s==='foldersFirst'){const order=Array.isArray(prefs.manualOrder)?prefs.manualOrder:[];list.sort((a,b)=>{const ai=order.indexOf(a.id),bi=order.indexOf(b.id);if(ai<0&&bi<0)return b.created-a.created;if(ai<0)return 1;if(bi<0)return -1;return ai-bi});}else if(s==='nameAsc')list.sort((a,b)=>a.name.localeCompare(b.name,'ja'));else if(s==='fav')list.sort((a,b)=>(b.fav?1:0)-(a.fav?1:0)||b.created-a.created);else list.sort((a,b)=>b.created-a.created);return list;}
function actionButtons(x){return `<button data-copy="${x.id}">📋 コピー</button><button data-edit="${x.id}">✏️ 編集</button><button data-duplicate="${x.id}">📄 複製</button><button class="dangerMini" data-delete="${x.id}">🗑️ 削除</button>${x.source?`<button data-source="${x.id}">出典</button>`:''}`;}
function render(){
  rememberOpenFolderState();
  document.querySelector('.folderPopupPortal')?.remove();
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
  const sortMode=$('sort').value;
  if(sortMode==='createdDesc')mixed.sort((a,b)=>b.created-a.created);
  if(sortMode==='nameAsc')mixed.sort((a,b)=>(a.folder?.name||a.card?.name||'').localeCompare(b.folder?.name||b.card?.name||'','ja'));
  if(sortMode==='fav'){
    const favoriteRank=v=>v.type==='folder'?(v.folder.fav?0:2):(v.card.fav?1:3);
    mixed.sort((a,b)=>favoriteRank(a)-favoriteRank(b)||b.created-a.created);
  }
  if(sortMode==='manual'||sortMode==='foldersFirst'){
    const order=Array.isArray(prefs.manualOrder)?prefs.manualOrder:[];
    const key=v=>v.type==='folder'?'folder:'+v.folder.id:v.card.id;
    mixed.sort((a,b)=>{
      const ai=order.indexOf(key(a)),bi=order.indexOf(key(b));
      if(ai<0&&bi<0)return 0;
      if(ai<0)return 1;if(bi<0)return -1;return ai-bi;
    });
  }
  if(sortMode==='foldersFirst')mixed.sort((a,b)=>Number(b.type==='folder')-Number(a.type==='folder'));
  // 新しく作成したフォルダは、初めて触られるまで一覧の先頭に置く。
  mixed.sort((a,b)=>Number(b.type==='folder'&&b.folder.isNew)-Number(a.type==='folder'&&a.folder.isNew));

  $('count').textContent=`カード総数：${items.length}枚`;
  $('empty').classList.toggle('hidden',items.length>0||folders.length>0);
  $('cards').className='detailExplorer unifiedExplorer';

  const folderTone=id=>{
    let hash=0;
    for(const ch of String(id||''))hash=(hash*31+ch.charCodeAt(0))|0;
    return Math.abs(hash)%6;
  };
  const cardRows=(x,child=false)=>{const tone=child?` data-folder-tone="${folderTone(x.folderId)}"`:'';const favoriteControl=child?'<span class="favoriteSlot" aria-hidden="true"></span>':`<button class="tableIcon favoriteHit" data-fav="${x.id}" title="お気に入り">${x.fav?'★':'☆'}</button>`;return `<tr class="unifiedRow ${child?'folderChildRow':''}" data-row="${x.id}"${child?' data-folder-child="'+esc(x.folderId)+'"':''}${tone}><td>${favoriteControl}</td><td class="nameCell"><div class="cardNameLayout"><span class="cardThumbDeadZone">${child?'<span class="folderBranch">└</span>':''}${imageTag(x.image,'tinyThumb')}</span><span class="unifiedDragArea" title="${esc(x.name)}"><span class="rowName">${esc(x.name)}</span><span class="dragSpace" aria-hidden="true"></span></span></div></td><td><div class="tableActions"><button data-copy="${x.id}">📋 コピー</button><span class="detailMenuWrap"><button data-menu-toggle="${x.id}" aria-label="メニューを開く">⋯</button><div class="detailPopupMenu hidden" id="detailMenu-${x.id}"><button data-edit="${x.id}">✏️ 編集</button><button data-copy="${x.id}">📋 コピー</button><button data-duplicate="${x.id}">📄 複製</button>${child?`<button data-folder-remove="${x.id}">📤 フォルダから出す</button>`:''}<button class="dangerMenu" data-delete="${x.id}">🗑️ 削除</button></div></span></div></td></tr><tr class="rowDetail ${child?'folderChildDetail ':''}hidden" id="rowDetail-${x.id}"${child?' data-folder-detail="'+esc(x.folderId)+'"':''}${tone}><td colspan="3"><div class="unifiedCardDetail"><button class="detailCloseBtn" type="button" data-close-detail="${x.id}" aria-label="${esc(x.name)}の詳細を閉じる">×</button>${x.image?`<div class="unifiedThumb">${imageTag(x.image)}</div>`:'<div class="unifiedThumb unifiedNoImage"><span>サムネイル</span></div>'}<div class="unifiedCardBody"><div class="meta">${x.author?`作者：${esc(x.author)}`:'自作 / 作者未登録'}</div><div class="unifiedPrompt">${esc(x.prompt)}</div><div class="chips">${(x.tags||[]).map(t=>`<span class="chip">${esc(t)}</span>`).join('')}</div><div class="cardactions">${actionButtons(x)}</div></div></div></td></tr>`};

  const folderHtml=f=>{
    const kids=items.filter(x=>x.folderId===f.id&&matches(x));
    if(sortMode==='fav')kids.sort((a,b)=>b.created-a.created);
    else if(sortMode==='nameAsc')kids.sort((a,b)=>a.name.localeCompare(b.name,'ja'));
    else if(sortMode==='createdDesc')kids.sort((a,b)=>b.created-a.created);
    const open=kids.length>0&&openFolders.has(f.id);
    let s=open?`<tr class="folderFrameStart" data-folder-tone="${folderTone(f.id)}"><td colspan="3"><div></div></td></tr>`:'';
    s+=`<tr class="folderRow ${open?'folderOpen':''}" data-folder="${f.id}" data-folder-tone="${folderTone(f.id)}" data-sort-key="folder:${f.id}"><td><button class="tableIcon favoriteHit" data-folder-fav="${f.id}" title="フォルダのお気に入り">${f.fav?'★':'☆'}</button></td><td class="nameCell folderInteractArea" data-folder-toggle="${f.id}"><div class="folderNameLayout"><span class="folderNameBtn"><span>${open?'📂':'📁'}</span><span>${esc(f.name)}</span>${f.isNew?'<span class="folderNewBadge">NEW</span>':''}</span><span class="folderDragSpace" aria-label="フォルダを移動"></span></div></td><td><div class="tableActions folderActions"><span class="folderCountInline">${folderCount(f.id)}枚</span><span class="detailMenuWrap"><button class="folderMenuBtn" data-folder-menu-toggle="${f.id}" aria-label="フォルダのメニューを開く">⋯</button><div class="detailPopupMenu hidden"><button data-folder-rename="${f.id}">✏️ 名前を変更</button><button class="dangerMenu" data-folder-delete="${f.id}">🗑️ フォルダを削除</button></div></span></div></td></tr>`;
    if(open)s+=kids.map(x=>cardRows(x,true)).join('')+`<tr class="folderFrameEnd" data-folder-tone="${folderTone(f.id)}"><td colspan="3"><div></div></td></tr>`;
    return s;
  };

  $('cards').innerHTML=`<div class="detailScroll"><table class="detailTable unifiedTable"><colgroup><col class="col-star"><col class="col-name"><col class="col-actions"></colgroup><thead><tr><th class="starCol sortableHead ${sortMode==='fav'?'active':''}" data-header-sort="fav" role="button" tabindex="0">★${sortMode==='fav'?'<span class="sortArrow">▲</span>':''}</th><th class="sortableHead ${sortMode==='nameAsc'?'active':''}" data-header-sort="nameAsc" role="button" tabindex="0">名前${sortMode==='nameAsc'?'<span class="sortArrow">▲</span>':''}</th><th class="opCol">操作</th></tr></thead><tbody>${mixed.map(v=>v.type==='folder'?folderHtml(v.folder):cardRows(v.card)).join('')}</tbody></table></div>`;
  folders.forEach(f=>{
    const rows=[...document.querySelectorAll('.folderChildRow')].filter(row=>row.dataset.folderChild===f.id);
    const last=rows.at(-1);last?.classList.add('folderTreeLast');
    last?.nextElementSibling?.classList.contains('folderChildDetail')&&last.nextElementSibling.classList.add('folderFrameLastDetail');
  });
  bindActions();
  bindFolderActions();
  hydrateLazyImages($('cards'));
  updateUndo();
  bindHeaderSort();
  if(prefs.rememberOps)restoreOpenDetails((prefs.openCardIds||[]).filter(id=>items.some(x=>x.id===id)));
  updateCloseAllButton();
}
function initColumnResize(){
  const table=document.querySelector('.detailTable'); if(!table)return;
  const saved=readStoredJson('promptPocket.columnWidths.v1',{},v=>v&&typeof v==='object'&&!Array.isArray(v));
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

function updatePromptOverflow(detail){requestAnimationFrame(()=>{const p=detail?.querySelector('.unifiedPrompt');if(p)p.classList.toggle('hasOverflow',p.scrollHeight>p.clientHeight+1)})}
function hasOpenContent(){return openFolders.size>0||!!document.querySelector('.rowDetail:not(.hidden)')}
function vibrateDragLift(){
  if(!prefs.dragVibrationEnabled)return false;
  try{return typeof navigator.vibrate==='function'?navigator.vibrate(35):false}catch{return false}
}
function updateCloseAllButton(){const button=$('closeAllBtn');if(!button)return;const canClose=hasOpenContent();button.disabled=!canClose;button.setAttribute('aria-disabled',String(!canClose))}
function closeAllOpenContent(){openFolders.clear();if(prefs.rememberOps){prefs.openFolderIds=[];prefs.openCardIds=[];savePrefs()}document.querySelector('.folderPopupPortal')?.remove();render()}
function getOpenDetailIds(){return [...document.querySelectorAll('.rowDetail:not(.hidden)')].map(r=>r.id.replace('rowDetail-',''))}function restoreOpenDetails(ids){ids.forEach(id=>{const detail=$('rowDetail-'+id);detail?.classList.remove('hidden');updatePromptOverflow(detail)});updateCloseAllButton()}function renderKeepingDetails(){const open=getOpenDetailIds();render();restoreOpenDetails(open)}
let headerSortActive=null,headerSortReturnMode=null;
function setSortMode(mode,keepHeaderState=false){const allowed=['manual','foldersFirst','createdDesc','nameAsc','fav'];if(!allowed.includes(mode))mode='manual';if(!keepHeaderState){headerSortActive=null;headerSortReturnMode=null}$('sort').value=mode;if(prefs.rememberOps){prefs.sort=mode;savePrefs()}render()}
function toggleHeaderSort(mode){if(headerSortActive===mode){const restore=headerSortReturnMode||'manual';headerSortActive=null;headerSortReturnMode=null;setSortMode(restore,true);return}if(!headerSortActive)headerSortReturnMode=$('sort').value||'manual';headerSortActive=mode;setSortMode(mode,true)}
function bindHeaderSort(){document.querySelectorAll('[data-header-sort]').forEach(head=>{head.onclick=e=>{e.preventDefault();toggleHeaderSort(head.dataset.headerSort)};head.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleHeaderSort(head.dataset.headerSort)}}})}
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
      },Number(prefs.shortcutDelay)||800);
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
      let timer=null,drag=false,moved=false,sx=0,sy=0,lastX=0,lastY=0,suppressClick=false,ghost=null,ghostOffsetY=0,lastTap=0;
      const clear=()=>{if(timer){clearTimeout(timer);timer=null}};
      const cancelDrag=()=>{clear();drag=false;row.classList.remove('folderDragging');ghost?.remove();ghost=null;ppInsertLine(null)};
      const toggleFolder=()=>{
        const id=row.dataset.folder;
      if(folderCount(id)===0){openFolders.delete(id);rememberOpenFolderState();toast('このフォルダにカードがありません');return}
        openFolders.has(id)?openFolders.delete(id):openFolders.add(id);
        rememberOpenFolderState();
        render();
      };
      const startDrag=(x,y,pointerId=null)=>{
        // Pointer events can be delivered again while the mouse is captured.
        // Keep exactly one floating folder copy for a drag operation.
        if(drag||ghost)return;
        clear();
        vibrateDragLift();
        drag=true;suppressClick=true;row.classList.add('folderDragging');
        document.querySelectorAll('.folder-dnd-ghost').forEach(node=>node.remove());
        ppCollapseForDrag({row});
        const r=row.getBoundingClientRect();
        // A <tr> cannot be positioned directly under <body>.  Browsers repair
        // that invalid structure differently while it moves, which produced
        // several painted copies on desktop.  Keep the cloned row in its own
        // real table so there is exactly one valid floating preview.
        // Reuse the card ghost class so cards and folders receive the exact
        // same green outline, translucency, rounding and shadow.
        ghost=document.createElement('div');ghost.className='pp-dnd-ghost folder-dnd-ghost';
        const ghostTable=document.createElement('table');ghostTable.className='detailTable unifiedTable';
        const ghostBody=document.createElement('tbody');
        const ghostRow=row.cloneNode(true);
        ghostBody.appendChild(ghostRow);ghostTable.appendChild(ghostBody);ghost.appendChild(ghostTable);
        ghost.style.width=r.width+'px';ghost.style.left='0px';ghost.style.top='0px';
        ghost.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));
        document.body.appendChild(ghost);
        ghostOffsetY=Math.min(Math.max(y-r.top,8),r.height-8);lastX=x;lastY=y;
        ghost.style.transform=`translate3d(${r.left}px,${y-ghostOffsetY}px,0) scale(.985)`;
        if(pointerId!==null){try{handle.setPointerCapture(pointerId)}catch{}}
      };
      const insertionAt=(x,y)=>{
        const table=row.closest('.detailTable');
        const tableRect=table?.getBoundingClientRect();
        if(!tableRect||x<tableRect.left||x>tableRect.right)return {cancel:true,showLine:false};

        // Folder guides are selected only from the pointer's proximity to a
        // real root-row boundary. The floating folder geometry is irrelevant.
        // The source row remains in the live table while its preview moves.
        // Exclude it or a source folder at the end falsely becomes the list's
        // bottom boundary and makes the visible bottom impossible to target.
        const roots=ppRootRows(row);
        if(!roots.length)return {cancel:true,showLine:false};
        const boundaries=roots.map(root=>({
          y:root.getBoundingClientRect().top,
          beforeKey:ppRootKey(root)
        }));
        boundaries.push({
          y:ppGroupBottom(roots[roots.length-1]),
          beforeKey:null,
          isLast:true
        });
        const hit=boundaries
          .map(boundary=>({
            ...boundary,
            distance:Math.abs(boundary.y-y),
            inZone:boundary.isLast
              ?y>=boundary.y-14&&y<=boundary.y+Math.max(56,row.getBoundingClientRect().height*.75)
              :Math.abs(boundary.y-y)<=14
          }))
          .filter(boundary=>boundary.inZone)
          .sort((a,b)=>a.distance-b.distance)[0];
        return hit?{kind:'line',...hit,showLine:true}:{cancel:true,showLine:false};
      };
      const moveDrag=(x,y)=>{
        if(!drag||!ghost)return;
        lastX=x;lastY=y;const r0=row.getBoundingClientRect();
        ghost.style.transform=`translate3d(${r0.left}px,${y-ghostOffsetY}px,0) scale(.985)`;
        const insertion=insertionAt(x,y);
        ppInsertLine(insertion.showLine?insertion:null);
      };
      const finishAt=(x,y,event)=>{
        clear();if(!drag)return false;event?.preventDefault?.();
        const insertion=insertionAt(x,y);
        row.classList.remove('folderDragging');ghost?.remove();ghost=null;ppInsertLine(null);
        if(insertion&&!insertion.cancel){
          const body=row.parentElement;
          const before=insertion.beforeKey?ppRootRows(row).find(r=>ppRootKey(r)===insertion.beforeKey):null;
          const group=[row];let next=row.nextElementSibling;
          while(next&&!next.matches('tr.folderRow,tr.unifiedRow:not(.folderChildRow)')){group.push(next);next=next.nextElementSibling}
          group.forEach(node=>body.insertBefore(node,before||null));
          saveUnifiedManualOrder();save();render();toast('フォルダを移動しました');
        }
        drag=false;setTimeout(()=>{suppressClick=false},50);return true;
      };
      // PC folders use the ordinary mouse sequence exclusively.  Pointer
      // events can remain active after a release outside the original cell,
      // which made a later hover look like a drag.  These listeners exist
      // only from a real left mousedown until its matching mouseup/blur.
      handle.addEventListener('mousedown',e=>{
        if(e.button!==0)return;
        clear();
        sx=e.clientX;sy=e.clientY;lastX=sx;lastY=sy;drag=false;moved=false;suppressClick=false;
        timer=setTimeout(()=>startDrag(sx,sy),Number(prefs.shortcutDelay)||800);
        const cleanup=()=>{
          document.removeEventListener('mousemove',onMove,true);
          document.removeEventListener('mouseup',onUp,true);
          window.removeEventListener('blur',onBlur,true);
        };
        const onMove=move=>{
          if((move.buttons&1)!==1){onUp(move);return}
          if(!drag&&Math.hypot(move.clientX-sx,move.clientY-sy)>2){
            moved=true;clear();startDrag(move.clientX,move.clientY);
          }
          if(drag){move.preventDefault();moveDrag(move.clientX,move.clientY)}
        };
        const onUp=up=>{
          cleanup();
          if(drag)finishAt(up.clientX,up.clientY,up);else clear();
        };
        const onBlur=()=>{cleanup();cancelDrag()};
        document.addEventListener('mousemove',onMove,true);
        document.addEventListener('mouseup',onUp,true);
        window.addEventListener('blur',onBlur,true);
      });
      // Pen input retains the long-press behavior used by touch devices.
      handle.addEventListener('pointerdown',e=>{
        if(e.pointerType!=='pen')return;
        sx=e.clientX;sy=e.clientY;lastX=sx;lastY=sy;drag=false;moved=false;suppressClick=false;
        timer=setTimeout(()=>startDrag(sx,sy,e.pointerId),Number(prefs.shortcutDelay)||800);
      });
      handle.addEventListener('pointermove',e=>{
        if(e.pointerType!=='pen')return;
        if(!drag){if(timer&&Math.hypot(e.clientX-sx,e.clientY-sy)>10){moved=true;clear()}return}
        e.preventDefault();moveDrag(e.clientX,e.clientY);
      });
      handle.addEventListener('pointerup',e=>{if(e.pointerType==='pen')finishAt(e.clientX,e.clientY,e)});
      handle.addEventListener('pointercancel',e=>{if(e.pointerType==='pen')cancelDrag()});
      handle.addEventListener('touchstart',e=>{
        if(e.touches.length!==1)return;
        const t=e.touches[0];sx=t.clientX;sy=t.clientY;lastX=sx;lastY=sy;drag=false;moved=false;suppressClick=false;
        clear();timer=setTimeout(()=>startDrag(sx,sy),Number(prefs.shortcutDelay)||800);
      },{passive:true});
      handle.addEventListener('touchmove',e=>{
        const t=e.touches[0];if(!t)return;
        if(!drag){if(timer&&Math.hypot(t.clientX-sx,t.clientY-sy)>10){moved=true;clear()}return}
        e.preventDefault();moveDrag(t.clientX,t.clientY);
      },{passive:false});
      handle.addEventListener('touchend',e=>{
        const t=e.changedTouches[0];
        if(drag){e.preventDefault();finishAt(t?.clientX??lastX,t?.clientY??lastY,e)}else clear();
      },{passive:false});
      handle.addEventListener('touchcancel',cancelDrag,{passive:true});
      handle.addEventListener('click',e=>{
        if(suppressClick||moved){moved=false;e.preventDefault();e.stopImmediatePropagation();return}
        if(!handle.classList.contains('folderInteractArea'))return;
        e.preventDefault();e.stopImmediatePropagation();
        if(prefs.doubleTapOpenEnabled){const now=Date.now();if(now-lastTap<=450){lastTap=0;toggleFolder()}else lastTap=now;return}
        toggleFolder();
      },true);
    });
  });
}
function bindFolderActions(){
  bindFolderReorder();
  document.querySelectorAll('[data-folder-fav]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();const f=folderById(b.dataset.folderFav);if(!f)return;snapshot('フォルダのお気に入り変更');f.fav=!f.fav;saveFolders();renderKeepingDetails()});
  document.querySelectorAll('.folderRow[data-folder]').forEach(row=>row.addEventListener('pointerdown',()=>{
    const f=folderById(row.dataset.folder);
    if(!f?.isNew)return;
    f.isNew=false;saveFolders();row.querySelector('.folderNewBadge')?.remove();
  },{once:true}));
  document.querySelectorAll('[data-folder-remove]').forEach(b=>b.onclick=()=>{
    const x=items.find(i=>i.id===b.dataset.folderRemove);if(!x)return;
    const folderKey='folder:'+x.folderId;
    const order=[...document.querySelectorAll('.detailTable tbody > tr.folderRow, .detailTable tbody > tr.unifiedRow:not(.folderChildRow)')]
      .map(row=>row.dataset.folder?'folder:'+row.dataset.folder:row.dataset.row).filter(Boolean).filter(id=>id!==x.id);
    const at=order.indexOf(folderKey);if(at<0)return;
    snapshot('フォルダから出す');
    delete x.folderId;x.updated=Date.now();
    order.splice(at+1,0,x.id);
    prefs.manualOrder=order;prefs.sort='manual';savePrefs();$('sort').value='manual';
    save();render();toast('フォルダから出しました');
  });
  document.querySelectorAll('[data-folder-menu-toggle]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    const sourceMenu=b.closest('.detailMenuWrap')?.querySelector('.detailPopupMenu');
    if(!sourceMenu)return;
    const current=document.querySelector('.folderPopupPortal');
    if(current?.dataset.folderPopupFor===b.dataset.folderMenuToggle){current.remove();return}
    current?.remove();
    const portal=sourceMenu.cloneNode(true);
    portal.className='folderPopupPortal';
    portal.dataset.folderPopupFor=b.dataset.folderMenuToggle;
    portal.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
    document.body.appendChild(portal);
    portal.querySelectorAll('[data-folder-rename],[data-folder-delete]').forEach(action=>action.onclick=ev=>{
      ev.stopPropagation();
      const selector=action.hasAttribute('data-folder-rename')?'[data-folder-rename]':'[data-folder-delete]';
      portal.remove();sourceMenu.querySelector(selector)?.click();
    });
    const buttonRect=b.getBoundingClientRect(),menuRect=portal.getBoundingClientRect();
    const bottomNav=document.querySelector('.bottomnav');
    const safeBottom=bottomNav?Math.min(window.innerHeight,bottomNav.getBoundingClientRect().top):window.innerHeight;
    const width=Math.max(170,menuRect.width),height=menuRect.height;
    const left=Math.max(8,Math.min(window.innerWidth-width-8,buttonRect.right-width));
    const roomBelow=safeBottom-buttonRect.bottom-5;
    const top=roomBelow>=height?buttonRect.bottom+5:Math.max(8,buttonRect.top-height-5);
    portal.style.left=left+'px';portal.style.top=top+'px';portal.style.width=width+'px';
  });
  document.querySelectorAll('[data-folder-rename]').forEach(b=>b.onclick=()=>{
    const f=folderById(b.dataset.folderRename);if(!f)return;
    const next=prompt('フォルダ名を変更',f.name);
    if(next===null)return;
    const name=next.trim();
    if(!name||/[\\/:*?"<>|]/.test(name)){alert('このフォルダ名は使えません。');return}
    snapshot('フォルダ名変更');f.name=name;saveFolders();render();
  });
  document.querySelectorAll('[data-folder-delete]').forEach(b=>b.onclick=async()=>{
    const f=folderById(b.dataset.folderDelete);if(!f)return;
    const n=folderCount(f.id);
    if(!await showDataConfirm(`「${f.name}」の削除`,`このフォルダと中のカード${n}枚を削除しますか？\n\n「戻す」で直前の状態に戻せます。`))return;
    if(!folderById(f.id))return;
    snapshot('フォルダ削除');items=items.filter(x=>x.folderId!==f.id);
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
function clearCopyUiState(){
  try{getSelection()?.removeAllRanges()}catch{}
  if(document.activeElement instanceof HTMLElement&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName))document.activeElement.blur();
}
function bindActions(){document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=()=>{snapshot('お気に入り変更');const x=items.find(i=>i.id===b.dataset.fav);x.fav=!x.fav;x.updated=Date.now();save();renderKeepingDetails()});document.querySelectorAll('[data-pin]').forEach(b=>b.onclick=()=>{const x=items.find(i=>i.id===b.dataset.pin);if(!x)return;if(!x.pinned&&items.filter(i=>i.pinned).length>=3){alert('📌 ピン留めできるのは3件までです。\n別のピンを解除してから追加してください。');return}const keepScrollY=window.scrollY;snapshot('ピン留め変更');x.pinned=!x.pinned;x.updated=Date.now();save();renderKeepingDetails();requestAnimationFrame(()=>window.scrollTo({top:keepScrollY,left:0,behavior:'auto'}))});document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=async()=>{const x=items.find(i=>i.id===b.dataset.copy);if(!x)return;let copied=false;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(x.prompt);copied=true}}catch{}if(!copied){const ta=document.createElement('textarea');ta.value=x.prompt;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.left='-9999px';ta.style.top='0';ta.style.opacity='0';ta.style.pointerEvents='none';document.body.appendChild(ta);ta.focus({preventScroll:true});ta.select();ta.setSelectionRange(0,ta.value.length);try{copied=document.execCommand('copy')}catch{}ta.remove()}clearCopyUiState();setTimeout(clearCopyUiState,60);if(copied){x.useCount=(x.useCount||0)+1;x.lastUsed=Date.now();save();toast('コピーしました')}else{toast('コピーできませんでした')}});document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openEditor(items.find(i=>i.id===b.dataset.edit)));document.querySelectorAll('[data-duplicate]').forEach(b=>b.onclick=()=>duplicateItem(b.dataset.duplicate));document.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>deleteItem(b.dataset.delete));document.querySelectorAll('[data-source]').forEach(b=>b.onclick=()=>{const x=items.find(i=>i.id===b.dataset.source);window.open(x.source,'_blank','noopener')});document.querySelectorAll('[data-toggle-row]').forEach(b=>b.onclick=()=>{$('rowDetail-'+b.dataset.toggleRow)?.classList.toggle('hidden');rememberOpenCardState()});document.querySelectorAll('[data-close-detail]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();const detail=$('rowDetail-'+b.dataset.closeDetail);if(!detail)return;detail.classList.add('hidden');rememberOpenCardState();updateCloseAllButton()});document.querySelectorAll('[data-menu-toggle]').forEach(b=>b.onclick=e=>{e.stopPropagation();const wrap=b.closest('.detailMenuWrap'),menu=wrap?.querySelector('.detailPopupMenu');document.querySelectorAll('.detailPopupMenu').forEach(m=>{if(m!==menu){m.classList.add('hidden');m.classList.remove('openUp')}});if(!menu)return;const opening=menu.classList.contains('hidden');menu.classList.toggle('hidden');menu.classList.remove('openUp');if(opening){const r=menu.getBoundingClientRect();const bottomNav=document.querySelector('.bottomnav');const safeBottom=bottomNav?Math.min(window.innerHeight,bottomNav.getBoundingClientRect().top):window.innerHeight;if(r.bottom>safeBottom-8&&wrap.getBoundingClientRect().top-r.height-5>8)menu.classList.add('openUp')}});document.querySelectorAll('.detailPopupMenu').forEach(m=>m.onclick=e=>e.stopPropagation());const favSortBtn=$('detailFavSortBtn');if(favSortBtn)favSortBtn.onclick=()=>{detailFavSort=!detailFavSort;if(prefs.rememberOps){prefs.detailFavSort=detailFavSort;savePrefs()}render()};bindPocketDnd();}


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

function ppLoadOrder(){return Array.isArray(prefs.cardOrder)?prefs.cardOrder:readStoredJson(PP_ORDER_KEY,[],Array.isArray)}
function ppSaveOrder(ids){prefs.cardOrder=[...ids]}
function ppPoint(ev){const t=ev.changedTouches?.[0]||ev.touches?.[0]||ev;return{x:t.clientX,y:t.clientY}}
function ppRows(){return [...document.querySelectorAll('.detailTable tbody > tr[data-row]')]}
function ppRemoveFolderExitSlot(){document.getElementById('ppFolderExitSlot')?.remove()}
function ppEnsureFolderExitSlot(st){
  if(!st.row.classList.contains('folderChildRow'))return;
  const folderId=st.row.dataset.folderChild;
  const children=[...document.querySelectorAll(`.folderChildRow[data-folder-child="${CSS.escape(folderId)}"]`)];
  const last=children.at(-1);if(!last)return;
  let anchor=last;
  if(anchor.nextElementSibling?.classList.contains('rowDetail'))anchor=anchor.nextElementSibling;
  // Keep the folder's closing edge attached to its last card.  The temporary
  // exit target belongs outside the enclosure, not between the card and edge.
  if(anchor.nextElementSibling?.classList.contains('folderFrameEnd'))anchor=anchor.nextElementSibling;
  ppRemoveFolderExitSlot();
  const slot=document.createElement('tr');
  slot.id='ppFolderExitSlot';slot.dataset.folderExit=folderId;
  slot.innerHTML='<td colspan="3"><div>↳ フォルダの外へ移動</div></td>';
  anchor.insertAdjacentElement('afterend',slot);
}

function ppFinishCancel(){
  if(!ppDnd)return;
  const source=ppDnd.source;
  clearTimeout(ppDnd.timer);
  ppDnd.scrollDir=0;
  ppDnd.ghost?.remove();
  ppDnd.row?.classList.remove('pp-dnd-source');
  ppDnd.pcTarget?.classList.remove('pp-pc-drop-target');
  ppRemoveFolderExitSlot();
  ppInsertLine?.(null);
  document.body.classList.remove('pp-dnd-active');
  if(source?.dataset?.dndSuppress)setTimeout(()=>{delete source.dataset.dndSuppress},400);
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
  st.timer=setTimeout(()=>ppStart(st),Number(prefs.shortcutDelay)||800);
}

function ppCollapseForDrag(st){
  document.querySelector('.folderPopupPortal')?.remove();

  // Details and popup menus must not keep occupying space while a card or
  // folder is being moved.  Close them in place so the live drag row is not
  // destroyed by a full render.
  document.querySelectorAll('.rowDetail:not(.hidden),.detailPopupMenu:not(.hidden)').forEach(el=>el.classList.add('hidden'));

  // Card D&D keeps every folder open so the card can be inserted at any
  // visible position. Only a folder being moved collapses its own contents.
  if(!st.row.classList.contains('folderRow'))return;
  const sourceFolderId=st.row.dataset.folder;
  openFolders.delete(sourceFolderId);
  const icon=st.row.querySelector('.folderNameBtn > span:first-child');
  if(icon)icon.textContent='📁';
  document.querySelectorAll(`tr.folderChildRow[data-folder-child="${CSS.escape(sourceFolderId)}"]`).forEach(child=>{
    child.nextElementSibling?.classList.contains('rowDetail')&&child.nextElementSibling.classList.add('hidden');
    child.classList.add('hidden');
  });
}

function ppStart(st){
  // A mouse move can bubble through more than one drag target.  Starting a
  // second time would append another detached ghost, so this operation must
  // be strictly one-shot for its current drag state.
  if(ppDnd!==st||st.active||st.ghost)return;
  clearTimeout(st.timer);st.timer=null;
  vibrateDragLift();
  document.querySelectorAll('.pp-dnd-ghost').forEach(node=>node.remove());
  ppCollapseForDrag(st);
  ppEnsureFolderExitSlot(st);
  st.active=true;
  if(st.source?.dataset)st.source.dataset.dndSuppress='1';
  st.row.classList.add('pp-dnd-source');
  document.body.classList.add('pp-dnd-active');
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
  // The first guide always represents the original slot above the source.
  // Once the pointer actually moves, normal nearest-boundary tracking resumes.
  st.forceSourceTop=st.row.classList.contains('folderChildRow');
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
  // Search only the real list. Folder drag previews contain their own cloned
  // .detailTable and .folderRow, but must never become insertion boundaries.
  const body=document.querySelector('#cards .detailTable > tbody');
  if(!body)return [];
  return [...body.children]
    .filter(row=>row.matches('tr.folderRow,tr.unifiedRow:not(.folderChildRow)')&&row!==exclude);
}
function ppRootKey(row){return row.dataset.folder?'folder:'+row.dataset.folder:row.dataset.row}
function ppLineAfterRootRow(row){
  const roots=ppRootRows(null),at=roots.indexOf(row),next=at>=0?roots[at+1]:null;
  return {kind:'line',y:ppGroupBottom(row),beforeKey:next?ppRootKey(next):null};
}
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
function ppSourceBottom(row){
  if(row.classList.contains('folderRow')||!row.classList.contains('folderChildRow'))return ppGroupBottom(row);
  let bottom=row.getBoundingClientRect().bottom;
  const detail=row.nextElementSibling;
  if(detail?.classList.contains('rowDetail')&&!detail.classList.contains('hidden'))bottom=detail.getBoundingClientRect().bottom;
  return bottom;
}
function ppRootInsertion(sourceRow,ghostTop){
  const sourceIsChild=sourceRow.classList.contains('folderChildRow');
  // Once a child leaves its folder, calculate against the root list. Its old
  // child slot is no longer a cancellation target, and its parent folder must
  // be included so the card can be placed directly below it.
  const rows=ppRootRows(sourceIsChild?null:sourceRow);
  // Both boundaries around the original slot remain visible. Dropping on
  // either one is a deliberate no-op because the order would not change.
  const lines=sourceIsChild?[]:[
    {y:sourceRow.getBoundingClientRect().top,cancel:true},
    {y:ppSourceBottom(sourceRow),cancel:true}
  ];
  if(!rows.length){
    lines.sort((a,b)=>Math.abs(a.y-ghostTop)-Math.abs(b.y-ghostTop));
    return lines[0];
  }
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
  let left=r.left,width=r.width;
  if(show.indent){
    const child=document.querySelector(`.folderChildRow[data-folder-child="${CSS.escape(show.folderId)}"]`);
    const cell=child?.children[1]?.getBoundingClientRect();
    if(cell){left=cell.left+16;width=Math.max(40,r.right-left)}
  }
  line.style.left=left+'px';line.style.top=(show.y-2)+'px';line.style.width=width+'px';
}
function ppFolderChildInsertion(st,y){
  const ghostTop=y-st.offsetY;
  const groups=[...document.querySelectorAll('.folderRow.folderOpen[data-folder]')].map(folder=>{
    const folderId=folder.dataset.folder;
    const all=[...document.querySelectorAll(`.folderChildRow[data-folder-child="${CSS.escape(folderId)}"]`)].filter(row=>!row.classList.contains('hidden'));
    if(!all.length)return null;
    const first=all[0].getBoundingClientRect(),last=all[all.length-1].getBoundingClientRect();
    return {folderId,all,first,last,distance:ghostTop<first.top?first.top-ghostTop:ghostTop>last.bottom?ghostTop-last.bottom:0};
  }).filter(Boolean).filter(group=>ghostTop>=group.first.top-8&&ghostTop<=group.last.bottom+8).sort((a,b)=>a.distance-b.distance);
  const group=groups[0];if(!group)return null;
  const {folderId,all}=group;
  const rows=all.filter(row=>row!==st.row);
  const lines=[];
  if(st.row.dataset.folderChild===folderId){const sourceRect=st.row.getBoundingClientRect();lines.push({kind:'folder-line',folderId,y:sourceRect.top,cancel:true},{kind:'folder-line',folderId,y:sourceRect.bottom,cancel:true})}
  rows.forEach(row=>lines.push({kind:'folder-line',folderId,y:row.getBoundingClientRect().top,beforeId:row.dataset.row}));
  if(rows.length)lines.push({kind:'folder-line',folderId,y:rows[rows.length-1].getBoundingClientRect().bottom,beforeId:null});
  lines.sort((a,b)=>Math.abs(a.y-ghostTop)-Math.abs(b.y-ghostTop));
  return lines[0]?{...lines[0],indent:true}:null;
}
function ppFolderExitInsertion(st,y){
  if(!st.row.classList.contains('folderChildRow'))return null;
  const slot=document.getElementById('ppFolderExitSlot');
  if(!slot||slot.dataset.folderExit!==st.row.dataset.folderChild)return null;
  const r=slot.getBoundingClientRect(),ghostTop=y-st.offsetY;
  if(ghostTop<r.top+10||ghostTop>r.bottom+10)return null;
  const folder=document.querySelector(`tr.folderRow[data-folder="${CSS.escape(slot.dataset.folderExit)}"]`);
  if(!folder)return null;
  return {kind:'folder-exit',folderId:slot.dataset.folderExit,beforeKey:ppLineAfterRootRow(folder).beforeKey};
}
function ppCardInsertion(st,x,y){
  if(st.forceSourceTop&&st.row.classList.contains('folderChildRow')){
    return {kind:'folder-line',folderId:st.row.dataset.folderChild,y:st.row.getBoundingClientRect().top,cancel:true};
  }
  const ghostTop=y-st.offsetY,ghostBottom=ghostTop+st.ghostHeight,ghostCenter=(ghostTop+ghostBottom)/2;
  // Judge a folder from the visible ghost card rather than the finger point.
  // This makes the center drop zone stable regardless of where the user held
  // the card and allows a small alignment error on touch screens.
  const folder=[...document.querySelectorAll('tr.folderRow[data-folder]')].map(row=>{
    const r=row.getBoundingClientRect();
    return {row,r,overlap:Math.max(0,Math.min(ghostBottom,r.bottom)-Math.max(ghostTop,r.top))};
  }).filter(v=>v.overlap>0).sort((a,b)=>b.overlap-a.overlap)[0];
  if(folder&&!st.row.classList.contains('folderRow')){
    const folderRow=folder.row,r=folder.r;
    const draggedCard=items.find(item=>item.id===st.row.dataset.row);
    // A card already inside this folder cannot be "put into" the same folder.
    // Dragging it back over its parent always offers the line above the folder,
    // which moves the card out to the root list before that folder.
    if(draggedCard?.folderId===folderRow.dataset.folder){
      return {kind:'line',y:r.top,beforeKey:'folder:'+folderRow.dataset.folder};
    }
    // The middle 64% is the forgiving "put into folder" zone.  Moving clearly
    // beyond it switches to the insertion line above or below the folder.
    const tolerance=Math.max(10,r.height*.18);
    if(ghostCenter>=r.top+tolerance&&ghostCenter<=r.bottom-tolerance){
      return {kind:'folder',folderId:folderRow.dataset.folder};
    }
    if(ghostCenter<r.top+r.height/2)return {kind:'line',y:r.top,beforeKey:'folder:'+folderRow.dataset.folder};
    return ppLineAfterRootRow(folderRow);
  }
  const exitInsert=ppFolderExitInsertion(st,y);
  if(exitInsert)return exitInsert;
  const childInsert=ppFolderChildInsertion(st,y);
  if(childInsert)return childInsert;
  return {kind:'line',...(ppRootInsertion(st.row,y-st.offsetY)||{})};
}
function ppCommitInFolder(st,insert){
  if(insert.cancel)return;
  const dragId=st.row.dataset.row,card=items.find(x=>x.id===dragId);
  if(!card)return;
  const before=items,remaining=items.filter(x=>x.id!==dragId);
  let at;
  if(insert.beforeId)at=remaining.findIndex(x=>x.id===insert.beforeId);
  else{const indices=remaining.map((x,i)=>x.folderId===insert.folderId?i:-1).filter(i=>i>=0);at=indices.length?indices.at(-1)+1:remaining.length}
  if(at<0)at=remaining.length;
  const next=[...remaining];next.splice(at,0,card);
  const sameFolder=card.folderId===insert.folderId;
  if(sameFolder&&next.length===before.length&&next.every((x,i)=>x===before[i]))return;
  snapshot(sameFolder?'フォルダ内の並べ替え':'フォルダへ移動');card.folderId=insert.folderId;card.updated=Date.now();items=next;ppSaveOrder(items.map(x=>x.id));save();openFolders.add(insert.folderId);render();toast('フォルダ内で移動しました');
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
  ppRemoveFolderExitSlot();
  if(st.source?.dataset)setTimeout(()=>{delete st.source.dataset.dndSuppress},400);
  ppDnd=null;
  if(insert.kind==='folder'&&insert.folderId){
    const card=items.find(item=>item.id===st.row.dataset.row);
    if(card){snapshot('フォルダへ移動');card.folderId=insert.folderId;card.updated=Date.now();save();openFolders.add(insert.folderId);render();toast('フォルダに入れました')}
    return;
  }
  if(insert.kind==='folder-line'){ppCommitInFolder(st,insert);return}
  if(insert.kind==='folder-exit'){ppCommitAtLine(st,insert.beforeKey);return}
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
  document.getElementById('ppFolderExitSlot')?.classList.toggle('active',st.insert.kind==='folder-exit');
  const folderEl=st.insert.kind==='folder'?document.querySelector(`tr[data-folder="${st.insert.folderId}"]`):null;
  document.querySelectorAll('.folderRow.folderDropTarget').forEach(r=>{if(r!==folderEl)r.classList.remove('folderDropTarget')});
  folderEl?.classList.add('folderDropTarget');
  ppInsertLine((st.insert.kind==='line'||st.insert.kind==='folder-line')&&Number.isFinite(st.insert.y)?st.insert:null);
  st.forceSourceTop=false;
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
  const detail=$('rowDetail-'+row.dataset.row);
  if(!detail)return;
  detail.classList.toggle('hidden');
  if(!detail.classList.contains('hidden'))updatePromptOverflow(detail);
  rememberOpenCardState();
  updateCloseAllButton();
}
function bindCardPrimaryInteractions(row,area){
  let moved=false,lastTap=0;
  area.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse'&&e.button!==0)return;
    moved=false;
    ppBegin(row,e.clientX,e.clientY,area,e.pointerType==='mouse');
  });
  area.addEventListener('pointermove',e=>{
    if(ppDnd?.row!==row||ppDnd.active)return;
    if(Math.hypot(e.clientX-ppDnd.startX,e.clientY-ppDnd.startY)<=(ppDnd.pcMode?2:10))return;
    moved=true;
    if(ppDnd.pcMode){clearTimeout(ppDnd.timer);ppDnd.timer=null;ppStart(ppDnd)}else ppFinishCancel();
  });
  area.addEventListener('pointercancel',()=>{moved=true;if(ppDnd?.row===row&&!ppDnd.active)ppFinishCancel()});
  area.addEventListener('click',e=>{
    if(moved||area.dataset.dndSuppress==='1'){
      moved=false;delete area.dataset.dndSuppress;e.preventDefault();e.stopImmediatePropagation();return;
    }
    e.preventDefault();
    if(ppDnd?.row===row&&!ppDnd.active)ppFinishCancel();
    if(prefs.doubleTapOpenEnabled){const now=Date.now();if(now-lastTap<=450){lastTap=0;toggleCardDetail(row)}else lastTap=now;return}
    toggleCardDetail(row);
  });
  area.addEventListener('pointerup',e=>{
    if(ppDnd?.row!==row||ppDnd.active)return;
    ppFinishCancel();
  });
}
function bindPocketDnd(){
  // A thumbnail is a deliberately inactive area in the list. Bind directly
  // to it so mobile browsers cannot treat a long press as image copy/save,
  // while leaving the surrounding card area available for scroll and D&D.
  document.querySelectorAll('.cardThumbDeadZone').forEach(zone=>{
    ['pointerdown','pointermove','pointerup','pointercancel'].forEach(type=>zone.addEventListener(type,e=>e.stopPropagation()));
    ['contextmenu','dragstart','selectstart'].forEach(type=>zone.addEventListener(type,e=>{e.preventDefault();e.stopPropagation()}));
  });
  ppRows().forEach(row=>{
    // The name cell is the drag surface.  Its thumbnail stops propagation
    // below, while the star and operation cells live outside it.
    const area=row.querySelector('.nameCell');
    if(area)bindCardPrimaryInteractions(row,area);
    const menu=row.querySelector('[data-menu-toggle]');
    // The ellipsis keeps its normal tap menu; holding it for 0.8 seconds starts D&D.
    if(menu){
      menu.addEventListener('pointerdown',e=>{
        if(e.pointerType==='mouse'&&e.button!==0)return;
        ppBegin(row,e.clientX,e.clientY,menu,e.pointerType==='mouse');
      });
      menu.addEventListener('pointermove',e=>{
        if(ppDnd?.row!==row||ppDnd.active||Math.hypot(e.clientX-ppDnd.startX,e.clientY-ppDnd.startY)<=(ppDnd.pcMode?2:10))return;
        if(ppDnd.pcMode){clearTimeout(ppDnd.timer);ppDnd.timer=null;ppStart(ppDnd)}else ppFinishCancel();
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
document.addEventListener('selectstart',e=>{if(e.target.closest?.('.unifiedDragArea, .folderInteractArea, .folderCountInline, .cardThumbDeadZone, .opCol, [data-menu-toggle], .folderMenuBtn'))e.preventDefault()},true);
document.addEventListener('contextmenu',e=>{if(e.target.closest?.('.unifiedDragArea, .folderInteractArea, .folderCountInline, .cardThumbDeadZone, .opCol, [data-menu-toggle], .folderMenuBtn'))e.preventDefault()},true);
document.addEventListener('dragstart',e=>{if(e.target.closest?.('.unifiedDragArea, .folderInteractArea, .folderCountInline, .cardThumbDeadZone, .opCol, [data-menu-toggle], .folderMenuBtn'))e.preventDefault()},true);

document.addEventListener('click',e=>{
  if(!e.target.closest('.detailMenuWrap'))document.querySelectorAll('.detailPopupMenu').forEach(m=>m.classList.add('hidden'));
  if(!e.target.closest('.folderPopupPortal,[data-folder-menu-toggle]'))document.querySelector('.folderPopupPortal')?.remove();
});
let editorBaseline='',editorImageRevision=0,editorSession=0,editorClosePending=false;
function editorDraftState(){
  return JSON.stringify({
    fields:[...$('form').querySelectorAll('input:not([type="file"]),textarea,select')].map(field=>[field.id,field.type==='checkbox'?field.checked:field.value]),
    tags:[...selectedTags].sort(),image:imageData,imageRevision:editorImageRevision,
    customTags:[...(editorTagDraft?.customTags||[])].sort(),hiddenTags:editorTagDraft?.hiddenTags||[],
    tagOrder:editorTagDraft?.tagOrder||[],deletedTags:[...(editorTagDraft?.deletedTags||[])].sort()
  });
}
async function openEditor(x=null){
  const session=++editorSession;editorImageRevision=0;
  $('form').reset();editorTagDraft={customTags:new Set(customTags),hiddenTags:[...(prefs.hiddenTags||[])],tagOrder:[...(prefs.tagOrder||[])],deletedTags:new Set()};selectedTags=new Set(x?.tags||[]);activeTagForManage='';
  imageData=x?.image||'';imageBlob=null;
  if(editorImageObjectUrl){URL.revokeObjectURL(editorImageObjectUrl);editorImageObjectUrl=''}
  $('editId').value=x?.id||'';$('dialogTitle').textContent=x?'プロンプトを編集':'プロンプトを登録';['name','prompt','author','xhandle','source','memo'].forEach(k=>$(k).value=x?.[k]||'');
  updatePreview();renderTagChoices();editorBaseline=editorDraftState();document.body.classList.add('editor-open');$('editor').showModal();
  if(isDbImage(imageData)){
    const editingId=x?.id||'';
    try{
      const blob=await getImageBlob(imageDbKey(imageData));
      if(blob&&$('editor').open&&editorSession===session&&$('editId').value===editingId&&editorImageRevision===0){imageBlob=blob;editorImageObjectUrl=URL.createObjectURL(blob);updatePreview(editorImageObjectUrl)}
    }catch{toast('画像を読み込めませんでした')}
  }
}
function updatePreview(source=''){
  const src=source||(!isDbImage(imageData)?imageData:'');
  $('imagePreview').classList.toggle('hidden',!imageData);
  $('imagePreview').innerHTML=src?`<img src="${esc(src)}" alt="">`:(imageData?'<span>画像を読み込み中…</span>':'');
}
async function deleteItem(id){const x=items.find(i=>i.id===id);if(!x)return;if(await showDataConfirm(`「${x.name}」の削除`,'このカードを削除しますか？')){if(!items.some(i=>i.id===id))return;snapshot('削除');items=items.filter(i=>i.id!==id);save();render();toast('削除しました')}}
function duplicateItem(id){const x=items.find(i=>i.id===id);if(!x)return;snapshot('複製');const now=Date.now();const copy={...structuredClone(x),id:crypto.randomUUID(),name:`${x.name} - コピー`,fav:false,pinned:false,created:now,updated:now};items.push(copy);save();render();toast('複製しました');openEditor(copy);}
$('newBtn').onclick=()=>openEditor();
const bottomNew=$('bottomNew');
let shortcutTimer=null,shortcutFired=false;
async function runQuickAdd(){
  let text='';
  try{if(navigator.clipboard?.readText)text=await navigator.clipboard.readText();else throw new Error('clipboard unavailable')}
  catch(err){await openEditor();alert('クリップボードを読み取れませんでした。プロンプト入力欄を長押しして「貼り付け」を選ぶか、直接入力してください。');return}
  if(!text.trim()){toast('クリップボードに文字がありません');return}
  openEditor();$('prompt').value=text;$('prompt').dispatchEvent(new Event('input',{bubbles:true}));toast('コピー中のプロンプトを読み込みました');
}
bottomNew.onclick=e=>{if(shortcutFired){shortcutFired=false;e.preventDefault();return}openEditor()};
bottomNew.onpointerdown=e=>{shortcutFired=false;clearTimeout(shortcutTimer);shortcutTimer=setTimeout(()=>{shortcutFired=true;runQuickAdd()},Number(prefs.shortcutDelay)||800)};
['pointerup','pointercancel','pointerleave'].forEach(ev=>bottomNew.addEventListener(ev,()=>clearTimeout(shortcutTimer)));
bottomNew.addEventListener('contextmenu',e=>e.preventDefault());
function finishCloseEditor(){editorSession++;editorBaseline='';editorTagDraft=null;imageBlob=null;if(editorImageObjectUrl){URL.revokeObjectURL(editorImageObjectUrl);editorImageObjectUrl=''}$('editor').close();document.body.classList.remove('editor-open')}
async function closeEditor(){
  if(!$('editor').open||editorClosePending||editorSaving)return;
  editorClosePending=true;
  try{
    if(editorDraftState()!==editorBaseline&&!await showDataConfirm('編集中の変更','変更を保存せずに閉じますか？'))return;
    finishCloseEditor();
  }finally{editorClosePending=false}
}
$('editor').addEventListener('cancel',e=>{e.preventDefault();closeEditor()});
$('cancelBtn').onclick=closeEditor;$('editorCloseBtn').onclick=closeEditor;$('search').oninput=render;$('sort').onchange=()=>{randomOrder=[];setSortMode($('sort').value)};$('clearFilters').onclick=()=>{$('search').value='';filterTags.clear();render()};$('undoBtn').onclick=()=>{
  if(!undoState||!confirm('直前の操作を取り消して、前の状態に戻しますか？'))return;
  const current=captureState(),target=undoState;
  restoreState(target);save();undoState={label:'元に戻す前の状態',...current};
  render();restoreOpenDetails(target.openCards);toast('前の状態に戻しました');
};
$('closeAllBtn').onclick=closeAllOpenContent;
function defaultPrefs(){return {view:'card',welcomed:false,tagOrder:[],hiddenTags:[],rememberOps:false,buttonGlowEnabled:true,doubleTapOpenEnabled:false,dragVibrationEnabled:true,cardCellSize:'medium',folderNameSize:'medium',mainScreenColor:'default',mainActionOpenMode:'single',shortcutDelay:800,customTags:[]}}
let dataConfirmResolve=null;
function closeDataConfirm(result){const dialog=$('dataConfirmDialog');if(dialog.open)dialog.close();const resolve=dataConfirmResolve;dataConfirmResolve=null;if(resolve)resolve(result)}
function showDataConfirm(title,message){$('dataConfirmTitle').textContent=title;$('dataConfirmMessage').textContent=message;return new Promise(resolve=>{dataConfirmResolve=resolve;$('dataConfirmDialog').showModal()})}
$('dataConfirmOk').onclick=()=>closeDataConfirm(true);
$('dataConfirmCancel').onclick=()=>closeDataConfirm(false);
$('dataConfirmDialog').addEventListener('cancel',e=>{e.preventDefault();closeDataConfirm(false)});
async function resetDataToInitial(){
  if(!await showDataConfirm('データの初期化','登録したカード、フォルダ、タグ、設定、画像を削除して初期状態に戻しますか？\n\nサイト本体のキャッシュは残ります。'))return;
  await deleteImageDb();clearAppStorage(localStorage);storageRecoveryIssues.length=0;items=[];folders=[];undoState=null;customTags.clear();prefs=defaultPrefs();
  seedStarterFolders();savePrefs();localStorage.setItem(DATA_VERSION_KEY,DATA_SCHEMA_VERSION);localStorage.setItem(IMAGE_DB_MIGRATION_KEY,'done');localStorage.setItem(VERSION_KEY,APP_VERSION);
  location.reload();
}
async function clearPhysicalCache(){
  if(!await showDataConfirm('キャッシュの削除','サイト本体のキャッシュを削除して、新しく読み込み直しますか？\n\n登録したカード、フォルダ、設定、画像は削除されません。'))return;
  if('caches'in window){const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith('prompt-pocket-static-')).map(key=>caches.delete(key)))}
  toast('キャッシュを削除しました。次回は新しく読み込みます');
}
async function eraseEverything(){
  if(!await showDataConfirm('すべてを削除','⚠️ Prompt Pocketのすべてを削除します。\n\nカード、フォルダ、設定、画像、キャッシュが削除されます。初期カードも作成しません。\n続けますか？'))return;
  if(!await showDataConfirm('最終確認','本当にすべてを削除しますか？\nこの操作は元に戻せません。'))return;
  await deleteImageDb();clearAppStorage(localStorage);clearAppStorage(sessionStorage);storageRecoveryIssues.length=0;
  if('caches'in window){const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith('prompt-pocket-static-')).map(key=>caches.delete(key)))}
  if('serviceWorker'in navigator){const registrations=await navigator.serviceWorker.getRegistrations();await Promise.all(registrations.filter(reg=>reg.scope===new URL('./',location.href).href).map(reg=>reg.unregister()))}
  items=[];folders=[];undoState=null;customTags.clear();prefs=defaultPrefs();openFolders.clear();filterTags.clear();committedState=captureState();applyPreferences();$('search').value='';closeOptionSections();$('optionDialog').close();render();$('eraseCompleteDialog').showModal();
}
$('deleteAllBtn').onclick=resetDataToInitial;
$('deleteAllBtn').addEventListener('click',()=>document.body.classList.toggle('buttonGlowEnabled',!!prefs.buttonGlowEnabled));
$('addTagBtn').onclick=()=>{const t=$('customTag').value.trim();if(!t||!editorTagDraft)return;editorTagDraft.customTags.add(t);editorTagDraft.hiddenTags=editorTagDraft.hiddenTags.filter(x=>x!==t);if(!editorTagDraft.tagOrder.includes(t))editorTagDraft.tagOrder.push(t);editorTagDraft.deletedTags.delete(t);selectedTags.add(t);activeTagForManage=t;$('customTag').value='';renderTagChoices()};
$('deleteTagBtn').onclick=()=>{const tag=activeTagForManage;if(!tag)return;const count=items.filter(x=>(x.tags||[]).includes(tag)).length;if(!confirm(`タグ「${tag}」は${count}件で使用されています。
削除すると、これらのプロンプトからこのタグだけが削除されます。
プロンプト本体は削除されません。

このタグを削除しますか？`))return;if(!editorTagDraft)return;editorTagDraft.deletedTags.add(tag);selectedTags.delete(tag);editorTagDraft.customTags.delete(tag);if(!editorTagDraft.hiddenTags.includes(tag))editorTagDraft.hiddenTags.push(tag);editorTagDraft.tagOrder=editorTagDraft.tagOrder.filter(t=>t!==tag);activeTagForManage='';renderTagChoices();toast('「設定を保存」で削除が確定します')};
function loadImageFile(f){
  if(!f||!f.type.startsWith('image/')){if(f)alert('画像ファイルを選んでください。');return}
  const session=editorSession;editorImageRevision++;
  const r=new FileReader();
  r.onload=()=>{
    if(session!==editorSession||!$('editor').open)return;
    const img=new Image();
    img.onload=()=>{
      if(session!==editorSession||!$('editor').open)return;
      const MAX=800;
      let w=img.naturalWidth,h=img.naturalHeight;
      const scale=Math.min(1,MAX/Math.max(w,h));
      w=Math.max(1,Math.round(w*scale));h=Math.max(1,Math.round(h*scale));
      const c=document.createElement('canvas');c.width=w;c.height=h;
      c.getContext('2d').drawImage(img,0,0,w,h);
      c.toBlob(blob=>{
        if(session!==editorSession||!$('editor').open)return;
        if(!blob){imageData=c.toDataURL('image/jpeg',0.70);imageBlob=null;updatePreview();return}
        imageBlob=blob;imageData='pending';
        if(editorImageObjectUrl)URL.revokeObjectURL(editorImageObjectUrl);
        editorImageObjectUrl=URL.createObjectURL(blob);updatePreview(editorImageObjectUrl);
        toast('画像を軽量化して保存します');
      },'image/jpeg',0.70);
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
  }catch(err){alert('画像を読み取れませんでした。画像を端末に保存してから、「画像を選択」を通常のタップで開いて選んでください。')}
}
imageDropZone.onclick=e=>{if(imageShortcutFired){imageShortcutFired=false;e.preventDefault();return}$('image').click()};
imageDropZone.onpointerdown=()=>{imageShortcutFired=false;clearTimeout(imageShortcutTimer);imageShortcutTimer=setTimeout(()=>{imageShortcutFired=true;pasteClipboardImage()},Number(prefs.shortcutDelay)||800)};
['pointerup','pointercancel','pointerleave'].forEach(ev=>imageDropZone.addEventListener(ev,()=>clearTimeout(imageShortcutTimer)));
imageDropZone.addEventListener('contextmenu',e=>e.preventDefault());
imageDropZone.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('image').click()}};
$('imageDropZone').ondragover=e=>{e.preventDefault();$('imageDropZone').classList.add('dragOver')};$('imageDropZone').ondragleave=()=>$('imageDropZone').classList.remove('dragOver');$('imageDropZone').ondrop=e=>{e.preventDefault();$('imageDropZone').classList.remove('dragOver');loadImageFile(e.dataTransfer.files[0])};
$('pastePromptBtn').onclick=async()=>{const field=$('prompt');let text='';try{if(navigator.clipboard?.readText){text=await navigator.clipboard.readText()}else{throw new Error('clipboard unavailable')}}catch(err){alert('クリップボードを読み取れませんでした。\nブラウザの権限設定を確認するか、入力欄を長押しして貼り付けてください。');return}if(!text)return toast('クリップボードに文字がありません');if(field.value.trim()&&!confirm('現在のプロンプトは上書きされます。\n貼り付けますか？'))return;field.value=text;field.dispatchEvent(new Event('input',{bubbles:true}));field.focus();toast('プロンプトを貼り付けました')};
let editorSaving=false;
$('form').onsubmit=async e=>{
  e.preventDefault();if(editorSaving)return;
  const name=$('name').value.trim(),prompt=$('prompt').value.trim();if(!name||!prompt)return;
  editorSaving=true;
  try{
    const id=$('editId').value||crypto.randomUUID(),old=items.find(x=>x.id===id),now=Date.now();
    let storedImage=imageData;
    if(imageBlob){
      try{const imageKey=crypto.randomUUID();await putImageBlob(imageKey,imageBlob);storedImage='idb:'+imageKey}
      catch{storedImage=await blobToDataUrl(imageBlob)}
    }
    const obj={...old,id,name,prompt,author:$('author').value.trim(),xhandle:$('xhandle').value.trim(),
      source:$('source').value.trim(),memo:$('memo').value.trim(),tags:[...selectedTags],image:storedImage,
      fav:old?.fav||false,pinned:old?.pinned||false,useCount:old?.useCount||0,lastUsed:old?.lastUsed||0,
      created:old?.created||now,updated:now};
    snapshot(old?'編集':'新規登録');
    const deleted=editorTagDraft?.deletedTags||new Set();
    const next=items.map(x=>deleted.size?{...x,tags:(x.tags||[]).filter(t=>!deleted.has(t))}:x);
    items=old?next.map(x=>x.id===id?obj:x):[...next,obj];
    if(editorTagDraft){
      customTags=new Set(editorTagDraft.customTags);prefs.hiddenTags=[...editorTagDraft.hiddenTags];
      prefs.tagOrder=[...editorTagDraft.tagOrder];filterTags=new Set([...filterTags].filter(t=>!deleted.has(t)));
    }
    save();finishCloseEditor();render();toast('設定を保存しました');
  }catch(error){if(!reportSaveFailure(error))alert('保存できませんでした。入力内容を確認してもう一度お試しください。')}
  finally{editorSaving=false}
};
let optionPrefsDraft=null;
function previewOptionColor(value){$('optionDialog').dataset.previewColor=normalizeMainScreenColor(value)}
const openOptions=()=>{optionPrefsDraft=structuredClone(prefs);$('mainScreenColor').value=normalizeMainScreenColor(optionPrefsDraft.mainScreenColor);previewOptionColor(optionPrefsDraft.mainScreenColor);$('rememberOps').checked=!!optionPrefsDraft.rememberOps;$('buttonGlowEnabled').checked=!!optionPrefsDraft.buttonGlowEnabled;$('doubleTapOpenEnabled').checked=!!optionPrefsDraft.doubleTapOpenEnabled;$('dragVibrationEnabled').checked=!!optionPrefsDraft.dragVibrationEnabled;$('cardCellSize').value=['small','medium','large'].includes(optionPrefsDraft.cardCellSize)?optionPrefsDraft.cardCellSize:'medium';$('folderNameSize').value=['small','medium','large'].includes(optionPrefsDraft.folderNameSize)?optionPrefsDraft.folderNameSize:'medium';$('mainActionOpenMode').value=['single','double'].includes(optionPrefsDraft.mainActionOpenMode)?optionPrefsDraft.mainActionOpenMode:'single';$('shortcutDelay').value=String(optionPrefsDraft.shortcutDelay||800);$('shortcutDelay').disabled=false;$('optionDialog').showModal()};
function openSearchKeepingScroll(){
  const panel=$('searchPanel');
  panel.classList.remove('hidden');
  panel.classList.remove('searchRevealed');
  void panel.offsetWidth;
  panel.classList.add('searchRevealed');
  requestAnimationFrame(()=>{
    panel.scrollIntoView({behavior:'smooth',block:'center'});
    setTimeout(()=>{try{$('search').focus({preventScroll:true})}catch{$('search').focus()}},220);
  });
}
$('viewOptionBtn').onclick=openOptions;

/* TEST100e5: the three main-screen actions use single or double tap. */
let ppMainActionLastTap=null;
function ppMainActionTarget(target){
  const btn=target?.closest?.('button');
  if(!btn||btn.disabled||!['bottomNew','searchMobile','helpMobile'].includes(btn.id))return null;
  return btn;
}
document.addEventListener('click',e=>{
  if(e.detail===0)return;
  const btn=ppMainActionTarget(e.target);
  if(!btn)return;
  if(btn===bottomNew&&shortcutFired){shortcutFired=false;e.preventDefault();e.stopImmediatePropagation();return}
  const mode=prefs.mainActionOpenMode||'single';
  if(mode==='single')return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if(mode!=='double')return;
  const now=Date.now();
  if(ppMainActionLastTap?.btn===btn&&now-ppMainActionLastTap.time<=450){
    ppMainActionLastTap=null;
    btn.click();
  }else ppMainActionLastTap={btn,time:now};
},true);
$('searchMobile').onclick=()=>toggleSearchPanel();
$('helpMobile').onclick=()=>openMainHelp();

function closeOptionSections(){document.querySelectorAll('#optionDialog details[open]').forEach(section=>{section.open=false});developerTapCount=0;clearTimeout(developerTapTimer)}
$('optionSave').onclick=()=>{if(optionPrefsDraft){snapshot('オプション変更');prefs=structuredClone(optionPrefsDraft);if(prefs.rememberOps){prefs.view=prefs.view||'card';prefs.sort=$('sort').value;prefs.detailFavSort=detailFavSort;prefs.openFolderIds=[...openFolders];prefs.openCardIds=getOpenDetailIds()}else{delete prefs.sort;delete prefs.detailFavSort;delete prefs.openFolderIds;delete prefs.openCardIds;detailFavSort=false}savePrefs();document.body.classList.toggle('buttonGlowEnabled',!!prefs.buttonGlowEnabled);document.body.dataset.cardCellSize=prefs.cardCellSize||'medium';document.body.dataset.folderNameSize=prefs.folderNameSize||'medium'}optionPrefsDraft=null;closeOptionSections();$('optionDialog').close();toast('オプションを保存しました')};
$('optionCancel').onclick=()=>{optionPrefsDraft=null;closeOptionSections();$('optionDialog').close()};
$('optionClose').onclick=()=>$('optionCancel').click();
$('resetDataBtn').onclick=resetDataToInitial;
$('clearCacheBtn').onclick=clearPhysicalCache;
$('eraseEverythingBtn').onclick=eraseEverything;
$('eraseCompleteClose').onclick=()=>$('eraseCompleteDialog').close();
$('rememberOps').onchange=e=>{if(optionPrefsDraft)optionPrefsDraft.rememberOps=e.target.checked};
$('buttonGlowEnabled').onchange=e=>{if(optionPrefsDraft)optionPrefsDraft.buttonGlowEnabled=e.target.checked};
$('doubleTapOpenEnabled').onchange=e=>{if(optionPrefsDraft)optionPrefsDraft.doubleTapOpenEnabled=e.target.checked};
$('dragVibrationEnabled').onchange=e=>{if(optionPrefsDraft)optionPrefsDraft.dragVibrationEnabled=e.target.checked};
$('cardCellSize').onchange=e=>{if(optionPrefsDraft)optionPrefsDraft.cardCellSize=['small','medium','large'].includes(e.target.value)?e.target.value:'medium'};
$('mainScreenColor').onchange=e=>{if(optionPrefsDraft){optionPrefsDraft.mainScreenColor=normalizeMainScreenColor(e.target.value);previewOptionColor(optionPrefsDraft.mainScreenColor)}};
$('optionDialog').addEventListener('close',()=>{delete $('optionDialog').dataset.previewColor});
$('optionSave').addEventListener('click',()=>applyPreferences());
$('folderNameSize').onchange=e=>{if(optionPrefsDraft)optionPrefsDraft.folderNameSize=['small','medium','large'].includes(e.target.value)?e.target.value:'medium'};
$('mainActionOpenMode').onchange=e=>{const mode=['single','double'].includes(e.target.value)?e.target.value:'single';if(optionPrefsDraft)optionPrefsDraft.mainActionOpenMode=mode};
$('shortcutDelay').onchange=e=>{if(optionPrefsDraft)optionPrefsDraft.shortcutDelay=Number(e.target.value)||800};
$('optionDialog').addEventListener('cancel',e=>{e.preventDefault();$('optionCancel').click()});

$('exportBtn').onclick=async()=>{
  try{
    if(storageRecoveryIssues.length){
      const raw={app:'Prompt Pocket',type:'storage-recovery',exportedAt:new Date().toISOString(),records:{}};
      for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(isAppStorageKey(key))raw.records[key]=localStorage.getItem(key)}
      const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(raw,null,2)],{type:'application/json'}));
      a.download='prompt-pocket-recovery-'+Date.now()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
      alert('破損した元データの保全ファイルをダウンロードします。通常のバックアップとは異なり、そのまま読み込めません。修復用として保管してください。');return;
    }
    syncTagOrder();toast('バックアップを準備しています');
    const exportItems=[];
    for(const item of items){
      const copy={...item};
      if(isDbImage(copy.image)){
        const imageBlob=await getImageBlob(imageDbKey(copy.image));
        if(!imageBlob)throw new Error('backup image missing');
        copy.image=await blobToDataUrl(imageBlob);
      }
      exportItems.push(copy);
    }
    const data={app:'Prompt Pocket',version:APP_VERSION,dataVersion:DATA_SCHEMA_VERSION,exportedAt:new Date().toISOString(),items:exportItems,folders,prefs,customTags:[...customTags]};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`prompt-pocket-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('バックアップのダウンロードを開始しました');$('backupNoticeDialog').showModal()
  }catch{
    alert('画像を含むバックアップを作成できませんでした。\n時間をおいて、もう一度お試しください。');
  }
};
$('backupNoticeOk').onclick=()=>$('backupNoticeDialog').close();
$('importBtn').onclick=()=>$('importFile').click();
$('importFile').onchange=async e=>{
  const f=e.target.files[0];
  if(!f)return;
  try{
    const data=JSON.parse(await f.text());
    const restored=Array.isArray(data)?data:data?.items;
    if(!validCards(restored))throw new Error();
    const ok=confirm(`⚠️ データを読み込みますか？\n\n現在保存されている${items.length}件のデータは削除され、読み込んだ${restored.length}件のデータに置き換わります。\n「戻す」で読み込み前の状態に戻せます。`);
    if(!ok)return;
    const previousState=captureState();
    const incomingVersion=Array.isArray(data)?'1.0':String(data.dataVersion||data.version||'1.0');
    const needsMigration=versionLessThan(incomingVersion,DATA_SCHEMA_VERSION);
    if(needsMigration)alert('読み込むデータのバージョンは2.0より古いため、データを2.0用にアップデートします。');
    folders=upgradeFoldersTo2(Array.isArray(data.folders)?data.folders:[]);
    items=upgradeItemsTo2(restored,folders);
    const imageMigration=await moveEmbeddedImagesToDb(items);
    if(imageMigration.complete)localStorage.setItem(IMAGE_DB_MIGRATION_KEY,'done');else localStorage.removeItem(IMAGE_DB_MIGRATION_KEY);
    normalize();
    if(data.prefs&&typeof data.prefs==='object'){
      prefs={...prefs,...data.prefs};
      prefs.tagOrder=Array.isArray(prefs.tagOrder)?prefs.tagOrder:[];
      prefs.hiddenTags=Array.isArray(prefs.hiddenTags)?prefs.hiddenTags:[];
      prefs.mainActionOpenMode=['single','double'].includes(data.prefs.mainActionOpenMode)?data.prefs.mainActionOpenMode:'single';
      delete prefs.shortcutEnabled;
      delete prefs.longPressMainActionsEnabled;
      delete prefs.longPressAllButtonsEnabled;
      delete prefs.longPressHelpEnabled;
      delete prefs.longPressSearchEnabled;
      prefs.cardCellSize=['small','medium','large'].includes(prefs.cardCellSize)?prefs.cardCellSize:'medium';
      prefs.folderNameSize=['small','medium','large'].includes(prefs.folderNameSize)?prefs.folderNameSize:'medium';
    }
    openFolders.clear();
    if(prefs.rememberOps&&Array.isArray(prefs.openFolderIds))prefs.openFolderIds.filter(id=>folders.some(f=>f.id===id)&&items.some(x=>x.folderId===id)).forEach(id=>openFolders.add(id));
    customTags=new Set(Array.isArray(data.customTags)?data.customTags:[]);
    prefs.customTags=[...customTags];
    persistAppState(true);storageRecoveryIssues.length=0;
    undoState={label:'データの読み込み',...previousState};applyPreferences();
    localStorage.setItem(DATA_VERSION_KEY,DATA_SCHEMA_VERSION);
    closeOptionSections();$('optionDialog').close();render();
    toast(needsMigration?'バージョン1.xxのデータを2.0用に移行しました。':'データを復元しました');
  }catch(error){
    if(committedState)restoreState(committedState);
    if(!reportSaveFailure(error))alert('このデータファイルは読み込めませんでした。元のデータは維持しています。');
  }finally{
    e.target.value='';
  }
};


/* TEST40: ジャンル別チェック一覧によるサンプル管理 */
const sampleCatalog={"practical":[{"key":"three-view","name":"三面図","prompt":"てんぷしたきゃらくたーがぞうをさんしょうして、おなじきゃらくたーのさんめんずをさくせいしてください。しょうめん・まよこ・はいめんのぜんしんをよこいちれつにならべ、かみがた、かおだち、たいかく、いしょう、そうしょく、はいしょくをとういつしてください。かくほうこうででざいんがむじゅんしないようにし、せっていしりょうとしてかくにんしやすいしんぷるなはいけいとれいあうとにしてください。","tags":["🖼️ 画像","アニメ","女の子"],"image":"assets/media/prompt-pocket-05.webp"},{"key":"character-sheet","name":"キャラクターシート","prompt":"てんぷしたがぞうのきゃらくたーをさんしょうして、きゃらくたーしーとをさくせいしてください。きゃらくたーのでざいん、かみがた、いしょう、そうしょく、はいしょくなどのとくちょうをいじし、ぜんしんず、かおのあっぷ、だいひょうてきなひょうじょうやぽーずをみやすくはいちしてください。おなじきゃらくたーとしてとういつかんをたもち、せっていしりょうとしてつかいやすいしんぷるなれいあうとにしてください。","tags":["🖼️ 画像","アニメ","女の子"],"image":"assets/media/prompt-pocket-06.webp"},{"key":"expressions","name":"表情差分","prompt":"てんぷしたきゃらくたーがぞうをさんしょうして、おなじきゃらくたーでざいんをいじしたままふくすうのひょうじょうさぶんをさくせいしてください。つうじょう、えがお、うぃんく、てれ、すこしかなしそう、おどろき、むすっとしたひょうじょう、かんがえちゅう、にっこり、ねむそうなど、わかりやすくことなるひょうじょうをならべてください。かみがた、かおだち、いしょう、はいしょくはかえず、かおのひょうじょうだけがしぜんにへんかするようにしてください。","tags":["🖼️ 画像","アニメ","女の子","可愛い"],"image":"assets/media/prompt-pocket-07.webp"}],"style":[{"key":"fantasy-art","name":"幻想アート","prompt":"きょだいなまんげつのしたにひろがる、えいがのようにちょうみつどでげんそうてきなあにめふうのせかい。ながれるようなとうめいかんのあるあおとしろのどれすをまとったわかいじょせいが、はなとつたにおおわれたいせきからこちらへてをのばしている。くろいかみ、りぼん、はなびら、ひかるちょうがよるかぜにただよい、そばにはちいさなしろいねこがいる。おくには、しろ、はし、たき、とう、うかぶしま、みずかがみ、らんたん、すいしょう、てんたいのそうしょくでかざられたひかりかがやくとしがひろがる。あお、むらさき、ぴんく、きんいろのゆめのようなひかりと、ほし、きり、きらめきにつつまれた、おくゆきのあるげんそうてきなふんいき。","tags":["🖼️ 画像","アニメ","ファンタジー","女の子"],"image":"assets/media/prompt-pocket-08.webp"},{"key":"handdrawn","name":"手描きイラスト風","prompt":"あらくいろえんぴつでえがいた、いきいきとしたあにめふうのいらすと。ひざしのあたるまちのかいだんにえがおのしょうじょがすわり、かたほうのてでほおをささえながらまえにみをのりだし、もうかたほうのてをこちらへのばしている。かぜになびくくろいかみ、かじゅあるなしゃつ、でにむしょーつ、ばっぐを、らふでいろあざやかなせんでえがく。てすり、たてもの、でんちゅう、でんせん、しょくぶつ、はな、かんばん、とおくのまちなみをすけっちのようにえがき、あたたかいかみのしつかん、はっちんぐのかげ、ぱすてるちょうのらくがきのようなせんで、えこんてのようないきおいのあるふんいきにする。よめるもじはいれない。","tags":["🖼️ 画像","アニメ","女の子"],"image":"assets/media/prompt-pocket-09.webp"},{"key":"deformed","name":"デフォルメ・マスコット","prompt":"しろいむじのはいけいに、ひとりのかわいらしいでふぉるめされたあにめふうのしょうじょをえがく。ふとくはっきりしたりんかくせん、くっきりしたせるぬり、ぱすてるちょうのはいらいと、つやのあるおおきなひとみ、あざやかでやわらかなはいしょくにする。しょうじょはかたほうのひざをあげてまえにふみだすようにみをのりだし、おおきくえがかれたてでぴーすさいんをこちらへのばし、うぃんくしながらあかるくえがおをみせる。ながれるようなくらいちゃいろのかみにはいろどりのあるはいらいととあわいいろのへあぴんをつける。ゆったりしたしろいしゃつ、だめーじのあるうすあおのでにむしょーつ、べると、ぴんくのさし色がはいったぼりゅーむのあるすにーかー、きんいろのかなぐがついたくらいいろのばっぐをみにつける。","tags":["🖼️ 画像","アニメ","可愛い","女の子"],"image":"assets/media/prompt-pocket-10.webp"}],"arrange":[]};
sampleCatalog.game=[];sampleCatalog.other=[];
sampleCatalog.practical.forEach(x=>x.tags=[...new Set([...(x.tags||[]),'実用'])]);
sampleCatalog.style.forEach(x=>x.tags=[...new Set([...(x.tags||[]),'アレンジ'])]);
sampleCatalog.practical.push({
 key:'transparent-cutout',name:'背景を透過（切り抜き）',
 description:'人物やキャラクターを維持したまま、背景だけを透明にします。',
 prompt:'添付した画像の人物またはキャラクターを維持したまま、背景だけを完全に透明化してください。顔立ち、髪型、体格、衣装、配色、ポーズは変更しないでください。髪の毛や装飾品などの細かな輪郭を丁寧に切り抜き、白い縁や背景の残りが出ないようにしてください。市松模様を背景として描かず、透明情報を持つPNG画像として出力してください。',
 tags:['🖼️ 画像','実用'],image:'assets/media/prompt-pocket-11.webp'
});
sampleCatalog.other.push(
 {key:'sns-profile-icons',name:'丸型SNSアイコンセット',description:'同じキャラクターを、テーマの異なる6種類の丸型プロフィールアイコンにします。',prompt:'添付した画像の人物またはキャラクターの顔立ち、髪型、特徴を維持して、SNSプロフィール用の丸型アイコンを3列×2行で6種類作成してください。すべて肩から上の構図で顔を大きく中央に配置し、丸く切り抜かれても髪や顔が欠けない余白を確保してください。6種類は、自然光のナチュラル、ピンクで可愛い、青系でクール、夜景とネオン、季節の花、モノクロで大人風のテーマに分け、表情、服装、背景、円形フレームの装飾を変えてください。すべて同じ人物に見えるよう統一し、文字、SNSロゴ、透かしは入れないでください。',tags:['🖼️ 画像'],image:'assets/media/prompt-pocket-12-v2.webp'},
 {key:'line-stickers',name:'LINEスタンプセット',description:'9種類の言葉と表情を組み合わせた、3×3のリアクションスタンプを作ります。',prompt:'添付した画像の人物またはキャラクターの顔立ち、髪型、特徴を維持して、日常会話で使いやすいLINEスタンプを3×3の配置で9種類作成してください。左上から順に「わ～い」「ありがとう」「OK」「マジ？」「了解」「お願い」「おつかれ」「がんばれ」「ごめん」の文字を、各キャラクターの下または横に正確に入れてください。それぞれの言葉に合う表情とポーズにし、各スタンプを独立して切り抜きやすく配置してください。背景は透明にし、指定した言葉以外の文字、ロゴ、透かしは入れないでください。',tags:['🖼️ 画像','可愛い'],image:'assets/media/prompt-pocket-13-v2.webp'},
 {key:'trading-card',name:'カードゲーム風',description:'キャラクターを魔法演出と豪華な枠で、レアなゲームカード風に仕上げます。',prompt:'添付した画像の人物またはキャラクターの顔立ち、髪型、特徴を維持して、豪華なファンタジーカードゲーム風のイラストを作成してください。衣装は白と青を基調とした華やかな魔法使い風に変更し、片手から青白い魔法を放つ躍動的なポーズにしてください。金色と青色の装飾的なカード枠、光、粒子、舞う花びらを加え、希少なカードらしい仕上がりにしてください。人物は1人だけにし、腕と手の本数や指を自然に描いてください。読める文字、能力値、ロゴ、透かしは入れないでください。',tags:['🖼️ 画像'],image:'assets/media/prompt-pocket-14-v2.webp'}
);
const sampleText={
 'three-view':{description:'同じキャラクターの正面・側面・背面を並べた設定資料を作ります。',prompt:'添付したキャラクター画像を参照して、同じキャラクターの三面図を作成してください。正面・真横・背面の全身を横一列に並べ、髪型、顔立ち、体格、衣装、装飾、配色を統一してください。各方向でデザインが矛盾しないようにし、設定資料として確認しやすいシンプルな背景とレイアウトにしてください。'},
 'character-sheet':{description:'全身・顔・表情・ポーズをまとめたキャラクター設定資料を作ります。',prompt:'添付した画像のキャラクターを参照して、キャラクターシートを作成してください。キャラクターのデザイン、髪型、衣装、装飾、配色などの特徴を維持し、全身図、顔のアップ、代表的な表情やポーズを見やすく配置してください。同じキャラクターとして統一感を保ち、設定資料として使いやすいシンプルなレイアウトにしてください。'},
 'expressions':{description:'同じキャラクターで複数の表情差分を作ります。',prompt:'添付したキャラクター画像を参照して、同じキャラクターデザインを維持したまま複数の表情差分を作成してください。通常、笑顔、ウインク、照れ、少し悲しそうな表情、驚き、むすっとした表情、考え中、にっこり、眠そうなど、分かりやすく異なる表情を並べてください。髪型、顔立ち、衣装、配色は変えず、顔の表情だけが自然に変化するようにしてください。'},
 'fantasy-art':{description:'月夜の幻想都市を舞台にした高密度なファンタジー作品を作ります。',prompt:'巨大な満月の下に広がる、映画のように高密度で幻想的なアニメ風の世界。流れるような透明感のある青と白のドレスをまとった若い女性が、花と蔦に覆われた遺跡からこちらへ手を伸ばしている。黒い髪、リボン、花びら、光る蝶が夜風に漂い、そばには小さな白い猫がいる。奥には、城、橋、滝、塔、浮かぶ島、水鏡、ランタン、水晶、天体の装飾で飾られた光り輝く都市が広がる。青、紫、ピンク、金色の夢のような光と、星、霧、きらめきに包まれた、奥行きのある幻想的な雰囲気。'},
 'handdrawn':{description:'色鉛筆とラフな線を使った手描き風イラストを作ります。',prompt:'粗い色鉛筆で描いた、生き生きとしたアニメ風のイラスト。日差しの当たる街の階段に笑顔の少女が座り、片方の手で頬を支えながら前に身を乗り出し、もう片方の手をこちらへ伸ばしている。風になびく黒い髪、カジュアルなシャツ、デニムショーツ、バッグを、ラフで色鮮やかな線で描く。手すり、建物、電柱、電線、植物、花、看板、遠くの街並みをスケッチのように描き、温かい紙の質感、ハッチングの影、パステル調の落書きのような線で、絵コンテのような勢いのある雰囲気にする。読める文字は入れない。'},
 'deformed':{description:'大きな表情とポーズが特徴のデフォルメキャラクターを作ります。',prompt:'白い無地の背景に、1人の可愛らしいデフォルメされたアニメ風の少女を描く。太くはっきりした輪郭線、くっきりしたセル塗り、パステル調のハイライト、艶のある大きな瞳、鮮やかで柔らかな配色にする。少女は片方の膝を上げて前に踏み出すように身を乗り出し、大きく描かれた手でピースサインをこちらへ伸ばし、ウインクしながら明るく笑顔を見せる。流れるような暗い茶色の髪には彩りのあるハイライトと淡い色のヘアピンを付ける。ゆったりした白いシャツ、ダメージのある薄青のデニムショーツ、ベルト、ピンクの差し色が入ったボリュームのあるスニーカー、金色の金具が付いた暗い色のバッグを身に付ける。'}
};
Object.values(sampleCatalog).flat().forEach(x=>Object.assign(x,sampleText[x.key]||{}));
// TEST45で旧サンプル元から作られた未編集カードだけを、現在のサンプル一覧へ差し替える。
(()=>{
 const marker='promptPocket.starterSamples.current.v4';if(localStorage.getItem(marker)==='done')return;
 const old=items.filter(x=>String(x.id||'').startsWith('starter-')&&x.memo==='サンプルです。自由に編集・削除できます。');
 if(old.length){
  const oldIds=new Set(old.map(x=>x.id));items=items.filter(x=>!oldIds.has(x.id));
  const groups=[['実用',sampleCatalog.practical||[]],['アレンジ',[...(sampleCatalog.style||[]),...(sampleCatalog.arrange||[])]],['その他',sampleCatalog.other||[]]];
  const now=Date.now();groups.forEach(([name,samples],gi)=>{let folder=folders.find(f=>f.name===name);if(!folder){folder={id:'starter-folder-'+gi,name,created:now+gi,isNew:false};folders.push(folder)}samples.forEach((source,index)=>items.push({id:'starter-'+source.key,presetKey:source.key,name:source.name,prompt:source.prompt,author:'',xhandle:'',source:'',memo:'サンプルです。自由に編集・削除できます。',tags:source.tags||[],image:source.image||'',folderId:folder.id,fav:false,pinned:false,useCount:0,lastUsed:0,created:now+gi*20+index,updated:now+gi*20+index}));});
  save();saveFolders();
 }
 localStorage.setItem(marker,'done');
})();
let sampleSelection=new Set(),samplePending=[];
function sampleCurrentList(){return sampleCatalog[$('sampleCategory').value]||[]}
function allSamples(){return Object.values(sampleCatalog).flat()}
function renderSampleList(){
 const box=$('sampleList'),list=sampleCurrentList();box.innerHTML='';
 if(!list.length){box.innerHTML='<div class="sampleListEmpty">このジャンルのサンプルは準備中です</div>';$('sampleExecute').disabled=sampleSelection.size===0;return}
 list.forEach(x=>{
  const label=document.createElement('label');label.className='sampleListItem';
  const check=document.createElement('input');check.type='checkbox';check.checked=sampleSelection.has(x.key);
  const img=document.createElement('img');img.src=x.image;img.alt='';img.loading='lazy';
  const text=document.createElement('span'),name=document.createElement('strong'),desc=document.createElement('small');name.textContent=x.name;desc.textContent=x.description;
  text.append(name,desc);label.append(check,img,text);box.appendChild(label);
  check.onchange=()=>{check.checked?sampleSelection.add(x.key):sampleSelection.delete(x.key);$('sampleExecute').disabled=sampleSelection.size===0};
 });
 $('sampleExecute').disabled=sampleSelection.size===0;
}
function resetSampleSelection(){sampleSelection.clear();samplePending=[];renderSampleList()}
function openSampleDialog(){sampleSelection.clear();renderSampleList();$('sampleDialog').showModal()}
$('sampleBtn').onclick=openSampleDialog;
$('emptyFolderClose').onclick=()=>$('emptyFolderDialog').close();
$('emptyFolderDialog').addEventListener('cancel',e=>{e.preventDefault();$('emptyFolderDialog').close()});
$('sampleCategory').onchange=renderSampleList;
$('sampleExecute').onclick=()=>{
 samplePending=allSamples().filter(x=>sampleSelection.has(x.key));
 if(!samplePending.length)return;
 const duplicate=samplePending.find(x=>items.some(item=>item.presetKey===x.key));
 if(duplicate){alert('「'+duplicate.name+'」はすでに追加されています。');return}
 $('sampleConfirmMessage').textContent=samplePending.length===1?'「'+samplePending[0].name+'」を追加します。よろしいですか？':samplePending.length+'件のサンプルを追加します。よろしいですか？';
 $('sampleConfirmDialog').showModal();
};
$('sampleConfirmYes').onclick=()=>{
 if(!samplePending.length)return;
 snapshot('サンプル追加');
 const now=Date.now();
 samplePending.forEach((x,i)=>items.push({
   id:crypto.randomUUID(),presetKey:x.key,name:x.name,prompt:x.prompt,author:'',xhandle:'',source:'',
   memo:'Prompt Pocketに用意されているサンプルプロンプトです。自由に編集して使えます。',
   tags:[...x.tags],image:x.image,pinned:false,fav:false,favorite:false,useCount:0,lastUsed:0,created:now+i,updated:now+i,createdAt:now+i,updatedAt:now+i
 }));
 const n=samplePending.length;samplePending.forEach(x=>sampleSelection.delete(x.key));samplePending=[];save();render();renderSampleList();$('sampleConfirmDialog').close();toast(n+'件追加しました');
};
$('sampleConfirmNo').onclick=()=>{samplePending=[];$('sampleConfirmDialog').close()};
$('sampleConfirmDialog').addEventListener('cancel',e=>{e.preventDefault();$('sampleConfirmNo').click()});
function closeSampleDialog(){sampleSelection.clear();samplePending=[];$('sampleConfirmDialog').close();$('sampleDialog').close()}
$('sampleClose').onclick=closeSampleDialog;
$('sampleDialog').addEventListener('cancel',e=>{e.preventDefault();closeSampleDialog()});

const toggleSearchPanel=()=>{
  if($('searchPanel').classList.contains('hidden'))openSearchKeepingScroll();
  else{closeSearchPanel()}
};
$('searchToggleBtn').onclick=()=>toggleSearchPanel();
const closeSearchPanel=()=>{$('searchPanel').classList.add('hidden');$('searchPanel').classList.remove('searchRevealed');$('search').value='';filterTags.clear();render()};
$('closeSearch').onclick=()=>closeSearchPanel();
function showHelpSection(section,title){
  ['simpleHelp','detailHelp','usefulHelp'].forEach(id=>$(id).classList.toggle('hidden',id!==section));
  $('helpDialog').querySelector('.detailBackBottom').classList.toggle('hidden',section==='simpleHelp');
  $('helpTitle').textContent=title;
  $('helpDialog').scrollTop=0;
}
const openMainHelp=()=>{showHelpSection('simpleHelp','Prompt Pocketの使い方');if(!$('helpDialog').open)$('helpDialog').showModal()};
$('helpBtn').onclick=openMainHelp;
$('helpClose').onclick=()=>$('helpDialog').close();
$('usefulHelpBtn').onclick=()=>showHelpSection('usefulHelp','便利機能');
$('moreHelpBtn').onclick=()=>showHelpSection('detailHelp','バックアップについて');
$('backSimpleHelp').onclick=()=>showHelpSection('simpleHelp','Prompt Pocketの使い方');
$('tutorialHelpBtn').onclick=()=>{
  tutorialShouldSeed=false;
  $('helpDialog').close();
  showTutorial();
};
$('migrationHelpBtn').onclick=()=>{$('optionDialog').close();$('migrationDialog').showModal()};
const closeMigrationHelp=()=>{$('migrationDialog').close();$('optionDialog').showModal()};
$('migrationClose').onclick=closeMigrationHelp;
$('migrationDialog').addEventListener('cancel',e=>{e.preventDefault();closeMigrationHelp()});

let welcomeIsDebug=false;
let tutorialShouldSeed=false;
$('welcomeStart').onclick=()=>{
  // 見本はチュートリアル終了時にだけ追加する。
  const shouldSeed=!welcomeIsDebug&&!prefs.welcomed&&items.length===0;
  tutorialShouldSeed=shouldSeed;
  prefs.welcomed=true;savePrefs();$('welcomeDialog').close();
  welcomeIsDebug=false;
  requestAnimationFrame(()=>showTutorial());
};
let tutorialLoaded=false,tutorialStep=0;
const tutorialTitles=['チュートリアル','①プロンプトのコピー','②プロンプトの貼り付け','③プロンプト名入力','④画像のコピー','⑤画像の貼り付け','⑥設定を保存','⑦カードの確認','詳しい説明'];
const requestTutorialExit=()=>{
  const confirmDialog=$('tutorialExitConfirmDialog');
  if(!confirmDialog.open)confirmDialog.showModal();
};
const finishTutorial=()=>{
  $('tutorialExitConfirmDialog').close();
  $('tutorialDialog').close();
  if(tutorialShouldSeed&&items.length===0){
    seedStarterFolders();render();
    $('tutorialSampleDialog').showModal();
  }
  tutorialShouldSeed=false;
};
$('tutorialExitCancel').onclick=()=>$('tutorialExitConfirmDialog').close();
$('tutorialExitOk').onclick=finishTutorial;
$('tutorialSampleClose').onclick=()=>$('tutorialSampleDialog').close();
async function showTutorial(){
  const dialog=$('tutorialDialog');
  if(!tutorialLoaded){
    try{
      const response=await fetch('tutorial.html?v='+encodeURIComponent(APP_VERSION));
      if(!response.ok)throw new Error(`tutorial.html ${response.status}`);
      const content=await response.text();
      const connectedVersion=content.match(/PP_RELEASE:([^\s*<>]+)/)?.[1];
      if(!window.ppVersion.assert(connectedVersion))return;
      $('tutorialContent').innerHTML=content;
      tutorialLoaded=true;
      const steps=[...$('tutorialContent').querySelectorAll('.tutorialStep')];
      const tabs=[...$('tutorialContent').querySelectorAll('.tutorialTab')];
      const back=$('tutorialContent').querySelector('.tutorialBack');
      const next=$('tutorialContent').querySelector('.tutorialNext');
      const positionTutorialPointers=()=>{
        const step=steps[tutorialStep],media=step?.querySelector('.tutorialMedia');
        const img=media?.querySelector('img:not(.tutorialPointer)');
        if(!img?.naturalWidth||!media.clientWidth)return;
        const scale=Math.min(media.clientWidth/img.naturalWidth,media.clientHeight/img.naturalHeight);
        const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
        const ox=(media.clientWidth-w)/2,oy=(media.clientHeight-h)/2;
        const targets={1:[.20,.40],2:[.70,.67],3:[.60,.23],4:[.51,.90],5:[.72,.16],6:[.46,.78],8:[.86,.42]};
        const pointer=media.querySelector('.tutorialPointer'),target=targets[tutorialStep];
        if(pointer&&target){
          const pointerSize=Math.min(64,media.clientWidth*.16);
          pointer.style.setProperty('width',pointerSize+'px','important');pointer.style.setProperty('height',pointerSize+'px','important');
          // The fingertip is at 23% x / 20% y in the shared transparent icon.
          pointer.style.left=(ox+w*target[0]-pointerSize*.23)+'px';
          pointer.style.top=(oy+h*target[1]-pointerSize*.20)+'px';
          pointer.style.bottom='auto';
        }
        const start=media.querySelector('.selectionStart'),end=media.querySelector('.selectionEnd');
        if(start){start.style.left=(ox+w*.015)+'px';start.style.top=(oy+h*.51)+'px'}
        if(end){end.style.left=(ox+w*.98-14)+'px';end.style.top=(oy+h*.96-14)+'px';end.style.right='auto';end.style.bottom='auto'}
      };
      steps.forEach(step=>step.querySelector('img:not(.tutorialPointer)')?.addEventListener('load',positionTutorialPointers));
      new ResizeObserver(positionTutorialPointers).observe($('tutorialContent'));
      const renderStep=()=>{
        requestAnimationFrame(positionTutorialPointers);
        const isLast=tutorialStep===steps.length-1;
        steps.forEach((node,index)=>{node.hidden=index!==tutorialStep});
        tabs.forEach((tab,index)=>tab.classList.toggle('active',index===tutorialStep));
        $('tutorialContent').querySelector('.tutorialTitle').textContent=tutorialTitles[tutorialStep]||'チュートリアル';
        back.classList.toggle('tutorialActionPlaceholder',tutorialStep===0);
        next.classList.toggle('tutorialActionPlaceholder',isLast);
        back.disabled=tutorialStep===0;
        next.disabled=isLast;
        $('tutorialContent').querySelector('.tutorialClose').textContent='閉じる';
      };
      $('tutorialContent').querySelector('.tutorialClose').onclick=requestTutorialExit;
      back.onclick=()=>{if(tutorialStep>0){tutorialStep--;renderStep()}};
      next.onclick=()=>{if(tutorialStep<steps.length-1){tutorialStep++;renderStep()}};
      dialog.addEventListener('cancel',event=>{event.preventDefault();requestTutorialExit()});
      dialog.__renderTutorialStep=renderStep;
    }catch(error){
      console.warn('チュートリアルの読み込みに失敗しました',error);
      $('tutorialContent').innerHTML='<div class="welcomePanel"><h2>チュートリアル</h2><p>詳しい使い方はヘルプをご覧ください。</p><button class="primary wide" type="button" id="tutorialFallbackClose">閉じる</button></div>';
      $('tutorialContent').querySelector('#tutorialFallbackClose').onclick=requestTutorialExit;
      tutorialLoaded=true;
    }
  }
  tutorialStep=0;
  dialog.__renderTutorialStep?.();
  if(!dialog.open)dialog.showModal();
}
let developerTapCount=0,developerTapTimer=null;
$('developerSummary').addEventListener('click',e=>{
  if($('developerOptions').open)return;
  e.preventDefault();developerTapCount++;
  clearTimeout(developerTapTimer);developerTapTimer=setTimeout(()=>{developerTapCount=0},2000);
  if(developerTapCount>=5){developerTapCount=0;clearTimeout(developerTapTimer);$('developerOptions').open=true;toast('開発者向け機能を開きました')}
});
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
function addDebugLoadData(folderTotal,cardTotal){
  if(!confirm(`負荷テスト用のフォルダ${folderTotal}個とカード${cardTotal}枚を追加しますか？\n通常のデータには影響しません。`))return;
  snapshot('負荷テスト追加');const now=Date.now(),batch=crypto.randomUUID(),testFolders=[];
  for(let i=0;i<folderTotal;i++){
    const folder={id:`dev-folder-${batch}-${i}`,name:`負荷テスト ${i+1}`,created:now+i,isNew:false,devTest:true,devBatch:batch};
    folders.push(folder);testFolders.push(folder);
  }
  const debugLoadImages=[...new Set(allSamples().map(sample=>sample.image).filter(Boolean))];
  for(let i=0;i<cardTotal;i++){
    const d=debugSamples[i%debugSamples.length],folder=testFolders[i%testFolders.length];
    items.push({id:`dev-card-${batch}-${i}`,name:`${d[0]} ${i+1}`,prompt:d[1],author:'負荷テスト',xhandle:'',source:'',memo:'開発者向け負荷テスト用カード',tags:[],image:debugLoadImages[i%debugLoadImages.length]||'',folderId:folder.id,fav:false,pinned:false,useCount:0,lastUsed:0,created:now+folderTotal+i,updated:now+folderTotal+i,devTest:true,devBatch:batch});
  }
  saveFolders();save();render();toast(`負荷テスト用カードを${cardTotal}枚追加しました`);
}
function removeDebugLoadData(){
  const testFolderIds=new Set(folders.filter(folder=>folder.devTest).map(folder=>folder.id));
  const cardCount=items.filter(item=>item.devTest).length,folderCount=testFolderIds.size;
  if(!cardCount&&!folderCount){toast('負荷テスト用データはありません');return}
  if(!confirm(`負荷テスト用のカード${cardCount}枚とフォルダ${folderCount}個を削除しますか？\n通常のデータは削除されません。`))return;
  items=items.filter(item=>!item.devTest).map(item=>testFolderIds.has(item.folderId)?{...item,folderId:null}:item);
  folders=folders.filter(folder=>!folder.devTest);testFolderIds.forEach(id=>openFolders.delete(id));saveFolders();save();render();toast('負荷テスト用データを削除しました');
}
$('debugAdd50').onclick=()=>addDebugLoadData(5,50);
$('debugAdd100').onclick=()=>addDebugLoadData(10,100);
$('debugRemoveLoad').onclick=removeDebugLoadData;
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

const allowedSortModes=['manual','foldersFirst','createdDesc','nameAsc','fav'];
prefs.view='detail';$('sort').value=prefs.rememberOps&&allowedSortModes.includes(prefs.sort)?prefs.sort:'manual';
if(sessionStorage.getItem('promptPocket.migratedFrom1x')==='1')setTimeout(()=>{sessionStorage.removeItem('promptPocket.migratedFrom1x');toast('保存されていたバージョン1.xxのデータを、バージョン2.0用に移行しました。')},250);
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
if(!storageRecoveryIssues.length){
  try{save();localStorage.setItem(VERSION_KEY,APP_VERSION)}catch(error){reportSaveFailure(error)}
}
render();
document.querySelector('.appVersion').textContent='Prompt Pocket '+document.querySelector('.headerVersion').textContent;
if(storageRecoveryIssues.length)setTimeout(()=>alert('保存データの一部を読み込めませんでした。元データを保護するため保存を停止しています。オプションからバックアップを読み込むか、データを初期化してください。'),100);
else migrateStoredImages().catch(reportSaveFailure);

/* X / Discord 内蔵ブラウザだけで、通常ブラウザへの切り替えを案内する。 */
(()=>{
  const dlg=document.getElementById('externalBrowserGuide'); if(!dlg)return;
  const ua=navigator.userAgent||'', ref=(document.referrer||'').toLowerCase();
  const qs=new URLSearchParams(location.search), forced=(qs.get('pp_test')||'').toLowerCase(), source=(qs.get('from')||'').toLowerCase();
  const mobile=/Android|iPhone|iPad|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  const sourceHint=['x','discord'].includes(source)||['x','discord'].includes(forced);
  const socialReferrer=/https?:\/\/[^/]*(?:x\.com|twitter\.com|t\.co|discord(?:app)?\.com)/i.test(ref);
  // 外部Chrome/SafariでURLの ?from=x / ?from=discord が残っても案内を出さない。
  // X・Discordが付与するUA、またはWebViewの印とリンク元の印が両方ある場合だけ案内する。
  const inAppUA=/Twitter|TwitterAndroid|Twitter-iPhone|\bX\/|Discord/i.test(ua);
  const genericWebView=/\bwv\b|Version\/4\.0/i.test(ua);
  const isInApp=inAppUA||((sourceHint||socialReferrer)&&genericWebView);
  if(!mobile||!isInApp)return;
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
      const folder={id:'folder-'+crypto.randomUUID(),name,created:Date.now(),isNew:true,fav:false};
      snapshot('フォルダ作成');folders.unshift(folder);
      if($('sort').value==='manual'){
        const key='folder:'+folder.id;
        prefs.manualOrder=[key,...(Array.isArray(prefs.manualOrder)?prefs.manualOrder:[]).filter(x=>x!==key)];
        savePrefs();
      }
     saveFolders();dlg.close();render();toast('フォルダ「'+name+'」を作成しました');
   };
 });
})();
