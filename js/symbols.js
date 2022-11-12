var elements = {};
elements.counter = 0;
elements.topElement = 0;
elements.topArrow = -20;
elements.idSelected = -1;
//DONE
function drawSimple(type, value) {
    var id = elements.counter;
    if (value === undefined) value = window.prompt("Ingresa el valor");
    var element = "<div class='element' id='element_" + id + "' name='simple'>" +
        "<div class='" + type + "'>" +
        "<p class='identifiers'>" + id + "</p>" +
        "<p class='values'>" + value + "</p>" +
        "</div>" +
        "</div>";
    var arrow = "<div class='vertical' id='line_" + id + "'></div>";

    if (id === 0) {
        document.getElementById('drawable').insertAdjacentHTML('beforeend', element);
    } else {
        document.getElementById('drawable').insertAdjacentHTML('beforeend', arrow + element);
        document.getElementById('element_' + id).style.top = String(elements.topElement) + "px";
        document.getElementById('line_' + id).style.top = String(elements.topArrow) + "px";
    }
    elements.topElement += 80;
    elements.topArrow += 80;
    elements.counter++;
    refresh();
}
//DONE
function drawConditional(values) {
    var id = elements.counter;
    var condition;
    var ifTrue;
    var ifFalse;
    if (values === undefined) {
        condition = window.prompt("Ingresa el valor de la condición");
        ifTrue = window.prompt("Ingresa el valor para el caso verdadero");
        ifFalse = window.prompt("Ingresa el valor para el caso falso");
    } else {
        condition = values.condition;
        ifTrue = values.ifTrue;
        ifFalse = values.ifFalse;
    }
    var element = "<div class='element' id='element_" + id + "' name='conditional'>" +
        "<div class='condition'>" +
        "<p class='values'>" + condition + "</p>" +
        "</div>" +
        "<div class='verticalConditional'></div>" +
        "<div class='horizontalConditional'></div>" +
        "<div class='sentence' name='true'>" +
        "<p class='identifiers'>" + id + "</p>" +
        "<p class='values'>" + ifTrue + "</p>" +
        "</div>" +
        "<div class='verticalTrue'></div>" +
        "<div class='sentence' name='false'>" +
        "<p class='values'>" + ifFalse + "</p>" +
        "</div>" +
        "<div class='verticalFalse'></div>" +
        "<div class='horizontalTrueFalse'></div>" +
        "</div>";
    var arrow = "<div class='vertical' id='line_" + id + "'></div>";

    if (id === 0) {
        document.getElementById('drawable').insertAdjacentHTML('beforeend', element);
        document.getElementById('element_' + id).style.top = String(elements.topElement - 80) + "px";
    } else {
        document.getElementById('drawable').insertAdjacentHTML('beforeend', arrow + element);
        document.getElementById('element_' + id).style.top = String(elements.topElement - 80) + "px";
        document.getElementById('line_' + id).style.top = String(elements.topArrow) + "px";
    }
    elements.topElement += 170;
    elements.topArrow += 170;
    elements.counter++;
    refresh();
}
//DONE
function drawCycle(values, opc) {
    var id = elements.counter;
    var init, inc, condition, ifTrue, ifFalse;
    var type;//type
    if (values === undefined) {
        type = parseInt(window.prompt("Ingresa el numero correspondiente al ciclo\n0:for\n1:while\n2:dowhile"));
    } else {
        type = opc;
    }
    var arrow = "<div class='vertical' id='line_" + id + "'></div>";
    var element;
    if (type === 0) {//for
        if (values == undefined) {
            init = window.prompt("Ingresa el valor inicial del iterador");
            inc = window.prompt("Ingresa el valor de incremento");
            condition = window.prompt("Ingresa el valor de la condición");
            ifTrue = window.prompt("Ingresa el valor para el caso verdadero");
            ifFalse = window.prompt("Ingresa el valor para el caso falso");
        } else {
            init = values.init;
            inc = values.inc;
            condition = values.condition;
            ifTrue = values.ifTrue;
            ifFalse = values.ifFalse;
        }
        element = "<div class='element' id='element_" + id + "' name='for'>" +
            "<div class='verticalTrueConditional'></div>" +
            "<div class='sentence' name='init'>" +
            "<p class='identifiers'>" + id + "</p>" +
            "<p class='values'>" + init + "</p>" +
            "</div>" +
            "<div class='condition'>" +
            "<p class='values'>" + condition + "</p>" +
            "</div>" +
            "<div class='verticalConditional'></div>" +
            "<div class='horizontalConditional'></div>" +
            "<div class='sentence' name='inc'>" +
            "<p class='values'>" + inc + "</p>" +
            "</div>" +
            "<div class='horizontalTrueInc'></div>" +
            "<div class='verticalTrueInc'></div>" +
            "<div class='sentence' name='trueFor'>" +
            "<p class='values'>" + ifTrue + "</p>" +
            "</div>" +
            "<div class='sentence' name='falseFor'>" +
            "<p class='values'>" + ifFalse + "</p>" +
            "</div>" +
            "<div class='horizontalFalseConditional1'></div>" +
            "<div class='horizontalFalseConditional2'></div>" +
            "<div class='verticalFalseConditional'></div>" +
            "</div>";
        if (id === 0) {
            document.getElementById('drawable').insertAdjacentHTML('beforeend', element);
            document.getElementById('element_' + id).style.top = String(elements.topElement) + "px";
        } else {
            document.getElementById('drawable').insertAdjacentHTML('beforeend', arrow + element);
            document.getElementById('element_' + id).style.top = String(elements.topElement) + "px";
            document.getElementById('line_' + id).style.top = String(elements.topArrow) + "px";
        }
        elements.topElement += 310;
        elements.topArrow += 310;
        elements.counter++;
    } else if (type === 1) {//while
        if (values === undefined) {
            condition = window.prompt("Ingresa el valor de la condición");
            ifTrue = window.prompt("Ingresa el valor para el caso verdadero");
            ifFalse = window.prompt("Ingresa el valor para el caso falso");
        } else {
            condition = values.condition;
            ifTrue = values.ifTrue;
            ifFalse = values.ifFalse;
        }
        element = "<div class='element' id='element_" + id + "' name='while'>" +
            "<div class='condition'>" +
            "<p class='values'>" + condition + "</p>" +
            "</div>" +
            "<div class='verticalConditional'></div>" +
            "<div class='horizontalConditional'></div>" +
            "<div class='horizontalConditionalTrue'></div>" +
            "<div class='sentence' name='true'>" +
            "<p class='identifiers'>" + id + "</p>" +
            "<p class='values'>" + ifTrue + "</p>" +
            "</div>" +
            "<div class='sentence' name='false'>" +
            "<p class='values'>" + ifFalse + "</p>" +
            "</div>" +
            "</div>";
        if (id === 0) {
            document.getElementById('drawable').insertAdjacentHTML('beforeend', element);
            document.getElementById('element_' + id).style.top = String(elements.topElement - 80) + "px";
        } else {
            document.getElementById('drawable').insertAdjacentHTML('beforeend', arrow + element);
            document.getElementById('element_' + id).style.top = String(elements.topElement - 80) + "px";
            document.getElementById('line_' + id).style.top = String(elements.topArrow) + "px";
        }
        elements.topElement += 150;
        elements.topArrow += 150;
        elements.counter++;
    } else if (type === 2) {//dowhile
        if (values === undefined) {
            condition = window.prompt("Ingresa el valor de la condición");
            ifTrue = window.prompt("Ingresa el valor para el caso verdadero");
            ifFalse = window.prompt("Ingresa el valor para el caso falso");
        } else {
            condition = values.condition;
            ifTrue = values.ifTrue;
            ifFalse = values.ifFalse;
        }

        element = "<div class='element' id='element_" + id + "' name='dowhile'>" +
            "<div class='verticalTrueConditional'></div>" +
            "<div class='sentence' name='trueDowhile'>" +
            "<p class='identifiers'>" + id + "</p>" +
            "<p class='values'>" + ifTrue + "</p>" +
            "</div>" +
            "<div class='condition'>" +
            "<p class='values'>" + condition + "</p>" +
            "</div>" +
            "<div class='verticalConditional'></div>" +
            "<div class='horizontalConditional'></div>" +
            "<div class='verticalConditionalTrue'></div>" +
            "<div class='sentence' name='false'>" +
            "<p class='values'>" + ifFalse + "</p>" +
            "</div>" +
            "</div>";
        if (id === 0) {
            document.getElementById('drawable').insertAdjacentHTML('beforeend', element);
            document.getElementById('element_' + id).style.top = String(elements.topElement + 10) + "px";
        } else {
            document.getElementById('drawable').insertAdjacentHTML('beforeend', arrow + element);
            document.getElementById('element_' + id).style.top = String(elements.topElement) + "px";
            document.getElementById('line_' + id).style.top = String(elements.topArrow) + "px";
        }
        elements.topElement += 230;
        elements.topArrow += 230;
        elements.counter++;
    } else {
        alert('Opcion invalida');
    }
    refresh();
}
//DONE
function refresh() {
    modifyColors();
    modifyLetterSize(1);
}