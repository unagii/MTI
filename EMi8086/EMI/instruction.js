/**
 * Created by unagii on 31.08.2016.
 */





function Instruction(address,memory){
    this.addr=address;
    this.memory=memory;
    this.opcode_byte = memory[address],

    this.d=(this.opcode_byte & 0x02) >>> 1;
    this.w=(this.opcode_byte & 0x01);
    this.length=1;
    this.operands=[];
    this.displacement=0


    var opcode=OpCode[this.opcode_byte]
    this.name=opcode.name

    if (opcode.AddrByte)this.readAddrByte();
    if (opcode.operands!=null) {
        if (opcode.operands[0]!=null)this.getOperand(opcode.operands[0]);
        if (opcode.operands[1]!=null)this.getOperand(opcode.operands[1]);
    }
    this.getBytes(this.displacement+opcode.len);

}


Instruction.prototype={}


//чтение адресного байта
Instruction.prototype.readAddrByte=function() {
    var addressing_byte = this.memory[this.addr + 1];
    this.addressing_byte = addressing_byte;
    this.mod = (addressing_byte & 0xC0) >>> 6;
    this.reg = (addressing_byte & 0x38) >>> 3;
    this.rm = (addressing_byte & 0x07);
    this.displacement = displacement[this.mod]//???
};


Instruction.prototype.getBytes=function(len){
    this.length=len
    this.bytes=memory.slice(this.addr,this.addr+len)
    };


//чтение регистра/памяти
Instruction.prototype.readRM=function() {
   //trace(this)
    var si=cpu.registers.SI.value<<1
    var addr=this.addr+1
    var value
    var memory=this.memory
    switch (this.mod) {
        case 0 :
            value = new Operand(rmTable1[this.rm].name,si+memory[addr],"mem",this.w)
            return value
        case 1 :
            value = new Operand(rmTable1[this.rm].name + "+" + memory[this.addr + 2].toString(16),si+memory[addr+1],"mem",0) //rmTable1[this.rm].name + "+" + memory[this.addr + 2].toString(16)
            return value
        case 2 :
            value = new Operand(rmTable1[this.rm].name + "+" + ((memory[this.addr + 3] << 8) | memory[this.addr + 2] ).toString(16),si+memory[addr+2],"mem",1)
            return value
        case 3 :
            value = this.readRegister(this.w, this.rm)//,this.readRegister(this.w, this.rm),"mem")//this.readRegister(this.w, this.rm)
            return value
    }

}

//чтение регистра
Instruction.prototype.readRegister=function(w,reg) {
    var value = ""
    switch (w) {
        case 0:
            value =new Operand(registers8[reg].name,registers8[reg].name,"reg") // registers8[reg].name
            return value
        case 1:
            value = new Operand(registers16[reg].name,registers16[reg].name,"reg") // //registers16[reg].name
            return value
    }
}



Instruction.prototype.readSegmentRegister=function(reg){
    return new Operand(segmentRegisters[reg].name,segmentRegisters[reg].name,"reg") // registers8[reg].name
}




//чтение операнда из кода программы
Instruction.prototype.readImmediate=function(w,disp) {
    var name=0
    if (w) name= ((memory[this.addr + 2 +disp] << 8) | memory[this.addr+1+disp]);
    else name= memory[this.addr+1+disp];
    var value = new Operand(name.toString(16).toUpperCase(),this.addr + 1+disp,"mem",w)

    return value

}


Instruction.prototype.getOperand= function (operandType){
    var value
    switch (operandType){
        case 'E':value=this.readRM();break;             //RM
        case 'G':value=this.readRegister(this.w,this.reg);break;    //REG
        case 'S':value=this.readSegmentRegister(this.reg);break;    //SEG
        case 'Ib':value=this.readImmediate(0,0);break;
        case 'Iw':value=this.readImmediate(1,0);break;
        case 'Iw1':value=this.readImmediate(1,1);break;
        case 'Iw2':value=this.readImmediate(1,2);break;
        case 'Ib1':value=this.readImmediate(0,1);break;
        case 'Ib2':value=this.readImmediate(0,2);break;
        case 'AL':value= new Operand("AL","AL","reg");break;
        case 'CL':value= new Operand("CL","CL","reg");break;
        case 'DL':value= new Operand("DL","DL","reg");break;
        case 'BL':value= new Operand("BL","BL","reg");break;
        case 'AH':value= new Operand("AH","AH","reg");break;
        case 'CH':value= new Operand("CH","CH","reg");break;
        case 'DH':value= new Operand("DH","DH","reg");break;
        case 'BH':value= new Operand("BH","BH","reg");break;
        case 'AX':value= new Operand("AX","AX","reg");break;
        case 'CX':value= new Operand("CX","CX","reg");break;
        case 'DX':value= new Operand("DX","DX","reg");break;
        case 'BX':value= new Operand("BX","BX","reg");break;
        case 'SP':value= new Operand("SP","SP","reg");break;
        case 'BP':value= new Operand("BP","BP","reg");break;
        case 'SI':value= new Operand("SI","SI","reg");break;
        case 'DI':value= new Operand("DI","DI","reg");break;
        case 'CS':value= new Operand("CS","CS","reg");break;
        case 'DS':value= new Operand("DS","DS","reg");break;
        case 'SS':value= new Operand("SS","SS","reg");break;
        case 'ES':value= new Operand("ES","ES","reg");break;
    }
    this.operands.push(value)

};


Instruction.prototype.exec=function(){
    instructions[ this.name](this)
}

Instruction.prototype.toStringArr= function(){

    var addr=this.intToHex(this.addr,5)
    var bytes=this.bytesToStr( this.bytes)
    var str= this.name + '\t'
    if (this.operands[0] != null) {
        str = str + this.operands[0].name
        if (this.operands[1] != null) {
            str = str + "," + this.operands[1].name
        }

    }
    return [addr,bytes,str]

}


Instruction.prototype.bytesToStr=function(bytes){

    var i=0
    var str=''
    while (i<bytes.length){
        str+=this.intToHex(bytes[i],2) +" "

        i++
    }
    return str
}

Instruction.prototype.intToHex=function(int,len){
    var str =int.toString(16).toUpperCase()
    while (str.length < len)str = "0" + str;
    return str
}




