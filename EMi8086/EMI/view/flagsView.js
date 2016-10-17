/**
 * Created by unagii on 05.10.2016.
 */

function FlagsView(container) {
    this.flags= new FLAGS()
    this.flags.value=0xF002;
    this.table=new Table(container)
    this.show(this.flags)



}


FlagsView.prototype.show=function(flags){

    var table=this.table
    table.clear()
    var i=0

    table.setHeader(['OF','DF','IF','TF','SF','ZF','AF','PF','CF'])
    table.addIndexRow('flags',['0','0','0','0','0','0','0','0','0'],['OF','DF','IF','TF','SF','ZF','AF','PF','CF'])

}


FlagsView.prototype.update=function(flags) {


    var table = this.table
    table.clearHighlight()
    var oldFlags = this.flags

    if(flags.getFlag("CF")!=oldFlags.getFlag("CF")){table.setHighlightValue("flags","CF","#faa732");table.replaceValue("flags","CF",flags.getFlag("CF"));oldFlags.toggleFlag("CF")}
    if(flags.getFlag("ZF")!=oldFlags.getFlag("ZF")){table.setHighlightValue("flags","ZF","#faa732");table.replaceValue("flags","ZF",flags.getFlag("ZF"));oldFlags.toggleFlag("ZF")}
    if(flags.getFlag("SF")!=oldFlags.getFlag("SF")){table.setHighlightValue("flags","SF","#faa732");table.replaceValue("flags","SF",flags.getFlag("SF"));oldFlags.toggleFlag("SF")}
    if(flags.getFlag("OF")!=oldFlags.getFlag("OF")){table.setHighlightValue("flags","OF","#faa732");table.replaceValue("flags","OF",flags.getFlag("OF"));oldFlags.toggleFlag("OF")}
    if(flags.getFlag("PF")!=oldFlags.getFlag("PF")){table.setHighlightValue("flags","PF","#faa732");table.replaceValue("flags","PF",flags.getFlag("PF"));oldFlags.toggleFlag("PF")}
    if(flags.getFlag("AF")!=oldFlags.getFlag("AF")){table.setHighlightValue("flags","AF","#faa732");table.replaceValue("flags","AF",flags.getFlag("AF"));oldFlags.toggleFlag("AF")}
    if(flags.getFlag("IF")!=oldFlags.getFlag("IF")){table.setHighlightValue("flags","IF","#faa732");table.replaceValue("flags","IF",flags.getFlag("IF"));oldFlags.toggleFlag("IF")}
    if(flags.getFlag("TF")!=oldFlags.getFlag("TF")){table.setHighlightValue("flags","TF","#faa732");table.replaceValue("flags","TF",flags.getFlag("TF"));oldFlags.toggleFlag("TF")}
    if(flags.getFlag("DF")!=oldFlags.getFlag("DF")){table.setHighlightValue("flags","DF","#faa732");table.replaceValue("flags","DF",flags.getFlag("DF"));oldFlags.toggleFlag("DF")}




}


FlagsView.prototype.intToHex=function(int){
        var str =int.toString(16).toUpperCase()
        if (str.length < 2)str = "0" + str;
        return str
    }

FlagsView.prototype.intToWord=function(int){
        var str =int.toString(16).toUpperCase()
        while (str.length < 4)str = "0" + str;
        return str
    }

FlagsView.prototype.intToBin=function(int,len){
        var str =int.toString(2).toUpperCase()

        while (str.length < len) str = "0" + str;
        return str
    }

