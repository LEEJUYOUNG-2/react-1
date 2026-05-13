let guest = 0;

function Cup(guset) {
  // 컴포넌트 외부의 guest 변수를 변경하고 있습니다. 🚨
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}