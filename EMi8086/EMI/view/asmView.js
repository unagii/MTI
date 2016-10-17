/**
 * Created by unagii on 04.10.2016.
 */


function AsmView(container) {
    this.table=new Table(container)
 }


AsmView.prototype.update= function(memory){

    this.table.clear()
   var instrList=decoder.parse2(memory,0,300)


    var i=0
    while (i<instrList.length){
        var ins=instrList[i]
        this.table.addTextRow(ins.addr,ins.toStringArr())
       i++

    }

}

AsmView.prototype.setHighlight= function(addr) {


    var table= this.table
    table.clearHighlight()


    table.setHighlightValue(addr,"","#faa732")
}



AsmView.prototype.bytesToStr=function(bytes){

    var i=0
    var str=''
    while (i<bytes.length){
        str+=this.intToHex(bytes[i],2) +" "

        i++
    }
return str
}

AsmView.prototype.intToHex=function(int,len){
    var str =int.toString(16).toUpperCase()
    while (str.length < len)str = "0" + str;
    return str
}

