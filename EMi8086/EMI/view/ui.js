/**
 * Created by unagii on 11.10.2016.
 */



//событее загрузки
var loadBtn=document.getElementById("LoadFileBTN")
loadBtn.onchange=function(evt) {
    var fr = new FileReader()
    fr.readAsArrayBuffer(evt.target.files[0])
    fr.onload = (function(evt) {
        emu.loadProgramm(evt.currentTarget.result,0x0000)
    })
}



loadTest=function (url) {
    var blob = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function()
    {
        blob = xhr.response;

        var fr = new FileReader()
        fr.readAsArrayBuffer(blob)
        fr.onload = (function (evt) {
            emu.loadProgramm(evt.currentTarget.result, 0x0000)
        })

    }
    xhr.send();
}



function UI() {

    regView=new RegView('regView')
    memView=new MemView('memView')
    asmView= new AsmView('asmView')
    stackView= new StackView('stackView')
    flagsView= new FlagsView('flagsView')
    buttonBar=new ButtonBar()

    stackView.showFrom(cpu.memoryV,0,0x32)
    memView.showFrom(cpu.memoryV)

    var ss=document.getElementById("sleep")
     sleep= new Slider(ss, {

        "ticks": [100, 400, 700],
        "ticks-labels":["short", "medium", "long"],
        "min":100,
        "max":700,
        "step":300,
        "value" : 400,
        "tooltip" : "hide"
    });

    var testFiles=[
        "Disasembler.bin",
        "INC_DEC.bin",
        "MOV_B0-BF.bin",
        "AND_OR_XOR.bin"
    ]

    var testMenu= document.getElementById("testMenu")
    var i=0
    while (i<testFiles.length){
        var item=document.createElement("li")
        item.id=testFiles[i]
        item.onclick=function(evt){loadTest('files/'+evt.target.parentNode.id)}
        item.innerHTML='<a  href="#">'+testFiles[i]+'<\a>'
        testMenu.appendChild(item)
        i++
    }
}





UI();