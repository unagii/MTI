/**
 * Created by unagii on 31.08.2016.
 */
///
registers8 = [
    {"register": "AL", "bits": 8, "types": ["G","E"], "RegBits": "000", "name": "AL", "Type": "Main Register",value:0,'id':0},
    {"register": "CL", "bits": 8, "types": ["G","E"], "RegBits": "001", "name": "CL", "Type": "Main Register",value:0,'id':1},
    {"register": "DL", "bits": 8, "types": ["G","E"], "RegBits": "010", "name": "DL", "Type": "Main Register",value:0,'id':2},
    {"register": "BL", "bits": 8, "types": ["G","E"], "RegBits": "011", "name": "BL", "Type": "Main Register",value:0,'id':3},
    {"register": "AH", "bits": 8, "types": ["G","E"], "RegBits": "100", "name": "AH", "Type": "Main Register",value:0,'id':4},
    {"register": "CH", "bits": 8, "types": ["G","E"], "RegBits": "101", "name": "CH", "Type": "Main Register",value:0,'id':5},
    {"register": "DH", "bits": 8, "types": ["G","E"], "RegBits": "110", "name": "DH", "Type": "Main Register",value:0,'id':6},
    {"register": "BH", "bits": 8, "types": ["G","E"], "RegBits": "111", "name": "BH", "Type": "Main Register",value:0,'id':7}
];
registers16 = [
    {"register": "AX", "bits": 16, "types": ["G","E"], "RegBits": "000", "name": "AX", "Type": "Main Register",value:0,'id':0},
    {"register": "CX", "bits": 16, "types": ["G","E"], "RegBits": "001", "name": "CX", "Type": "Main Register",value:0,'id':1},
    {"register": "DX", "bits": 16, "types": ["G","E"], "RegBits": "010", "name": "DX", "Type": "Main Register",value:0,'id':2},
    {"register": "BX", "bits": 16, "types": ["G","E"], "RegBits": "011", "name": "BX", "Type": "Main Register",value:0,'id':3},
    {"register": "SP", "bits": 16, "types": [], "RegBits": "100", "name": "SP","discr": "Stack Pointer", "Type": "Index register",value:0,'id':4},
    {"register": "BP", "bits": 16, "types": [], "RegBits": "101","name": "BP","discr": "Base Pointer", "Type": "Index register",value:0,'id':5},
    {"register": "SI", "bits": 16, "types": [], "RegBits": "110", "name": "SI","discr": "Source Index", "Type": "Index register",value:0,'id':6},
    {"register": "DI", "bits": 16, "types": [], "RegBits": "111", "name": "DI","discr": "Destination Index", "Type": "Index register",value:0,'id':7}
];

segmentRegisters=[
    {"name": "ES", "bits": 16, "types": ["S"], "RegBits": "00", "register": "Extra Segment", "Type": "Segment register",value:0},
    {"name": "CS", "bits": 16, "types": ["S"], "RegBits": "01", "register": "Code Segment", "Type": "Segment register",value:0},
    {"name": "SS", "bits": 16, "types": ["S"], "RegBits": "10", "register": "Stack Segment", "Type": "Segment register",value:0},
    {"name": "DS", "bits": 16, "types": ["S"], "RegBits": "11", "register": "Data Segment", "Type": "Segment register",value:0}
];

registers= {
    "AL": registers8[0],
    "CL": registers8[1],
    "DL": registers8[2],
    "BL": registers8[3],
    "AH": registers8[4],
    "CH": registers8[5],
    "DH": registers8[6],
    "BH": registers8[7],
    "AX": registers16[0],
    "CX": registers16[1],
    "DX": registers16[2],
    "BX": registers16[3],
    "SP": registers16[4],
    "BP": registers16[5],
    "SI": registers16[6],
    "DI": registers16[7],
    "ES": registers16[0],
    "CS": registers16[1],
    "SS": registers16[2],
    "DS": registers16[3]
}



