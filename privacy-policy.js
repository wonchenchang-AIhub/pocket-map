(function(root){
  'use strict';
  const allowed = Object.freeze(['在地小吃','中式台菜','日韓料理','異國料理','火鍋燒烤居酒屋','咖啡甜點冰品','景點步道','住宿露營']);
  const blockedName = '國華中醫藥器材行';
  const keep = p => p && allowed.includes(p.t) && typeof p.n === 'string' && !p.n.includes(blockedName);
  const filter = data => {
    if (!Array.isArray(data)) throw new Error('收藏資料必須為陣列');
    return data.filter(keep).map(p => Object.fromEntries(['id','n','c','d','t','r','k','s','u','l'].filter(k=>Object.hasOwn(p,k)).map(k=>[k,p[k]])));
  };
  const policy = Object.freeze({allowed,keep,filter});
  if (typeof module === 'object' && module.exports) module.exports = policy;
  else root.PocketMapPrivacy = policy;
})(typeof globalThis === 'object' ? globalThis : this);
