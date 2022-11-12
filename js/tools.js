//DONE
function save() {
    var filename = "diagrama.xml";
    xml = getXML();
    download(filename, xml);
}
//DONE
function getXML() {
    var elements = document.getElementsByClassName('element');
    var xml = "<drawable>";
    var elementXML = "";
    var type, element, id, idString;
    for (let i = 0; i < elements.length; i++) {
        element = elements[i];
        type = element.getAttribute('name');
        idString = element.getAttribute('id');
        id = parseInt(idString.substring(idString.indexOf('_') + 1));
        if (type === 'simple') {
            let simpleType = element.firstChild.getAttribute('class');
            let simpleValue = element.firstChild.childNodes[1].textContent;
            elementXML = "<element id='element_" + id + "' name='simple'>" +
                "<type value='" + simpleType + "'>" +
                "<value>" + simpleValue + "</value>" +
                "</type>" +
                "</element>";
        } else if (type === 'for') {
            let init = element.childNodes[1].childNodes[1].textContent;
            let condition = element.childNodes[2].firstChild.textContent;
            let inc = element.childNodes[5].firstChild.textContent;
            let ifTrue = element.childNodes[8].firstChild.textContent;
            let ifFalse = element.childNodes[9].firstChild.textContent;
            elementXML = "<element id='element_" + id + "' name='for'>" +
                "<sentence name='init'><value>" + init + "</value></sentence>" +
                "<condition><value>" + condition + "</value></condition>" +
                "<sentence name='inc'><value>" + inc + "</value></sentence>" +
                "<sentence name='true'><value>" + ifTrue + "</value></sentence>" +
                "<sentence name='false'><value>" + ifFalse + "</value></sentence>" +
                "</element>";
        } else {
            let condition_, ifTrue_, ifFalse_;
            if (type === 'conditional') {
                condition_ = element.childNodes[0].firstChild.textContent;
                ifTrue_ = element.childNodes[3].childNodes[1].textContent;
                ifFalse_ = element.childNodes[5].firstChild.textContent;
            } else if (type === 'while') {
                condition_ = element.childNodes[0].firstChild.textContent;
                ifTrue_ = element.childNodes[4].childNodes[1].textContent;
                ifFalse_ = element.childNodes[5].firstChild.textContent;
            }
            else {
                condition_ = element.childNodes[2].firstChild.textContent;
                ifTrue_ = element.childNodes[1].childNodes[1].textContent;
                ifFalse_ = element.childNodes[6].firstChild.textContent;
            }
            elementXML = "<element id='element_" + id + "' name='" + type + "'>" +
                "<condition><value>" + condition_ + "</value></condition>" +
                "<sentence name='true'><value>" + ifTrue_ + "</value></sentence>" +
                "<sentence name='false'><value>" + ifFalse_ + "</value></sentence></element>";
        }
        xml += elementXML;
    }
    xml += "</drawable>";
    return xml;
}
//DONE
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
//DONE
function upload() {
    //reestablecer global
    elements.counter = 0;
    elements.topElement = 0;
    elements.topArrow = -20;
    elements.idSelected = -1;
    document.getElementById('drawable').innerHTML = "";
    //lee xml
    var reader = new FileReader();
    reader.readAsText(document.getElementById('fileUpload').files[0]);
    reader.onload = function () {
        var xmlAsString = reader.result;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlAsString, "text/xml");
        var xmlElement = xmlDoc.getElementsByTagName("element");
        for (let i = 0; i < xmlElement.length; i++) {
            loadXml(xmlElement[i]);
        }
    };
    reader.onerror = function (error) {
        alert('Error: ', error);
    };
}
//DONE
function loadXml(xml) {
    var type = xml.getAttribute('name');
    if (type === 'simple') {
        let simpleType = xml.firstChild.getAttribute('value');
        let value = xml.firstChild.firstChild.textContent;
        drawSimple(simpleType, value);
    } else if (type === 'for') {
        let forValues = {};
        forValues.init = xml.childNodes[0].firstChild.textContent;
        forValues.condition = xml.childNodes[1].firstChild.textContent;
        forValues.inc = xml.childNodes[2].firstChild.textContent;
        forValues.ifTrue = xml.childNodes[3].firstChild.textContent;
        forValues.ifFalse = xml.childNodes[4].firstChild.textContent;
        drawCycle(forValues, 0);
    } else {
        let values = {};
        values.condition = xml.firstChild.firstChild.textContent;
        values.ifTrue = xml.childNodes[1].firstChild.textContent;
        values.ifFalse = xml.childNodes[2].firstChild.textContent;
        if (type === 'conditional') drawConditional(values);
        else if (type === 'while') drawCycle(values, 1);
        else drawCycle(values, 2);
    }
}
//DONE
function getCode() {
    var mycode = "int main(){\n";
    var inst = "";
    xmlAsString = getXML();
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlAsString, "text/xml");
    var xmlElement = xmlDoc.getElementsByTagName("element");
    for (let i = 0; i < xmlElement.length; i++) {
        var xml = xmlElement[i];
        var type = xml.getAttribute('name'); +
            console.log(xml);
        if (type === 'simple') {
            let value = xml.firstChild.getAttribute('value');
            let content = xml.firstChild.firstChild.textContent;
            if (value === 'oval') inst = "\n";
            else if (value === 'declaration') inst = "int " + content + ";\n";
            else if (value === 'input') inst = "printf('" + content + "');\n";
            else if (value === 'output') inst = "scanf('%d',&" + content + ");\n";
            else if (value === 'sentence') inst = content + ";\n";
        } else if (type === 'for') {
            inst = "for(" + xml.childNodes[0].firstChild.textContent + ";" + xml.childNodes[1].firstChild.textContent + ";" + xml.childNodes[2].firstChild.textContent + "){\n" + xml.childNodes[3].firstChild.textContent + ";\n}\n" + xml.childNodes[4].firstChild.textContent + ";\n";
        } else {
            let condition = xml.childNodes[0].firstChild.textContent;
            let ifTrue = xml.childNodes[1].firstChild.textContent;
            let ifFalse = xml.childNodes[2].firstChild.textContent;
            if (type === 'conditional') inst = "if(" + condition + "){\n" + ifTrue + ";\n}else{\n" + ifFalse + ";}\n";
            else if (type === 'while') inst = "while(" + condition + "){\n" + ifTrue + ";\n}\n" + ifFalse + ";\n";
            else inst = "do{\n" + ifTrue + ";\n}while(" + condition + ");\n" + ifFalse + ";\n";
        }
        mycode += inst;
    }
    mycode += "}";
    mycode = mycode.replace(/(?:\r\n|\r|\n)/g, '<br>');
    document.getElementById('code').innerHTML = mycode;
}