/**
 * Created by 331095 on 2018/3/9.
 * 进行数据的本地化存取
 */
// 存储
export function saveToLocal (id, key, value) {
  // 双下划綫表示为私有变量
  let seller = window.localStorage.__seller__;
  if (!seller){
    seller = {};
    seller[id][key] = value;
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON,stringify(seller);
};
// 读取
export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller){
    return def;
  }
  let ret = seller[key];
  return ret || def
}