flags_=[
    {},
    {},
    {},
    {},
    {"name":"OF"},
    {"name":"DF"},
    {"name":"IF"},
    {"name":"TF"},
    {"name":"SF"},
    {"name":"ZF"},
    {},
    {"name":"AF"},
    {},
    {"name":"PF"},
    {},
    {"name":"CF"}
]

    FLAG_CF_MASK = 0x0001;
    FLAG_PF_MASK = 0x0004;
    FLAG_AF_MASK = 0x0010;
    FLAG_ZF_MASK = 0x0040;
    FLAG_SF_MASK = 0x0080;
    FLAG_TF_MASK = 0x0100;
    FLAG_IF_MASK = 0x0200;
    FLAG_DF_MASK = 0x0400;
    FLAG_OF_MASK = 0x0800;


rmTable1=[
    {"Bits": "000", "address":"[BX + SI]", "name":"[BX + SI]",value:function(){return ( ((registers.BH.value << 8) | registers.BL.value) + registers.SI.value ) }},
    {"Bits": "001", "address":"[BX + DI]", "name":"[BX + DI]",value:function(){return ( ((registers.BH.value << 8) | registers.BL.value) + registers.DI.value )}},
    {"Bits": "010", "address":"[BP + SI]", "name":"[BP + SI]",value:function(){return (registers.BP.value + registers.SI.value )}},
    {"Bits": "011", "address":"[BP + DI]", "name":"[BP + DI]",value:function(){return (registers.BP.value + registers.DI.value )}},
    {"Bits": "100", "address":"[SI]", "name":"[SI]",value:function(){return registers.SI.value}},
    {"Bits": "101", "address":"[DI]", "name":"[DI]",value:function(){return registers.DI.value}},
    {"Bits": "110", "address":"[BP]", "name":"[BP]",value:function(){return registers.BP.value}},  //??
    {"Bits": "111", "address":"[BX]", "name":"[BX]",value:function(){return (registers.BH.value << 8) | registers.BL.value }}
];

displacement=[0,1,2,0];

reg = {
    "AL": 0,
    "CL": 0,
    "BL": 0,
    "DL": 0,
    "AH": 0,
    "CH": 0,
    "DH": 0,
    "BH": 0,
    "AX": 0,
    "CX": 0,
    "DX": 0,
    "BX": 0,
    "SP": 0,
    "BP": 0,
    "SI": 0,
    "DI": 0
};



OpCode=[];
OpCode[0x00]={"name":"ADD","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x01]={"name":"ADD","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x02]={"name":"ADD","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x03]={"name":"ADD","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x04]={"name":"ADD","AddrByte":1,"operands":["AL","Ib"],"len":2};
OpCode[0x05]={"name":"ADD","AddrByte":1,"operands":["AX","Iw"],"len":3};
OpCode[0x06]={"name":"PUSH","operands":["ES"],"len":1};
OpCode[0x07]={"name":"POP","operands":["ES"],"len":1};
OpCode[0x08]={"name":"OR","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x09]={"name":"OR","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x0A]={"name":"OR","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x0B]={"name":"OR","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x0C]={"name":"OR","AddrByte":1,"operands":["AL","Ib"],"len":2};
OpCode[0x0D]={"name":"OR","AddrByte":1,"operands":["AX","Iw"],"len":3};
OpCode[0x0E]={"name":"PUSH","operands":["CS"],"len":1};
OpCode[0x0F]={"name":"0F не потдерживается","len":1};

OpCode[0x10]={"name":"ADC","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x11]={"name":"ADC","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x12]={"name":"ADC","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x13]={"name":"ADC","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x14]={"name":"ADC","AddrByte":1,"operands":["AL","Ib"],"len":2};
OpCode[0x15]={"name":"ADC","AddrByte":1,"operands":["AX","Iw"],"len":3};
OpCode[0x16]={"name":"PUSH","operands":["SS"],"len":1};
OpCode[0x17]={"name":"POP","operands":["SS"],"len":1};
OpCode[0x18]={"name":"SBB","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x19]={"name":"SBB","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x1A]={"name":"SBB","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x1B]={"name":"SBB","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x1C]={"name":"SBB","AddrByte":1,"operands":["AL","Ib"],"len":2};
OpCode[0x1D]={"name":"SBB","AddrByte":1,"operands":["AX","Iw"],"len":3};
OpCode[0x1E]={"name":"PUSH","operands":["DS"],"len":1};
OpCode[0x1F]={"name":"POP","operands":["DS"],"len":1};

