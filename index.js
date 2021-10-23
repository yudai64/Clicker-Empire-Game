const config = {
    topPage : document.getElementById("topPage"),
    gamePage : document.getElementById("gamePage"),
    gameData : 0,
}

//ゲーム開始時に初期化
class User {
    constructor(name, year, days, money, dayMoney){
        this.name = name;
        this.year = year;
        this.days = days;
        this.money = money;
        this.dayMoney = dayMoney; //1日ごとに取得する金額
    }

    incrementDays(){
        this.days++;
        if(this.days % 365 === 0) this.year++;
    }

    addMoney(money){
        this.money += money;
    }

    reduceMoney(price){
        this.money -= price;
    }

    addDayMoney(money){
        this.dayMoney += money;
    }
}

//ゲーム開始時に初期化
class Humberger {
    constructor(clickCount, clickMoney){
        this.clickCount = clickCount;
        this.clickMoney = clickMoney; //1クリックあたりに取得する金額
    }

    incrementClickCount(){
        this.clickCount++;
    }

    addClickMoeny(money){
        this.clickMoney += money;
    }
}

//ゲーム開始時に初期化。
class Item {
    constructor(name, price, image, stock, type, plusClickMoney, rate, plusDayMoeny, increaseRate){
        this.name = name;
        this.price = price;
        this.image = image;
        this.stock = stock;
        this.type = type; //ability: 能力 investment: 投資 realEstate: 不動産
        this.plusClickMoney = plusClickMoney; //ハンバーガーの増加額
        this.rate = rate; //日毎の金額に追加する金額の割合
        this.plusDayMoeny = plusDayMoeny; //日毎の金額に追加する金額
        this.increaseRate = increaseRate; //購入後のアイテムの価格増加率
    }

    // アイテムの購入イベント
    event(user, humberger, amount, totalPrice){
        console.log(this);
        switch(this.type){
            //ablilityの場合、ハンバーガーのクリックマネーの値を更新。ユーザーの金額減らす。在庫減らす。
            case("ability"):
                humberger.addClickMoeny(this.plusClickMoney * amount);
                user.reduceMoney(totalPrice);
                this.decreaseStock(amount);
                break;
            //investmentの場合、ユーザーの日毎の追加金額を更新。ユーザーの金額減らす。自身の価格も更新。
            case("investment"):
                user.addDayMoney(Math.floor(this.price * this.rate));
                user.reduceMoney(totalPrice);
                console.log(this.price);
                console.log(1 + this.increaseRate);
                this.updatePrice(this.price * (1+this.increaseRate));
                break;
            //investmentの場合、ユーザーの日毎の追加金額を更新。ユーザーの金額減らす。在庫減らす。
            case("realEstate"):
                user.addDayMoney(this.plusDayMoeny);
                user.reduceMoney(totalPrice);
                this.decreaseStock(amount);
                break;
            default:
                console.log("アイテムの設定ミス");
                break;
        }
    }

    updatePrice(price){
        this.price = price;
    }

    decreaseStock(amount){
        this.stock -= amount;
    }
}

