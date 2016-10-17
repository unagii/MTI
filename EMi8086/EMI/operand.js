/**
 * Created by unagii on 14.10.2016.
 */


function Operand(name,address,type,w){
    this.name=name
    this.addr=address

    this.w=w

    if (type=="reg") {
        this.read =Operand.prototype.readReg
        this.write  =Operand.prototype.writeReg//запись
    }
    if (type=="mem") {
        this.read =Operand.prototype.readMem
        this.write  =Operand.prototype.writeMem//запись

    }


}

Operand.prototype.readReg=function () {
    var regname= this.addr
    switch(regname){
        case'AX':return (cpu.registers.AH.value << 8) | cpu.registers.AL.value
        case'CX':return (cpu.registers.CH.value << 8) | cpu.registers.CL.value
        case'DX':return (cpu.registers.DH.value << 8) | cpu.registers.DL.value
        case'BX':return (cpu.registers.BH.value << 8) | cpu.registers.BL.value
    }
    return cpu.registers[regname].value
}

Operand.prototype.writeReg=function (value) {
    var regname= this.addr
    switch(regname){
        case'AX':
            cpu.registers.AH.value = (value & 0xFF00) >> 8;
            cpu.registers.AL.value = (value & 0x00FF);
            return;
        case'CX':
            cpu.registers.CH.value = (value & 0xFF00) >> 8;
            cpu.registers.CL.value = (value & 0x00FF);
            return;
        case'DX':
            cpu.registers.DH.value = (value & 0xFF00) >> 8;
            cpu.registers.DL.value = (value & 0x00FF);
            return;
        case'BX':
            cpu.registers.BH.value = (value & 0xFF00) >> 8;
            cpu.registers.BL.value = (value & 0x00FF);
            return;
    }
    cpu.registers[regname].value= (value & 0x00FF);
}


Operand.prototype.readMem=function () {
    var value
    if (this.w) value= ((memory[this.addr + 1] << 8) | memory[this.addr]);
    else value= memory[this.addr]
    return value
}



Operand.prototype.writeMem=function (value) {

   memory[this.addr]=value

    if (this.w) memView.updateFrom(this.addr,this.addr+1)
    else  memView.updateFrom(this.addr,this.addr+1)



}