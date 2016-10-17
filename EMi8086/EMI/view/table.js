/**
 * Created by unagii on 11.10.2016.
 */

function Table(tableId) {

    this.domElement=document.getElementById(tableId)
    this.tableId=tableId
    this.highlightChange=[]
    this.colorChange=[]
}


Table.prototype.addTextRow= function(id,row) {
    var i = 0
    var str = '<tr id=' + this.tableId + id + '>'
    while (i < row.length) {
        str += '<td>' + row[i] + '</td>'
        i++
    }
    str += '</tr>'


    this.domElement.innerHTML += str
}


Table.prototype.addIndexRow= function(id,row,rowIndex) {
    var i = 0
    var str = '<tr id=' + this.tableId + id + '>'
    while (i < row.length) {
        str += '<td id=' + this.tableId +id+ rowIndex[i] + '>'+ row[i] + '</td>'
        i++
    }
    str += '</tr>'


    this.domElement.innerHTML += str
}

Table.prototype.addIndexRowMem= function(id,row,rowIndex) {
    var i = 0
    var str = '<tr id=' + this.tableId + id + '>'

    str+= '<td>'+ this.intToHex2(id,5) + '</td><td>|</td>'
    while (i < row.length) {
        str += '<td id=' + this.tableId +id+ rowIndex[i] + '>'+ this.intToHex(row[i]) + '</td>'
        i++
    }
    str += '</tr>'


    this.domElement.innerHTML += str
}


Table.prototype.replaceIndexRowMem= function(id,row,rowIndex) {
    var prewRow = document.getElementById(this.tableId+ id);
    var i = 0
    var str = '<tr id=' + this.tableId + id + '>'

    str+= '<td>'+ this.intToHex2(id,5) + '</td><td>|</td>'
    while (i < row.length) {
        str += '<td id=' + this.tableId +id+ rowIndex[i] + '>'+ this.intToHex(row[i]) + '</td>'
        i++
    }
    str += '</tr>'


    prewRow.innerHTML = str
}


Table.prototype.replaceTextRow= function(id,row) {
    var prewRow = document.getElementById(this.tableId+ id);
    var i = 0;
    var str = '<tr id=' + this.tableId + id + '>';
    while (i < row.length) {
        str += '<td>' + row[i] + '</td>';
        i++
    }
    str += '</tr>';


    prewRow.innerHTML = str
};

Table.prototype.replaceValue= function(rowID,cellID,value) {

    var prewRow = document.getElementById(this.tableId + rowID + cellID);
    prewRow.innerHTML = value
};


Table.prototype.removeTextRow= function(id) {
    var row = document.getElementById(this.tableId+ id)
    row.parentNode.removeChild(row);


};



Table.prototype.setHeader= function(row) {
    var header = document.getElementById(this.tableId + "header")
    var i = 0
    var str = '<tr id=' + this.tableId + "header" + '>'
    while (i < row.length) {
        str += '<th>' + row[i] + '</th>'
        i++
    }
    str += '</tr>'
    this.tableHeader = str
    if (header != null) header.innerHTML = str
    else {
        str += this.domElement.innerHTML
        this.domElement.innerHTML = str
    }
}

Table.prototype.clear= function() {

    var table=this.domElement
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }


}

Table.prototype.setHighlightValue= function(rowID,cellID,color) {
    var prewRow = document.getElementById(this.tableId+ rowID+cellID);
    prewRow.style.backgroundColor=color//"#faa732"
    this.highlightChange.push(prewRow)
};

Table.prototype.clearHighlight= function() {

    var elems = this.highlightChange
    while (elems.length > 0) {
        var elem = elems.pop()
        elem.style.backgroundColor = ""
    }

};

Table.prototype.setColorValue= function(rowID,cellID) {
    var prewRow = document.getElementById(this.tableId+ rowID+cellID);
    prewRow.style.color="#da4f49"
    this.colorChange.push(prewRow)
};

Table.prototype.clearColor= function() {

    var elems = this.colorChange
    while (elems.length > 0) {
        var elem = elems.pop()
        elem.style.color = ""
    }

};

Table.prototype.setClass= function(rowID,cellID,className) {
    var prewRow = document.getElementById(this.tableId+ rowID+cellID);
    prewRow.className=className
};


Table.prototype.intToHex=function(int){
    var str =int.toString(16).toUpperCase()
    if (str.length < 2)str = "0" + str;
    return str
}

Table.prototype.intToHex2=function(int,len){
    var str =int.toString(16).toUpperCase()
    while (str.length < len)str = "0" + str;
    return str
}