OpCode[0x20]={"name":"AND","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x21]={"name":"AND","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x22]={"name":"AND","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x23]={"name":"AND","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x24]={"name":"AND","AddrByte":1,"operands":["AL","Ib"],"len":2};
OpCode[0x25]={"name":"AND","AddrByte":1,"operands":["AX","Iw"],"len":3};
OpCode[0x26]={"name":"ES","len":1};
OpCode[0x27]={"name":"DAA","len":1};
OpCode[0x28]={"name":"SUB","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x29]={"name":"SUB","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x2A]={"name":"SUB","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x2B]={"name":"SUB","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x2C]={"name":"SUB","AddrByte":1,"operands":["AL","Ib"],"len":2};
OpCode[0x2D]={"name":"SUB","AddrByte":1,"operands":["AX","Iw"],"len":3};
OpCode[0x2E]={"name":"CS","len":1};
OpCode[0x2F]={"name":"DAS","len":1};

OpCode[0x30]={"name":"XOR","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x31]={"name":"XOR","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x32]={"name":"XOR","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x33]={"name":"XOR","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x34]={"name":"XOR","AddrByte":1,"operands":["AL","Ib"],"len":2};
OpCode[0x35]={"name":"XOR","AddrByte":1,"operands":["AX","Iw"],"len":3};
OpCode[0x36]={"name":"SS","len":1,};
OpCode[0x37]={"name":"AAA","len":1,};
OpCode[0x38]={"name":"CMP","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x39]={"name":"CMP","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x3A]={"name":"CMP","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x3B]={"name":"CMP","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x3C]={"name":"CMP","AddrByte":1,"operands":["AL","Ib"],"len":2};
OpCode[0x3D]={"name":"CMP","AddrByte":1,"operands":["AX","Iw"],"len":3};
OpCode[0x3E]={"name":"DS","len":1,};
OpCode[0x3F]={"name":"AAS","len":1,};



OpCode[0x40]={"name":"INC","operands":["AX"],"len":1};
OpCode[0x41]={"name":"INC","operands":["CX"],"len":1};
OpCode[0x42]={"name":"INC","operands":["DX"],"len":1};
OpCode[0x43]={"name":"INC","operands":["BX"],"len":1};
OpCode[0x44]={"name":"INC","operands":["SP"],"len":1};
OpCode[0x45]={"name":"INC","operands":["BP"],"len":1};
OpCode[0x46]={"name":"INC","operands":["SI"],"len":1};
OpCode[0x47]={"name":"INC","operands":["DI"],"len":1};
OpCode[0x48]={"name":"DEC","operands":["AX"],"len":1};
OpCode[0x49]={"name":"DEC","operands":["CX"],"len":1};
OpCode[0x4A]={"name":"DEC","operands":["DX"],"len":1};
OpCode[0x4B]={"name":"DEC","operands":["BX"],"len":1};
OpCode[0x4C]={"name":"DEC","operands":["SP"],"len":1};
OpCode[0x4D]={"name":"DEC","operands":["BP"],"len":1};
OpCode[0x4E]={"name":"DEC","operands":["SI"],"len":1};
OpCode[0x4F]={"name":"DEC","operands":["DI"],"len":1};



OpCode[0x50]={"name":"PUSH","operands":["AX"],"len":1};
OpCode[0x51]={"name":"PUSH","operands":["CX"],"len":1};
OpCode[0x52]={"name":"PUSH","operands":["DX"],"len":1};
OpCode[0x53]={"name":"PUSH","operands":["BX"],"len":1};
OpCode[0x54]={"name":"PUSH","operands":["SP"],"len":1};
OpCode[0x55]={"name":"PUSH","operands":["BP"],"len":1};
OpCode[0x56]={"name":"PUSH","operands":["SI"],"len":1};
OpCode[0x57]={"name":"PUSH","operands":["DI"],"len":1};
OpCode[0x58]={"name":"POP","operands":["AX"],"len":1};
OpCode[0x59]={"name":"POP","operands":["CX"],"len":1};
OpCode[0x5A]={"name":"POP","operands":["DX"],"len":1};
OpCode[0x5B]={"name":"POP","operands":["BX"],"len":1};
OpCode[0x5C]={"name":"POP","operands":["SP"],"len":1};
OpCode[0x5D]={"name":"POP","operands":["BP"],"len":1};
OpCode[0x5E]={"name":"POP","operands":["SI"],"len":1};
OpCode[0x5F]={"name":"POP","operands":["DI"],"len":1};


