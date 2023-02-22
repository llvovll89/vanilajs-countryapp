// dom
const wrap = document.querySelector(".wrap"),
  container = document.querySelector(".container"),
  list = document.querySelector(".list"),
  countryName = document.querySelector("input"),
  body = document.querySelector("#body"),
  textbox = document.querySelector(".textbox p"),
  timer = document.querySelector(".timer"),
  todayDate = document.querySelector(".date");

window.onload = () => {
  clock();
  setInterval(clock, 1000);
};

// Time (textbox에)
function clock() {
  const newDate = new Date();
  const hours = modifyNum(newDate.getHours());
  const minit = modifyNum(newDate.getMinutes());
  const sec = modifyNum(newDate.getSeconds());
  const ampm = hours > 12 ? "PM" : "AM";

  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();

  timer.innerHTML = `${hours}:${minit}:${sec}<span class="ampm">(${ampm})</span>`;
  todayDate.innerHTML = `${year}년 ${month}월 ${date}일`;
}

function modifyNum(time) {
  if (parseInt(time) < 10) {
    return `0${time}`;
  } else {
    return time;
  }
}

// 초기화
const nArr = [];
countryName.focus();
textbox.innerText = "";

// form 이벤트
const form = document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  container.classList.add("active");
  list.classList.add("active");
  body.classList.add("active");

  const val = countryName.value;
  getAPI(val);
  pushArr(val);
});

// random
const randomWidth = () => {
  return Math.floor(Math.random() * window.innerWidth);
};

// 이펙트생성
const createEffect = () => {
  const div = document.createElement("div");
  div.classList.add("effect");
  wrap.appendChild(div);
  div.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
  div.style.left = randomWidth() + "px";
};

const bgFor = (num) => {
  if (num !== parseInt(0)) {
    for (let i = 0; i < num; i++) {
      createEffect();
    }
  } else {
    return num;
  }
};

// text박스 배열값넣기
const pushArr = (item) => {
  if (item.innerText === "") {
    return (textbox.innerText = null);
  } else {
    nArr.push(item);
  }
  return (textbox.innerText = nArr);
};

// 공공데이터 api 불러오기
const getAPI = async (item) => {
  // API_KEY 숨기기,,,,
  const API_KEY =
    "urIcbpoTLWxb29j%2Fwpj%2BW0Kit7O7x3D0cuZgu8AmBU53BswjDvNTfzkbeZjILO%2BzvBhsrnS1JcyK80dGJmMsKw%3D%3D";
  const apiURL = `http://apis.data.go.kr/1262000/OverviewKorRelationService/getOverviewKorRelationList?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&cond[country_nm::EQ]=${item}`;
  const response = await fetch(apiURL);
  const json = await response.json();
  const data = await json.data;

  if (response.status === 200 && countryName.value !== "") {
    list.innerHTML = `<div class="blob">
        <span></span>
        <span></span>
        <span></span>
    </div>`;

    setTimeout(() => {
      data.map((item) => {
        list.innerHTML = `
            <li class="country_item">
            <p><span>국가명</span> : ${item.country_nm}</p>
            <p><span>국가코드</span> : ${item.country_iso_alp2}</p>
            <p><span>영문명</span> : ${item.country_eng_nm}</p>
            <p><span>투자</span> : ${item.investment_status}</p>
            <p><span>동포</span> : ${item.oks_status}</p>
            <p><span>수교일</span> : ${item.diplomatic_relations}</p>
               <button class="delbtn" onClick=remove() >❌</button>
               </li>
            `;
        countryName.value = "";
        bgFor(300);
      });
    }, 3000);
  } else {
    alert("잘못된 정보입니다. 다시입력해주세요");
    countryName.value = "";
    countryName.focus();
    remove();
    bgFor(0);
  }
};

// 전체삭제 (active)
function remove() {
  list.innerHTML = "";
  container.classList.remove("active");
  list.classList.remove("active");
  body.classList.remove("active");
}
