const wrap = document.querySelector(".wrap"),
  container = document.querySelector(".container"),
  list = document.querySelector(".list"),
  countryName = document.querySelector("input"),
  body = document.querySelector("#body"),
  textbox = document.querySelector(".textbox p");

const nArr = [];
countryName.focus();
textbox.innerText = "";

const form = document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  container.classList.add("active");
  list.classList.add("active");
  body.classList.add("active");

  const val = countryName.value;
  getAPI(val);
  pushArr(val);
  bgFor(100);
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
  for (let i = 0; i < num; i++) {
    createEffect(num[i]);
  }
};

// function onlyKR(e) {
//   const pattern = /^[가-힣\s]+$/;
//   console.log(this.value);
// }

// 한글만입력 key
// countryName.addEventListener("keypress", onlyKR);

const pushArr = (item) => {
  if (item.innerText === "") {
    return (textbox.innerText = null);
  } else {
    nArr.push(item);
  }
  return (textbox.innerText = nArr);
};

const getAPI = async (item) => {
  const API_KEY = apiKey;
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
            <p><span>동포</span> : ${item.oks_status}</p>
            <p><span>투자</span> : ${item.investment_status}</p>
            <p><span>수교일</span> : ${item.diplomatic_relations}</p>
               <button class="delbtn" onClick=remove() >❌</button>
               </li>
            `;
        countryName.value = "";
      });
    }, 3000);
  } else {
    alert("잘못된 정보입니다. 다시입력해주세요");
    countryName.value = "";
    countryName.focus();
    remove();
  }
};

function remove() {
  list.innerHTML = "";
  container.classList.remove("active");
  list.classList.remove("active");
  body.classList.remove("active");
}