OpCode[0x60]={"name":"60 не потдерживается","len":1};
OpCode[0x61]={"name":"61 не потдерживается","len":1};
OpCode[0x62]={"name":"62 не потдерживается","len":1};
OpCode[0x63]={"name":"63 не потдерживается","len":1};
OpCode[0x64]={"name":"64 не потдерживается","len":1};
OpCode[0x65]={"name":"65 не потдерживается","len":1};
OpCode[0x66]={"name":"66 не потдерживается","len":1};
OpCode[0x67]={"name":"67 не потдерживается","len":1};
OpCode[0x68]={"name":"67 не потдерживается","len":1};
OpCode[0x69]={"name":"68 не потдерживается","len":1};
OpCode[0x6A]={"name":"6A не потдерживается","len":1};
OpCode[0x6B]={"name":"6B не потдерживается","len":1};
OpCode[0x6C]={"name":"6C не потдерживается","len":1};
OpCode[0x6D]={"name":"6D не потдерживается","len":1};
OpCode[0x6E]={"name":"6E не потдерживается","len":1};
OpCode[0x6F]={"name":"6F не потдерживается","len":1};


OpCode[0x70]={"name":"JO","operands":["Ib"],"len":2};
OpCode[0x71]={"name":"JNO","operands":["Ib"],"len":2};
OpCode[0x72]={"name":"JB","operands":["Ib"],"len":2};
OpCode[0x73]={"name":"JNB","operands":["Ib"],"len":2};
OpCode[0x74]={"name":"JZ","operands":["Ib"],"len":2};
OpCode[0x75]={"name":"JNZ","operands":["Ib"],"len":2};
OpCode[0x76]={"name":"JBE","operands":["Ib"],"len":2};
OpCode[0x77]={"name":"JA","operands":["Ib"],"len":2};
OpCode[0x78]={"name":"JS","operands":["Ib"],"len":2};
OpCode[0x79]={"name":"JNS","operands":["Ib"],"len":2};
OpCode[0x7A]={"name":"JPE","operands":["Ib"],"len":2};
OpCode[0x7B]={"name":"JPO","operands":["Ib"],"len":2};
OpCode[0x7C]={"name":"JL","operands":["Ib"],"len":2};
OpCode[0x7D]={"name":"JGE","operands":["Ib"],"len":2};
OpCode[0x7E]={"name":"JLE","operands":["Ib"],"len":2};
OpCode[0x7F]={"name":"JG","operands":["Ib"],"len":2};


