/**
 * Created by unagii on 04.10.2016.
 */


function ButtonBar() {


    var loadBTN = document.getElementById("LoadFileBTN");

    var resetBTN = document.getElementById("ResetBTN");
    var backBTN = document.getElementById("BackBTN");
    var nextBTN = document.getElementById("NextBTN");
    var runBTN = document.getElementById("RunBTN")
    var pauseBTN = document.getElementById("PauseBTN")

//собыия
    resetBTN.onclick = emu.reset;

    backBTN.onclick =   emu.back;

    nextBTN.onclick =  emu.next;

    runBTN.onclick =  emu.run;

    pauseBTN.onclick =  emu.pause;


    loadBTN.onchange = function (evt) {
        var fr = new FileReader()
        fr.readAsArrayBuffer(evt.target.files[0])
        fr.onload = (function (evt) {
            emu.loadProgramm(evt.currentTarget.result, 0x0000)
        })

    }

    this.resetBTN = resetBTN
    this.backBTN = backBTN
    this.resetBTN = resetBTN
    this.runBTN = runBTN
}