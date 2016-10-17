/**
 * Created by unagii on 28.09.2016.
 */

function RegView(container) {

    this.reg= new Registers()
    this.table=new Table(container)


    this.show(this.reg)
}


RegView.prototype.show=function(reg){

    var table=this.table
    table.clear()
    var i=0

    table.addIndexRow("AX",["AX","00","00"],["AX","H","L"])
    table.addIndexRow("BX",["BX","00","00"],["BX","H","L"])
    table.addIndexRow("CX",["CX","00","00"],["CX","H","L"])
    table.addIndexRow("DX",["DX","00","00"],["DX","H","L"])

    table.addIndexRow("SP",["SP","00","00"],["SP","H","L"])
    table.addIndexRow("BP",["BP","00","00"],["BP","H","L"])

    table.addIndexRow("SI",["SI","00","00"],["SI","H","L"])
    table.addIndexRow("DI",["DI","00","00"],["DI","H","L"])

    table.addIndexRow("ES",["ES","00","00"],["ES","H","L"])
    table.addIndexRow("CS",["CS","00","00"],["CS","H","L"])
    table.addIndexRow("SS",["SS","00","00"],["SS","H","L"])
    table.addIndexRow("DS",["DS","00","00"],["DS","H","L"])

    table.addIndexRow("IP",["IP","00","00"],["IP","H","L"])

   // table.highlightValue('IP',"H")

   // table.highlightValue('SI',"H")
   // table.highlightValue('DI',"H")
   // table.highlightValue('AX',"H")
    //table.highlightValue('AX',"L")

    //table.clearHighlight()
    //table.replaceValue('IP',"H","11")

   // var nn=document.getElementById('regViewAX')
   // nn.style='background-color:#00ffe9;'
}


