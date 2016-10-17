/**
 * Created by unagii on 04.10.2016.
 */


function Emu() {



    this.memory = cpu.memoryV//
    this.startAddress = 0 //начало программы
    this.endAddress = 0 //конец программы
    this.curentAddress = 0; //адресс текущий инструкции


    this.pos = 0;

    this.curentOpCode = 0;

    this.text = []
    this.instrList = new Map();

    this.stateHistory=[]
}


Emu.prototype.loadProgramm=function(blob,start){

        var bufView = new Uint8Array(blob)//(reader.result); //??
        this.curentAddress=start
        this.startAddress=start //начало программы
        this.endAddress=start +bufView.length //конец программы


        cpu.registers.CS.value=start
        cpu.loadBinary(start,blob)



        memView.showFrom(cpu.memoryV);
        asmView.update(cpu.memoryV);
        regView.update(cpu.registers)

    var nextIns=decoder.getInstruction(cpu.registers.IP.value,memory)
    memView.setHighlight(nextIns.addr,nextIns.length-1)
    asmView.setHighlight(nextIns.addr)


    }

Emu.prototype.parse = function() {


       var pos=this.startAddress;
       var end=this.startAddress+0xffff//this.endAddress;
       var memory=cpu.memoryV;
       var  curentOpCode=0;
        //пока this.pos < bytes8.length// в рабочей программе пока не стоп
        while  (pos < end) {
            //trace(this.pos)
            curentOpCode = memory[pos];
            // this.instrList.push(this.OpCode[this.curentOpCode].call(this,))

            var curentIns=decoder.getInstruction.call(decoder,pos, memory);
            pos+=curentIns.length;
            this.instrList.set(curentIns.addr,curentIns)
        }
    }


Emu.prototype.next=function() {

    var state = cpu.getState()
    emu.stateHistory.push(state)

    memView.table.clearHighlight()
    cpu.tick()


    var nextIns = decoder.getInstruction(cpu.registers.IP.value, memory)

    memView.setHighlight(nextIns.addr, nextIns.addr + nextIns.length - 1)
    asmView.setHighlight(nextIns.addr)


    regView.update(cpu.registers);
    flagsView.update(cpu.flags);


}

Emu.prototype.back=function() {

    if (emu.stateHistory.length == 0) return


    var state = emu.stateHistory.pop()

    cpu.restoreState(state)

    var nextIns = decoder.getInstruction(cpu.registers.IP.value, memory)

    memView.table.clearHighlight()
    memView.setHighlight(nextIns.addr, nextIns.addr + nextIns.length - 1)
    asmView.setHighlight(nextIns.addr)

    regView.update(cpu.registers);
    flagsView.update(cpu.flags);


}



Emu.prototype.run=function() {
    cpu.run=true
    emu.run1();
}

Emu.prototype.run1=function() {

    if (cpu.run){
        memView.table.clearHighlight()
        cpu.tick()
        setTimeout(emu.run2, sleep.getValue())
    }
}


Emu.prototype.run2=function() {
    var nextIns = decoder.getInstruction(cpu.registers.IP.value, memory)
    memView.setHighlight(nextIns.addr, nextIns.addr + nextIns.length - 1)
    asmView.setHighlight(nextIns.addr)
    regView.update(cpu.registers);
    flagsView.update(cpu.flags);
    emu.run1();
}


Emu.prototype.pause=function() {
    cpu.run=false

}


Emu.prototype.reset=function() {
    cpu.reset()


    memView.showFrom(cpu.memoryV);
    asmView.update(cpu.memoryV);
    regView.update(cpu.registers)

    var nextIns=decoder.getInstruction(cpu.registers.IP.value,memory)
    memView.setHighlight(nextIns.addr,nextIns.length-1)
    asmView.setHighlight(nextIns.addr)
}


Emu.prototype.copyRegisters=function(dest,src){
        var i=0
        while (i < dest.registers.length) {
            dest.registers[i].value =src.registers[i].value;
            i++
        }
        dest.IP.value =src.IP.value;

    }



Emu.prototype.sleepFor=function( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}

