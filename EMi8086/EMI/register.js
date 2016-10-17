/**
 * Created by unagii on 14.09.2016.
 */



function Registers() {

    //регистры общего назначения
    this.AL={'id':0, "name": "AL", "bits":'000',"Type": "Main Register",value:0};
    this.CL={'id':1, "name": "CL", "bits":'001',"Type": "Main Register",value:0};
    this.DL={'id':2, "name": "DL", "bits":'010',"Type": "Main Register",value:0};
    this.BL={'id':3, "name": "BL", "bits":'011',"Type": "Main Register",value:0};
    this.AH={'id':4, "name": "AH", "bits":'100',"Type": "Main Register",value:0};
    this.CH={'id':5, "name": "CH", "bits":'101',"Type": "Main Register",value:0};
    this.DH={'id':6, "name": "DH", "bits":'110', "Type": "Main Register",value:0};
    this.BH={'id':7, "name": "BH", "bits":'111', "Type": "Main Register",value:0};
    this.registers8=[this.AL,this.CL,this.DL,this.BL,this.AH,this.CH,this.DH,this.BH];


    //16 битные регистры
    this.AX={'id':0, "name": "AX", "bits":'000',"Type": "Main Register",value:0};
    this.CX={'id':1, "name": "CX", "bits":'001',"Type": "Main Register",value:0};
    this.DX={'id':2, "name": "DX", "bits":'010',"Type": "Main Register",value:0};
    this.BX={'id':3, "name": "BX", "bits":'011',"Type": "Main Register",value:0};

    //указатели
    this.SP={'id':4, "name": "SP", "bits":'100', "Type": "Stack Pointer",value:0};
    this.BP={'id':5, "name": "BP", "bits":'101', "Type": "Base Pointer",value:0};

    //индексы
    this.SI={'id':6, "name": "SI", "bits":'110', "Type": "Source Index",value:0};
    this.DI={'id':7, "name": "DI", "bits":'111', "Type": "Destination Index",value:0};

    this.registers16=[this.AX,this.CX,this.DX,this.BX,this.SP,this.BP,this.SI,this.DI];

    //сегментные регистры
    this.ES={'id':0, "name": "ES", "bits":'000',"Type": "Extra Segment",value:0};
    this.CS={'id':1, "name": "CS", "bits":'001',"Type": "Code Segment",value:0};
    this.SS={'id':2, "name": "SS", "bits":'010',"Type": "Stack Segment",value:0};
    this.DS={'id':4, "name": "DS", "bits":'011',"Type": "Data Segment",value:0};

    this.segmentRegisters=[this.ES,this.CS,this.SS,this.DX];

    this.IP={"name": "IP", value:0};

    this.registers=  this.registers8.concat(this.registers16,this.segmentRegisters);
    this.registers.push(this.IP);
}

/// возвращает значение регистра
/// w: Признак слова
/// reg: битовый код регистра
Registers.prototype.readRegister=function(w,regID){
        var value=0;
        switch (w){
            case 0:value=this.registers8[regID].value; break;
            case 1:
                if (regID<4)  value = (this.registers8[(regID | 4)].value << 8) | this.registers8[regID].value;
                else value =this.registers16[regID].value;
                break;


        }
        return value
    };

/// изменяет значение регистра
/// w: Признак слова
/// reg: битовый код регистра
/// value: новое значение регистра
Registers.prototype.writeRegister=function(w,reg,value){
        switch (w){
            case 0:this.registers8[reg].value=(value& 0x00FF); break;
            case 1:
                if (reg<4) {
                    this.registers8[(reg | 4)].value = (value & 0xFF00) >> 8;   //H
                    this.registers8[reg].value = (value & 0x00FF);              //L
                }else{
                    this.registers16[reg].value = (value & 0xFFFF);
                }
                break;
        }
    };

///чтение сегментного регистра
Registers.prototype.readSegmentRegister=function(reg){
        return this.segmentRegisters[reg].value;
    };

///запись сегментного регистра
Registers.prototype.writeSegmentRegister=function(reg,value){
        this.segmentRegisters[reg].value=(value& 0x00FF)
    };

//возвращвет состояние всех регистров в виде массива
Registers.prototype.getState=function(){
    var result=[];
    var i=0;
    while (i < this.registers.length){
        //trace(i,this.registers[i].name)
        result.push(this.registers[i].value);
        i++;
    }
    return result
};

//востанавливает значение регистров из массива
Registers.prototype.restoreState=function(regValueArray){
    var i=0;
    while (i < this.registers.length){
        this.registers[i].value=regValueArray[i];
        i++;
    }
};