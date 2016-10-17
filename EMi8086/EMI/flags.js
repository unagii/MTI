/**
 * Created by unagii on 12.09.2016.
 */



function FLAGS() {
    this.value=0xF002;
}

/// значение регистра флагов по умолчанию
FLAGS.prototype.defaultValue=0xF002;

///маски флагов
FLAGS.prototype.flagsMask= {
        CF: 0x0001,
        PF: 0x0004,
        AF: 0x0010,
        ZF: 0x0040,
        SF: 0x0080,
        TF: 0x0100,
        IF: 0x0200,
        DF: 0x0400,
        OF: 0x0800
    };

/*
 устанавливает значение флага
 flag: имя флага
 value: значение флага. 0 или 1
 */
FLAGS.prototype.setFlag=function(flag,value)
    {
        if (value) this.value |= this.flagsMask[flag];
        else this.value &= ~this.flagsMask[flag];

    };

///возвращает значение флага flag: имя флага
FLAGS.prototype.getFlag=function(flag)
{
    if(this.value & this.flagsMask[flag]) return 1;
    else return 0
};

/// инвертирует значение флага  flag: имя флага
FLAGS.prototype.toggleFlag=function(flag)
    {
        //this.value ^= ~this.flagsMask[flag];
        this.value ^= this.flagsMask[flag];
    };

///устанавливает значение регистра флагов
FLAGS.prototype.setFlags=function(value) {
    this.value = value;
};

///возвращает значение регистра флагов
FLAGS.prototype.getFlags=function()
    {
        return this.value
    };


//проверка флагов

//CF
FLAGS.prototype.checkCF=function(w,result)
    {
        if (w == 0 && result > 0xFF) return 1;
        else if (w == 1 && result > 0xFFFF)return 1;
        else return 0

    },

//ZF
FLAGS.prototype.checkZF=function(result)
    {
        if (0 == result)return 1;
        else return 0
    },

//SF
FLAGS.prototype.checkSF=function(w,result)
    {

        if (w == 0 && (result & 0xFF) >> 7) return 1;
        else if (w == 1 && (result & 0xFFFF) >> 15) return 1;
        else return 0
    };


//OF
FLAGS.prototype.checkOF=function(w,result,operand1,operand2)
    {
        var shift;
        if (w == 1) shift = 15; else shift = 7;

        if (1 === (operand1 >> shift) && 1 === (operand2 >> shift) && 0 === (result >> shift) ||
            0 === (operand1 >> shift) && 0 === (operand2 >> shift) && 1 === (result >> shift))
            return 1;
        else  return 0
    };


//PF
FLAGS.prototype.checkPF=function(w,result)
    {

        if (w){
            result=result&0xffff
        } else{
            result=result&0xff
        }
        var bitRep = result.toString(2),
            bitCnt = 0;

        var b=0;
        for (b in bitRep) {
            if ("1" === bitRep[b]) bitCnt++;
        }

        if (0 === (bitCnt % 2)) {
            return 1
        }
        else {
            return 0
        }
    };


//AF
FLAGS.prototype.checkAF=function(result)
    {

        if (result  > 0x0F) return 1;
        else  return 0
    };

