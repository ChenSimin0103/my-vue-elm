/**
 * Created by 331095 on 2018/3/9.
 * 解析url参数
 * @example ?id=001&authur=csm
 * @return Object {id:001,authur:csm}
 */
export function urlParse () {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // arr: ["?id=001", "&anthur=csm"]
  if (arr){
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      // decodeURLcomponent: 16进制转义序列将被其所表示的字符串替代
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    })
  }
  return obj;
}
