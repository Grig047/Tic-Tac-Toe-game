function start() { // ֆունկցիայի մեջ եմ գրել կոդի կրկնում չունենալու համար
    document.getElementById('vsc').remove()
    document.getElementById('vsp').remove()

    document.getElementById('container').innerHTML = "<table class=\"game\">\n" +
        "        <tr>\n" +
        "            <td class='block'></td>\n" +
        "            <td class='block'></td>\n" +
        "            <td class='block'></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "            <td class='block'></td>\n" +
        "            <td class='block'></td>\n" +
        "            <td class='block'></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "            <td class='block'></td>\n" +
        "            <td class='block'></td>\n" +
        "            <td class='block'></td>\n" +
        "        </tr>\n" +
        "    </table>\n" +
        "<button id='res'>Restart</button>\n"

    document.getElementById('res').onclick = () => location.reload()

}

let finish = false  // խաղի ավարտից հետո փոփոխությունների արգելում
let lastTurn = 0  // ոչ ոքի գրանցող vs player
let lastTurn1 = 0  //ոչ ոքի գրանցող vs computer
let bl = document.getElementsByClassName('block')

function checkWinner() {
    let combinations = {
        1: [bl[0].innerHTML, bl[1].innerHTML, bl[2].innerHTML],
        2: [bl[3].innerHTML, bl[4].innerHTML, bl[5].innerHTML],
        3: [bl[6].innerHTML, bl[7].innerHTML, bl[8].innerHTML],
        4: [bl[0].innerHTML, bl[3].innerHTML, bl[6].innerHTML],
        5: [bl[1].innerHTML, bl[4].innerHTML, bl[7].innerHTML],   // ավելի կարճ ու ռացիոնալ
        6: [bl[2].innerHTML, bl[5].innerHTML, bl[8].innerHTML],   // տարբերակ չեմ պատկերացնում
        7: [bl[0].innerHTML, bl[4].innerHTML, bl[8].innerHTML],   // մասիվի գաղափարը միակն է, որ
        8: [bl[2].innerHTML, bl[4].innerHTML, bl[6].innerHTML],   // ինքնուրույն չեմ մտածել
    }
    for (let i in combinations) {
        if (!finish) {
            if (combinations[i].toString() === "╳,╳,╳") {
                document.getElementById('message').innerHTML = '╳ WON!!!'
                finish = true
            } else if (combinations[i].toString() === "◯,◯,◯") {
                document.getElementById('message').innerHTML = '◯ WON!!!'
                finish = true
            }
        }
    }
    if (lastTurn === 9 || lastTurn1 === 5) {
        if (!finish) {
            document.getElementById('message').innerHTML = "DRAW!!!"
            finish = true
        }
    }
}

document.getElementById('vsc').onclick = () => { // vs computer

    start()
    let compTurn = Math.floor(Math.random() * 9)

    function game() {
        if (!finish) {
            if (this.innerHTML === '') {
                this.innerHTML = '╳'
                if (lastTurn1 < 4) {
                    // փնտրում է ռանդոմ ազատ տեղ
                    while (bl[compTurn].innerHTML !== '') compTurn = Math.floor(Math.random() * 9)
                }
                lastTurn1++
                checkWinner() // կանչել եմ 2 անգամ(X-ի հաղթանակից հետո Օ-ի քայլը արգելելու համար)
            }
        }
        !finish ? bl[compTurn].innerHTML = '◯' : null
        checkWinner()
    }

    for (let i = 0; i < 10; i++) {
        bl[i].onclick = game
    }

}

document.getElementById('vsp').onclick = () => { // vs player

    start()
    let flag = false // false-ի դեպքում խաղում է X-ը true-ի դեպքում Օ-ն
    let bl = document.getElementsByClassName('block')

    function game() {
        if (!finish) {
            if (this.innerHTML === '' && !flag) {
                this.innerHTML = '╳'
                lastTurn++
                flag = true
            }
            if (this.innerHTML === '' && flag) {
                this.innerHTML = '◯'
                lastTurn++
                flag = false
            }
        }
        checkWinner()
    }

    for (let i = 0; i < 10; i++) {
        bl[i].onclick = game
    }

}