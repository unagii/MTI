/**
 * Created by unagii on 26.08.2016.
 */


function Decoder() {

}
Decoder.prototype={}

Decoder.prototype.parse2 = function(bytes8,start,end) {


    this.bytes8 = bytes8
    this.pos=start

    var insList=[]

    while  (this.pos <500 ) {

        this.curentOpCode = bytes8[this.pos];




        var curentIns=this.getInstruction.call(this,this.pos, this.bytes8)
        this.pos+=curentIns.length

        insList.push(curentIns)
    }


    return insList;
}


Decoder.prototype.getInstruction = function(address,memory) {


    var ins = new Instruction(address, memory)

    return ins
};




