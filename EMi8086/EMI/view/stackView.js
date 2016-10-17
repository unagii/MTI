/**
 * Created by unagii on 13.10.2016.
 */

function StackView(container) {



    this.table=new Table(container)

}




StackView.prototype.showFrom= function(memory,SS,stackSize) {

    var table= this.table

    table.clear()

    var ss=this.intToHex(SS,4)
    ss+=":"

    while (stackSize>=0){

        table.addIndexRow(stackSize, [ss+this.intToHex(stackSize,4),this.intToHex((memory[stackSize]+memory[stackSize+1]),4)],[stackSize])
        stackSize-=2
    }

}

StackView.prototype.updateSP= function(SP) {
    this.table.clearHighlight();
    this.table.setHeader(SP);
}



StackView.prototype.intToHex=function(int,len){
    var str =int.toString(16).toUpperCase()
    while (str.length < len)str = "0" + str;
    return str
}