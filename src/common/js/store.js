/**
 * Created by 331095 on 2018/3/9.
 * 进行数据的本地化存取
 */
// 存储
export function saveToLocal (id, key, value) {
  // 双下划綫表示为私有变量
  let seller = window.localStorage.__seller__;
  if (!seller){
    // 如果从没有创建过seller，则创建
    seller = {};
    seller[id] = {};
    // seller[id][key] = value;
  } else {
    // 将__seller__解析成对象
    seller = JSON.parse(seller)
    // seller里没有id属性，则创建
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
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
  // ret存在则输出ret，不存在输出def
  return ret || def
}
