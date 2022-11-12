//DONE
function deleteElement() {
    var idSelected = elements.idSelected;
    if (idSelected === -1) return;
    var next = idSelected + 1;
    var elementID = 'element_' + idSelected;
    var lineID = 'line_' + idSelected;
    var totalElements = elements.counter;
    var elementQuan = totalElements - idSelected - 1;
    var elType = document.getElementById(elementID).getAttribute('name');//es el tipo de elemento que se elimino

    if (next === totalElements) { //ultimo elemento
        document.getElementById(elementID).remove();
        if (totalElements !== 1) document.getElementById(lineID).remove();
        if (elType === 'simple') {
            elements.topElement -= 80;
            if (totalElements !== 1) elements.topArrow -= 80;
        } else if (elType === 'conditional') {
            elements.topElement -= 170;
            if (totalElements !== 1) elements.topArrow -= 170;
        } else if (elType === 'for') {
            elements.topElement -= 310;
            if (totalElements !== 1) elements.topArrow -= 310;
        } else if (elType === 'while') {
            elements.topElement -= 150;
            if (totalElements !== 1) elements.topArrow -= 150;
        } else if (elType === 'dowhile') {
            elements.topElement -= 230;
            if (totalElements !== 1) elements.topArrow -= 230;
        }
        elements.idSelected = -1;//deselecciona
        elements.counter--;
        return;
    }
    document.getElementById(elementID).remove();
    if (idSelected !== 0) document.getElementById(lineID).remove();
    //update general top
    if (elType === 'simple') {
        elements.topElement -= 80;
        elements.topArrow -= 80;
    } else if (elType === 'conditional') {
        elements.topElement -= 170;
        elements.topArrow -= 170;
    } else if (elType === 'for') {
        elements.topElement -= 310;
        elements.topArrow -= 310;
    } else if (elType === 'while') {
        elements.topElement -= 150;
        elements.topArrow -= 150;
    } else if (elType === 'dowhile') {
        elements.topElement -= 230;
        elements.topArrow -= 230;
    }
    //update rest element's position and idcontent
    for (let i = 0; i < elementQuan; i++) {
        let myId = idSelected + i;
        let elementId = "element_" + myId;
        let lineId = "line_" + myId;
        let idElement = next + i;
        let elementTop = parseInt(document.getElementById('element_' + idElement).style.top);
        let lineTop = parseInt(document.getElementById('line_' + idElement).style.top);
        //sube posicion con base en el elemento seleccionado
        if (elType === 'simple') {
            updatePosition(next, elementTop, lineTop, i, 80);
        } else if (elType === 'conditional') {
            updatePosition(next, elementTop, lineTop, i, 170);
        } else if (elType === 'for') {
            updatePosition(next, elementTop, lineTop, i, 310);
        } else if (elType === 'while') {
            updatePosition(next, elementTop, lineTop, i, 150);
        } else if (elType === 'dowhile') {
            updatePosition(next, elementTop, lineTop, i, 230);
        }

        document.getElementById('element_' + idElement).setAttribute("id", elementId);//updateID
        document.getElementById('line_' + idElement).setAttribute("id", lineId);//updateID
        var type = document.getElementById(elementId).getAttribute('name');
        //Actualiza el id interno de los elementos
        if (type === 'simple') {
            document.getElementById(elementId).firstChild.firstChild.textContent = myId;
        } else if (type === 'conditional') {
            document.getElementById(elementId).childNodes[3].firstChild.textContent = myId;
        } else if (type === 'for' || type === 'dowhile') {
            document.getElementById(elementId).childNodes[1].firstChild.textContent = myId;
        } else if (type === 'while') {
            document.getElementById(elementId).childNodes[4].firstChild.textContent = myId;
        }
    }
    elements.idSelected = -1;//deselecciona
    elements.counter--;
}

//DONE
function updatePosition(next, elementTop, lineTop, i, size) {
    var idElement = next + i;
    document.getElementById('element_' + idElement).style.top = (elementTop - size) + "px";
    document.getElementById('line_' + idElement).style.top = (lineTop - size) + "px";
}

//DONE
//Selecciona el elemento con el ID que ingresa el usuario
function selectElement() {
    var id = parseInt(window.prompt("Ingresa el ID del elemento que quieres seleccionar"));
    if (isNaN(id)) return;
    var outlineColor = document.getElementById('outline').value;
    var color = document.getElementById('elstyle').value;
    var idSelected = elements.idSelected;
    if (idSelected === -1) {//nada seleccionado
        elements.idSelected = id;//update element
        select('#E0D7D7', '#FF0000');//selecciona
    } else {
        select(color, outlineColor);//deselecciona
        if (id === idSelected) {
            elements.idSelected = -1;//actualiza el id global
        } else {
            elements.idSelected = id;//actualiza el id global
            select('#E0D7D7', '#FF0000');//selecciona
        }
    }
}
//DONE
//selecciona el elemento con el id global 
function select(bgcolor, outlinecolor) {
    var id = elements.idSelected;
    var elementID = 'element_' + id;
    var elementType = document.getElementById(elementID).getAttribute('name');
    if (elementType === 'simple') {
        document.getElementById(elementID).firstChild.style.backgroundColor = bgcolor;
    } else if (elementType === 'conditional') {
        document.getElementById(elementID).childNodes[0].style.backgroundColor = bgcolor;
        document.getElementById(elementID).childNodes[3].style.backgroundColor = bgcolor;
        document.getElementById(elementID).childNodes[5].style.backgroundColor = bgcolor;
    } else if (elementType === 'for') {
        document.getElementById(elementID).childNodes[1].style.backgroundColor = bgcolor;
        document.getElementById(elementID).childNodes[2].style.backgroundColor = bgcolor;
        document.getElementById(elementID).childNodes[5].style.backgroundColor = bgcolor;
        document.getElementById(elementID).childNodes[8].style.backgroundColor = bgcolor;
        document.getElementById(elementID).childNodes[9].style.backgroundColor = bgcolor;
    } else if (elementType === 'while') {
        document.getElementById(elementID).childNodes[0].style.backgroundColor = bgcolor;
        document.getElementById(elementID).childNodes[4].style.backgroundColor = bgcolor;
        document.getElementById(elementID).childNodes[5].style.backgroundColor = bgcolor;
    } else if (elementType === 'dowhile') {
        document.getElementById(elementID).childNodes[1].style.backgroundColor = bgcolor;
        document.getElementById(elementID).childNodes[2].style.backgroundColor = bgcolor;
        document.getElementById(elementID).childNodes[6].style.backgroundColor = bgcolor;
    }
    document.getElementById(elementID).style.border = outlinecolor;
}

