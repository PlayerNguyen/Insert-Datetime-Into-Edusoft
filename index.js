// ==UserScript==
// @name         Insert Date And Time Into EduSoft
// @namespace    http://tampermonkey.net/
// @version      2024-03-18
// @description  try to take over the world!
// @author       PlaYERnGUYEN
// @match        https://edusoftweb.hcmiu.edu.vn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=edu.vn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let timeMap = [];
    const tableTrElements = document.querySelectorAll(`#ContentPlaceHolder1_ctl00_Table1>tbody>tr`);
    for (let trElement of tableTrElements) {
        /**
        * Insert time for first col
        */
        let td = trElement.childNodes[1]
        const startPos = td.title.indexOf("(") + 1;
        const endPos = td.title.indexOf(")");

        const value = td.title.substring(startPos, endPos).replaceAll("từ", "").replaceAll("đến", "~");
        td.innerHTML = value;
        timeMap.push(value.split("~").map((s) => s.trim()));
    }

    //console.log(timeMap);

    for (let trElement of tableTrElements){
        /**
            Insert each block
        */
        const tdElements = trElement.getElementsByTagName("td");
        for (let tdElement of tdElements)
        {
            if (tdElement.getAttribute("onmouseover") !== null) {
                const willExtractValue = tdElement.getAttribute("onmouseover")
                const start = willExtractValue.indexOf("(");
                const end = willExtractValue.indexOf(")");
                const array = willExtractValue.substring(start + 1, end);
                const values = array.split(',')


                const startAt = Number(values[6].replaceAll("\'", "")) - 1;
                const quantity = Number(values[7].replaceAll("\'", "")) - 1;

                const startTime = timeMap[startAt][0]
                const endTime = timeMap[startAt + quantity][1]

                const bodySpan = tdElement.getElementsByTagName("tbody")[0];
                // console.log(bodySpan);
                const node = document.createElement("tr");
                node.style.color = "teal"
                const textnode = document.createTextNode(`${startTime} - ${endTime}`);
                node.appendChild(textnode);
                bodySpan.appendChild(node);

            }
        }
    }

})();
