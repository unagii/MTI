/**
 * Created by unagii on 26.08.2016.
 */




function CPU() {

    this.run=false
    //регистры
    this.registers= new Registers();
    this.registers.CS.value=0xFFFF;

    //регистр состояний
    this.flags=new FLAGS();
    this.flags.value=0xF002;
    flags=this.flags


    this.memory  = new ArrayBuffer(1048576); // 1,048,576 bytes (1MB)
    this.memoryV = new Uint8Array(this.memory);
memory= this.memoryV

}


CPU.prototype.reset= function () {
        this.IP = 0;

        //регистры о
        this.registers = new Registers();


        //регистр состояний
        this.value = new FLAGS();
        this.value.value = 0xF002;

       // this.memory = new ArrayBuffer(1048576); // 1,048,576 bytes (1MB)
        //this.memoryV = new Uint8Array(this.memory);
    };


CPU.prototype.tick=function () {


        var address = (this.registers.CS.value << 4) + this.registers.IP.value
        var ins = new Instruction(address, memory)


    ins.exec()
        this.registers.IP.value+=ins.length

    };


CPU.prototype.getState=function () {
    var state={
        registers:this.registers.getState(),
        flags:this.flags.getFlags()
    }
    return state
}

CPU.prototype.restoreState=function (state) {
    this.registers.restoreState(state.registers);
    this.flags.setFlags(state.flags);
}



CPU.prototype.loadBinary= function (addr, blob) {
        var av = new Uint8Array(blob);
        this.memoryV.set(av, addr);
        // trace(this.registers.CS.value)
    };