OpCode[0x80]={"name":"GRP1","len":1};
OpCode[0x81]={"name":"GRP1","len":1};
OpCode[0x82]={"name":"GRP1","len":1};
OpCode[0x83]={"name":"GRP1","len":1};
OpCode[0x84]={"name":"TEST","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x85]={"name":"TEST","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x86]={"name":"XCHG","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x87]={"name":"XCHG","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x88]={"name":"MOV","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x89]={"name":"MOV","AddrByte":1,"operands":["E","G"],"len":2};
OpCode[0x8A]={"name":"MOV","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x8B]={"name":"MOV","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x8C]={"name":"MOV","AddrByte":1,"operands":["E","S"],"len":2};
OpCode[0x8D]={"name":"LEA","AddrByte":1,"operands":["G","E"],"len":2};
OpCode[0x8E]={"name":"MOV","AddrByte":1,"operands":["S","E"],"len":2};
OpCode[0x8F]={"name":"POP","AddrByte":1,"operands":["E"],"len":2};

OpCode[0x90]={"name":"NOP","len":1};
OpCode[0x91]={"name":"XCHG","operands":["AX","CX"],"len":1};
OpCode[0x92]={"name":"XCHG","operands":["AX","DX"],"len":1};
OpCode[0x93]={"name":"XCHG","operands":["AX","BX"],"len":1};
OpCode[0x94]={"name":"XCHG","operands":["AX","SP"],"len":1};
OpCode[0x95]={"name":"XCHG","operands":["AX","BP"],"len":1};
OpCode[0x96]={"name":"XCHG","operands":["AX","SI"],"len":1};
OpCode[0x97]={"name":"XCHG","operands":["AX","DI"],"len":1};
OpCode[0x98]={"name":"CBW","len":1};
OpCode[0x99]={"name":"CWD","len":1};
OpCode[0x9A]={"name":"CALL","operands":["Iw","Iw"],"len":5};
OpCode[0x9B]={"name":"WAIT","len":1};
OpCode[0x9C]={"name":"PUSHF","len":1};
OpCode[0x9D]={"name":"POPF","len":1};
OpCode[0x9E]={"name":"SAHF","len":1};
OpCode[0x9F]={"name":"LAHF","len":1};



OpCode[0xA0]={"name":"MOV","operands":["AL","Iw"],"len":3};
OpCode[0xA1]={"name":"MOV","operands":["AX","Iw"],"len":3};
OpCode[0xA2]={"name":"MOV","operands":["Iw","AL"],"len":3};
OpCode[0xA3]={"name":"MOV","operands":["Iw","AX"],"len":3};
OpCode[0xA4]={"name":"MOVSB","len":1};
OpCode[0xA5]={"name":"MOVSW","len":1};
OpCode[0xA6]={"name":"CMPSB","len":1};
OpCode[0xA7]={"name":"CMPSW","len":1};
OpCode[0xA8]={"name":"TEST","operands":["AL","Ib"],"len":2};
OpCode[0xA9]={"name":"TEST","operands":["AX","Iw"],"len":3};
OpCode[0xAA]={"name":"STOSB","len":1};
OpCode[0xAB]={"name":"STOSW","len":1};
OpCode[0xAC]={"name":"LODSB","len":1};
OpCode[0xAD]={"name":"LODSW","len":1};
OpCode[0xAE]={"name":"SCASB","len":1};
OpCode[0xAF]={"name":"SCASW","len":1};



OpCode[0xB0]={"name":"MOV","operands":["AL","Ib"],"len":2};
OpCode[0xB1]={"name":"MOV","operands":["CL","Ib"],"len":2};
OpCode[0xB2]={"name":"MOV","operands":["DL","Ib"],"len":2};
OpCode[0xB3]={"name":"MOV","operands":["BL","Ib"],"len":2};
OpCode[0xB4]={"name":"MOV","operands":["AH","Ib"],"len":2};
OpCode[0xB5]={"name":"MOV","operands":["CH","Ib"],"len":2};
OpCode[0xB6]={"name":"MOV","operands":["DH","Ib"],"len":2};
OpCode[0xB7]={"name":"MOV","operands":["BH","Ib"],"len":2};
OpCode[0xB8]={"name":"MOV","operands":["AX","Iw"],"len":3};
OpCode[0xB9]={"name":"MOV","operands":["CX","Iw"],"len":3};
OpCode[0xBA]={"name":"MOV","operands":["DX","Iw"],"len":3};
OpCode[0xBB]={"name":"MOV","operands":["BX","Iw"],"len":3};
OpCode[0xBC]={"name":"MOV","operands":["SP","Iw"],"len":3};
OpCode[0xBD]={"name":"MOV","operands":["BP","Iw"],"len":3};
OpCode[0xBE]={"name":"MOV","operands":["SI","Iw"],"len":3};
OpCode[0xBF]={"name":"MOV","operands":["DI","Iw"],"len":3};


OpCode[0xC0]={"name":"C0 не потдерживается","len":1};
OpCode[0xC1]={"name":"C1 не потдерживается","len":1};
OpCode[0xC2]={"name":"RET","operands":["Iw"],"len":3};
OpCode[0xC3]={"name":"RET","len":1,};
OpCode[0xC4]={"name":"LES","AddrByte":1,"operands":["Iw"],"len":4};
OpCode[0xC5]={"name":"LDS","AddrByte":1,"operands":["G","Iw"],"len":4};
OpCode[0xC6]={"name":"MOV","AddrByte":1,"operands":["E","Ib2"],"len":3};//???
OpCode[0xC7]={"name":"MOV","AddrByte":1,"operands":["E","Iw2"],"len":4};//???
OpCode[0xC8]={"name":"C8 не потдерживается","len":1};
OpCode[0xC9]={"name":"C9 не потдерживается","len":1};
OpCode[0xCA]={"name":"RETF","operands":["Iw"],"len":3};
OpCode[0xCB]={"name":"RETF","len":1};
OpCode[0xCC]={"name":"INT","operands":[3],"len":1};
OpCode[0xCD]={"name":"INT","operands":["Ib"],"len":2};
OpCode[0xCE]={"name":"INTO","len":1};
OpCode[0xCF]={"name":"IRET","len":1};

OpCode[0xD0]={"name":"GRP1","len":1};
OpCode[0xD1]={"name":"GRP1","len":1};
OpCode[0xD2]={"name":"GRP1","len":1};
OpCode[0xD3]={"name":"GRP1","len":1};

OpCode[0xD4]={"name":"AAM","len":2};
OpCode[0xD5]={"name":"AAD","len":2};
OpCode[0xD6]={"name":"D8 не потдерживается","len":1};
OpCode[0xD7]={"name":"XLAT","len":1};

OpCode[0xD8]={"name":"D8 не потдерживается","len":1};
OpCode[0xD9]={"name":"D9 не потдерживается","len":1};
OpCode[0xDA]={"name":"DA не потдерживается","len":1};
OpCode[0xDB]={"name":"DB не потдерживается","len":1};
OpCode[0xDC]={"name":"DC не потдерживается","len":1};
OpCode[0xDD]={"name":"DD не потдерживается","len":1};
OpCode[0xDE]={"name":"DE не потдерживается","len":1};
OpCode[0xDF]={"name":"DF не потдерживается","len":1};


OpCode[0xE0]={"name":"LOOPNZ","operands":["Ib"],"len":2};
OpCode[0xE1]={"name":"LOOPZ","operands":["Ib"],"len":2};
OpCode[0xE2]={"name":"LOOP","operands":["Ib"],"len":2};
OpCode[0xE3]={"name":"JCXZ","operands":["Ib"],"len":2};
OpCode[0xE4]={"name":"IN","operands":["AL","Ib"],"len":2};
OpCode[0xE5]={"name":"IN","operands":["AX","Ib"],"len":2};
OpCode[0xE6]={"name":"OUT","operands":["Ib","AL"],"len":2};
OpCode[0xE7]={"name":"OUT","operands":["Ib","AX"],"len":2};
OpCode[0xE8]={"name":"CALL","operands":["Iw"],"len":3};
OpCode[0xE9]={"name":"JMP","operands":["Iw"],"len":3};
OpCode[0xEA]={"name":"JMP","operands":["Iw","Iw"],"len":5};
OpCode[0xEB]={"name":"JMP","operands":["Ib"],"len":2};
OpCode[0xEC]={"name":"IN","operands":["AL","DX"],"len":1};
OpCode[0xED]={"name":"IN","operands":["AX","DX"],"len":1};
OpCode[0xEE]={"name":"OUT","operands":["DX","AL"],"len":1};
OpCode[0xEF]={"name":"OUT","operands":["DX","AX"],"len":1};


OpCode[0xF0]={"name":"LOCK","len":1};
OpCode[0xF1]={"name":"F1 не потдерживается","len":1};
OpCode[0xF2]={"name":"REPNZ","len":1};
OpCode[0xF3]={"name":"REPZ","len":1};
OpCode[0xF4]={"name":"HLT","len":1};
OpCode[0xF5]={"name":"CMC","len":1};
OpCode[0xF6]={"name":"GRP3a","len":1};
OpCode[0xF7]={"name":"GRP3b","len":1};
OpCode[0xF8]={"name":"CLC","len":1};
OpCode[0xF9]={"name":"STC","len":1};
OpCode[0xFA]={"name":"CLI","len":1};
OpCode[0xFB]={"name":"STI","len":1};
OpCode[0xFC]={"name":"CLD","len":1};
OpCode[0xFD]={"name":"STD","len":1};
OpCode[0xFE]={"name":"GRP4","len":1};
OpCode[0xFF]={"name":"GRP5","len":1};
