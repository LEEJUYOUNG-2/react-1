<h1>이주영 202230140</h1>

* 2026-05-13
* 3.2.2. 이벤트 전파의 중지
* 이벤트 핸들러는 이벤트 오브젝트(object)를 유일한 매개변수로 사용합니다.

* 관례적으로 이벤트 오브젝트를 의미하는 "event"를 "e"로 줄여서 호출하는 것이 일반적입니다.

* 이 오브젝트는 이벤트의 정보를 읽어 들이는데 사용할 수 있습니다.

* 또한 이벤트 오브젝트가 전파를 멈출 수 있게 해줍니다.

* 이벤트가 부모 컴포넌트에 닿지 못하도록 막으려면, 다음 예제처럼 Bubble 컴포넌트에 Button 컴포넌트를 추가하고, e.stopPropagation()을 호출하도록 합니다.

'''jsx
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
'''