const initialItemList = [
    new Item(
            "ハンバーガー",
            15000,
            "https://cdn.pixabay.com/photo/2018/05/21/22/02/barbecue-3419713_960_720.jpg",
            500,
            "ability",
            25,
            0,
            0,
            0
    ),
    new Item(
            "ETF銘柄（ETF Stock）",
            30000,
            "https://media.istockphoto.com/photos/financial-stock-market-graph-candlestick-chart-growth-picture-id1288421549?b=1&k=20&m=1288421549&s=170667a&w=0&h=Euond29RzVxkYz3Ve4UCqgIJUqxrXNe7TWx5kyNOGXA=",
            Infinity,
            "investment",
            0,
            0.1,
            0,
            0.1,
    ),
    new Item(
        "債券ETF（ETF Bonds）",
        300000,
        "https://cdn.pixabay.com/photo/2020/04/27/16/47/historical-stock-5100671__480.jpg",
        Infinity,
        "investment",
        0,
        0.07,
        0,
        0,
    ),
    new Item(
        "レモネードスタンド（Lemonade Stand）",
        300000,
        "https://cdn.pixabay.com/photo/2015/10/21/13/00/lemonade-999593_960_720.jpg",
        1000,
        "realEstate",
        0,
        0,
        30,
        0,
    ),
    new Item(
        "アイスクリームトラック（Ice Cream Truck）",
        100000,
        "https://cdn.pixabay.com/photo/2019/03/17/18/17/ice-cream-4061632_960_720.png",
        500,
        "realEstate",
        0,
        0,
        120,
        0,
    ),
    new Item(
        "家（House）",
        20000000,
        "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_960_720.jpg",
        100,
        "realEstate",
        0,
        0,
        32000,
        0,
    ),
    new Item(
        "都会の家（TownHouse）",
        40000000,
        "https://cdn.pixabay.com/photo/2014/08/01/15/51/city-407703_960_720.jpg",
        100,
        "realEstate",
        0,
        0,
        64000,
        0,
    ),
    new Item(
        "マンション（Mansion）",
        250000000,
        "https://media.istockphoto.com/photos/europe-modern-complex-of-residential-buildings-picture-id1165384568?k=20&m=1165384568&s=612x612&w=0&h=CAnAr3uJtmkr0IQ2EPgm0IBoo8oCm-FEYEtyor8X_9I=",
        20,
        "realEstate",
        0,
        0,
        500000,
        0,
    ),
    new Item(
        "産業スペース（Industrial Space）",
        1000000000,
        "https://cdn.pixabay.com/photo/2014/06/21/20/11/power-station-374097__340.jpg",
        10,
        "realEstate",
        0,
        0,
        2200000,
        0,
    ),
    new Item(
        "高層ホテル（Hotel Skyscraper）",
        10000000000,
        "https://cdn.pixabay.com/photo/2016/12/23/18/28/singapore-1927720__340.jpg",
        5,
        "realEstate",
        0,
        0,
        25000000,
        0,
    ),
    new Item(
        "新幹線（Bullet-Speed Sky Railway）",
        10000000000000,
        "https://cdn.pixabay.com/photo/2018/11/30/03/35/bullet-train-3846965_960_720.jpg",
        1,
        "realEstate",
        0,
        0,
        30000000000,
        0,
    ),
];

// 新規でゲームスタートするかの確認
function checkNewGame(){
    if(document.getElementById("inputName").value === ""){
        alert("名前を入力してください");
        return false;
    }
    if(confirm("新しくゲームを始めますか？")){
        return true;
    } else {
        return false;
    }
}

// セーブデータでゲームスタートするかの確認
function checkLogin(){
    let name = document.getElementById("inputName").value;
    let userData = JSON.parse(localStorage.getItem("user"));
    if(userData === null || name !== userData.name){
        alert("セーブデータがありません。");
    } else {
        if(confirm(name + "でログインしてゲームを開始しますか？")) gameStart(true);
    }
}

function gameStart(login){
    // 初期情報
    let name = document.getElementById("inputName").value;
    let user = login ? Object.assign(new User(), JSON.parse(localStorage.getItem("user"))) : new User(name, 20, 0, 50000, 0);
    let humberger = login ? Object.assign(new Humberger(), JSON.parse(localStorage.getItem("humberger"))) : new Humberger(0, 25);
    let itemList = login ? JSON.parse(localStorage.getItem("itemList")) : JSON.parse(JSON.stringify(initialItemList));//アイテムリストの値を渡す
    for(let i = 0; i < itemList.length; i++){
        // アイテムクラスのオブジェクトとして変換する
        itemList[i] = Object.assign(new Item(), itemList[i]);
        // JSON.stringifyでInfinityがnullに変換されているので戻す
        if(itemList[i].stock === null) itemList[i].stock = Infinity;
    }

    // トップページを非表示にしてゲームページを表示
    config.topPage.classList.remove("d-flex");
    config.topPage.classList.add("d-none");
    config.gamePage.classList.add("bg-gray", "text-white", "col-12", "h-75", "overflow-hidden");
    config.gamePage.append(createGamePage(user, humberger, itemList));

    config.gameData = setInterval(oneDayHasPassed, 1000, user);
}

// 一日の経過イベント
function oneDayHasPassed(user){
    user.incrementDays();
    user.addMoney(user.dayMoney);
    document.getElementById("userYear").innerText = user.year.toString();
    document.getElementById("userDays").innerText = user.days.toString();
    document.getElementById("userMoney").innerText = user.money.toString();
    
}

