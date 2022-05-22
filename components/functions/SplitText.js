export function descreption (text){
    var new_list = [];
   if (text) {
    const list = text.split(" ");
    for(let i = 0 ; i < 15 ; i++){
        new_list.push(list[i])
    }
   }else{
        new_list.push(text)
   }
    return new_list.join(" ");
}