RegView.prototype.update=function(reg){


    var table=this.table
        table.clearHighlight()
    var oldReg=this.reg
    if (oldReg.AL.value!=reg.AL.value) {
        table.replaceValue("AX","L",this.intToHex(reg.AL.value))
        oldReg.AL.value=reg.AL.value
        table.setHighlightValue("AX","L","#faa732")
    }

    if (oldReg.AH.value!=reg.AH.value) {
        table.replaceValue("AX","H",this.intToHex(reg.AH.value))
        oldReg.AH.value=reg.AH.value
        table.setHighlightValue("AX","H","#faa732")
    }


    if (oldReg.BL.value!=reg.BL.value) {
        table.replaceValue("BX","L",this.intToHex(reg.BL.value))
        oldReg.BL.value=reg.BL.value
        table.setHighlightValue("BX","L","#faa732")
    }

    if (oldReg.BH.value!=reg.BH.value) {
        table.replaceValue("BX","H",this.intToHex(reg.BH.value))
        oldReg.BH.value=reg.BH.value
        table.setHighlightValue("BX","H","#faa732")
    }

    if (oldReg.CL.value!=reg.CL.value) {
        table.replaceValue("CX","L",this.intToHex(reg.CL.value))
        oldReg.CL.value=reg.CL.value
        table.setHighlightValue("CX","L","#faa732")
    }

    if (oldReg.CH.value!=reg.CH.value) {
        table.replaceValue("CX","H",this.intToHex(reg.CH.value))
        oldReg.CH.value=reg.CH.value
        table.setHighlightValue("CX","H","#faa732")
    }

    if (oldReg.DL.value!=reg.DL.value) {
        table.replaceValue("DX","L",this.intToHex(reg.DL.value))
        oldReg.DL.value=reg.DL.value
        table.setHighlightValue("DX","L","#faa732")
    }

    if (oldReg.DH.value!=reg.DH.value) {
        table.replaceValue("DX","H",this.intToHex(reg.DH.value))
        oldReg.DH.value=reg.DH.value
        table.setHighlightValue("DX","H","#faa732")
    }

    if (oldReg.SP.value!=reg.SP.value) {
        table.replaceValue("SP","H",this.intToHex(reg.SP.value&0xff00))
        table.replaceValue("SP","L",this.intToHex(reg.SP.value&0xff))
        oldReg.SP.value=reg.SP.value
        table.setHighlightValue("SP","H","#faa732")
        table.setHighlightValue("SP","L","#faa732")
    }

    if (oldReg.BP.value!=reg.BP.value) {
        table.replaceValue("BP","H",this.intToHex(reg.BP.value&0xff00))
        table.replaceValue("BP","L",this.intToHex(reg.BP.value&0xff))
        oldReg.BP.value=reg.BP.value
        table.setHighlightValue("BP","H","#faa732")
        table.setHighlightValue("BP","L","#faa732")
    }

    if (oldReg.SI.value!=reg.SI.value) {
        table.replaceValue("SI","H",this.intToHex(reg.SI.value&0xff00))
        table.replaceValue("SI","L",this.intToHex(reg.SI.value&0xff))
        oldReg.SI.value=reg.SI.value
        table.setHighlightValue("SI","H","#faa732")
        table.setHighlightValue("SI","L","#faa732")
    }

    if (oldReg.DI.value!=reg.DI.value) {
        table.replaceValue("DI","H",this.intToHex(reg.DI.value&0xff00))
        table.replaceValue("DI","L",this.intToHex(reg.DI.value&0xff))
        oldReg.DI.value=reg.DI.value
        table.setHighlightValue("DI","H","#faa732")
        table.setHighlightValue("DI","L","#faa732")
    }

    if (oldReg.ES.value!=reg.ES.value) {
        table.replaceValue("ES","H",this.intToHex(reg.ES.value&0xff00))
        table.replaceValue("ES","L",this.intToHex(reg.ES.value&0xff))
        oldReg.ES.value=reg.ES.value
        table.setHighlightValue("ES","H","#faa732")
        table.setHighlightValue("ES","L","#faa732")
    }

    if (oldReg.CS.value!=reg.CS.value) {
        table.replaceValue("CS","H",this.intToHex(reg.CS.value&0xff00))
        table.replaceValue("CS","L",this.intToHex(reg.CS.value&0xff))
        oldReg.CS.value=reg.CS.value
        table.setHighlightValue("CS","H","#faa732")
        table.setHighlightValue("CS","L","#faa732")
    }

    if (oldReg.SS.value!=reg.SS.value) {
        table.replaceValue("SS","H",this.intToHex(reg.SS.value&0xff00))
        table.replaceValue("SS","L",this.intToHex(reg.SS.value&0xff))
        oldReg.SS.value=reg.SS.value
        table.setHighlightValue("SS","H","#faa732")
        table.setHighlightValue("SS","L","#faa732")
    }

    if (oldReg.DS.value!=reg.DS.value) {
        table.replaceValue("DS","H",this.intToHex(reg.DS.value&0xff00))
        table.replaceValue("DS","L",this.intToHex(reg.DS.value&0xff))
        oldReg.DS.value=reg.DS.value
        table.setHighlightValue("DS","H","#faa732")
        table.setHighlightValue("DS","L","#faa732")
    }

    if (oldReg.IP.value!=reg.IP.value) {
        table.replaceValue("IP","H",this.intToHex(reg.IP.value&0xff00))
        table.replaceValue("IP","L",this.intToHex(reg.IP.value&0xff))
        oldReg.IP.value=reg.IP.value
        table.setHighlightValue("IP","H","#faa732")
        table.setHighlightValue("IP","L","#faa732")
    }


}


RegView.prototype.intToHex=function(int){
        var str =int.toString(16).toUpperCase()
        if (str.length < 2)str = "0" + str;
        return str
    }

RegView.prototype.intToWord=function(int){
        var str =int.toString(16).toUpperCase()
       while (str.length < 4)str = "0" + str;
        return str
    }

RegView.prototype.intToBin=function(int,len){
        var str =int.toString(2).toUpperCase()

        while (str.length < len) str = "0" + str;
        return str
    }