// gamePageの中身作成。div要素を返却
function createGamePage(user, humberger, itemList){
    let container = document.createElement("div");
    container.classList.add("p-4", "d-flex", "h-100");
    container.innerHTML +=
                        `
                            <div class="col-5 h-100 bg-black p-4 d-flex flex-column justify-content-center align-items-center">
                                <div class="bg-gray text-center p-3 h-30 w-100">
                                    <h4><span id="clickCount">${humberger.clickCount}</span> Burgers</h4>
                                    <p>$${humberger.clickMoney} per click</p>
                                </div>
                                <div class="d-flex justify-content-center align-items-center h-70 w-50 m-4">
                                        <img id="humbergerImage" src="https://cdn.pixabay.com/photo/2012/04/13/01/51/hamburger-31775_960_720.png">
                                </div>
                            </div>
                        `;
    // ハンバーガーのクリックイベント
    container.querySelector("#humbergerImage").addEventListener("click", function(){
        humberger.incrementClickCount();
        user.addMoney(humberger.clickMoney);
        container.querySelector("#clickCount").innerText = humberger.clickCount.toString();
        container.querySelector("#userMoney").innerText = user.money.toString();
    });
    
    let rightPart = document.createElement("div");
    rightPart.classList.add("col-7", "bg-gray", "mh-100");
    rightPart.innerHTML +=
                        `
                            <div id="playerInfo" class="h-20 bg-black d-flex flex-wrap text-center p-2">
                                <div class="col-6 p-1">
                                    <div class="h-100 w-100 bg-gray d-flex justify-content-center align-items-center"><h5 class="m-0">${user.name}</h5></div>
                                </div>
                                <div class="col-6 p-1">
                                    <div class="h-100 w-100 bg-gray d-flex justify-content-center align-items-center"><h5 class="m-0"><span id="userYear">${user.year}</span>years old</h5></div>
                                </div>
                                <div class="col-6 p-1">
                                    <div class="h-100 w-100 bg-gray d-flex justify-content-center align-items-center"><h5 class="m-0"><span id="userDays">${user.days}</span> days</h5></div>
                                </div>
                                <div class="col-6 p-1">
                                    <div class="h-100 w-100 bg-gray d-flex justify-content-center align-items-center"><h5 class="m-0">$ <span id="userMoney">${user.money}</span></h5></div>
                                </div>
                            </div>
                        `;
    // アイテム部分
    let itemArea = document.createElement("div");
    itemArea.setAttribute("id", "itemArea");
    itemArea.classList.add("h-70", "py-2");
    itemArea.append(createItemListContainer(itemList, user, humberger));

    rightPart.append(itemArea);
    rightPart.innerHTML +=
                        `
                        <div class="d-flex justify-content-end mt-1 mh-10">
                            <div id="clearBtn" class="icon-outer">
                                <i class="fas fa-redo fa-lg"></i>
                            </div>
                            <div id="saveBtn" class="icon-outer">
                                <i class="far fa-save fa-2x"></i>
                            </div>
                        </div>
                        `
    rightPart.querySelector("#clearBtn").addEventListener("click", function(){
        if(confirm("セーブデータを削除します。よろしいですか？")){
            localStorage.removeItem("user");
            localStorage.removeItem("humberger");
            localStorage.removeItem("itemList");
        }
    });

    rightPart.querySelector("#saveBtn").addEventListener("click", function(){
        if(confirm("データをセーブしますか？データは上書きされます。")){
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("humberger", JSON.stringify(humberger));
            localStorage.setItem("itemList", JSON.stringify(itemList));
        }
        if(confirm("トップに戻りますか？")){
            clearInterval(config.gameData);
            renderTopPage();
        }
    });

    container.append(rightPart);
    addEventListenerToItems(container.querySelectorAll(".item"), itemList, user, humberger);

    return container;
}

function renderTopPage(){
    config.gamePage.className = "";
    config.gamePage.innerHTML = "";
    config.topPage.classList.remove("d-none");
    config.topPage.classList.add("d-flex");
}