//DONE
function editElement() {
    var id = elements.idSelected;
    var outlineColor = document.getElementById('outline').value;
    var color = document.getElementById('elstyle').value;
    var elementID = 'element_' + id;
    var elType = document.getElementById(elementID).getAttribute('name');

    if (id === -1) return;

    if (elType === 'simple') {
        let value = window.prompt("Ingresa el nuevo valor");
        document.getElementById(elementID).childNodes[0].childNodes[1].textContent = value;
    }
    else if (elType === 'conditional') {
        let condition = window.prompt("Ingresa el nuevo valor de la condición");
        let ifTrue = window.prompt("Ingresa el nuevo valor para el caso verdadero");
        let ifFalse = window.prompt("Ingresa el nuevo valor para el caso falso");
        document.getElementById(elementID).childNodes[0].firstChild.textContent = condition;
        document.getElementById(elementID).childNodes[3].childNodes[1].textContent = ifTrue;
        document.getElementById(elementID).childNodes[5].firstChild.textContent = ifFalse;
    }
    else if (elType === 'for') {
        let init = window.prompt("Ingresa el nuevo valor inicial del iterador");
        let inc = window.prompt("Ingresa el nuevo valor de incremento");
        let condition = window.prompt("Ingresa el nuevo valor de la condición");
        let ifTrue = window.prompt("Ingresa el nuevo valor para el caso verdadero");
        let ifFalse = window.prompt("Ingresa el nuevo valor para el caso falso");
        document.getElementById(elementID).childNodes[1].childNodes[1].textContent = init;
        document.getElementById(elementID).childNodes[2].firstChild.textContent = condition;
        document.getElementById(elementID).childNodes[5].firstChild.textContent = inc;
        document.getElementById(elementID).childNodes[8].firstChild.textContent = ifTrue;
        document.getElementById(elementID).childNodes[9].firstChild.textContent = ifFalse;
    }
    else if (elType === 'while') {
        let condition = window.prompt("Ingresa el nuevo valor de la condición");
        let ifTrue = window.prompt("Ingresa el nuevo valor para el caso verdadero");
        let ifFalse = window.prompt("Ingresa el nuevo valor para el caso falso");
        document.getElementById(elementID).childNodes[0].firstChild.textContent = condition;
        document.getElementById(elementID).childNodes[4].childNodes[1].textContent = ifTrue;
        document.getElementById(elementID).childNodes[5].firstChild.textContent = ifFalse;
    }
    else if (elType === 'dowhile') {
        let condition = window.prompt("Ingresa el nuevo valor de la condición");
        let ifTrue = window.prompt("Ingresa el nuevo valor para el caso verdadero");
        let ifFalse = window.prompt("Ingresa el nuevo valor para el caso falso");
        document.getElementById(elementID).childNodes[1].childNodes[1].textContent = ifTrue;
        document.getElementById(elementID).childNodes[2].firstChild.textContent = condition;
        document.getElementById(elementID).childNodes[6].firstChild.textContent = ifFalse;
    }
    else {
        alert('El elemento no existe');
    }
    select(color, outlineColor);//deselecciona
    elements.idSelected = -1;
}
//DONE
function modifyLetterSize(refresh) {
    if (!refresh) { var fontSize = window.prompt('Ingresa el nuevo tamaño de fuente'); }
    const ovals = document.getElementsByClassName('oval');
    const declarations = document.getElementsByClassName('declaration');
    const inputs = document.getElementsByClassName('input');
    const outputs = document.getElementsByClassName('output');
    const sentences = document.getElementsByClassName('sentence');
    const conditions = document.getElementsByClassName('condition');
    var elements = [ovals, declarations, inputs, outputs, sentences, conditions]

    for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < elements[i].length; j++) {
            elements[i][j].style.fontSize = fontSize + "px";
        }
    }
}
//DONE
function modifyColors() {
    var outlineColor = document.getElementById('outline').value;
    let color = document.getElementById('elstyle').value;
    const ovals = document.getElementsByClassName('oval');
    const declarations = document.getElementsByClassName('declaration');
    const inputs = document.getElementsByClassName('input');
    const outputs = document.getElementsByClassName('output');
    const sentences = document.getElementsByClassName('sentence');
    const conditions = document.getElementsByClassName('condition');
    var elements = [ovals, inputs, outputs, sentences, conditions];

    for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < elements[i].length; j++) {
            elements[i][j].style.backgroundColor = color;
            elements[i][j].style.border = outlineColor + " solid 1px";
        }
    }
    for (let j = 0; j < declarations.length; j++) {
        declarations[j].style.borderRight = outlineColor + " solid 1px";
        declarations[j].style.borderLeft = outlineColor + " solid 1px";
        declarations[j].style.backgroundColor = color;
    }
}