instructions= {
    AAA: function (ins) {

        if ((cpu.registers.AL.value > 9) || flags.getFlag("AF") == 1) {
            cpu.registers.AL.value = cpu.registers.AL.value + 6
            cpu.registers.AH.value = cpu.registers.AH.value + 1
            flags.setFlag("AF", 1)
            flags.setFlag("CF", 1)
        }
        else {
            flags.setFlag("AF", 0)
            flags.setFlag("CF", 0)
        }

        cpu.registers.AL.value = cpu.registers.AL.value & 0xf
        //return result

    },

    AAD: function (ins) {


        var result = cpu.registers.AL.value * 10 + cpu.registers.AL.value
        cpu.registers.AL.value = result
        flags.setFlag("ZF", flags.checkZF(result))
        flags.setFlag("SF", flags.checkSF(0, result))
        flags.setFlag("PF", flags.checkPF(0, result))

        // return result

    },
    AAM: function (ins) {
        cpu.registers.AH.value = (cpu.registers.AL.value / 10) >> 0
        cpu.registers.AL.value = cpu.registers.AL.value % 10
        //flags.setFlag("ZF", flags.checkZF(result))
        //flags.setFlag("SF", flags.checkSF(0, result))
        //flags.setFlag("PF", flags.checkPF(0, result))
    },


    AAS: function (ins) {
        if (((cpu.registers.AL.value & 0xf) > 9) || flags.getFlag("AF") == 1) {
            cpu.registers.AL.value = cpu.registers.AL.value - 6
            cpu.registers.AH.value = cpu.registers.AH.value - 1
            flags.setFlag("AF", 1)
            flags.setFlag("CF", 1)
        }
        else {
            flags.setFlag("AF", 0)
            flags.setFlag("CF", 0)
        }

        //cpu.registers.AL.value=cpu.registers.AL.value&0xf
        //return result
    },

    ADC: function (ins) {
        var result = ins.operands[0].read() + ins.operands[1].read() + flags.getFlag("CF");


        flags.setFlag("CF", flags.checkCF(ins.w, result))
        flags.setFlag("ZF", flags.checkZF(result))
        flags.setFlag("SF", flags.checkSF(ins.w, result))
        flags.setFlag("OF", flags.checkOF(ins.w, result, ins.operands[0].read(), ins.operands[1].read()))
        flags.setFlag("PF", flags.checkPF(ins.w, result))
        flags.setFlag("AF", flags.checkAF(result))

        ins.operands[0].write(result)
        return result
    },

    ADD: function (ins) {
        var result = ins.operands[0].read() + ins.operands[1].read();


        flags.setFlag("CF", flags.checkCF(ins.w, result))
        flags.setFlag("ZF", flags.checkZF(result))
        flags.setFlag("SF", flags.checkSF(ins.w, result))
        flags.setFlag("OF", flags.checkOF(ins.w, result, ins.operands[0].read(), ins.operands[1].read()))
        flags.setFlag("PF", flags.checkPF(ins.w, result))
        flags.setFlag("AF", flags.checkAF(result))

        ins.operands[0].write(result)
        return result
    },

    AND: function (ins) {
        var result = ins.operands[0].read() & ins.operands[1].read()


        flags.setFlag("CF", 0)//flags.setFlag("CF", flags.checkCF(ins.w, result))
        flags.setFlag("ZF", flags.checkZF(result))
        flags.setFlag("SF", flags.checkSF(ins.w, result))
        flags.setFlag("OF", 0)//flags.setFlag("OF", flags.checkOF(ins.w, result, operands[0].read(), operands[1].read()))
        flags.setFlag("PF", flags.checkPF(ins.w, result))
        //flags.setFlag("AF", flags.checkAF(result))

        ins.operands[0].write(result)
        return result
    },

    CALL: function (ins) {


    },


    CBW: function (ins) {
        if ((cpu.registers.AL.value & 0xf0) == 9) {
            cpu.registers.AH.value = 0xff
        } else {
            cpu.registers.AH.value = 0
        }
    },

    CLC: function (ins) {
        flags.setFlag("CF", 0)
    },

    CLD: function (ins) {
        flags.setFlag("DF", 0)
    },

    CLI: function (ins) {
        flags.setFlag("IF", 0)
    },

    CMC: function (ins) {
        flags.toggleFlag("CF")
    },


    CMP: function (ins) {
        var result = ins.operands[0].read() - ins.operands[1].read()


        flags.setFlag("CF", 0)//flags.setFlag("CF", flags.checkCF(ins.w, result))
        flags.setFlag("ZF", flags.checkZF(result))
        flags.setFlag("SF", flags.checkSF(ins.w, result))
        flags.setFlag("OF", 0)//flags.setFlag("OF", flags.checkOF(ins.w, result, operands[0].read(), operands[1].read()))
        flags.setFlag("PF", flags.checkPF(ins.w, result))
        flags.setFlag("AF", flags.checkAF(result))

        //ins.operands[0].write(result)
        return result
    },


    CMPSB: function (ins) {


    },

    CMPSW: function (ins) {


    },

    CS: function (ins) {


    },

    CWD: function (ins) {
        if ((cpu.registers.AL.value & 0xf0) == 9) {
            cpu.registers.AH.value = 0xff
        } else {
            cpu.registers.AH.value = 0
        }
    },


    DAA: function (ins) {
        if (((cpu.registers.AL.value & 0xf) > 9) || flags.getFlag("AF") == 1) {
            cpu.registers.AL.value = cpu.registers.AL.value + 6
            flags.setFlag("AF", 1)

        }
        else {
            cpu.registers.AL.value = cpu.registers.AL.value + 0x60
            flags.setFlag("CF", 1)
        }

        cpu.registers.AL.value = cpu.registers.AL.value & 0xf

    },

    DAS: function (ins) {
        if (((cpu.registers.AL.value & 0xf) > 9) || flags.getFlag("AF") == 1) {
            cpu.registers.AL.value = cpu.registers.AL.value - 6
            flags.setFlag("AF", 1)

        }
        else {
            cpu.registers.AL.value = cpu.registers.AL.value - 0x60
            flags.setFlag("CF", 1)
        }

        cpu.registers.AL.value = cpu.registers.AL.value & 0xf

    },

    DEC: function (ins) {
        var result = ins.operands[0].read() - 1;
        ins.operands[0].write(result)

        if (registers[ins.operands[0].name].bits = 8) var w = 0
        else var w = 1
        flags.setFlag("ZF", flags.checkZF(result))
        flags.setFlag("SF", flags.checkSF(w, result))
        flags.setFlag("OF", flags.checkOF(w, result, ins.operands[0].read(), 0))
        flags.setFlag("PF", flags.checkPF(w, result))
        flags.setFlag("AF", flags.checkAF(result))


        return result
    },


    DS: function (ins) {


    },
    ES: function (ins) {


    },

    HLT: function (ins) {
        cpu.run = false
        alert("процессор остановлен")

    },

    IN: function (ins) {

    },


    INC: function (ins) {
        var result = ins.operands[0].read() + 1;
        ins.operands[0].write(result)

        if (registers[ins.operands[0].name].bits = 8) var w = 0
        else var w = 1
        flags.setFlag("ZF", flags.checkZF(result))
        flags.setFlag("SF", flags.checkSF(w, result))
        flags.setFlag("OF", flags.checkOF(w, result, ins.operands[0].read(), 0))
        flags.setFlag("PF", flags.checkPF(w, result))
        flags.setFlag("AF", flags.checkAF(result))


        return result


    },


    INT: function (ins) {

    },

    INTO: function (ins) {


    },
    IRET: function (ins) {


    },




    JA: function (ins) {


    },
    JB: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JBE: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JCXZ: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JG: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JGE: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JL: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JLE: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JMP: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JNB: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JNO: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JNS: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JNZ: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JO: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JPE: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JPO: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JS: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    JZ: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    LAHF: function (ins) {
        cpu.registers.AH.value == flags.value & 0xf

    },

    LDS: function (ins) {
        //REG = первое    слово
        //DS = второе    слово
    },
    LEA: function (ins) {

    },
    LES: function (ins) {

    },
    LOCK: function (ins) {
    },


    LODSB: function (ins) {

    },
    LODSW: function (ins) {

    },
    LOOP: function (ins) {

    },
    LOOPNZ: function (ins) {

    },
    LOOPZ: function (ins) {

    },
    MOV: function (ins) {
        ins.operands[0].write(ins.operands[1].read())

    },
    MOVSB: function (ins) {

    },
    MOVSW: function (ins) {

    },

    NOP: function (ins) {
    },


    OR: function (ins) {
        var result = ins.operands[0].read() | ins.operands[1].read()


        flags.setFlag("CF", 0)
        flags.setFlag("ZF", flags.checkZF(result))
        flags.setFlag("SF", flags.checkSF(ins.w, result))
        flags.setFlag("OF", 0)
        flags.setFlag("PF", flags.checkPF(ins.w, result))


        ins.operands[0].write(result)
        return result
    },

    OUT: function (ins) {

    },

    POP: function (ins) {
        var result = ((memory[cpu.registers.SP.value + 1] << 8) | memory[cpu, registers.SP.value]);
        // сдвигаем указатель на вершину стека
        registers.SP.value += 2;

        ins.operands[0].write(result)

    },

    POPF: function (ins) {
        var result = ((memory[cpu.registers.SP.value + 1] << 8) | memory[cpu, registers.SP.value]);
        // сдвигаем указатель на вершину стека
        registers.SP.value += 2;

        flags.value = result

    },

    PUSH: function (ins) {

        // сдвигаем указатель на вершину стека
        var value = ins.operands[0].read()
        registers.SP.value -= 2;

        memory[registers.SP.value] = value & 0x00FF;
        memory[registers.SP.value + 1] = value >> 8;
    },


    PUSHF: function (ins) {

        // сдвигаем указатель на вершину стека
        var value = flags.value
        registers.SP.value -= 2;

        memory[registers.SP.value] = value & 0x00FF;
        memory[registers.SP.value + 1] = value >> 8;
    },

    REPNZ: function (ins) {

    },
    REPZ: function (ins) {

    },
    RET: function (ins) {

    },
    RETF: function (ins) {

    },
    SAHF: function (ins) {
    },


    SBB: function (ins) {
    },
    SCASB: function (ins) {
    },
    SCASW: function (ins) {
    },
    SS: function (ins) {
    },
    STC: function (ins) {
    },
    STD: function (ins) {
    },
    STI: function (ins) {
    },
    STOSB: function (ins) {
    },
    STOSW: function (ins) {
    },
    SUB: function (ins) {
    },
    TEST: function (ins) {
    },
    qq: function (ins) {
        var result = ins.operands[0] + ins.operands[0];
        ins.operands[0].write(result)
        return result
    },
    WAIT: function (ins) {
    },
    XCHG: function (ins) {
    },
    XLAT: function (ins) {

    },

    XOR: function (ins) {
        var result = ins.operands[0].read() ^ ins.operands[1].read()


        flags.setFlag("CF", 0)//flags.setFlag("CF", flags.checkCF(ins.w, result))
        flags.setFlag("ZF", flags.checkZF(result))
        flags.setFlag("SF", flags.checkSF(ins.w, result))
        flags.setFlag("OF", 0)//flags.setFlag("OF", flags.checkOF(ins.w, result, operands[0].read(), operands[1].read()))
        flags.setFlag("PF", flags.checkPF(ins.w, result))
        //flags.setFlag("AF", flags.checkAF(result))

        ins.operands[0].write(result)
        return result
    },

    GRP3a: function (ins) {
    },
    GRP1: function (ins) {
    }
}