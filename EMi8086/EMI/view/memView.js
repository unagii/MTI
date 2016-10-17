/**
 * Created by unagii on 28.09.2016.
 */

function MemView(container) {

    this.container=document.getElementById(container)
    this.table= new Table(container)
}


MemView.prototype.showFrom= function(memory,start) {
    var i=0
    var table= this.table

    table.clear()


    while (i<1000){

        table.addIndexRowMem(i, memory.slice(i,i+16),[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
        i+=16
    }

}

MemView.prototype.updateFrom= function(start,end) {

    var i=0
    var table= this.table



    while (start<=end){

        table.replaceValue(start&0xffff0,start&0xf,this.intToHex(memory[start],2))

        table.setHighlightValue(start&0xffff0,start&0xf,"#337ab7")

        start++
    }

}




MemView.prototype.setHighlight= function(start,end) {


    var table= this.table

    while (start<=end){

        table.setHighlightValue(start&0xffff0,start&0xf,"#faa732")
        start++
    }

}



MemView.prototype.intToHex=function(int,len){
    var str =int.toString(16).toUpperCase()
    while (str.length < len)str = "0" + str;
    return str
}

