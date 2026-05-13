<h1>이주영 202230140</h1>

# 2026-05-13
## 이벤트 전파의 중지
* 이벤트 핸들러는 이벤트 오브젝트(object)를 유일한 매개변수로 사용

* 관례적으로 이벤트 오브젝트를 의미하는 "event"를 "e"로 줄여서 호출하는 것이 일반적

* 이 오브젝트는 이벤트의 정보를 읽어 들이는데 사용할 수 있음

* 또한 이벤트 오브젝트가 전파를 멈출 수 있게 해줌

* 이벤트가 부모 컴포넌트에 닿지 못하도록 막으려면, 다음 예제처럼 Bubble 컴포넌트에 Button 컴포넌트를 추가하고, e.stopPropagation()을 호출하도록 함

```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      // 부모 요소로 이벤트가 퍼지는 것을 막음
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

* 버튼을 클릭하면 다음과 같은 절차가 진행

* React가  button에 전달된 onClick 핸들러를 호출

* Button 컴포넌트에 정의된 해당 핸들러는 다음을 수행

* e.stopPropagation()을 호출하여 이벤트가 더 이상 bubbling 되지 않도록 방지

* Bubble 컴포넌트가 prop으로 전달해 준 onClick 함수를 호출

* Bubble 컴포넌트에서 정의된 onClick 이벤트 핸들러 함수가 버튼의 alert를 표시

* 전파가 중단되었기 때문에 부모인 <div>의 onClick은 실행되지 않음

* 이해를 돕는 팁
* 이 과정은 자식 요소의 이벤트가 부모에게 전달되는 버블링(Bubbling) 현상을 인위적으로 끊어주는 과정 e.stopPropagation()이 가장 먼저 실행되기 때문에, 부모인 div는 클릭이 발생했다는 사실조차 모르게 됨

## e.stopPropagation()와 e.preventDefault()
* e.stopPropagation()와 e.preventDefault()를 혼동하지 말아야 함

* 전파를 중지하는 데는 둘 다 유용하지만, 전혀 다른 기능을 가지고 있음

* e.stopPropagation()은 이벤트 핸들러가 상위 태그에서 실행되지 않도록 멈추는 기능

* 반면 e.preventDefault()는 브라우저 기본 동작을 가지고 있는 일부 이벤트가 해당 기본 동작을 실행하지 않도록 방지하는 기능

* 이벤트 핸들러는 사이드 이펙트를 위한 최고의 위치

* 함수를 렌더링하는 것과 다르게 이벤트 핸들러는 순수할 필요가 없기 때문에 무언가를 변경하는 데 최적의 위치

* 예를 들어 타이핑에 반응해 입력 값을 수정하거나, 버튼 클릭에 따라 리스트를 변경할 때 적절

* 그러나 일부 정보를 수정하기 위해서는 먼저 그 정보를 저장하기 위한 수단이 필요

* 이를 위해서 React에서는 컴포넌트의 정보를 저장하는 역할을 하는 state Hook을 통해 제공

```jsx
// 1. 전파 중지 예시
const handleButtonClick = (e) => {
  e.stopPropagation(); // 부모 리스트/영역으로 클릭이 번지는 것을 막음
  console.log("버튼만 클릭됨");
};

// 2. 기본 동작 방지 예시
const handleFormSubmit = (e) => {
  e.preventDefault(); // 페이지 새로고침 방지
  console.log("데이터만 전송됨");
};
```

## State의 개념과 useState
* State는 컴포넌트의 기억장소

* 컴포넌트는 상호 작용의 결과로 화면의 내용을 변경해야 하는 경우가 많음

* 예를 들면:

* 폼에 무언가를 입력하면 입력 필드가 업데이트되어야 하고,
이미지 캐러셀에서 다음 버튼을 클릭할 때 표시되는 이미지가 변경되어야 함

* 또한 구매 버튼을 클릭하면 상품이 장바구니에 담겨야 하는 경우도 있음

* 컴포넌트는 현재 입력 값, 현재 이미지, 장바구니의 상태와 같은 것들을 어딘가에 “기억”해야 함

* React는 이런 종류의 컴포넌트별 메모리를 state라고 부름

```jsx
import { useState } from 'react';

function Counter() {
  // [현재 값, 값을 바꾸는 함수] = useState(초기값);
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      클릭 횟수: {count}
    </button>
  );
}
```

## 로컬 변수에 컴포넌트 상태 저장
* 가장 쉽게 생각할 수 있는 방법으로 캐러셀(Carousel)을 구현

* 로컬 변수를 이용해서 index값을 저장하고, 현재 저장된 index 값의 이미지 정보를 렌더링

* index값의 결정은 버튼을 이용하고, 클릭 이벤트 핸들러에서 index값을 하나씩 증가

* 먼저 버튼을 클릭하면 index값이 증가하도록 구현

* 정상 동작이 확인되면 index 감소 버튼을 추가하여 좌우로 슬라이딩되는 캐러셀을 완성

### 이미지 모듈 및 디렉토리 관리
* 캐러셀 컴포넌트를 만들기 전에 캐러셀에서 사용할 이미지 모듈을 만들어야 함

* 이미지 객체에는 name, artist, description, url, alt 등의 key를 추가

* 온라인(placeholder.com)에서 제공하는 이미지와 로컬 이미지를 병행

* 만일 로컬에서 이미지를 관리한다면, /src/components/Carousel/images/ 처럼 컴포넌트 디렉토리에 별도의 디렉토리를 생성해서 관리하는 것이 좋음

* 다른 컴포넌트와도 같은 이미지를 공유한다면, /src/assets/carousel/ 처럼 assets 아래 보관하면 관리가 편함


* 로컬 이미지를 호출하려면 각각의 이미지를 import해야 함

* 그런데 이미지가 많은 경우는 이미지를 사용하는 컴포넌트의 코드가 매우 복잡해짐

코드 예시
JavaScript
```jsx
import image1 from "./assets/images/image1.jpg";
import image2 from "./assets/images/image2.jpg";
import image3 from "./assets/images/image3.jpg";
import image4 from "./assets/images/image4.jpg";
import image5 from "./assets/images/image5.jpg";
// ... 이미지가 많아질수록 import 문이 끝없이 길어짐
```
* 복잡한 코드를 단순화하는 방법이 있음

* 이미지 디렉토리 안에 index 파일을 만드는 것

* 복잡한 코드는 모두 index 파일에서 처리하고, 이미지를 사용하는 컴포넌트는 가독성을 높이는 방법

* 파일 이름을 반드시 index로 해야 하는 것은 아니지만, index로 하면 추가로 파일 이름까지 명시하지 않아도 되기 때문에 사용이 매우 편리


### 방법 1: 각각의 이미지 변수명을 모두 export
* 각 이미지를 개별적으로 내보내서 필요한 것만 골라 쓸 때 유용
```jsx
// 각각의 이미지 변수명을 모두 export
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import image4 from "./image4.jpg";
import image5 from "./image5.jpg";

export {
  image1,
  image2,
  image3,
  image4,
  image5,
};
```

### 방법 2: 변수명을 하나의 객체로 저장하여 export
* 모든 이미지를 하나의 묶음(객체)으로 관리하고 싶을 때 사용하기 편리
```jsx
// 변수명을 하나의 객체로 저장하여 export
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import image4 from "./image4.jpg";
import image5 from "./image5.jpg";

export const images = {
  image1,
  image2,
  image3,
  image4,
  image5,
};
```