// アイテムの一覧パーツ作成 div要素を返却
function createItemListContainer(itemList, user, humberger){
    let container = document.createElement("div");
    container.setAttribute("id", "itemInfo");
    container.classList.add("bg-black", "p-1", "mh-100", "overflow-auto");

    for(let i = 0; i < itemList.length; i++){
        let currentItem = itemList[i];
        container.innerHTML +=
                        `
                        <div class="d-flex h-40 m-2 p-1 item bg-gray" data-item=${i}>
                            <div class="col-3 h-100 w-100 p-1 d-flex justify-content-center align-items-center">
                                <img src="${currentItem.image}">
                            </div>
                            <div class="col-8 d-flex flex-wrap p-1">
                                <div class="col-12"><h4>${currentItem.name}</h4></div>
                                <div class="col-6"><h5>$${currentItem.price}</h5></div>
                                <div class="col-6 d-flex text-green">
                                    <h5>
                                        ${currentItem.type == "ability" ? "+ $" + currentItem.plusClickMoney.toString() + " / click" :
                                            currentItem.type== "investment" ? "+ " + currentItem.rate.toString() + "% / day" : "+ $" + currentItem.plusDayMoeny.toString() + " / day"}
                                    </h5>
                                </div>
                            </div>
                            <div class="col-1 d-flex justify-content-center align-items-center p-1">
                                <h5>${currentItem.stock !== Infinity ? currentItem.stock : "∞"}</h5>
                            </div>
                        </div>
                        `;
    }

    addEventListenerToItems(container.querySelectorAll(".item"), itemList, user, humberger);

    return container;
}

// アイテム押下時のイベント付与
function addEventListenerToItems(items, itemList, user, humberger){
    for(let i = 0; i < items.length; i++){
        items[i].addEventListener("click", function(event){
            let itemArea = document.getElementById("itemArea")
            itemArea.innerHTML = "";
            itemArea.append(createItemShowContainer(itemList, event.currentTarget.dataset.item, user, humberger));
        });
    }
}

// アイテムの詳細パーツ作成 div要素を返却
function createItemShowContainer(itemList, target, user, humberger){
    let item = itemList[target];
    let container = document.createElement("div");
    container.setAttribute("id", "itemInfo");
    container.classList.add("h-100", "bg-black", "p-1");

    container.innerHTML =
        `
            <div class="w-100 d-flex p-2">
                <div class="col-8">
                    <h4>${item.name}</h4>
                    <p class="mb-1 mt-2">Max Purchases: ${item.stock !== Infinity ? item.stock : "∞"}</p>
                    <p class="mb-1">Price: $${item.price}</p>
                    <p>Get
                        ${item.type == "ability" ? "+ $" + item.plusClickMoney.toString() + " / click" :
                                        item.type== "investment" ? "+ " + item.rate.toString() + "% / day" : "+ $" + item.plusDayMoeny.toString() + " / day"}
                        </p>
                </div>
                <div class="col-4">
                    <img src=${item.image}>
                </div>
            </div>
            <div class="mt-2 p-2">
                <p>How Many would you like to purchase?</p>
                <input type="number" id="purchaseAmountBtn" class="form-control text-right" value="1" min="1" max="${item.stock}">
                <div class="text-right">
                    <h5 class="mt-2">Total: $<span id="totalPrice">${item.price}</span></h5>
                </div>
            </div>
            <div class="d-flex mt-2">
                <div class="col-6 p-1">
                    <input type="button" id="backBtn" class="btn w-100" value="Go Back">
                </div>
                <div class="col-6 p-1">
                    <input type="button" id="purchaseBtn" class="btn w-100" value="Purchase">
                </div>
            </div>
        `;
    let purchaseAmountBtn = container.querySelector("#purchaseAmountBtn");
    purchaseAmountBtn.addEventListener("click", function(event){

        let amount = event.target.value;
        document.getElementById("totalPrice").innerText = (item.price * parseInt(amount)).toString();
    });

    let backBtn = container.querySelector("#backBtn");
    backBtn.addEventListener("click", function(){
        let itemArea = document.getElementById("itemArea")
            itemArea.innerHTML = "";
            itemArea.append(createItemListContainer(itemList, user, humberger));
    });

    let purchaseBtn = container.querySelector("#purchaseBtn");
    purchaseBtn.addEventListener("click", function(){
        let amount = document.getElementById("purchaseAmountBtn").value;
        let totalPrice = parseInt(document.getElementById("totalPrice").innerText);
        if(confirm(amount + "個購入しますか？")){
            if(amount > item.stock) alert("在庫がありません。。");
            if(user.money > totalPrice){
                item.event(user, humberger, amount, totalPrice);
                config.gamePage.innerHTML = "";
                config.gamePage.append(createGamePage(user, humberger, itemList));
                // clearInterval(config.gameData);
                // config.gameData = setInterval(oneDayHasPassed, 1000, user);
            } else {
                alert("金額が足りません。。");
            }
        }
    });

    addEventListenerToItems(container.querySelectorAll(".item"), itemList, user, humberger);

    return container;
}